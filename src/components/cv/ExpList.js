import React from 'react';
import { experiences } from '../../data/cv_data';
import { prettyPeriod } from '../../utils/CustomDateUtils';

const ShortTeckStack = ({ t }) => {

    if (!t)
        return (<></>)

    let language = (Array.isArray(t.language) ? t.language : [t.language]).reduce((a, b) => a + ", " + b)
    let frameworks = (Array.isArray(t.frameworks) ? t.frameworks : [t.frameworks]).reduce((a, b) => a + ", " + b)

    return (
        <div>
            {language}, {frameworks}
        </div>
    )
}

const ShortExpItem = ({ n, name, id, dates, description, techStack }) => {

    return (
        <div>
            <hr />
            <h5 id={id}>{n}. {name} ({prettyPeriod(dates)})</h5>
            <p>
                {description}
            </p>
            <ShortTeckStack t={techStack} />
        </div>
    )
}

const ShortExpList = () => {
    return (
        <div>
            {experiences.map((exp, i) => {
                let newExp = { ...exp, n: i + 1 }
                return (<ShortExpItem key={i} {...newExp} />)
            })}
        </div>
    )
}

const BigExpList = () => {
    return (
        <div>
            <h3>ExpList</h3>
        </div>
    )
}

export const ExpList = ({ short = true }) => {
    return (
        <div>
            <h3>Experience</h3>
            {short ? <ShortExpList /> : <BigExpList />}
        </div>
    )
}
