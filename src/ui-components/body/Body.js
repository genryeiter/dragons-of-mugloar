import React from 'react'
import { any } from 'prop-types'

export const Body = ({ children }) => (
    <>
        <div className="body-wrapper">
            {children}
        </div>
    </>
)

Body.propTypes = {
  children: any
}
