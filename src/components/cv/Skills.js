import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { current_skills as skills } from '../../data/cv_data';
import styles from './Skills.module.scss';

const SkillTableItem = ({ name, value }) => {
  if (!Array.isArray(value)) {
    value = [value];
  }
  return (
    <tr>
      <td className={styles.name}>
        {name}
      </td>
      <td className={styles.value}>
        {value.reduce((a, b) => <>{a}{`, `}{b}</>)}
      </td>
    </tr>
  );
};

SkillTableItem.propTypes = {
  name : PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
    ])),
  ]).isRequired,
};

export const Skills = () => {
  return (
    <>
      <h3>Actual Skills</h3>
      <Table className={styles.table}>
        <tbody>
        {skills.map(({ name, value }, idx) => {
          return <SkillTableItem key={idx} name={name} value={value} />;
        })}
        </tbody>
      </Table>
    </>
  );
};
