import React, { Fragment } from 'react'
import { ListItem } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { useRouteMatch } from 'react-router'
import { BiTask, FiShoppingBag, IoMdInformationCircleOutline } from 'react-icons/all'
import { ROUTE_DASHBOARD } from '../../routing/routes'

export const Links = () => {
  const links = [
    {
      text: 'Tasks List',
      icon: BiTask,
      url: `${ROUTE_DASHBOARD}/tasks`,
      active: true
    },
    {
      text: 'Shop',
      icon: FiShoppingBag,
      url: `${ROUTE_DASHBOARD}/shop`
    },
    {
      text: 'Full Data',
      icon: IoMdInformationCircleOutline,
      url: `${ROUTE_DASHBOARD}/full-data`
    }
  ]
  return (
      <Fragment>
        <ul>
        {links.map((link) => {
          const match = useRouteMatch(link)

          return (
                <ListItem
                    style={{ padding: 0, fontSize: 17 }}
                    key={link.url}
                    button
                    className={match?.isExact ? 'active' : ''}
                    component={NavLink}
                    to={link.url}
                    activeClassName='active'
                >
                    <div className="item">
                        <link.icon />
                      <div className="item-text">
                        {link.text}
                      </div>
                    </div>
                </ListItem>
          )
        })}
    </ul>
      </Fragment>
  )
}
