import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from './PrivateRoutes'
import {SideBarCollapse} from '../components/ComponentsManager'

// admin
import Login from '../pages/admin/Login'
import AdminHome from '../pages/admin/AdminHome'
import AdminOrder from '../pages/admin/AdminOrder'
import AdminGallery from '../pages/admin/AdminGallery'
import AdminUser from '../pages/admin/AdminUser'
import AdminConfig from '../pages/admin/AdminConfig'
import NotFound from '../pages/NotFound'

const routes = () => (
  <Router>
    <Switch>
      <Route path='/admin-su/login' component={Login} exact />
      <Route
        path='/admin-su'
        render={({ match: { url } }) => (
          <div className="row">
            <div className="col-sm-3 sidebar-container pr-0">
              <SideBarCollapse/>
            </div>
            <div className="col-sm-9">
              <PrivateRoute path={`${url}/dashboard`} component={AdminHome} exact loginType='managerment' />
              <PrivateRoute path={`${url}/order-managerment`} component={AdminOrder} exact loginType='managerment' />
              <PrivateRoute path={`${url}/gallery-managerment`} component={AdminGallery} exact loginType='managerment' />
              <PrivateRoute path={`${url}/user-managerment`} component={AdminUser} exact loginType='managerment' />
              <PrivateRoute path={`${url}/config-managerment`} component={AdminConfig} exact loginType='managerment' />
            </div>
          </div>
        )}
      />
      <Route path='/admin-su/*' component={NotFound} />
    </Switch>
  </Router>
);

export default routes;
