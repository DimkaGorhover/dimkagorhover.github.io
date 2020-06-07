import React from 'react'
import { info } from '../../data/cv_data'

export const Languages = () => {

    let contnet = info.language
        .map(({ name, level }) => (`${name} (${level})`))
        .reduce((a, b) => (`${a}, ${b}`))


    return (
        <div>
            <h4>Languages</h4>
            {contnet}
        </div>
    )
}