import React from "react";
import { TechStack } from "./TechStack";
import { ExperienceEntryTextBlock } from "./ExperienceEntryTextBlock";
import { InnerExperiences } from "./InnerExperiences";
import { differenceInCalendarMonths, format } from "date-fns";

const prettyPeriod = ({ start, end }) => {
    let startStr = format(start, 'MMMM yyyy')
    let endStr;
    if (!end) {
        end = new Date();
        endStr = "present"
    } else {
        endStr = format(end, "MMMM yyyy")
    }
    let months = differenceInCalendarMonths(end, start) + 1
    let years = Math.floor(months / 12)
    months = Math.ceil(months - (years * 12))

    let monthsSuffix = 'month' + ((months > 1) ? "s" : "")
    let yearsSuffix = 'year' + ((years > 1) ? "s" : "")
    let periodStr = `${startStr} - ${endStr}`
    let durationStr = ''
    if (years > 0) {
        durationStr = `${years} ${yearsSuffix} `
    }
    durationStr = `${durationStr}${months} ${monthsSuffix}`

    return `${periodStr} (${durationStr})`
};

export const ExperienceEntry = ({ experience: exp, indexSuffix, index }) => {

    if (indexSuffix) {
        index = indexSuffix + '.' + index
    }

    return (
        <div>
            <h3 id={(exp.id) ? exp.id : ("" + Math.random())}>{index}. {exp.name} ({exp.city}, {prettyPeriod(exp.dates)})</h3>
            <ExperienceEntryTextBlock title="Description" text={exp.description} />
            <ExperienceEntryTextBlock title="Responsibility" text={exp.responsibility} />
            <TechStack expIndex={index} techStack={exp.techStack} />
            <ExperienceEntryTextBlock title="Achievements" text={exp.achievements} />
            <ExperienceEntryTextBlock title="Current State" text={exp.currentState} />
            <InnerExperiences experiences={exp.inner} indexSuffix={index} />
        </div>
    )
};