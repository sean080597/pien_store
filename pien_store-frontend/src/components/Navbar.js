import React from "react";
import { Link, useHistory } from 'react-router-dom';
import {GoogleLogin, GoogleLogout} from 'react-google-login'
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { useSelector } from 'react-redux'
import CommonConstants from '../config/CommonConstants'
import CommonService from '../services/CommonService.service'
import { useGoogleLogin } from '../hooks/HookManager'
import Cookie from 'js-cookie'
import iziToast from "izitoast";

export default function Navbar(props) {
  const history = useHistory()
  const {userName, userImage, token, isNotFoundPage, cartCount, currentPath} = useSelector(state => ({
    userName: state.auth.user.name,
    userImage: state.auth.user.imageUrl,
    token: state.auth.token,
    isNotFoundPage: state.common.isNotFoundPage,
    cartCount: state.shop.cartCount,
    currentPath: state.common.currentPath
  }))
  //login by Google
  const {applyGoogleLogin, applyGoogleLogout} = useGoogleLogin({})
  const responseGoogle = async (res) => {
    //chech if exists error popup_closed_by_user or access_denied
    if(!res.error){
      //call hook useGoogleLogin
      await applyGoogleLogin(res)
    }
  }
  const logoutGoogle = async () => {
    //call hook useGoogleLogout
    await applyGoogleLogout()
    //check protected routes
    if(CommonService.checkProtectedRoutes(currentPath)){
      history.push("/");
    }
  }

  // const responseFacebook = async (res) => {
  //   let expiryDate = moment(new Date()).add(30, 'm').toDate()
  //   setCookie('token', res.accessToken, { path: '/', sameSite: 'lax', expires: expiryDate})
  //   console.log('facebook login => ', JSON.stringify(res))
  // }

  const test = () => {
    console.log(Cookie.get('access_token'))
  //   iziToast.show({
  //     theme: 'dark',
  //     icon: 'fa fa-sign-in',
  //     title: CommonConstants.NOTIFY.CHECKOUT.ORDER_SUCCESS,
  //     position: 'topCenter'
  // })
  }

  return (
    <>
      {!isNotFoundPage && <>
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
                <li><button onClick={test}>test</button></li>
                <li><Link to='/ourStory'>Our story</Link></li>
                <li><Link to='/gallery'>Gallery</Link></li>
                <li><Link to='/shop'>Shop</Link></li>
                <li><Link to='/cart'>Cart<span className="badge">{cartCount}</span></Link></li>
                {!token && <li>
                  <GoogleLogin
                    clientId={CommonConstants.GOOGLE_CLIENT_ID}
                    render={renderProps => (
                      <button className="btn btn-danger btn-round" onClick={renderProps.onClick} disabled={renderProps.disabled}><i className="fa fa-google"></i> Login</button>
                    )}
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                    prompt="select_account"
                  />
                </li>}
                {/* <li>
                  <FacebookLogin
                    appId={CommonConstants.FACEBOOK_APP_ID}
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={responseFacebook}
                    icon="fa-facebook"
                    render={renderProps => (
                      <button className="btn btn-primary btn-round" onClick={renderProps.onClick}><i className="fa fa-facebook"></i> Facebook</button>
                    )}
                  />
                </li> */}
                {token && <li className="dropdown" >
                  <a className="dropdown-toggle navbar-aimage" href="#" data-toggle="dropdown">
                    {/* <img src={process.env.PUBLIC_URL + '/assets/images/sample-profile-image.jpg'} className="img-circle navbar-img" alt="avatar image"/> */}
                    <img src={userImage} className="img-circle navbar-img" alt="Avatar"/>
                    {userName}
                  </a>
                  <ul className="dropdown-menu">
                    <li><Link to="/customer/profile">Profile</Link></li>
                    <li><Link to="/customer/yourOrders">Your Orders</Link></li>
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
      </>}
    </>
  )
}