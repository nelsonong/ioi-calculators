import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCalculator, moveCalculator, clearCalculators } from '../../actions/managementActions';
import DVRCalculator from '../../components/DVRCalculator';
import InstructionBox from '../../components/InstructionBox';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import uuid from 'uuid';
import styles from './Storage.css';

const Calculator = SortableElement(({ id }) => (
    <DVRCalculator dvrId={id} />
));

const CalculatorList = SortableContainer(({ calculatorEntries }) => {
  return (
    <div className={styles.list}>
      {calculatorEntries.map((entry, i) => (
        <Calculator
            key={`item-${entry.id}`}
            index={i}
            id={entry.id}
         />
      ))}
    </div>
  );
});

class Storage extends Component {
    onSortEnd = ({ oldIndex, newIndex }) => this.props.handleMove(oldIndex, newIndex);

    render = () => {
        const calculatorEntries = this.props.order.map(id => {
            const calculatorState = this.props.calculators[id];
            return {
                id,
                calculatorState
            };
        });

        const text = 'Please click the button above to add a calculator.';
        const instructionBox = (calculatorEntries.length === 0) ? <InstructionBox text={text} /> : '';
        return (
            <div className={styles.root}>
                <div className={styles.title}>
                    Storage Calculators
                </div>
                <div className={styles.buttonsContainer}>
                    <div>
                        <button type='button' className={styles.addButton} onClick={() => this.props.handleAdd('dvr')}>+ DVR</button>
                    </div>
                    <div className={styles.spacer}></div>
                    <div>
                        <button type='button' className={styles.importButton}>IMPORT</button>
                        <button type='button' className={styles.exportButton}>EXPORT</button>
                    </div>
                    <div>
                        <button type='button' className={styles.clearButton} onClick={this.props.handleClear}>CLEAR</button>
                    </div>
                </div>
                {instructionBox}
                <CalculatorList calculatorEntries={calculatorEntries} axis='xy' onSortEnd={this.onSortEnd} />
            </div>
        );
    }
}

const mapStateToProps = ({ storageCalculators }) => {
    const { order } = storageCalculators;
    return {
        calculators: storageCalculators,
        order
    };
};

const mapDispatchToProps = (dispatch) => ({
    handleAdd: (cameraType) => {
        const dvrId = uuid();
        dispatch(addCalculator(dvrId, cameraType, true));
    },
    handleMove: (oldIndex, newIndex) =>
        dispatch(moveCalculator(oldIndex, newIndex, true)),

    handleClear: () => dispatch(clearCalculators(true))
});

export default connect(mapStateToProps, mapDispatchToProps)(Storage);