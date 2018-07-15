import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Header.css';
import logo from '../../images/logo.png';

const Header = () => (
    <header className={styles.header}>
        <div className={styles.container}>
            <div className={styles.content}>
                <Link className={styles.logo} to='/'>
                    <img src={logo} height='40' />
                </Link>
                <div>
                    <NavLink className={styles.button} to='/framerate' activeClassName={styles.isActive}>FRAME RATE</NavLink>
                    <NavLink className={styles.button} to='/storage' activeClassName={styles.isActive}>STORAGE</NavLink>
                </div>
            </div>
        </div>
    </header>
);

export default Header;