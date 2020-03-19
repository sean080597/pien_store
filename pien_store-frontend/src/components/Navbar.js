import React, { useState } from "react";
import { Link } from 'react-router-dom';
import {GoogleLogin, GoogleLogout} from 'react-google-login'
import cookie from 'js-cookie'

export default function Navbar(props) {
  const clientID = '554896225454-0epg2j824qku9rfmtuf0205jf0rupt38.apps.googleusercontent.com';

  const responseGoogle = (response) => {
    cookie.set('token', response.accessToken)
    cookie.set('user', response.profileObj)
    console.log(response)
  }

  const logoutGoogle = (response) => {
    console.log(response)
    cookie.remove('token')
    cookie.remove('user')
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
            <li>
              <GoogleLogin
                clientId={clientID}
                render={renderProps => (
                  <button className="btn btn-primary btn-round" onClick={renderProps.onClick} disabled={renderProps.disabled}><i className="fa fa-google"></i> Login</button>
                )}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
              />
            </li>
            <li className="dropdown" >
              <a className="dropdown-toggle navbar-aimage" href="#" data-toggle="dropdown">
                <img src={process.env.PUBLIC_URL + '/assets/images/sample-profile-image.jpg'} className="img-circle navbar-img" alt="avatar image"/>
                LuuSean
              </a>
              <ul className="dropdown-menu">
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/">One Page</Link></li>
                <li>
                  <GoogleLogout
                    clientId={clientID}
                    buttonText="Logout"
                    onLogoutSuccess={logoutGoogle}
                  />
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
