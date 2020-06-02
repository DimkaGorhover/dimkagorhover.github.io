import { differenceInCalendarMonths, format } from "date-fns";

export const yearsOfExp = (firstDay) => {
    const years = (Math.floor(differenceInCalendarMonths(new Date(), firstDay) / 12))
    return `${years}+`;
}

export const prettyPeriod = ({ start, end }) => {
    let startStr = format(start, 'MMMM yyyy')
    let endStr;
    if (!end) {
        end = new Date();
        endStr = "present"
    } else {
        endStr = format(end, "MMMM yyyy")
    }
    let months = differenceInCalendarMonths(end, start) + 1
    let years = Math.floor(months / 12)
    months = Math.ceil(months - (years * 12))

    let monthsSuffix = 'month' + ((months > 1) ? "s" : "")
    let yearsSuffix = 'year' + ((years > 1) ? "s" : "")
    let periodStr = `${startStr} - ${endStr}`
    let durationStr = ''
    if (years > 0) {
        durationStr = `${years} ${yearsSuffix} `
    }
    durationStr = `${durationStr}${months} ${monthsSuffix}`

    return `${periodStr} (${durationStr})`
};
