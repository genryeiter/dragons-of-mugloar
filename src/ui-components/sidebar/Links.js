import React from "react";
import {ListItem} from "@mui/material";
import {NavLink} from "react-router-dom";

export const Links = ({ links }) => (
    <ul>
        {links.map((link) => {
            return (
                <ListItem
                key={link.url}
                button
                className={'li'}
                component={NavLink}
                to={link.url}
                activeClassName='active'
                >
                    <div>
                    <link.icon />
                    {link.text}
                    </div>
                </ListItem>
                // <li className={link.active ? "active" : ""}>
                //     <a href={link.url}>
                //         <link.icon />
                //         {link.text}
                //     </a>
                // </li>
            );
        })}
    </ul>
)