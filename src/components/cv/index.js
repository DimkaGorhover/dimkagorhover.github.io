import React from 'react';
import { contacts as contactsData } from "../../data/cv_data";
import { Contacts } from "./Contacts";
import { Hobbies } from './Hobbies';
import { Views } from './Views';
import { About } from './About';
import { Education } from './Education';
import { Skills } from './Skills';

export const AllAboutMe = () => {
    return (
        <div>
            <About />
            <Contacts contacts={contactsData} />
            <Views />
            <Hobbies />
            <Education />
            <Skills />
        </div>
    )
}
