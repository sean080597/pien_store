import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import cookie from 'js-cookie'

const guestRoutes = ({component: Component, ...rest}) => {
    const token = cookie.get('token')
    return (
        <Route {...rest}
        render={props => !token ? (<Component {...props}/>) : (<Redirect to={{pathname: '/profile'}}/>)}
        >

        </Route>
    )
}