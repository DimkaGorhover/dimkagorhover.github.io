import React from 'react'
import { info } from '../../data/cv_data'

export const Languages = () => {

    let content = info.language
        .map(({ name, level }) => (`${ name } (${ level })`))
        .reduce((word0, word1) => (`${ word0 }, ${ word1 }`))

    return (
        <div>
            <h4>Languages</h4>
            <p>
                { content }
            </p>
        </div>
    )
}
