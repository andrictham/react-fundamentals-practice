import React from 'react'
import { NavLink } from 'react-router-dom'
// NavLink lets us style the active link with a class
import './Nav.css'

export default (props) =>
  <ul className="nav">
    <li>
      <NavLink activeClassName="nav-link--active" to="/" exact>
        Home
      </NavLink>
    </li>
    <li>
      <NavLink activeClassName="nav-link--active" to="/battle"
      >
        Battle
      </NavLink>
    </li>
    <li>
      <NavLink activeClassName="nav-link--active" to="/popular" >
        Popular
      </NavLink>
    </li>
  </ul>
