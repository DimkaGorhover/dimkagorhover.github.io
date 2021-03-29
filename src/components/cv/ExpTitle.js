import { BlankLink } from '../common';
import styles from './ExpTitle.module.scss';
import PropTypes from 'prop-types';
import { Company } from '../../data/types';

export const ExpTitleText = ({ index, name, position, company }) => {
  index = index ? (`${index}. `) : ('');
  if (position && company) {
    return (
      <>
        {index}
        {position}
        {' @ '}
        <span className={styles.company}>
          <BlankLink name={company.name} href={company.link} />
        </span>
      </>);
  }

  return `${index}${name}`;
};

export const ExpTitle = (props) => {
  return (
    <h4 className={styles.title}>
      <ExpTitleText {...props} />
    </h4>
  );
};

ExpTitle.propTypes = {
  position: PropTypes.string.isRequired,
  company : Company,
};
