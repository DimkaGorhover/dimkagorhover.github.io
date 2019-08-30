import React from "react";

export const TechStackTextBlock = ({title, content}) => {
    if (content) {
        return <li><b>{title}</b>: {content}</li>
    }
    return null;
};
