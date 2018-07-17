import React from 'react';
import CalculatorTopBar from '../CalculatorTopBar';
import { FlareCXModel, FlareCXFormat, FlareCXResolution, FlareCXOptions, FlareCXOutput } from './components';
import styles from './FlareCXCalculator.css';

const FlareCXCalculator = (props) => (
    <div className={styles.root}>
        <CalculatorTopBar type={'Flare CX'} id={props.id} />
        <FlareCXModel id={props.id} />
        <FlareCXFormat id={props.id} />
        <FlareCXResolution id={props.id} />
        <FlareCXOptions id={props.id} />
        <FlareCXOutput id={props.id} />
    </div>
);

export default FlareCXCalculator;