import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from './PrivateRoutes'

// admin
import Login from '../pages/admin/Login'
import AdminHome from '../pages/admin/AdminHome'
import AdminOrder from '../pages/admin/AdminOrder'
import NotFound from '../pages/NotFound'

const routes = () => (
  <Router>
    <Switch>
      <Route
        path='/admin-su'
        render={({match: {url}}) => (
          <>
            <Route path={`${url}/login`} component={Login} exact/>
            <PrivateRoute path={`${url}/dashboard`} component={AdminHome} exact loginType='managerment'/>
            <PrivateRoute path={`${url}/order-managerment`} component={AdminOrder} exact loginType='managerment'/>
            <Route path={`${url}/*`} component={NotFound}/>
          </>
        )}
      />
    </Switch>
  </Router>
);

export default routes;
