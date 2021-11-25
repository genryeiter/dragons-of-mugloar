import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTE_WELCOMEPAGE } from '../routing/routes'
import '../scss/style.scss'

export const Rules = () => (
    <>
        <div className="wrapper">
            <div className="">
                <h1 className="rules-h1">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum elit felis, sagittis non est rhoncus, lobortis condimentum nisl. <br/>
                    Duis auctor ligula efficitur feugiat tempus. Nunc suscipit congue justo, a fringilla urna condimentum congue. Aenean id elit lacinia, <br/>
                    mattis sapien vitae, efficitur diam. Morbi urna ipsum, bibendum in gravida a, vulputate id nibh. Aenean non est in felis ornare <br/>
                    ultrices vel at urna. In dolor magna, facilisis sit amet auctor a, auctor ut augue. Nullam hendrerit vel sem ut scelerisque. <br/>
                    Fusce auctor massa quis molestie efficitur.
                </h1>
                <div className="button-wrapper">
                    <Link to={ROUTE_WELCOMEPAGE}>Go Back</Link>
                </div>
            </div>
        </div>
    </>
)
