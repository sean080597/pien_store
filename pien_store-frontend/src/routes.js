import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './pages/Home'
import Login from './pages/Login'
import About from './pages/About'
import Shop from './pages/Shop'

const routes = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/about" exact component={About} />
      <Route path="/login" exact component={Login} />
      <Route path="/shop" exact component={Shop} />
      <Route path="/" render={() => <div>404 Not Found</div>} />
    </Switch>
  </Router>
);

export default routes;
