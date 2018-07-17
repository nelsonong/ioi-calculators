import React from 'react';
import CalculatorTopBar from '../CalculatorTopBar';
import { FlareCLModel, FlareCLFormat, FlareCLResolution, FlareCLOptions, FlareCLOutput } from './components';
import styles from './FlareCLCalculator.css';

const FlareCLCalculator = (props) => (
    <div className={styles.root}>
        <CalculatorTopBar type={'Flare CL'} id={props.id} />
        <FlareCLModel id={props.id} />
        <FlareCLFormat id={props.id} />
        <FlareCLResolution id={props.id} />
        <FlareCLOptions id={props.id} />
        <FlareCLOutput id={props.id} />
    </div>
);

export default FlareCLCalculator;