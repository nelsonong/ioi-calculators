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
        <Link className={styles.logo} to='/calculator'>
          <img src={logo} height='25' />
        </Link>
        <div>
          <NavLink className={styles.button} to='/calculator/cameras' activeClassName={styles.isActive}>
            Cameras
          </NavLink>
          <NavLink className={styles.button} to='/calculator/DVRs' activeClassName={styles.isActive}>
            DVRs
          </NavLink>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
