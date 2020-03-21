import React from "react";
import { Link } from 'react-router-dom';
import {GoogleLogin, GoogleLogout} from 'react-google-login'
import {useCookies} from 'react-cookie'
import {useDispatch, useSelector} from 'react-redux'
import CommonConstants from '../config/CommonConstants.config'
import PageLoadService from '../services/PageLoadService.service'
import CommonService from '../services/CommonService.service'

export default function Navbar(props) {
  const [cookies, setCookie, removeCookie] = useCookies({});
  const dispatch = useDispatch()
  const {userName, token} = useSelector(state => ({
    userName: state.auth.user.name,
    token: state.auth.token
  }))

  const responseGoogle = async (res) => {
    setCookie('token', res.accessToken)
    //dispatch
    await dispatch({type: 'LOGIN_GOOGLE', payload: res})
    //recall event hover dropdown
    PageLoadService.setNavbarHoverDropdown()
  }

  const logoutGoogle = async () => {
    removeCookie('token')
    await dispatch({type: 'LOGOUT_GOOGLE'})
  }

  return (
    <nav className="navbar navbar-custom navbar-fixed-top" role="navigation">
      <div className="container">
        <div className="navbar-header">
          <button className="navbar-toggle" type="button" data-toggle="collapse" data-target="#custom-collapse">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link className="navbar-brand" to="/">Pieu Store</Link>
        </div>
        <div className="collapse navbar-collapse" id="custom-collapse">
          <ul className="nav navbar-nav navbar-right">
            <li><Link to='/shop'>Shop</Link></li>
            <li><Link to='/about'>About</Link></li>
            {!token && <li>
              <GoogleLogin
                clientId={CommonConstants.GOOGLE_CLIENT_ID}
                render={renderProps => (
                  <button className="btn btn-primary btn-round" onClick={renderProps.onClick} disabled={renderProps.disabled}><i className="fa fa-google"></i> Login</button>
                )}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
              />
            </li>}
            {token && <li className="dropdown" >
              <a className="dropdown-toggle navbar-aimage" href="#" data-toggle="dropdown">
                <img src={process.env.PUBLIC_URL + '/assets/images/sample-profile-image.jpg'} className="img-circle navbar-img" alt="avatar image"/>
                {userName}
              </a>
              <ul className="dropdown-menu">
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/dadasd">One Page</Link></li>
                <li>
                  <GoogleLogout
                    clientId={CommonConstants.GOOGLE_CLIENT_ID}
                    buttonText="Logout"
                    onLogoutSuccess={logoutGoogle}
                    render={renderProps => (
                      <button onClick={renderProps.onClick} disabled={renderProps.disabled}>Logout</button>
                    )}
                  />
                </li>
              </ul>
            </li>}
          </ul>
        </div>
      </div>
    </nav>
  )
}