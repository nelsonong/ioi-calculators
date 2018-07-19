import React from 'react';
import CalculatorTopBar from '../CalculatorTopBar';
import { CustomCLFormat, CustomCLResolution, CustomCLFrameRate, CustomCLOutput } from './components';
import styles from './CustomCLCalculator.css';

const CustomCLCalculator = (props) => (
    <div className={styles.root}>
        <CalculatorTopBar type={'Custom CL'} id={props.id} dvrId={props.dvrId} />
        <CustomCLFormat id={props.id} dvrId={props.dvrId} />
        <CustomCLResolution id={props.id} dvrId={props.dvrId} />
        <CustomCLFrameRate id={props.id} dvrId={props.dvrId} />
        <CustomCLOutput id={props.id} dvrId={props.dvrId} />
    </div>
);

export default CustomCLCalculator;