import React from 'react';
import { Link } from 'react-router-dom'

const Navbar = ({location : { pathname }}) => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <Link className="navbar-brand" to="/">POC</Link>
    <button className="navbar-toggler" type="button">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <Link className={`nav-item nav-link ${pathname === '/restaurants' ? 'active' : ''}`} to="/restaurants">Restaurant list</Link>
        <Link className={`nav-item nav-link ${pathname === '/add' ? 'active' : ''}`} to="/add">Add new</Link>
      </div>
    </div>
  </nav>
)

export default Navbar