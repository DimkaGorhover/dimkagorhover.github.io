import React from 'react';
import * as Icons from '../icons';
import { BlankLink } from '../common';
import PropTypes from 'prop-types';

Kafka.propTypes = {
  title: PropTypes.string,
};

export function Kafka({ title = 'Kafka' }) {
  return (
    <BlankLink href={'https://kafka.apache.org/'}>
      <Icons.Kafka />{' '}{title}
    </BlankLink>
  );
}
