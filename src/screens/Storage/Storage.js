import React, { Component } from 'react';
import DVRCalculator from '../../components/DVRCalculator';
import InstructionBox from '../../components/InstructionBox';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import uuid from 'uuid';
import styles from './Storage.css';

const Calculator = SortableElement(({ calculator }) => calculator);

const CalculatorList = SortableContainer(({ calculatorEntries }) => {
  return (
    <div className={styles.list}>
      {calculatorEntries.map((calculatorEntry, i) => (
        <Calculator
            key={`item-${calculatorEntry.id}`}
            index={i}
            calculator={calculatorEntry.calculator}
         />
      ))}
    </div>
  );
});

class Storage extends Component {
    state = {
        calculatorEntries: []
    };

    // Add calculator
    addCalculator = (type) => {
        let calculatorEntries = this.state.calculatorEntries;
        const key = uuid();
        calculatorEntries = calculatorEntries.concat({
            id: key,
            calculator: <DVRCalculator key={key} id={key} deleteCalculator={this.deleteCalculator} />
        });
        this.setState(() => ({ calculatorEntries }));
    }

    // Remove calculator
    deleteCalculator = (id) => {
        let calculatorEntries = this.state.calculatorEntries;
        calculatorEntries = calculatorEntries.filter(calculator => calculator.id !== id);
        this.setState(() => ({ calculatorEntries }));
    }

    // Clear calculators
    clearCalculators = () => {
        this.setState(() => ({ calculatorEntries: [] }));
    }

    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState({
            calculatorEntries: arrayMove(this.state.calculatorEntries, oldIndex, newIndex),
        });
    };

    render = () => {
        const text = 'Please click the button above to add a calculator.';
        const instructionBox = (this.state.calculatorEntries.length === 0) ? <InstructionBox text={text} /> : '';
        return (
            <div className={styles.root}>
                <div className={styles.title}>
                    Storage Calculators
                </div>
                <div className={styles.buttonsContainer}>
                    <div>
                        <button type='button' className={styles.addButton} onClick={() => this.addCalculator()}>+ DVR</button>
                    </div>
                    <div className={styles.spacer}></div>
                    <div>
                        <button type='button' className={styles.importButton}>IMPORT</button>
                        <button type='button' className={styles.exportButton}>EXPORT</button>
                    </div>
                    <div>
                        <button type='button' className={styles.clearButton} onClick={this.clearCalculators}>CLEAR</button>
                    </div>
                </div>
                {instructionBox}
                <CalculatorList calculatorEntries={this.state.calculatorEntries} axis='xy' onSortEnd={this.onSortEnd} />
            </div>
        );
    }
}

export default Storage;