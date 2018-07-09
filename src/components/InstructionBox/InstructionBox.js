import React from 'react';
import styles from './InstructionBox.css';

const InstructionBox = ({ text }) => (
    <div className={styles.container}>
        <div className={styles.text}>
            {text}
        </div>
    </div>
);

export default InstructionBox;