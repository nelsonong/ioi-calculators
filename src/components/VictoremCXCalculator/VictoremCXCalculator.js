import React from 'react';
import CalculatorTopBar from '../CalculatorTopBar';
import { VictoremCXModel, VictoremCXFormat, VictoremCXResolution, VictoremCXOptions, VictoremCXOutput } from './components';
import styles from './VictoremCXCalculator.css';

const VictoremCXCalculator = (props) => (
    <div className={styles.root}>
        <CalculatorTopBar type={'Victorem CX'} id={props.id} />
        <VictoremCXModel id={props.id} />
        <VictoremCXFormat id={props.id} />
        <VictoremCXResolution id={props.id} />
        <VictoremCXOptions id={props.id} />
        <VictoremCXOutput id={props.id} />
    </div>
);

export default VictoremCXCalculator;