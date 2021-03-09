import { experiences } from '../../data/cv_data';
import { ExpTitle } from './ExpTitle'
import { Noop } from '../commons/Noop';
import { ExpPeriod } from './ExpPeriod';
import Strings from "../../common/strings";
import styles from './ShortExpList.module.scss'

const ShortTechStack = ({ data }) => {
  if (!data) {
    return <Noop/>;
  }
  const content = Strings.join([
    Strings.join(data.language),
    Strings.join(data.frameworks),
    Strings.join(data.storage),
    Strings.join(data.metrics),
  ])
  return (
    <p>
      <b>Tech Stack:</b> {content}
    </p>
  );
};

const ShortExpItem = (props) => {
  const { city, id, dates, description, techStack } = props
  return (
    <div id={id}>
      <hr/>
      <ExpTitle {...props} />
      <p>
        <ExpPeriod dates={dates}/>
        {' | '}
        <span className={styles.location}>({city})</span>
      </p>
      {description.map((text, index) => <p key={index}>{text}</p>)}
      <ShortTechStack data={techStack}/>
    </div>
  );
};

export const ShortExpList = () => {
  return (
    <div className={"exp_list"}>
      {experiences.filter(exp => !exp.excess).map((exp, index) => {
        let newExp = { ...exp, n: (index + 1) }
        return (<ShortExpItem key={index} {...newExp} />)
      })}
    </div>
  );
};
