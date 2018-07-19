import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCalculator, moveCalculator, clearCalculators } from '../../actions/managementActions';
import FlareCLCalculator from '../../components/FlareCLCalculator';
import FlareCXCalculator from '../../components/FlareCXCalculator';
import FlareSDICalculator from '../../components/FlareSDICalculator';
import VictoremCXCalculator from '../../components/VictoremCXCalculator';
import VictoremSDICalculator from '../../components/VictoremSDICalculator';
import InstructionBox from '../../components/InstructionBox';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import uuid from 'uuid';
import styles from './FrameRate.css';

const Calculator = SortableElement(({ id, calculatorState }) => {
    const cameraType = calculatorState.cameraType;
    switch (cameraType) {
        case 'flare-cl':
            return <FlareCLCalculator id={id} />;
        case 'flare-cx':
            return <FlareCXCalculator id={id} />
        case 'flare-sdi':
            return <FlareSDICalculator id={id} />
        case 'victorem-cx':
            return <VictoremCXCalculator id={id} />
        case 'victorem-sdi':
            return <VictoremSDICalculator id={id} />
    }
});

const CalculatorList = SortableContainer(({ calculatorEntries }) => {
  return (
    <div className={styles.list}>
      {calculatorEntries.map((entry, i) => (
        <Calculator
            key={`item-${entry.id}`}
            index={i}
            id={entry.id}
            calculatorState={entry.calculatorState}
         />
      ))}
    </div>
  );
});


class FrameRate extends Component {
    onSortEnd = ({ oldIndex, newIndex }) => this.props.handleMove(oldIndex, newIndex);

    render = () => {
        const calculatorEntries = Array.from(this.props.calculators, ([id, calculatorState]) => ({
            id,
            calculatorState
        }));

        const text = 'Please select a button above to add a calculator.';
        const instructionBox = (calculatorEntries.length === 0) ? <InstructionBox text={text} /> : '';
        return (
            <div className={styles.root}>
                <div className={styles.title}>
                    Frame Rate Calculators
                </div>
                <div className={styles.buttonsContainer}>
                    <div>
                        <div className={styles.buttonContainer}>
                            <div className={styles.buttonContainerText}>FLARE</div>
                            <button type='button' className={styles.flareClButton} onClick={() => this.props.handleAdd('flare-cl')}>+ CL</button>
                            <button type='button' className={styles.flareCxButton} onClick={() => this.props.handleAdd('flare-cx')}>+ CX</button>
                            <button type='button' className={styles.flareSdiButton} onClick={() => this.props.handleAdd('flare-sdi')}>+ SDI</button>
                        </div>
                        <div className={styles.buttonSpacer}></div>
                        <div className={styles.buttonContainer}>
                        <div className={styles.buttonContainerText}>VICTOREM</div>
                            <button type='button' className={styles.victoremCxButton} onClick={() => this.props.handleAdd('victorem-cx')}>+ CX</button>
                            <button type='button' className={styles.victoremSdiButton} onClick={() => this.props.handleAdd('victorem-sdi')}>+ SDI</button>
                        </div>
                    </div>
                    <div>
                        <button type='button' className={styles.importButton}>IMPORT</button>
                        <button type='button' className={styles.exportButton}>EXPORT</button>
                        <div className={styles.buttonSpacer}></div>
                        <button type='button' className={styles.clearButton} onClick={this.props.handleClear}>CLEAR</button>
                    </div>
                </div>
                {instructionBox}
                <CalculatorList calculatorEntries={calculatorEntries} axis='xy' onSortEnd={this.onSortEnd} />
            </div>
        );
    }
}

const mapStateToProps = ({ frameRateCalculators }) => ({
    calculators: frameRateCalculators
});

const mapDispatchToProps = (dispatch) => ({
    handleAdd: (cameraType) => {
        const id = uuid();
        dispatch(addCalculator(id, cameraType));
    },
    handleMove: (oldIndex, newIndex) =>
        dispatch(moveCalculator(oldIndex, newIndex)),

    handleClear: () => dispatch(clearCalculators())
});

export default connect(mapStateToProps, mapDispatchToProps)(FrameRate);
