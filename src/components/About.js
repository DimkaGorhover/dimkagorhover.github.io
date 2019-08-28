import React, {Component} from 'react';
import moment from "moment";
import Contacts from "./Contacts";
import cv_data from "../cv_data";
import Container from 'react-bootstrap/Container';

class About extends Component {

    render() {
        const years_of_exp = (moment().diff(moment([2012, 2, 28]), 'years')) + "+";
        return (
            <div>
                <div>
                    <h3 id="about_me">About Me</h3>
                    <p>
                        Software Engineer {years_of_exp} years, mostly Java. Passionate of java, jvm, performance, benchmarking, data structures, reactive streams.
                    </p>

                    <Contacts contacts={cv_data.contacts} />

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

export default About
