import React from 'react';
import CalculatorTopBar from '../CalculatorTopBar';
import { FlareCLModel, FlareCLFormat, FlareCLResolution, FlareCLOptions, FlareCLOutput } from './components';
import styles from './FlareCLCalculator.css';

const FlareCLCalculator = (props) => (
    <div className={styles.root}>
        <CalculatorTopBar type={'Flare CL'} id={props.id} dvrId={props.dvrId} />
        <FlareCLModel id={props.id} dvrId={props.dvrId} />
        <FlareCLFormat id={props.id} dvrId={props.dvrId} />
        <FlareCLResolution id={props.id} dvrId={props.dvrId} />
        <FlareCLOptions id={props.id} dvrId={props.dvrId} />
        <FlareCLOutput id={props.id} dvrId={props.dvrId} />
    </div>
);

export default FlareCLCalculator;