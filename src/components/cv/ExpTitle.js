import { BlankLink } from '../commons/BlankLink';
import styles from './ExpTitle.module.scss'

export const ExpTitleText = ({ index, name, position, company }) => {
  index = index ? (`${index}. `) : ("")
  if (position && company) {
    return (
      <>
        {index}
        {position}
        {' @ '}

        <span className={styles.company}>
          <BlankLink
            name={company.name}
            href={company.link}/>
        </span>
      </>)
  }

  return `${index}${name}`
}

export const ExpTitle = (props) => {

  let { name, position, company } = props

  if (position && company) {
    return (
      <h4 className={"title"}>
        <ExpTitleText {...props} />
      </h4>
    )
  } else {

    // TODO: remove it
    console.log("WARNING: field [exp.name] is deprecated")

    return <h5 className={"title"}>{name}</h5>
  }
}
