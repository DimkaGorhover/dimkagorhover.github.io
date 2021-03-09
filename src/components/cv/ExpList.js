import React from 'react';
import { ShortExpList } from './ShortExpList';

const BigExpList = () => {
  return (
    <div>
      <h3>ExpList</h3>
    </div>
  )
};

export const ExpList = ({ short = true }) => {
  return (
    <div>
      <h3>Experience</h3>
      {short ? <ShortExpList/> : <BigExpList/>}
    </div>
  )
};
