import React from 'react';
import { Contacts } from "./Contacts";
import { contacts, info } from "../../cv_data";
import { differenceInCalendarMonths } from "date-fns";

export const About = () => {
    const firstDay = info.first_working_day
    const years_of_exp = (Math.floor(differenceInCalendarMonths(new Date(), firstDay) / 12)) + "+";
    return (
        <div>
            <div>
                <h3 id="about_me">About Me</h3>
                <p>
                    Software Engineer {years_of_exp} years, mostly Java. Passionate of java, jvm, performance, benchmarking, data structures, reactive streams.
                </p>

                <Contacts contacts={contacts} />

                <h3>What am I looking for:</h3>
                <p>
                    New Challenges, Product Company, full time, office || remote, maybe relocation (Ukraine[Kyiv, Dnipro], Europe)
                </p>

                <h3>Hobbies</h3>
                <p>
                    Motorcycles, Traveling, Gym, Football, Cars, Bicycles, Headphones
                </p>

            </div>
        </div>
    )
};
