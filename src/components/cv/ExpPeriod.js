import React from 'react'
import { prettyPeriod } from '../../utils/CustomDateUtils'

export const ExpPeriod = ({ dates }) => {

    return (
        <span className={"exp_period"}>
            {prettyPeriod(dates)}
        </span>
    )
}
