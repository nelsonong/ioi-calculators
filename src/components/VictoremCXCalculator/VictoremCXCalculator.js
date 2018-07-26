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
    <CalculatorTopBar type={'Victorem CX'} cameraId={props.cameraId} dvrId={props.dvrId} />
    <VictoremCXModel cameraId={props.cameraId} dvrId={props.dvrId} />
    <VictoremCXFormat cameraId={props.cameraId} dvrId={props.dvrId} />
    <VictoremCXResolution cameraId={props.cameraId} dvrId={props.dvrId} />
    <VictoremCXOptions cameraId={props.cameraId} dvrId={props.dvrId} />
    <VictoremCXOutput cameraId={props.cameraId} dvrId={props.dvrId} />
  </div>
);

export default VictoremCXCalculator;
