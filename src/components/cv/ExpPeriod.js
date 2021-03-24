import { prettyPeriod } from '../../common/dates'

export const ExpPeriod = ({ dates }) => {
  return (
    <>
      {prettyPeriod(dates)}
    </>
  );
};
