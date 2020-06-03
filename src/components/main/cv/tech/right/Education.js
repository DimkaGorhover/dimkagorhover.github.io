import React from 'react';
import { education } from '../../../../../cv_data';

export const Education = () => {

    let eduText = education.map(({ name, degree, dates }) => {
        let degreeText

        if (degree) {
            degreeText = (<p style={{ margin: 0}}>{degree.name}, {degree.subject}</p>)
        }

        return (
            <li>
                <strong>{name}</strong>
                <p style={{ margin: 0}}>{dates.start.getFullYear()} - {dates.end.getFullYear()}</p>
                {degreeText}
            </li>
        )
    })

    return (
        <div>
            <h3>Education</h3>
            <ul>
                {eduText}
            </ul>
        </div>
    )
}
