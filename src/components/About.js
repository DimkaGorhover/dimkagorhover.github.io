import React, {Component} from 'react';
import moment from "moment"; // TODO: replace moment.js by date-fns (https://date-fns.org)
import {Contacts} from "./Contacts";
import {contacts} from "../cv_data";

export default class About extends Component {

    render() {
        const currentTime = moment();
        const firstDay = moment([2012, 2-1, 28]);
        const years_of_exp = (currentTime.diff(firstDay, 'years')) + "+";
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
                        New Challenges, Product Company, full time, office || remote, maybe relocation (Ukraine[Kyiv, Lviv, Dnipro], Europe)
                    </p>

                    <h3>Hobbies</h3>
                    <p>
                        Motorcycles, Traveling, Gym, Football, Cars, Bicycles, Headphones
                    </p>

                </div>
            </div>
        )
    }
}
