import React, { Component } from 'react';
import DVRCalculator from '../../components/DVRCalculator';
import InstructionBox from '../../components/InstructionBox';
import uuid from 'uuid';
import styles from './Storage.css';

class Storage extends Component {
    state = {
        calculators: []
    };

    // Add calculator
    addCalculator = (type) => {
        let calculators = this.state.calculators;
        const key = uuid();
        calculators = calculators.concat({
            id: key,
            calculator: <DVRCalculator key={key} id={key} deleteCalculator={this.deleteCalculator} />
        });
        this.setState(() => ({ calculators }));
    }

    // Remove calculator
    deleteCalculator = (id) => {
        let calculators = this.state.calculators;
        calculators = calculators.filter(calculator => calculator.id !== id);
        this.setState(() => ({ calculators }));
    }

    render = () => {
        const calculatorComponents = this.state.calculators.map(calculator => calculator.calculator);
        const text = 'Please click the button above to add a calculator.';
        const instructionBox = (this.state.calculators.length === 0) ? <InstructionBox text={text} /> : '';
        return (
            <div className={styles.root}>
                <div className={styles.title}>
                    Storage Calculators
                </div>
                <div>
                    <button type='button' className={styles.addButton} onClick={() => this.addCalculator()}>+ DVR</button>
                    {instructionBox}
                </div>
                {calculatorComponents}
            </div>
        );
    }
}

export default Storage;