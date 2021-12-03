import React from 'react'
import { Links } from './Links'
import logo from './photos/icon-dragon-27.png'

export const Sidebar = () => (
    <div className="sidebar">
        <div className="sidebar-wrapper">
            <div className="logo"><img width={35} height={35} src={logo} alt=""/></div>
            <div className="brand">DASHBOARD</div>
            <div className="links">
                <Links/>
            </div>
        </div>
    </div>
)
