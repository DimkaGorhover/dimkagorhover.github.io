import React from 'react';
import { experiences } from '../../../cv_data';
import { prettyPeriod } from '../../../utils/CustomDateUtils';

export const TableOfContent = () => {

    const mapperFn = (exp, index) => {
        const { name, id, dates, showDates, inner } = exp

        let period

        if (!(showDates == false)) {
            period = (
                <span style={{ color: "#555" }}>
                    {` (${prettyPeriod(dates)})`}
                </span>
            )
        }

        return (
            <li key={index}>
                <span style={{ color: "#222" }}>
                    <a href={'#' + id}>{`${index + 1}. ${name}`}</a>
                    {period}
                </span>
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

    return (
        <div>
            <h4>Table Of Contents</h4>
            {content({ exps: experiences })}
        </div>
    )
};
