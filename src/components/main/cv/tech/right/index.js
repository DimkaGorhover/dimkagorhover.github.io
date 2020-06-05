import React from 'react';
import { CurrentSkills } from './CurrentSkills';
import { Experience } from './Experience';
import { Education } from './edu/Education';

export const RightBlock = () => {
    return (
        <div>
            <CurrentSkills />
            <Education />
            <Experience />
        </div>
    )
}
