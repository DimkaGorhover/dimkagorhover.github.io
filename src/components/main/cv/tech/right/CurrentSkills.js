import React from 'react';
import { Table } from 'react-bootstrap';
import { current_skills } from '../../../../../data/cv_data';

export const CurrentSkills = () => {

    const content = current_skills.map(({ key, value }, skill_index) => {

        if (Array.isArray(value)) {
            if (value.length > 0) {
                // value = value.reduce((a, b) => a + ", " + b)
                value = value.map((line, value_index) => (
                    <div key={value_index}>{line}</div>
                ))
            } else {
                value = ""
            }
        }

        return (
            <tr key={skill_index}>
                <td>{key}</td>
                <td>{value}</td>
            </tr>
        )
    })

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
