import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => (
    <header className='header'>
        <div className='content-container'>
            <div className='header-content'>
                <Link className='header-title' to='/'>
                    <h1>IO Calc</h1>
                </Link>
                <div>
                    <NavLink className='header-button' to='/framerate' activeClassName='is-active'>Frame Rate</NavLink>
                    <NavLink className='header-button' to='/storage' activeClassName='is-active'>Storage</NavLink>
                </div>
            </div>
        </div>
    </header>
);

export default Header;