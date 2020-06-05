import React from 'react';
import { info } from "../../data/cv_data";

export const About = () => {

    return (
        <div>
            <h4 id="about_me">About Me</h4>
            {info.about_me.map((line, index) => (
                <p key={index}>{line}</p>
            ))}
        </div>
    )
};
