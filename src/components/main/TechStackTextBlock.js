import React from "react";

export const TechStackTextBlock = ({ title, content, expIndex }) => {
    if (content) {

        const key = (expIndex + "_" + title)
            .replace(' ', '_')
            .replace('.', '_')
            .replace('/', '_')
            .toLowerCase()

        return (
            <li key={key} className='tech-stack'>
                <b>{title}</b>: {content}
            </li>
        )
    }
    return null;
};
