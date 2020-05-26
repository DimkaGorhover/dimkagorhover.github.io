import React from 'react';
import {experiences} from "../../cv_data";
import {ExperienceEntry} from "./ExperienceEntry";

export const Experience = () => {

    const experienceComponent = experiences.map((experience, i) => {
        const index = i + 1;
        return (
            <ExperienceEntry key={index} index={index} experience={experience}/>
        );
    });

    return (
        <div>
            <h2>Experience</h2>
            {experienceComponent}
        </div>
    )
};
