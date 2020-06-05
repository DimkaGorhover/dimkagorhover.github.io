import React from 'react';
import { education } from '../../data/cv_data';

const Item = ({ exp }) => {

    let { name, degree, dates } = exp

    const { start, end } = dates

    return (
        <li>
            <strong>{name}</strong>
            <p style={{ margin: 0 }}>
                {start.getFullYear()} - {end.getFullYear()}
            </p>
            {degree ? (<p style={{ margin: 0 }}>{degree.name}, {degree.subject}</p>) : (<></>)}
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
