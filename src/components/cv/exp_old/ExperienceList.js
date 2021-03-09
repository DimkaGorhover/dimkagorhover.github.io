import React from 'react';
import { experiences } from "../../../data/cv_data";
import { ExperienceEntry } from "./ExperienceEntry";

export const ExperienceList = () => {

  const content = experiences.map((experience, index) => (
    <ExperienceEntry key={index}
                     index={index + 1}
                     experience={experience}/>
  ));

  return (
    <div>{content}</div>
  )
};
