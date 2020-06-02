import React from "react";

export const ExperienceEntryTextBlock = ({ title, text }) => {
    
    if (text != null || (Array.isArray(text) && text.length > 0)) {

        if (!Array.isArray(text)) {
            text = [text]
        }

        text = text.map((text_item, index) => (
            <p key={index}>
                {text_item}
            </p>
        ))

        return (
            <div>
                <h5>{title}</h5>
                <div>{text}</div>
            </div>
        )
    }
    return null;
}
