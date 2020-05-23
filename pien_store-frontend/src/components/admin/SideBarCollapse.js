import React from 'react'
import CommonConstants from '../../config/CommonConstants'
import {Link} from 'react-router-dom'

export default function SideBarCollapse(props) {
  return (
    <nav id="sidebar">
      <div className="img--cover-bg bg-wrap text-center py-4" style={{backgroundImage: `url(${CommonConstants.IMAGES_DIR + CommonConstants.AVATAR_BG_ADMIN})`}}>
        <div className="user-logo">
          {/* <img src={process.env.PUBLIC_URL + CommonConstants.IMAGES_DIR + "/" + (prod.image ? prod.image : CommonConstants.USER_DEFAULT_IMAGE)}/> */}
          <div className="img--avatar"><img src={process.env.PUBLIC_URL + CommonConstants.IMAGES_DIR + "/sample-profile-image.jpg"}/></div>
          <h3>Catriona Henderson</h3>
        </div>
      </div>
      <ul className="components">
        <li className="active">
          <Link to='/admin-su/login'><span className="fa fa-home mr-3"></span> Home</Link>
        </li>
        <li>
          <Link to='/admin-su/user-managerment'><span className="fa fa-users mr-3 notif"><small className="flex-display align-items-center jus-center">5</small></span> Users</Link>
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
      </ul>
    </nav>
  )
}
