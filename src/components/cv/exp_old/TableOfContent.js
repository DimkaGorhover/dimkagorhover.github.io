import React from 'react';
import { experiences } from '../../../data/cv_data';
import { ExpPeriod } from '../../cv/ExpPeriod';
import { ExpTitleText } from '../../cv/ExpTitle';

// FIXME: LINKS DON'T WORK HERE BECAUSE react-router
const mapperFn = (exp, index) => {

    exp = { index: (index + 1), ...exp }
    const { id, dates, showDates, inner } = exp

    return (
        <li key={index}>
            <a href={'#' + id}>
                <ExpTitleText {...exp} />
            </a>

            {(!(showDates === false)) && (
                <>
                    {` (`}<ExpPeriod dates={dates} />{`)`}
                </>
            )}

            {inner && content({ exps: inner })}
        </li>
    )
}

const content = ({ exps }) => {
    return (
        <ul style={{ listStyle: 'none' }}>
            {exps.map(mapperFn)}
        </ul>
    )
}

export const TableOfContent = () => {

    return (
        <div>
            <h4>Table Of Contents</h4>
            {content({ exps: experiences })}
        </div>
    )
}
