import { experiences } from '../../data/cv_data';
import { ExpTitle } from './ExpTitle';
import { Noop } from '../common/Noop';
import { ExpPeriod } from './ExpPeriod';
import Strings from '../../common/strings';
import styles from './ShortExpList.module.scss';
import { Experience } from '../../data/types';

const ShortTechStack = ({ data }) => {
  if (!data) {
    return <Noop />;
  }
  const content = Strings.join([
    Strings.join(data.language),
    Strings.join(data.frameworks),
    Strings.join(data.storage),
    Strings.join(data.metrics),
  ]);
  return (
    <>
      <b>Tech Stack:</b> {content}
    </>
  );
};

const ShortExpItemDescription = ({ data }) => {
  if (!data) {
    return <Noop />;
  }
  return (
    <>
      {data.map((text, i) => <p key={i}>{text}</p>)}
    </>
  );
};

const ShortExpItem = ({ data }) => {
  const { dates, description, techStack } = data;
  const { city, country } = data.location;
  return (
    <>
      <ExpTitle {...data} />
      <p>
        <ExpPeriod dates={dates} />
        {' | '}
        <span className={styles.location}>
          ({city}, {country})
        </span>
      </p>

      <ShortExpItemDescription data={description} />
      <ShortTechStack data={techStack} />
    </>
  );
};

ShortExpItem.propTypes = {
  data: Experience,
};

export const ShortExpList = () => {
  return (
    <>
      {experiences
        .filter(exp => !exp.excess)
        .map((exp, i) => {
          return <ShortExpItem key={i} data={({ index: i + 1, ...exp })} />;
        })
        .reduce((exp0, exp1) => {
          return (<>
            {exp0}
            <hr />
            {exp1}
          </>);
        })}
    </>
  );
};
