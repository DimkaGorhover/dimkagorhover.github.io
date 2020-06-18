import React from "react";
import { Nav } from "react-bootstrap";
import { IconContext } from "react-icons";
import { github, mail, skype, telegram } from "../../data/contacts";

const SocialItem = ({ link, icon, target = "_blank" }) => {
    return (
        <Nav.Link href={link} target={target}>{icon}</Nav.Link>
    )
}

export const SocialPanel = ({ iconsSize = '1.6em' }) => {

    const panelContacts = [
        telegram,
        github,
        mail,
        skype
    ]

    const content = panelContacts.map((contact, i) => (<SocialItem key={i} {...contact} />))

    return (
        <IconContext.Provider value={{ size: iconsSize }}>
            {content}
        </IconContext.Provider>
    )
}
