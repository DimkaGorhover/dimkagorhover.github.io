import React from 'react';
import { ShortExpList } from './ShortExpList';

const BigExpList = () => {
  return (
    <>
      <h3>ExpList</h3>
    </>
  );
};

export const ExpList = ({ short = true }) => {
  return (
    <>
      <h3>Experience</h3>
      {short ? <ShortExpList /> : <BigExpList />}
    </>
  );
};
