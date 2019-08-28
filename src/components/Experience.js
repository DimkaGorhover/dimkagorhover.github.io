import React, {Component} from 'react';
import cv_data from "../cv_data";
import TechStack from "./TechStack";
import moment from "moment";

function pretty_period(dates) {
    let {start, end} = dates;
    let startStr = start.format("MMMM YYYY");
    let endStr;
    if (!end) {
        end = moment();
        endStr = "present"
    } else {
        endStr = end.format("MMMM YYYY")
    }
    const duration = end.diff(start, 'months');
    const years = Math.floor(duration / 12.0);
    const months = Math.trunc(duration % 12.0) + 1;
    let d = months + " " + ((months === 1) ? "month" : "months");
    if (years > 1) {
        d = years + " years " + d;
    } else if (years > 0) {
        d = years + " year " + d;
    }
    return startStr + " - " + endStr + " (" + d + ")";
}

function ExperienceEntryText(title, value) {
    return value && (
        <div>
            <h5>{title}</h5>
            <p>{value}</p>
        </div>
    )
}

function ExperienceEntry(props) {

    let {
        entry, indexSuffix, index
    } = props;

    let {
        name, description, responsibility, city, tech_stack,
        dates, inner, achievements, current_state
    } = entry;

    description = ExperienceEntryText("Description", description);
    responsibility = ExperienceEntryText("Responsibility", responsibility);
    achievements = ExperienceEntryText("Achievements", achievements);
    current_state = ExperienceEntryText("Current State", current_state);

    let innerExp;
    if (inner) {
        const nextIndexSuffix = indexSuffix + "." + index;
        innerExp = inner.map(function (innerValue, innerIndex, innerArray) {
            return ExperienceEntry({
                indexSuffix: nextIndexSuffix,
                index: innerIndex + 1,
                entry: innerValue
            });
        });
        innerExp = (<div>{innerExp}</div>)
    }

    tech_stack = tech_stack && (<TechStack tech_stack={tech_stack}/>);

    return (
        <div>
            <h3>{indexSuffix}.{index}. {name} ({city}, {pretty_period(dates)})</h3>
            {description}
            {responsibility}
            {tech_stack}
            {innerExp}
            {achievements}
            {current_state}
        </div>
    )
}

export default class Experience extends Component {

    render() {

        const experience = cv_data.experience.map(function (currentValue, index, array) {
            return ExperienceEntry({
                indexSuffix: "2",
                index: index + 1,
                entry: currentValue
            });
        });


        return (
            <div>
                <h2>Experience:</h2>
                {experience}
            </div>
        )
    }
}