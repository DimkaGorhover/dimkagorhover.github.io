import React from "react";

export const ExperienceEntryTextBlock = ({title, text}) => {
    if (text) {
        return (
            <div>
                <h5>{title}</h5>
                <p>{text}</p>
            </div>
        )
    }
    return null;
};