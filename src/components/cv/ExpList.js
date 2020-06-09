import React from 'react';
import { experiences } from '../../data/cv_data';
import { prettyPeriod } from '../../utils/CustomDateUtils';

const ShortTechStack = ({ t }) => {

    if (!t) {
        return (<></>)
    }

    const _toString = (o) => {
        if (!o) {
            return ""
        }

        if (!Array.isArray(o)) {
            o = [o]
        }

        if (o.length > 0) {
            return o.filter((w) => w.length > 0)
                .reduce((a, b) => a + ", " + b)
        }

        return ""
    }

    const content = _toString([
        _toString(t.language),
        _toString(t.frameworks),
        _toString(t.storage)
    ])

    return (
        <div>
            <p>
                <b>Tech Stack:</b> {content}
            </p>
        </div>
    )
}

const ShortExpItem = ({ n, name, id, dates, description, techStack }) => {

    let title = (
        <div id={id}>
            <h5>{name}</h5>
            <p>
                <b>{prettyPeriod(dates)}</b>
            </p>
        </div>
    )

    return (
        <div>
            <hr />
            {title}
            <p>{description}</p>
            <ShortTechStack t={techStack} />
        </div>
    )
}

const Noop = () => <></>

const ShortExpList = () => {
    return (
        <div>
            {experiences.map((exp, i) => {

                if (exp.excess) {
                    return <Noop key={i} />
                }

                let newExp = { ...exp, n: (i + 1) }
                return (
                    <ShortExpItem key={i} {...newExp} />
                )
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
