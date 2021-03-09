import { prettyPeriod } from '../../common/dates'

export const ExpPeriod = ({ dates }) => {
  return (
    <span>
      {prettyPeriod(dates)}
    </span>
  );
};
