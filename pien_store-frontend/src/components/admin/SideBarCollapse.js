import React from 'react'
import CommonConstants from '../../config/CommonConstants'
import CommonService from '../../services/CommonService.service'
import AdminService from '../../services/AdminService.service'
import {LazyLoadingImage} from '../ComponentsManager'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Cookie from 'js-cookie'

export default function SideBarCollapse(props) {
  const dispatch = useDispatch()
  const {userName} = useSelector(state => ({
    userName: state.auth.user.fullname
  }))
  const handleLogout = () => {
    AdminService.applyUserLogout()
    .then(res => {
      if(res.success){
        dispatch({type: 'LOGOUT_USER'})
        dispatch({type: 'SET_USER_PROFILE', payload: {}})
        Cookie.remove('access_token')
        CommonService.turnOffLoader()
      }
    })
    .catch(() => AdminService.showMessage(false, 'User', 'Logout', false, null))
  }
  return (
    <nav id="sidebar">
      <div className="img--cover-bg bg-wrap text-center py-4" style={{backgroundImage: `url(${CommonConstants.IMAGES_DIR + CommonConstants.AVATAR_BG_ADMIN})`}}>
        <div className="user-logo">
          <div className="img--avatar"><LazyLoadingImage src={CommonService.generateImageSrc(true, 'profiles', null, 'sample-profile-image.jpg')}/></div>
          <h3>{userName}</h3>
        </div>
      </div>
      <ul className="components">
        <li className="active">
          <Link to='/admin-su'><span className="fa fa-home mr-3"></span> Home</Link>
        </li>
        <li>
          <Link to='/admin-su/user-managerment'><span className="fa fa-users mr-3 notif"><small className="flex-display align-items-center jus-center">5</small></span> Users</Link>
        </li>
        <li>
          <Link to='/admin-su/customer-managerment'><span className="fa fa-users mr-3"></span> Customers</Link>
        </li>
        <li>
          <Link to='/admin-su/product-managerment'><span className="fa fa-archive mr-3"></span> Products</Link>
        </li>
        <li>
          <Link to='/admin-su/order-managerment'><span className="fa fa-clipboard mr-3"></span> Orders</Link>
        </li>
        <li>
          <Link to='/admin-su/gallery-managerment'><span className="fa fa-file-image-o mr-3"></span> Gallery</Link>
        </li>
        <li>
          <Link to='/admin-su/config-managerment'><span className="fa fa-cogs mr-3"></span> Configuration</Link>
        </li>
        <li>
          <a href="#" onClick={handleLogout}><span className="fa fa-sign-out mr-3"></span> Logout</a>
        </li>
      </ul>
    </nav>
  )
}
