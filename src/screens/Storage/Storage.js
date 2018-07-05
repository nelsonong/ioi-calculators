import React, { Component } from 'react';
import uuid from 'uuid';
import DVRCalculator from '../../components/DVRCalculator';
import InstructionBox from '../../components/InstructionBox';
import './Storage.css';

class Storage extends Component {
    state = {
        calculators: []
    };

    // Add calculator
    addCalculator = (type) => {
        const calculators = this.state.calculators;
        const key = uuid();
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