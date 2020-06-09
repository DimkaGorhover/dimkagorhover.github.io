import React from 'react';
import { education } from '../../data/cv_data';

const Item = ({ exp }) => {

    let { name, degree, dates, paper } = exp

    const { start, end } = dates

    return (
        <li>
            <strong>{name}</strong>
            <div>{start.getFullYear()} - {end.getFullYear()}</div>
            {degree
                ? (<div>Degree: {degree.name}, {degree.subject}</div>)
                : (<></>)}
            {paper
                ? (<div>Paper: {paper}</div>)
                : (<></>)}
        </li>
    )
}

export const Education = () => {

    return (
        <div>
            <h3>Education</h3>
            <ul>
                {education.map((e, index) => <Item key={index} exp={e} />)}
            </ul>
        </div>
    )
}
