import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';
import logo from './logo.png';

const Header = () => (
    <header className='header'>
        <div className='content-container'>
            <div className='header-content'>
                <Link className='header-title' to='/'>
                    <img src={logo} height='40' />
                </Link>
                <div>
                    <NavLink className='header-button' to='/framerate' activeClassName='is-active'>FRAME RATE</NavLink>
                    <NavLink className='header-button' to='/storage' activeClassName='is-active'>STORAGE</NavLink>
                </div>
            </div>
        </div>
    </header>
);

export default Header;