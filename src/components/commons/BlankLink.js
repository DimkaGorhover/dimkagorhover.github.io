import styles from './BlankLink.module.scss';
import PropTypes from 'prop-types';

export const BlankLink = ({ href, name }) => {
  if (href) {
    return (
      <a target={'_blank'} rel={'noopener noreferrer'} href={href} className={styles.link}>
        {name}
      </a>
    );
  }

  return <>{name}</>;
};

BlankLink.propTypes = {
  href: PropTypes.string,
  name: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
};

