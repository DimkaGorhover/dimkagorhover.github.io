import React from "react";
import { TechStack } from "./TechStack";
import { InnerExperiences } from "./InnerExperiences";
import { ExperienceLinks } from "./ExperienceLinks";
import { ExpPeriod } from "../ExpPeriod";
import { ExpTitle } from "../ExpTitle";

const TextBlock = ({ title, text }) => {

  if ((typeof text == 'string' && text.length > 0)
    || (Array.isArray(text) && text.length > 0)) {

    if (!Array.isArray(text)) {
      text = [text]
    }

    text = text.map((text_item, i) => <p key={i}>{text_item}</p>)

    return (
      <div>
        <h5>{title}</h5>
        <div>{text}</div>
      </div>
    )
  }
  return null;
}

// const ExperienceTitle = (props) => {

//     let { index, id, name, position, company, city, dates } = props

//     id = id ? id : ("" + Math.random())

//     return (<ExpTitle {...props} />)
// }

export const ExperienceEntry = ({ experience: exp, indexSuffix, index }) => {

  if (indexSuffix)
    index = indexSuffix + '.' + index

  exp = { index: index, ...exp }

  return (
    <div>
      <hr style={{ margin: "2rem 0" }}/>

      <ExpTitle {...exp} />
      <ExpPeriod dates={exp.dates}/>
      {` | ${exp.city}`}

      <TextBlock title="Description" text={exp.description}/>
      <TextBlock title="Responsibility" text={exp.responsibility}/>
      <TextBlock title="Achievements" text={exp.achievements}/>
      <TextBlock title="Current State" text={exp.currentState}/>
      <TechStack expIndex={index} techStack={exp.techStack}/>
      <ExperienceLinks links={exp.links}/>
      <InnerExperiences experiences={exp.inner} indexSuffix={index}/>
    </div>
  )
}
