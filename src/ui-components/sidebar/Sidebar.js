import React from 'react'
import { Links } from './Links'
import { ROUTE_DASHBOARD } from '../../routing/routes'
import { BiTask, FiShoppingBag, IoMdInformationCircleOutline } from 'react-icons/all'

const links1 = [
  {
    text: 'Tasks',
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

export const Sidebar = () => (
    <div className="sidebar">
        <div className="brand">Dragons <br/> of Mugloar</div>
        <div className="links">
            <Links links={links1}/>
        </div>

    </div>
)
