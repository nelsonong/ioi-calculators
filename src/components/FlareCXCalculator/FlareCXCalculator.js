import React from 'react';
import CalculatorTopBar from '../CalculatorTopBar';
import { FlareCXModel, FlareCXFormat, FlareCXResolution, FlareCXOptions, FlareCXOutput } from './components';
import styles from './FlareCXCalculator.css';

const FlareCXCalculator = (props) => (
    <div className={styles.root}>
        <CalculatorTopBar type={'Flare CX'} id={props.id} dvrId={props.dvrId} />
        <FlareCXModel id={props.id} dvrId={props.dvrId} />
        <FlareCXFormat id={props.id} dvrId={props.dvrId} />
        <FlareCXResolution id={props.id} dvrId={props.dvrId} />
        <FlareCXOptions id={props.id} dvrId={props.dvrId} />
        <FlareCXOutput id={props.id} dvrId={props.dvrId} />
    </div>
);

export default FlareCXCalculator;