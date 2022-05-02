import React from 'react';
import styles from './Footer.css';
import { loadVersion } from '../../store/localStorage';

const Footer = () => (
  <div className={styles.container}>
    <span className={styles.text}>© Copyright 2022 IO Industries</span>
    <span className={styles.versionText}>v{loadVersion()}</span>
  </div>
);

export default Footer;
