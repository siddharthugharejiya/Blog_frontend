import React from 'react';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

function Nav_Main() {
  return (
    <Nav className="navbar-custom ">
      <Nav.Item>
        <NavLink to="/" className="nav-link-custom">
          Home
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink to="/register" className="nav-link-custom">
          Sign Up
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink to="/login" className="nav-link-custom">
          Login
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink to="/add" className="nav-link-custom">
          Add Blog
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink to="/own" className="nav-link-custom">
          My Blogs
        </NavLink>
      </Nav.Item>
    </Nav>
  );
}

export default Nav_Main;
