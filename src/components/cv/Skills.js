import React from 'react';
import { Table } from 'react-bootstrap';
import { current_skills as skills } from '../../data/cv_data';
import styles from './Skills.module.scss'
import { Noop } from "../commons/Noop";

const Skill = ({ name, value }) => {

  if (!(name && value)) {
    return <Noop/>
  }

  if (!Array.isArray(value)) {
    value = [value]
  }

  const content = value.reduce((a, b) => (<>{a}{`, `}{b}</>))

  return (
    <tr>
      <td className={styles.name}>
        {name}
      </td>
      <td className={styles.value}>
        {content}
      </td>
    </tr>
  );
};

export const Skills = () => {
  return (
    <>
      <h3>Actual Skills</h3>

      <Table className={styles.table}>
        <tbody>
        {skills.map((skill, index) => (<Skill key={index} {...skill} />))}
        </tbody>
      </Table>

    </>
  );
};
