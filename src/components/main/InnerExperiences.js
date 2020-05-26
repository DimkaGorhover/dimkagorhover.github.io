import React from "react";
import { ExperienceEntry } from "./ExperienceEntry";

export const InnerExperiences = ({ experiences, indexSuffix }) => {

    if (experiences) {

        const innerExp = experiences.map((experience, index) => {
            index = index + 1;
            return (
                <ExperienceEntry
                    key={index}
                    index={index}
                    indexSuffix={indexSuffix}
                    experience={experience} />
            )
        });

        return <div>{innerExp}</div>
    }
    return null;
};
