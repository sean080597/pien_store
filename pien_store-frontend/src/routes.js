import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from './PrivateRoutes'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetails'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'
import CheckOut from './pages/CheckOut'
import YourOrders from './pages/YourOrders'

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
      <Route path='/' component={Home} exact/>
      <Route path='/about' component={About} exact/>
      <Route path='/shop' component={Shop} exact/>
      <Route path='/cart' component={Cart} exact/>
      <Route path='/productDetail/:prod_id' component={ProductDetail} exact/>
      <Route
        path='/customer'
        render={({match: {url}}) => (
          <>
            <PrivateRoute path={`${url}/profile`} component={Profile} exact/>
            <PrivateRoute path={`${url}/yourOrders`} component={YourOrders} exact/>
          </>
        )}
      />
      <PrivateRoute path='/checkout' component={CheckOut} exact/>
      <Route path='*' component={NotFound}/>
    </Switch>
    <Footer/>
  </Router>
);

export default routes;
