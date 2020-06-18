import React from 'react';
import { education } from '../../data/cv_data';
import { BlankLink } from '../commons/BlankLink';
import './education.scss'

const Name = ({ name, link }) => {

    if (link) {
        name = (<BlankLink name={name} href={link} />)
    }

    return (<span className={"name"}>{name}</span>)
}

const Degree = ({ name, subject }) => {
    return (
        <div>
            <span>Degree: {name}, {subject}</span>
        </div>
    )
}

const Item = ({ education }) => {

    let { degree, dates, paper } = education

    const { start, end } = dates

    return (
        <div className={"education"}>
            <div>
                <Name {...education} />
            </div>
            <div>
                <span>{start.getFullYear()} - {end.getFullYear()}</span>
            </div>
            {degree && <Degree {...degree} />}
            {paper && (<div>
                Paper: {paper}
            </div>)}
        </div>
    )
}

export const Education = () => {

    return (
        <div>
            <h3>Education</h3>
            <ul>
                {education.map((e, index) => (
                    <li key={index}>
                        <Item education={e} />
                    </li>
                ))}
            </ul>
        </div>
    )
}
