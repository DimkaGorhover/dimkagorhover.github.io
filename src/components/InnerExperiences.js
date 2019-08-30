import React from "react";
import {ExperienceEntry} from "./ExperienceEntry";

export const InnerExperiences = ({experiences, indexSuffix}) => {

    if (experiences) {

        const innerExp = experiences.map((experience, index) => {
            return <ExperienceEntry index={index + 1} indexSuffix={indexSuffix} experience={experience}/>
        });

        return <div>{innerExp}</div>
    }
    return null;
};
