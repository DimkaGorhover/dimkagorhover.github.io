import React from 'react';
import { contacts as contactsData } from "../../data/cv_data";
import { About } from './About';
import { Contacts } from "./Contacts";
import { Education } from './Education';
import { Hobbies } from './Hobbies';
import { Skills } from './Skills';

// @Deprecated
export const AllAboutMe = () => {
    return (
        <div>
            <About />
            <Contacts />
            <Hobbies />
            <Education />
            <Skills />
        </div>
    )
}
