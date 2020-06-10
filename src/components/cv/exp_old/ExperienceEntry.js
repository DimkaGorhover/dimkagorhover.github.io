import React from "react";
import { TechStack } from "./TechStack";
import { InnerExperiences } from "./InnerExperiences";
import { prettyPeriod } from "../../../utils/CustomDateUtils";
import { ExperienceLinks } from "./ExperienceLinks";

const TextBlock = ({ title, text }) => {
    if (text != null || (Array.isArray(text) && text.length > 0)) {
        if (!Array.isArray(text))
            text = [text]
        text = text.map((text_item, i) => <p key={i}>{text_item}</p>)
        return (
            <div>
                <h5>{title}</h5>
                <div>{text}</div>
            </div>
        )
    }
    return null;
}

export const ExperienceEntry = ({ experience: exp, indexSuffix, index }) => {

    if (indexSuffix)
        index = indexSuffix + '.' + index

    const id = (exp.id) ? exp.id : ("" + Math.random())
    const title = `${index}. ${exp.name} (${exp.city}, ${prettyPeriod(exp.dates)})`

    return (
        <div>
            <hr style={{ margin: "2rem 0" }} />
            <h4 id={id}>{title}</h4>
            <TextBlock title="Description" text={exp.description} />
            <TextBlock title="Responsibility" text={exp.responsibility} />
            <TextBlock title="Achievements" text={exp.achievements} />
            <TextBlock title="Current State" text={exp.currentState} />
            <TechStack expIndex={index} techStack={exp.techStack} />
            <ExperienceLinks links={exp.links} />
            <InnerExperiences experiences={exp.inner} indexSuffix={index} />
        </div>
    )
}
