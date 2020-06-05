import React from 'react';
import { Table } from 'react-bootstrap';
import { current_skills } from '../../data/cv_data';

const Skill = ({ skill }) => {

    let { key, value } = skill

    if (!Array.isArray(value))
        value = [value]

    return (
        <tr>
            <td>{key}</td>
            <td>{value.reduce((a, b) => a + ", " + b)}</td>
        </tr>
    )
}

export const Skills = () => {

    const content = current_skills.map((s, i) => <Skill key={i} skill={s} />)

    return (
        <div>
            <h3>Current Skills</h3>
            <Table>
                <tbody>
                    {content}
                </tbody>
            </Table>
        </div>
    )
}
