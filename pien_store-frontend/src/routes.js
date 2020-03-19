import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
// import Login from './pages/Login'
import About from './pages/About'
import Shop from './pages/Shop'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

const defineRoutes = [
  {path: '/', component: Home, exact: true},
  {path: '/about', component: About, exact: true},
  // {path: '/login', component: Login, exact: true},
  {path: '/shop', component: Shop, exact: true},
  {path: '/profile', component: Profile, exact: true},
  {path: '/', component: NotFound, exact: false},
]

const routes = () => (
  <Router>
    <Navbar/>
    <Switch>
      {
        defineRoutes.map(({ path, component: C, exact }, index) => (
          <Route
            path={path} exact={exact} render={(props) => <C {...props}/>} key={index}
          />
        ))
      }
    </Switch>
    <Footer/>
  </Router>
);

export default routes;
