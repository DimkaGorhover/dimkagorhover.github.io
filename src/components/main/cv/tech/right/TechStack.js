import React from 'react';
import { Table } from 'react-bootstrap'

const TextBlock = ({ title, content }, index) => {

    if (content || (Array.isArray(content) && content.length > 0)) {
        if (!Array.isArray(content)) {
            content = [content]
        }

        if (content.length <= 0) {
            return <></>
        }

        content = content.reduce((a, b) => `${a}, ${b}`)
        // content = content.map((line, i) => <span key={i}>{line}</span>)

        return (
            <tr key={index}>
                <td>
                    <b>{title}</b>:
                </td>
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
                <Table id={`${Math.random()}`}>
                    <tbody>
                        <TextBlock title="Language" content={techStack.language} />
                        <TextBlock title="Frameworks &amp; Libs" content={techStack.frameworks} />
                        <TextBlock title="Production env" content={techStack.prod_env} />
                        <TextBlock title="Build Tool" content={techStack.build_tool} />
                        <TextBlock title="CI/CD" content={techStack.ci_cd} />
                        <TextBlock title="Storage" content={techStack.storage} />
                        <TextBlock title="VCS" content={techStack.vcs} />
                        <TextBlock title="Metrics System" content={techStack.metrics} />
                    </tbody>
                </Table>
            </div>
        );
    }
    return null;
};
