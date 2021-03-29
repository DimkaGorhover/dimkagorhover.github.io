import React from 'react';
import * as Icons from '../icons';
import { BlankLink } from '../common';
import PropTypes from 'prop-types';

Java.propTypes = {
  title: PropTypes.string,
};

export function Java({ title = 'Java' }) {
  return (
    <BlankLink href={'https://java.com'}>
      <Icons.Java />{' '}{title}
    </BlankLink>
  );
}
