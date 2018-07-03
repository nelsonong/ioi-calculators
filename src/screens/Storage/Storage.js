import React, { Component } from 'react';
import DVRCalculator from '../../components/DVRCalculator';
import InstructionBox from '../../components/InstructionBox';
import './Storage.css';

class Storage extends Component {
    state = {
        calculators: []
    };

    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    unique_id = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    // Add calculator
    addCalculator = (type) => {
        const calculators = this.state.calculators;
        const key = this.unique_id();
        const newCalculators = calculators.concat({
            id: key,
            calculator: <DVRCalculator key={key} id={key} deleteCalculator={this.deleteCalculator} />
        });
        this.setState(() => ({ calculators: newCalculators }));
    }

    // Remove calculator
    deleteCalculator = (id) => {
        const calculators = this.state.calculators;
        const newCalculators = calculators.filter(calculator => calculator.id !== id);
        this.setState(() => ({ calculators: newCalculators }));
    }

    render = () => {
        const calculatorComponents = this.state.calculators.map(calculator => calculator.calculator);
        const text = 'Please click the button above to add a calculator.';
        const instructionBox = (this.state.calculators.length === 0) ? <InstructionBox text={text} /> : '';
        return (
            <div className="storage">
                <div className='storage-title'>
                    Storage Calculators
                </div>
                <div>
                    <button type='button' className='add-dvr-button' onClick={() => this.addCalculator()}>+ DVR</button>
                    {instructionBox}
                </div>
                {calculatorComponents}
            </div>
        );
    }
}

export default Storage;