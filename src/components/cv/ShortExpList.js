import React from 'react'
import { experiences } from '../../data/cv_data';
import { ExpTitle } from './ExpTitle'
import { Noop } from '../commons/Noop';
import { ExpPeriod } from './ExpPeriod';

const ShortTechStack = ({ t }) => {

    if (!t) {
        return (<Noop />)
    }

    const _toString = (o) => {
        if (!o) {
            return ""
        }

        if (!Array.isArray(o)) {
            o = [o]
        }

        if (o.length > 0) {
            return o
                .filter((word) => word.length > 0)
                .reduce((word0, word1) => `${word0}, ${word1}`)
        }

        return ""
    }

    const content = _toString([
        _toString(t.language),
        _toString(t.frameworks),
        _toString(t.storage)
    ])

    return (
        <p>
            <b>Tech Stack:</b> {content}
        </p>
    )
}

const ShortExpItem = (props) => {

    let { city, id, dates, description, techStack } = props

    return (
        <div className={"item"} id={id}>
            <hr />
            <ExpTitle {...props} />
            <p>
                <ExpPeriod dates={dates} />
                {' | '}
                <span className={"location"}>({city})</span>
            </p>
            <p>
                {description}
            </p>
            <ShortTechStack t={techStack} />
        </div>
    )
}

export const ShortExpList = () => {
    return (
        <div className={"exp_list short_exp_list"}>
            {experiences.map((exp, i) => {

                if (exp.excess) {
                    return (<Noop key={i} />)
                }

                let newExp = { ...exp, n: (i + 1) }
                return (<ShortExpItem key={i} {...newExp} />)
            })}
        </div>
    )
}
