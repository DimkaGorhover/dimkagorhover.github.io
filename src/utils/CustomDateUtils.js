import {
    differenceInCalendarMonths as diffMonth,
    format as dateFormat
} from "date-fns";

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
    let durationStr = ''
    if (years > 0) {
        durationStr = `${years} ${yearsSuffix} `
    }
    durationStr = `${durationStr}${months} ${monthsSuffix}`

    return `${periodStr} (${durationStr})`
}
