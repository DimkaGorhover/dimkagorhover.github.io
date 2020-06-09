import React from 'react'
import { prettyPeriod } from '../../../../utils/CustomDateUtils'
import { AllAboutMe } from '../../../cv'

const Experience = ({ exp }) => {

    let description = exp.responsibility

    if (!Array.isArray(description))
        description = [description]

    return (
        <div>
            <h5>{exp.name}</h5>
            <p>{prettyPeriod(exp.dates)}</p>
            {description.map(d => (
                <p>{d}</p>
            ))}
        </div>
    )
}

export const MainCv = () => {

    return (
        <AllAboutMe />
    )
}