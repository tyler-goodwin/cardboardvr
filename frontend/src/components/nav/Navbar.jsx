import React from 'react';
import { NavLink } from 'react-router-dom';
import Routes from '../../lib/Routes';
import './Navbar.css';

function Link({ route, label, exact = false }) {
  return (
    <li>
      <NavLink to={route} className="Nav_Link" activeClassName="Nav_Link--active" exact={exact}>
        {label}
      </NavLink>
    </li>
  )
}

export default function Navbar() {
  return (
    <nav>
      <ul>
        <Link route={Routes.home} label="VR Cardboard" exact />
        <Link route={Routes.new_order} label="New Order" />
      </ul>
    </nav>
  );
}