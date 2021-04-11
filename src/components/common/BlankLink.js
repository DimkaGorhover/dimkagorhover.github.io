import styles from './BlankLink.module.scss';
import PropTypes from 'prop-types';

export const BlankLink = ({ href, name, children }) => {
  return (
    <a target={'_blank'} rel={'noopener noreferrer'} href={href} className={styles.link}>
      {children || name}
    </a>
  );
};

BlankLink.propTypes = {
  href    : PropTypes.string.isRequired,
  name    : PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
};
