import moment from "moment"; // TODO: replace moment.js by date-fns (https://date-fns.org)
import React from "react";
import {TechStack} from "./TechStack";
import {ExperienceEntryTextBlock} from "./ExperienceEntryTextBlock";
import {InnerExperiences} from "./InnerExperiences";

const prettyPeriod = ({start, end}) => {
    // TODO: replace moment.js by date-fns (https://date-fns.org)
    let startStr = start.format("MMMM YYYY");
    let endStr;
    if (!end) {
        end = moment();
        endStr = "present"
    } else {
        endStr = end.format("MMMM YYYY")
    }
    const duration = end.diff(start, 'months');
    const years = Math.floor(duration / 12.0);
    const months = Math.trunc(duration % 12.0) + 1;
    let d = months + " " + ((months === 1) ? "month" : "months");
    if (years > 1) {
        d = years + " years " + d;
    } else if (years > 0) {
        d = years + " year " + d;
    }
    return startStr + " - " + endStr + " (" + d + ")";
};

export const ExperienceEntry = ({experience: exp, indexSuffix, index}) => {

    if (indexSuffix) {
        index = indexSuffix + '.' + index
    }

    return (
        <div>
            <h3>{index}. {exp.name} ({exp.city}, {prettyPeriod(exp.dates)})</h3>
            <ExperienceEntryTextBlock title="Description" text={exp.description}/>
            <ExperienceEntryTextBlock title="Responsibility" text={exp.responsibility}/>
            <TechStack techStack={exp.techStack}/>
            <ExperienceEntryTextBlock title="Achievements" text={exp.achievements}/>
            <ExperienceEntryTextBlock title="Current State" text={exp.currentState}/>
            <InnerExperiences experiences={exp.inner} indexSuffix={index}/>
        </div>
    )
};