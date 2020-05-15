import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from './PrivateRoutes'

// client
import {Navbar, Footer} from './components/ComponentsManager'
import Home from './pages/client/Home'
import OurStory from './pages/client/OurStory'
import Shop from './pages/client/shop/Shop'
import ProductDetail from './pages/client/shop/ProductDetails'
import Cart from './pages/client/Cart'
import Profile from './pages/client/Profile'
import CheckOut from './pages/client/CheckOut'
import OurGallery from './pages/client/OurGallery'
import YourOrders from './pages/client/your-orders/YourOrders'
import OrderDetails from './pages/client/your-orders/OrderDetails'

// admin
import Login from './pages/server/Login'
import AdminOrder from './pages/server/AdminOrder'

// common
import NotFound from './pages/NotFound'

// const defineRoutes = [
//   {path: '/', component: Home, exact: true, },
//   {path: '/about', component: About, exact: true},
//   {path: '/shop', component: Shop, exact: true},
//   {path: '/cart', component: Cart, exact: true},
//   {path: '/profile', component: Profile, exact: true},
//   {path: '/checkout', component: CheckOut, exact: true},
//   {path: '*', component: NotFound, exact: false},
// ]

const routes = () => (
  <Router>
    <Navbar/>
    <Switch>
      {/* {
        defineRoutes.map(({ path, component: C, exact }, index) => (
          <Route path={path} exact={exact} render={(props) => <C {...props}/>} key={index} />
        ))
      } */}
      {/* Client Routes */}
      <Route path='/' component={Home} exact/>
      <Route path='/ourStory' component={OurStory} exact/>
      <Route path='/shop' component={Shop} exact/>
      <Route path='/cart' component={Cart} exact/>
      <Route path='/gallery' component={OurGallery} exact/>
      <Route path='/productDetail/:prod_id' component={ProductDetail} exact/>
      <Route
        path='/customer'
        render={({match: {url}}) => (
          <>
            <Route path={`${url}`} component={NotFound}/>
            <PrivateRoute path={`${url}/profile`} component={Profile} exact/>
            <PrivateRoute path={`${url}/checkout`} component={CheckOut} exact/>
            <PrivateRoute path={`${url}/yourOrders`} component={YourOrders} exact/>
            <PrivateRoute path={`${url}/orderDetails/:order_id`} component={OrderDetails} exact/>
          </>
        )}
      />
      {/* Admin Routes */}
      <Route
        path='/admin-su'
        render={({match: {url}}) => (
          <>
            <Route path={`${url}/login`} component={Login} exact/>
            <Route path={`${url}`} component={NotFound}/>
            <PrivateRoute path={`${url}/order-managerment`} component={AdminOrder} exact loginType='managerment'/>
          </>
        )}
      />
      <Route path='*' component={NotFound}/>
    </Switch>
    <Footer/>
  </Router>
);

export default routes;
