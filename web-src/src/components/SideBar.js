/*
 * <license header>
 */

import React from 'react';
import { NavLink } from 'react-router-dom';

function SideBar() {
  return (
    <ul className='SideNav'>
      <li className='SideNav-item'>
        <NavLink
          className='SideNav-itemLink'
          activeClassName='is-selected'
          aria-current='page'
          exact
          to='/'
        >
          Home
        </NavLink>
      </li>
      <li className='SideNav-item'>
        <NavLink
          className='SideNav-itemLink'
          activeClassName='is-selected'
          aria-current='page'
          to='/actions'
        >
          Actions
        </NavLink>
      </li>
      <li className='SideNav-item'>
        <NavLink
          className='SideNav-itemLink'
          activeClassName='is-selected'
          aria-current='page'
          to='/contentful'
        >
          Contentful
        </NavLink>
      </li>
      <li className='SideNav-item'>
        <NavLink
          className='SideNav-itemLink'
          activeClassName='is-selected'
          aria-current='page'
          to='/product'
        >
          Product
        </NavLink>
      </li>
    </ul>
  );
}

export default SideBar;
