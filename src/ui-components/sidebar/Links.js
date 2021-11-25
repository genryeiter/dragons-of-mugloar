import React from 'react'
import { ListItem } from '@mui/material'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

import { useRouteMatch } from 'react-router'

export const Links = ({ links }) => {
  return (<ul>
        {links.map((link) => {
          const match = useRouteMatch(link)

          return (
                <ListItem
                    key={link.url}
                    button
                    className={match?.isExact ? 'active' : ''}
                    component={NavLink}
                    to={link.url}
                    activeClassName='active'
                >
                    <div>
                        <link.icon />
                        {link.text}
                    </div>
                </ListItem>
          )
        })}
    </ul>)
}

Links.propTypes = {
  links: PropTypes.node.isRequired
}
