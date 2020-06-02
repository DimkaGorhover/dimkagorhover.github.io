import React from 'react';
import { Contacts } from "./Contacts";
import { contacts, info } from "../../../cv_data";
import { yearsOfExp } from '../../../utils/CustomDateUtils';

export const About = () => {
    return (
        <div>
            <div>
                <div>
                    <h4 id="about_me">
                        About Me
                    </h4>
                    <p>
                        Software Engineer {yearsOfExp(info.first_working_day)} years, mostly Java.
                    </p>
                    <p>
                        Passionate of java, jvm, performance, benchmarking, data structures, reactive streams.
                    </p>
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
