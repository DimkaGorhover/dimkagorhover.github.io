import React from 'react'
import { info } from '../../data/cv_data'
import './languages.scss'

const LanguageEntry = ({ name, level }) => {
    return (<>
        <span className={"name"}>{name}</span>
        {' '}
        <span className={"level"}>({level})</span>
    </>)
}

export const Languages = () => {

    let content = info.language
        .map(LanguageEntry)
        .reduce((word0, word1) => (<>{word0}{', '}{word1}</>))

    return (
        <div className={"languages"}>
            <h4>Languages</h4>
            <p>{content}</p>
        </div>
    )
}
