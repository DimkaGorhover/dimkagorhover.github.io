import React from 'react';
import {experiences} from "../cv_data";
import {ExperienceEntry} from "./ExperienceEntry";

export const Experience = () => {

    const experienceComponent = experiences.map((experience, i) => {
        return (
            <ExperienceEntry index={i + 1} experience={experience}/>
        );
    });

    return (
        <div>
            <h2>Experience:</h2>
            {experienceComponent}
        </div>
    )
};
