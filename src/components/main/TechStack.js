import React from 'react';
import {TechStackTextBlock} from "./TechStackTextBlock";

export const TechStack = ({techStack, expIndex}) => {

    if (techStack) {
        return (
            <div>
                <h5>Stack of technologies:</h5>
                <ul>
                    <TechStackTextBlock expIndex={expIndex} title="Language" content={techStack.language}/>
                    <TechStackTextBlock expIndex={expIndex} title="Frameworks &amp; Libs" content={techStack.frameworks}/>
                    <TechStackTextBlock expIndex={expIndex} title="Production env" content={techStack.prod_env}/>
                    <TechStackTextBlock expIndex={expIndex} title="Build Tool" content={techStack.build_tool}/>
                    <TechStackTextBlock expIndex={expIndex} title="CI/CD" content={techStack.ci_cd}/>
                    <TechStackTextBlock expIndex={expIndex} title="Storage" content={techStack.storage}/>
                    <TechStackTextBlock expIndex={expIndex} title="VCS" content={techStack.vcs}/>
                    <TechStackTextBlock expIndex={expIndex} title="Metrics System" content={techStack.metrics}/>
                </ul>
            </div>
        );
    }

    return null;
};
