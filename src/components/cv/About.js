import React from 'react';
import { info } from "../../data/cv_data";

export const About = () => {

    const content = info.about_me.map((line, index) => (
        <p key={index}>{line}</p>
    ))

    return (
        <div>
            <h4 id="about_me">About Me</h4>
            {content}
        </div>
    )
};
