import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import Cookie from 'js-cookie'

const PrivateRoute = ({component: Component, ...rest}) => {
    const token = Cookie.get('access_token')
    return (
        <Route
            {...rest}
            render = {props =>
                token ? (
                    <Component {...props}/>
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
        // <Route {...rest}
        //     render={props => !token ? (<Component {...props}/>) : (<Redirect to={{pathname: '/profile'}}/>)}
        // >
        // </Route>
    )
}
export default PrivateRoute;