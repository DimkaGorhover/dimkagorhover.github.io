import React from 'react';
import { Contacts } from "./Contacts";
import { contacts, info } from "../../../../../data/cv_data";

export const About = () => {

    const aboutMeText = info.about_me.map((line, index) => (<p key={index}>{line}</p>))

    return (
        <div>
            <div>
                <div>
                    <h4 id="about_me">
                        About Me
                    </h4>
                    {aboutMeText}
                </div>

                <Contacts contacts={contacts} />

                <div>
                    <h4>
                        What am I looking for
                    </h4>
                    <p>
                        New Challenges, Product Company, full time, office, remote, relocation (Europe)
                    </p>
                </div>

                <div>
                    <h4>
                        Hobbies
                    </h4>
                    <p>
                        Traveling, Motorcycles, Gym, Football, Cars, Bicycles
                    </p>
                </div>

            </div>
        </div>
    )
};
