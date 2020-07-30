import React from 'react'
import CommonConstants from '../../config/CommonConstants'
import {LazyLoadingImage} from '../ComponentsManager'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Cookie from 'js-cookie'
import { useAdminActions, useCommonService } from '../../hooks/HookManager'

export default function SideBarCollapse(props) {
  const CommonService = useCommonService()
  const dispatch = useDispatch()
  const {userName, userRole} = useSelector(state => ({
    userName: state.auth.user.fullname,
    userRole: state.auth.user.role
  }))
  const {applyLogoutUser} = useAdminActions()
  return (
    <nav id="sidebar">
      <div className="img--cover-bg bg-wrap text-center py-4" style={{backgroundImage: `url(${CommonConstants.IMAGES_DIR + CommonConstants.AVATAR_BG_ADMIN})`}}>
        <div className="user-logo">
          <div className="img--avatar"><LazyLoadingImage src={CommonService.generateImageSrc('profiles', null, 'sample-profile-image.jpg')}/></div>
          <h3>{userName}</h3>
        </div>
      </div>
      <ul className="components">
        <li className="active">
          <Link to='/admin-su'><span className="fa fa-home fa-fw mr-3"></span> Home</Link>
        </li>
        {
          userRole === 'adm' &&
          <>
            <li>
              <Link to='/admin-su/user-managerment'><span className="fa fa-users fa-fw mr-3 notif"><small className="flex-display align-items-center jus-center">5</small></span> Users</Link>
            </li>
            <li>
              <Link to='/admin-su/customer-managerment'><span className="fa fa-users fa-fw mr-3"></span> Customers</Link>
            </li>
            <li>
              <Link to='/admin-su/category-managerment'><span className="fa fa-th-large fa-fw mr-3"></span> Categories</Link>
            </li>
          </>
        }
        <li>
          <Link to='/admin-su/product-managerment'><span className="fa fa-archive fa-fw mr-3"></span> Products</Link>
        </li>
        <li>
          <Link to='/admin-su/order-managerment'><span className="fa fa-clipboard fa-fw mr-3"></span> Orders</Link>
        </li>
        <li>
          <Link to='/admin-su/gallery-managerment'><span className="fa fa-file-image-o fa-fw mr-3"></span> Gallery</Link>
        </li>
        <li>
          <Link to='/admin-su/config-managerment'><span className="fa fa-cogs fa-fw mr-3"></span> Configuration</Link>
        </li>
        <li>
          <a href="/admin-su/login" onClick={applyLogoutUser}><span className="fa fa-sign-out fa-fw mr-3"></span> Logout</a>
        </li>
      </ul>
    </nav>
  )
}
