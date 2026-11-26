---
title: "Per-application pod anti-affinity for Spark on Kubernetes"
date: 2026-11-24
draft: false
description: >-
  A Spark pod template has no placeholders, so it cannot reference the
  application ID of the pod it describes. A Kyverno mutation policy reads the
  labels of each Spark pod at admission and adds pod anti-affinity for that
  one application. Since Kubernetes 1.29 (stable in 1.33), matchLabelKeys does
  the same without variables.
tags: ["spark", "kubernetes", "kyverno", "kyuubi"]
lastmod: 2026-11-26
---

**TL;DR:** The scheduler packed several executors of one Spark job onto the
same nodes, and their local disks filled up. A Kyverno policy now copies each
pod's application ID into a pod anti-affinity rule at admission, so executors
of one job spread across nodes.

## Background

For five years I worked as a platform engineer on the data platform of a
large retail group. I built and ran its Kubernetes clusters, the biggest
of them a 40-node bare-metal RKE2 cluster, and the data stack on top: Spark
on Kubernetes, Kyuubi, Airflow and the rest, all delivered through Argo CD.
About 45 analytics teams ran their jobs there, so when a node went down it
was my problem.

## Issue

One day a user ran a `SELECT *` over a large table on a Spark cluster with
ten executors. Each executor pulled **up to 1 TB of data** onto the local
disk of the node it ran on. The scheduler had packed several executors of
that application onto the same nodes, so those nodes took several terabytes
each, ran into `no space left on device`, and went down. I had no spare
hardware at the time, so losing a few nodes hurt.

I got the cluster back the same day. Afterwards I looked into why ten
executors of one application ended up on so few nodes, and the answer was
that nothing told the scheduler to do otherwise. The Spark operator and
Kyuubi created pods with **no affinity, no node selector and no topology
spread constraints**.

The first thing I wanted to try was a pod template, since Spark has one for
exactly this kind of setting. It turned out not to fit, and what I ended up
with is a Kyverno policy that adds pod anti-affinity to every Spark pod,
scoped to the application the pod belongs to.

## Why the pod template didn't work

`spark.kubernetes.driver.podTemplateFile` and
`spark.kubernetes.executor.podTemplateFile` point at a pod manifest, and
Spark uses it as the base for the pods it creates. You can put a node
selector, affinity or topology spread constraints in there.

**The template is a static file**, though. To keep the executors of one
application away from each other, the anti-affinity rule has to select the
pods of that application, and the only labels that identify an application
are filled in by Spark at submit time:

| Label                | Value                                   |
| -------------------- | --------------------------------------- |
| `spark-app-selector` | the application ID, unique per run      |
| `spark-app-name`     | the application name                    |
| `spark-role`         | `driver` or `executor`                  |

Spark reads the template as it is. **It has no placeholders and no
substitution**, so there is no way to write "the application ID of this pod"
into it. When I wrote the policy, that left the template with a selector
that is the same for every application, such as `spark-role: executor`. That
rule would push the executors of all applications away from each other,
which is a different thing: two unrelated jobs would compete for nodes, while
I only care that one job doesn't put all its executors on one node.
(Kubernetes has since added `matchLabelKeys`, which removes this limit. More
on that [below](#how-i-would-do-it-now-matchlabelkeys).)

The Spark operator has its own answer, `spec.executor.affinity` in a
`SparkApplication`. Each manifest belongs to one application, so its name
can be hardcoded there. That depends on every author of every manifest
remembering to add the block, and it does nothing for Kyuubi, which starts
its engines through `spark-submit` with no `SparkApplication` at all.

The template was also awkward to operate. It lives outside the job, as a file
the Spark operator or the Kyuubi server reads. In my setup a change to it
meant **restarting the operator or Kyuubi**, and restarting Kyuubi drops the
sessions users have open. Rolling out a one-line scheduling change that way
was painful enough that I avoided it.

## Mutating the pod at admission

The pod that Spark sends to the API server already carries all three labels.
Kyverno runs as an admission webhook, so it sees that pod before it is
stored, and a mutation policy can **read the labels from the request and
write them back into the pod spec** as an anti-affinity rule.

{{< mermaid >}}
sequenceDiagram
    participant S as Spark
    participant A as API server
    participant K as Kyverno
    participant C as Scheduler
    S->>A: create pod, labels spark-app-selector and spark-app-name
    A->>K: admission request with the pod manifest
    K-->>A: patch, podAntiAffinity that selects the same labels
    A->>C: pod stored with the anti-affinity
    C->>C: prefer a node with no pods of this application
{{< /mermaid >}}

I dropped the pod templates and moved all of this into one policy. Here it
is, cut down to the anti-affinity part. The real one also sets node affinity
for dedicated Spark nodes, which I left out.

```yaml
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: spark-pod-add-affinity
spec:
  background: false
  rules:
    - name: spark-pod-anti-affinity
      preconditions:
        any:
          - key: "{{ request.operation }}"
            operator: In
            value: [CREATE]
      match:
        resources:
          kinds: [Pod]
          selector:
            matchExpressions:
              - {key: spark-app-name, operator: Exists}
              - {key: spark-app-selector, operator: Exists}
              - {key: spark-role, operator: In, values: [driver, executor]}
      mutate:
        patchStrategicMerge:
          spec:
            affinity:
              podAntiAffinity:
                preferredDuringSchedulingIgnoredDuringExecution:
                  - weight: 1
                    podAffinityTerm:
                      topologyKey: kubernetes.io/hostname
                      labelSelector:
                        matchExpressions:
                          - key: spark-app-name
                            operator: In
                            values:
                              - '{{ request.object.metadata.labels."spark-app-name" }}'
                          - key: spark-app-selector
                            operator: In
                            values:
                              - '{{ request.object.metadata.labels."spark-app-selector" }}'
```

`request.object` is the pod manifest from the admission request, so
`request.object.metadata.labels."spark-app-selector"` is **the application
ID of the pod being created**. The label name has dashes in it, which is why
it is quoted inside the JMESPath expression. `spark-app-selector` is unique
per run, so it would be enough alone. The `spark-app-name` term is redundant;
it is in the snippet because it is in the policy I run.

The `match` block limits the policy to pods that have both labels and a
`spark-role` of `driver` or `executor`. The driver is included on purpose:
it carries the same labels, so executors also prefer nodes other than the
one the driver is on.

`background: false` is there because the rule reads `request.*`, which exists
only during admission.

I manage the cluster with Argo CD, so changing the policy is **one commit**:
a merge request, a merge to `main`, and Argo CD syncs it. The next pod Spark
creates gets the new rule, and neither the operator nor Kyuubi restarts.

## How I would do it now: matchLabelKeys

Kubernetes solved the placeholder problem in the API itself.
`matchLabelKeys` in pod affinity and anti-affinity arrived as alpha in 1.29,
became beta and **on by default in 1.31**, and is stable since 1.33. When a
pod is created, the API server takes the listed keys, reads their values from
that pod's own labels, and adds them to the selector. Spark sets
`spark-app-selector` before it creates the pod, so a fixed rule becomes a
per-application one:

```yaml
podAntiAffinity:
  preferredDuringSchedulingIgnoredDuringExecution:
    - weight: 1
      podAffinityTerm:
        topologyKey: kubernetes.io/hostname
        labelSelector:
          matchExpressions: [{key: spark-role, operator: Exists}]
        matchLabelKeys: [spark-app-selector]
```

My policy is older than that field. Production runs **Kubernetes 1.31**, so
the field is available there today, and this block could go straight into a
pod template with no policy engine involved. I would still deliver it
through Kyverno, because the rollout argument has not changed: a template
change means restarting the operator or Kyuubi, and a policy change does
not. The policy just gets simpler. The patch becomes a constant with no
`request.object` in it, and it ports to `MutatingPolicy` without any CEL to
build the selector.

## Kyverno 1.20 removes ClusterPolicy

I run this on **Kyverno 1.19.1** (Helm chart 3.9.1). The policy is old: its
annotations still say it was written for Kyverno 1.7.4, and it has worked
unchanged since.

{{< alert >}}
`ClusterPolicy` is deprecated in Kyverno 1.19 and, according to the
[migration guide](https://kyverno.io/docs/guides/migration-to-cel/), removed
in 1.20. Its replacement, `MutatingPolicy`, uses CEL expressions and has no
`patchStrategicMerge`. On 1.19 the admission controller already prints a
deprecation warning for the policy above.
{{< /alert >}}

Below is my port to `MutatingPolicy`. I wrote it from the documentation and
checked the field names against the CRD that ships with chart 3.9.1, but **I
have not run it in a cluster yet**, so test it before you rely on it.

```yaml
apiVersion: policies.kyverno.io/v1
kind: MutatingPolicy
metadata:
  name: spark-pod-add-affinity
spec:
  matchConstraints:
    resourceRules:
      - apiGroups: [""]
        operations: ["CREATE"]
        resources: ["pods"]
    objectSelector:
      matchExpressions:
        - {key: spark-app-name, operator: Exists}
        - {key: spark-app-selector, operator: Exists}
        - {key: spark-role, operator: In, values: [driver, executor]}
  variables:
    - name: antiAffinity
      expression: >-
        {
          "preferredDuringSchedulingIgnoredDuringExecution": [{
            "weight": 1,
            "podAffinityTerm": {
              "topologyKey": "kubernetes.io/hostname",
              "labelSelector": {
                "matchLabels": {
                  "spark-app-name": object.metadata.labels["spark-app-name"],
                  "spark-app-selector": object.metadata.labels["spark-app-selector"]
                }
              }
            }
          }]
        }
  mutations:
    - patchType: JSONPatch
      jsonPatch:
        expression: >-
          has(object.spec.affinity)
            ? [JSONPatch{op: "add", path: "/spec/affinity/podAntiAffinity",
                         value: variables.antiAffinity}]
            : [JSONPatch{op: "add", path: "/spec/affinity",
                         value: {"podAntiAffinity": variables.antiAffinity}}]
```

Three things changed besides the syntax. `request.object` became `object`.
The `CREATE` precondition moved into `matchConstraints`, next to the label
selector. And the patch is a JSON Patch now, which needs the `has()` check:
`add` on `/spec/affinity/podAntiAffinity` fails when the pod has no
`affinity` at all, and `add` on `/spec/affinity` would wipe a node affinity
that something else had already set. Either way the pod's own
`podAntiAffinity`, if it had one, is replaced.

## What it does not do

The rule is `preferredDuringSchedulingIgnoredDuringExecution`, so **it is a
hint**: when the cluster is tight, two executors of one application can
still share a node. I chose that deliberately, because a job with more
executors than there are nodes must still be able to start. The Kubernetes
docs on
[inter-pod affinity](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#inter-pod-affinity-and-anti-affinity)
and
[topology spread constraints](https://kubernetes.io/docs/concepts/scheduling-eviction/topology-spread-constraints/)
cover the stricter options.

The policy also puts Kyverno in the path of every Spark pod. A rule fails
closed by default (`failurePolicy: Fail`), so while Kyverno is down, Spark
cannot create pods. Setting `failurePolicy: Ignore` in the policy's
`webhookConfiguration` trades that for pods that start without the rule.

It also **does nothing about disk usage itself**. Ten executors on ten nodes
would have written the same total amount of data during my incident. The
difference is that each node would have taken about 1 TB, not several, and a
node that fills up takes one executor with it. A limit on
`ephemeral-storage` for the executor pods is what stops a single pod from
filling a disk, and it is a separate change from this one.

## Conclusion

- A pod template has no placeholders, so before `matchLabelKeys` it could
  not express anti-affinity per application.
- Every Spark pod carries `spark-app-selector` and `spark-app-name`, and a
  Kyverno mutation policy can turn them into a `podAntiAffinity` rule at
  admission.
- `matchLabelKeys: [spark-app-selector]` does the same with a static rule.
  Kubernetes supports it since 1.29 and marks it stable since 1.33.
- With Argo CD the rollout is **one commit and nothing restarts**, which is
  why I keep the rule in Kyverno either way.

## Links

- [Kyverno: mutate rules](https://kyverno.io/docs/policy-types/cluster-policy/mutate/)
- [Kyverno: MutatingPolicy](https://kyverno.io/docs/policy-types/mutating-policy/)
- [Kyverno: migrating to CEL policies](https://kyverno.io/docs/guides/migration-to-cel/)
- [Spark on Kubernetes: pod template](https://spark.apache.org/docs/latest/running-on-kubernetes.html#pod-template)
- [Kubernetes 1.31: matchLabelKeys in pod affinity graduates to beta](https://kubernetes.io/blog/2024/08/16/matchlabelkeys-podaffinity/)
- [Kubernetes: inter-pod affinity and anti-affinity](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#inter-pod-affinity-and-anti-affinity)
