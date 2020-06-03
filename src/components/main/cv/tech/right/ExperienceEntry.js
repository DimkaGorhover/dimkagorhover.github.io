import React from "react";
import { TechStack } from "./TechStack";
import { ExperienceEntryTextBlock } from "./ExperienceEntryTextBlock";
import { InnerExperiences } from "./InnerExperiences";
import { prettyPeriod } from "../../../../../utils/CustomDateUtils";
import { ExperienceLinks } from "./ExperienceLinks";

export const ExperienceEntry = ({ experience: exp, indexSuffix, index }) => {

    if (indexSuffix) {
        index = indexSuffix + '.' + index
    }

    const id = (exp.id) ? exp.id : ("" + Math.random())
    const title = `${index}. ${exp.name} (${exp.city}, ${prettyPeriod(exp.dates)})`

    return (
        <div>
            <hr style={{ margin: "2rem 0" }} />
            <h4 id={id}>{title}</h4>
            <ExperienceEntryTextBlock title="Description" text={exp.description} />
            <ExperienceEntryTextBlock title="Responsibility" text={exp.responsibility} />
            <ExperienceEntryTextBlock title="Achievements" text={exp.achievements} />
            <ExperienceEntryTextBlock title="Current State" text={exp.currentState} />
            <TechStack expIndex={index} techStack={exp.techStack} />
            <ExperienceLinks links={exp.links} />
            <InnerExperiences experiences={exp.inner} indexSuffix={index} />
        </div>
    )
};