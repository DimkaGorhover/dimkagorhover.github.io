import styles from './BlankLink.module.scss';
import PropTypes from 'prop-types';

export const BlankLink = ({ href, name, children }) => {
  return (
    <a target={'_blank'} rel={'noopener noreferrer'} href={href} className={styles.link}>
      {name || children}
    </a>
  );
};

const nameType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.object,
]);

BlankLink.propTypes = {
  href    : PropTypes.string.isRequired,
  name    : nameType,
  children: nameType,
};
