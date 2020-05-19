import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import Cookie from 'js-cookie'
import {useSelector} from 'react-redux'

const PrivateRoute = ({component: Component, ...rest}) => {
    const token = Cookie.get('access_token')
    const {userRole} = useSelector(state => ({
        userRole: state.auth.user.role
    }))

    const checkValidLogin = () => {
        if(rest.loginType === 'managerment'){
            return (userRole === 'adm' && token) ? true : false
        }else{
            return token ? true : false
        }
    }

    return (
        <Route
            {...rest}
            render = {props =>
                checkValidLogin() ? (
                    <Component {...props}/>
                ) : (
                    <Redirect
                        to={{
                            pathname: rest.loginType === 'managerment' ? "/admin-su/login" : '/',
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