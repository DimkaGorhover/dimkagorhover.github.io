import React from 'react'
import { info } from '../../data/cv_data'
import styles from './Languages.module.scss'

export const LanguageEntry = ({ name, level }) => (
  <>
    <span className={styles.name}>{name}</span>
    {' '}
    <span className={styles.level}>({level})</span>
  </>
);

export const Languages = () => {

  const content = info.language
    .map(LanguageEntry)
    .reduce((word0, word1) => (<>{word0}{', '}{word1}</>));

  return (
    <>
      <h4>Languages</h4>
      <p>{content}</p>
    </>
  );
};
