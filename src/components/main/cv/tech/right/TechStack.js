import React from 'react';
import { Table } from 'react-bootstrap'

const techStackId = `${Math.random()}`

const TextBlock = ({ title, content, expIndex }, index) => {
    if (content || (Array.isArray(content) && content.length > 0)) {
        if (!Array.isArray(content))
            content = [content]
        content = content.map((line, line_index) => <div key={line_index}>{line}</div>)
        return (
            <tr key={index}>
                <td><b>{title}</b>:</td>
                <td>{content}</td>
            </tr>
        )
    }
    return null;
}

export const TechStack = ({ techStack, expIndex }) => {
    if (techStack) {
        return (
            <div>
                <h5>Stack of technologies</h5>
                <Table id={techStackId}>
                    <tbody>
                        <TextBlock expIndex={expIndex} title="Language" content={techStack.language} />
                        <TextBlock expIndex={expIndex} title="Frameworks &amp; Libs" content={techStack.frameworks} />
                        <TextBlock expIndex={expIndex} title="Production env" content={techStack.prod_env} />
                        <TextBlock expIndex={expIndex} title="Build Tool" content={techStack.build_tool} />
                        <TextBlock expIndex={expIndex} title="CI/CD" content={techStack.ci_cd} />
                        <TextBlock expIndex={expIndex} title="Storage" content={techStack.storage} />
                        <TextBlock expIndex={expIndex} title="VCS" content={techStack.vcs} />
                        <TextBlock expIndex={expIndex} title="Metrics System" content={techStack.metrics} />
                    </tbody>
                </Table>
            </div>
        );
    }
    return null;
};
