import React from 'react';
import {TechStackTextBlock} from "./TechStackTextBlock";

export const TechStack = ({techStack}) => {

    if (techStack) {
        return (
            <div>
                <h5>Stack of technologies:</h5>
                <ul>
                    <TechStackTextBlock title="Language" content={techStack.language}/>
                    <TechStackTextBlock title="Frameworks & Libs" content={techStack.frameworks}/>
                    <TechStackTextBlock title="Production env" content={techStack.prod_env}/>
                    <TechStackTextBlock title="Build Tool" content={techStack.build_tool}/>
                    <TechStackTextBlock title="CI/CD" content={techStack.ci_cd}/>
                    <TechStackTextBlock title="Storage" content={techStack.storage}/>
                    <TechStackTextBlock title="VCS" content={techStack.vcs}/>
                    <TechStackTextBlock title="Metrics System" content={techStack.metrics}/>
                </ul>
            </div>
        );
    }

    return null;
};
