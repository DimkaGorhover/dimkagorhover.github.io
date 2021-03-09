import { differenceInCalendarMonths as diffMonth, format as dateFormat } from "date-fns";

export const JANUARY = 0;
export const FEBRUARY = 1;
export const MARCH = 2;
export const APRIL = 3;
export const MAY = 4;
export const JUNE = 5;
export const JULY = 6;
export const AUGUST = 7;
export const SEPTEMBER = 8;
export const OCTOBER = 9;
export const NOVEMBER = 10;
export const DECEMBER = 11;

export const yearsOfExp = (firstDay, now = new Date()) => {
  const years = (Math.floor(diffMonth(now, firstDay) / 12))
  return `${years}+`;
}

export const prettyPeriod = ({ start, end = null }) => {
  let startStr = dateFormat(start, 'MMMM yyyy')
  let endStr;
  if (!end) {
    end = new Date();
    endStr = "present"
  } else {
    endStr = dateFormat(end, "MMMM yyyy")
  }
  let months = diffMonth(end, start) + 1
  let years = Math.floor(months / 12)
  months = Math.ceil(months - (years * 12))

  let monthsSuffix = `month${((months > 1) ? "s" : "")}`
  let yearsSuffix = `year${((years > 1) ? "s" : "")}`
  let periodStr = `${startStr} - ${endStr}`

  if (years > 0 || months > 0) {
    let durationList = []
    if (years > 0) {
      durationList.push(`${years} ${yearsSuffix}`);
    }
    if (months > 0) {
      durationList.push(`${months} ${monthsSuffix}`);
    }
    return `${periodStr} (${durationList.join(' ')})`;
  }

  return `${periodStr}`
}
