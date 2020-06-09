export const exp = () => {
    return {
        id: "senior_java_developer_at_intellias",
        name: "Senior Java Developer at Intellias",
        city: "Lviv, Ukraine",
        dates: {
            start: new Date(2018, 11 - 1, 1),
            end: new Date(2019, 3 - 1, 15)
        },
        description: [
            `Implement new algorithms for map matching, 
            Provide comprehensive analysis on different algorithms comparison, 
            Develop and extend map matching pipelines with multi-algorithms support`
        ],
        responsibility: [
            `Implementing new Map Matcher algorithm based on Hidden Markov Model + Algorithm Viterbi`
        ],
        techStack: {
            language: "Java 8",
            // frameworks: "-",
            prod_env: "unknown",
            build_tool: "Apache Maven",
            ci_cd: "Jenkins (all custom scripts on bash)",
            // storage: "AWS (Hadoop, EMR)",
            // metrics: "-",
            vcs: "Git (Gerrit)"
        }
    }
}
