import React from "react";

export const TechStackTextBlock = ({ title, content, expIndex }, index) => {
    if (content || (Array.isArray(content) && content.length > 0)) {

        if (!Array.isArray(content))
            content = [content]

        content = content.map((line, line_index) => (
            <div key={line_index}>{line}</div>
        ))

        return (
            <tr key={index}>
                <td>
                    <b>{title}</b>:
                </td>
                <td>
                    {content}
                </td>
            </tr>
        )
    }
    return null;
};
