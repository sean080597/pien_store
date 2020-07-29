import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from './PrivateRoutes'
import {SideBarCollapse} from '../components/ComponentsManager'

// admin
import Login from '../pages/admin/Login'
import AdminHome from '../pages/admin/AdminHome'
import AdminOrder from '../pages/admin/AdminOrder'
import AdminOrderDetails from '../pages/admin/AdminOrderDetails'
import AdminGallery from '../pages/admin/AdminGallery'
import AdminUser from '../pages/admin/AdminUser'
import AdminConfig from '../pages/admin/AdminConfig'
import AdminCustomer from '../pages/admin/AdminCustomer'
import AdminProduct from '../pages/admin/AdminProduct'
import AdminProductDetails from '../pages/admin/AdminProductDetails'
import AdminCategory from '../pages/admin/AdminCategory'

const routes = () => (
  <Router>
    <Switch>
      <Route path='/admin-su/login' component={Login} exact />
      <Route
        path='/admin-su'
        render={({ match: { url } }) => (
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-3 sidebar-container px-0">
                <SideBarCollapse/>
              </div>
              <div className="col-sm-9 py-5">
                <PrivateRoute path={`${url}/`} component={AdminHome} exact loginType='managerment' />
                <PrivateRoute path={`${url}/order-managerment`} component={AdminOrder} exact loginType='managerment' />
                <PrivateRoute path={`${url}/order-details-managerment/:order_id`} component={AdminOrderDetails} exact loginType='managerment' />
                <PrivateRoute path={`${url}/gallery-managerment`} component={AdminGallery} exact loginType='managerment' />
                <PrivateRoute path={`${url}/user-managerment`} component={AdminUser} exact loginType='managerment' />
                <PrivateRoute path={`${url}/config-managerment`} component={AdminConfig} exact loginType='managerment' />
                <PrivateRoute path={`${url}/customer-managerment`} component={AdminCustomer} exact loginType='managerment' />
                <PrivateRoute path={`${url}/product-managerment`} component={AdminProduct} exact loginType='managerment' />
                <PrivateRoute path={`${url}/product-details-managerment/:action/:prod_id?`} component={AdminProductDetails} exact loginType='managerment' />
                <PrivateRoute path={`${url}/category-managerment`} component={AdminCategory} exact loginType='managerment' />
              </div>
            </div>
          </div>
        )}
      />
    </Switch>
  </Router>
);

export default routes;
