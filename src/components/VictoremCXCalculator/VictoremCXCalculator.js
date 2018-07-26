import React from 'react';
import CalculatorTopBar from '../CalculatorTopBar';
import {
  VictoremCXModel,
  VictoremCXFormat,
  VictoremCXResolution,
  VictoremCXOptions,
  VictoremCXOutput,
} from './components';
import styles from './VictoremCXCalculator.css';

const VictoremCXCalculator = props => (
  <div className={styles.root}>
    <CalculatorTopBar type={'Victorem CX'} cameraId={props.cameraId} />
    <VictoremCXModel cameraId={props.cameraId} />
    <VictoremCXFormat cameraId={props.cameraId} />
    <VictoremCXResolution cameraId={props.cameraId} />
    <VictoremCXOptions cameraId={props.cameraId} />
    <VictoremCXOutput cameraId={props.cameraId} />
  </div>
);

export default VictoremCXCalculator;
