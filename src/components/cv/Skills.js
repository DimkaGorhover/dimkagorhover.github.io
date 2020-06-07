import React from 'react';
import { Table } from 'react-bootstrap';
import { current_skills as skills } from '../../data/cv_data';

const Skill = ({ key, value }) => {

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

    return (
        <div>
            <h3>Actual Skills</h3>
            <Table>
                <tbody>
                    {skills.map((s, i) => <Skill key={i} {...s} />)}
                </tbody>
            </Table>
        </div>
    )
}
