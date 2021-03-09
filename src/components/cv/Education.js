import React from 'react';
import { education } from '../../data/cv_data';
import { BlankLink } from '../commons/BlankLink';
import styles from './Education.module.scss'

const Name = ({ name, link }) => {
  if (link) {
    name = (<BlankLink name={name} href={link}/>)
  }
  return (<span className={styles.name}>{name}</span>)
}

const Degree = ({ name, subject }) => (
  <div>
    <span>Degree: {name}, {subject}</span>
  </div>
);

const Item = ({ education }) => {
  const { degree, dates, paper } = education
  const { start, end } = dates
  return (
    <div className={styles.education}>
      <div>
        <Name {...education} />
      </div>
      <div>
        <span>{start.getFullYear()} - {end.getFullYear()}</span>
      </div>
      {degree && <Degree {...degree} />}
      {paper && (<div>Paper: {paper}</div>)}
    </div>
  );
};

export const Education = () => (
  <>
    <h3>Education</h3>
    <ul>
      {education.map((e, index) => (
        <li key={index}>
          <Item education={e}/>
        </li>
      ))}
    </ul>
  </>
);
