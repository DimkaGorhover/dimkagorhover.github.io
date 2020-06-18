import React from 'react';
import { Table } from 'react-bootstrap';
import { current_skills as skills } from '../../data/cv_data';
import './skills.scss'

const Skill = ({ name, value }) => {

    if (!(name && value)) {
        return (<></>)
    }

    if (!Array.isArray(value))
        value = [value]

    const content = value.reduce((a, b) => (<>{a}{", "}{b}</>))

    return (
        <tr>
            <td className={"name"}>{name}</td>
            <td className={"value"}>{content}</td>
        </tr>
    )
}

export const Skills = () => {

    return (
        <div>

            <h3>Actual Skills</h3>

            <Table className={"cv_actual_skills"}>
                <tbody>
                    {skills.map((s, i) => (<Skill key={i} {...s} />))}
                </tbody>
            </Table>

        </div>
    )
}
