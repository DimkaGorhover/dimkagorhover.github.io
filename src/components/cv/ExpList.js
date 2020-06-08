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
            o = [ o ]
        }

        if (o.length > 0) {
            return o.filter((w) => w.length > 0)
                .reduce((a, b) => a + ", " + b)
        }

        return ""
    }

    const language = _toString(t.language)
    const frameworks = _toString(t.frameworks)
    const storage = _toString(t.storage)

    const content = _toString([ language, frameworks, storage ])

    return (
        <div>
            <p>
                <b>Tech Stack:</b> { content }
            </p>
        </div>
    )
}

const ShortExpItem = ({ n, name, id, dates, description, techStack }) => {

    return (
        <div>
            <hr />
            <h5 id={ id }>{ n }. { name } ({ prettyPeriod(dates) })</h5>
            <p>
                { description }
            </p>
            <ShortTechStack t={ techStack } />
        </div>
    )
}

const ShortExpList = () => {
    return (
        <div>
            { experiences.map((exp, i) => {

                if (exp.excess) {
                    return <></>
                }

                let newExp = { ...exp, n: (i + 1) }
                return (
                    <ShortExpItem key={ i } { ...newExp } />
                )
            }) }
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
            { short ? <ShortExpList /> : <BigExpList /> }
        </div>
    )
}
