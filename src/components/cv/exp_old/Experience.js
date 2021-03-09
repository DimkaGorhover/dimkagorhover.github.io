import React from 'react';
import { ExperienceList } from "./ExperienceList";
import { TableOfContent } from "./TableOfContent";

export const Experience = () => {
  return (
    <div>
      <h3 style={{ marginTop: '0px' }}>
        Experience
      </h3>
      <TableOfContent/>
      <ExperienceList/>
    </div>
  );
};
