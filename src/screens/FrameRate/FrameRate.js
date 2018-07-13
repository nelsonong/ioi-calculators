import React, { Component } from 'react';
import FlareCLCalculator from '../../components/FlareCLCalculator';
import FlareCXCalculator from '../../components/FlareCXCalculator';
import FlareSDICalculator from '../../components/FlareSDICalculator';
import VictoremCalculator from '../../components/VictoremCalculator';
import InstructionBox from '../../components/InstructionBox';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import uuid from 'uuid';
import styles from './FrameRate.css';

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


class FrameRate extends Component {
    state = {
        calculatorEntries: []
    };

    // Add calculator
    addCalculator = (type) => {
        const key = uuid();
        let calculator;
        switch (type) {
            case 'flare-cl':
                calculator = <FlareCLCalculator key={key} id={key} deleteCalculator={this.deleteCalculator} />;
                break;
            case 'flare-cx':
                calculator = <FlareCXCalculator key={key} id={key} deleteCalculator={this.deleteCalculator} />
                break;
            case 'flare-sdi':
                calculator = <FlareSDICalculator key={key} id={key} deleteCalculator={this.deleteCalculator} />
                break;
            case 'victorem':
                calculator = <VictoremCalculator key={key} id={key} deleteCalculator={this.deleteCalculator} />
        }

        const calculatorEntries = this.state.calculatorEntries.concat({ id: key, calculator });
        this.setState(() => ({ calculatorEntries }));
    }

    // Remove calculator
    deleteCalculator = (id) => {
        const calculatorEntries = this.state.calculatorEntries.filter(calculator => calculator.id !== id);
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
        const text = 'Please select a button above to add a calculator.';
        const instructionBox = (this.state.calculatorEntries.length === 0) ? <InstructionBox text={text} /> : '';
        return (
            <div className={styles.root}>
                <div className={styles.title}>
                    Frame Rate Calculators
                </div>
                <div className={styles.buttonsContainer}>
                    <div>
                        <button type='button' className={styles.flareButton} onClick={() => this.addCalculator('flare-cl')}>+ FLARE CL</button>
                        <button type='button' className={styles.flareButton} onClick={() => this.addCalculator('flare-cx')}>+ FLARE CX</button>
                        <button type='button' className={styles.flareButton} onClick={() => this.addCalculator('flare-sdi')}>+ FLARE SDI</button>
                        <button type='button' className={styles.victoremButton} onClick={() => this.addCalculator('victorem')}>+ VICTOREM</button>
                    </div>
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

export default FrameRate;
