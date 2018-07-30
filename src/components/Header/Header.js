import React from 'react';
import {
  Link,
  NavLink,
} from 'react-router-dom';
import styles from './Header.css';
import logo from '../../images/logo.png';

const Header = () => (
  <header className={styles.header}>
    <div className={styles.container}>
      <div className={styles.content}>
        <Link className={styles.logo} to='/'>
          <img src={logo} height='25' />
        </Link>
        <div>
          <NavLink className={styles.button} to='/framerate' activeClassName={styles.isActive}>Frame Rate</NavLink>
          <NavLink className={styles.button} to='/storage' activeClassName={styles.isActive}>Storage</NavLink>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
