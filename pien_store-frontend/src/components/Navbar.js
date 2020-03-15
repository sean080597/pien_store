import React, { Component } from "react";
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  componentDidMount(){
    
  }

  componentWillUnmount() {
    
  }

  render() {
    return (
      <nav className="navbar navbar-custom navbar-fixed-top" role="navigation">
        <div className="container">
          <div className="navbar-header">
            <button className="navbar-toggle" type="button" data-toggle="collapse" data-target="#custom-collapse">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/">Pieu Store</Link>
          </div>
          <div className="collapse navbar-collapse" id="custom-collapse">
            <ul className="nav navbar-nav navbar-right">
              <li className="dropdown"><Link to='/shop'>Shop</Link></li>
              <li className="dropdown"><Link to='/about'>About</Link></li>
              <li className="dropdown"><Link to='/login'>Login</Link></li>
              <li className="dropdown"><a href="documentation.html">Documentation</a></li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}
