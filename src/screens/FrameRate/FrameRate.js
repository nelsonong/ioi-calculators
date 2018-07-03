import React, { Component } from 'react';
import FlareCalculator from '../../components/FlareCalculator';
import VictoremCalculator from '../../components/VictoremCalculator';
import InstructionBox from '../../components/InstructionBox';
import './FrameRate.css';

class FrameRate extends Component {
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
        if (type === 'flare') {
            const newCalculators = calculators.concat({
                id: key,
                calculator: <FlareCalculator key={key} id={key} deleteCalculator={this.deleteCalculator} />
            });
            this.setState(() => ({ calculators: newCalculators }));
        } else if (type === 'victorem') {
            const newCalculators = calculators.concat({
                id: key,
                calculator: <VictoremCalculator key={key} id={key} deleteCalculator={this.deleteCalculator} />
            });
            this.setState(() => ({ calculators: newCalculators }));
        }
    }

    // Remove calculator
    deleteCalculator = (id) => {
        const calculators = this.state.calculators;
        const newCalculators = calculators.filter(calculator => calculator.id !== id);
        this.setState(() => ({ calculators: newCalculators }));
    }

    render = () => {
        const calculatorComponents = this.state.calculators.map(calculator => calculator.calculator);
        const text = 'Please select a button above to add a calculator.';
        const instructionBox = (this.state.calculators.length === 0) ? <InstructionBox text={text} /> : '';
        return (
            <div className="frame-rate">
                <div className='frame-rate-title'>
                    Frame Rate Calculators
                </div>
                <div>
                    <button type='button' className='add-flare-button' onClick={() => this.addCalculator('flare')}>+ FLARE</button>
                    <button type='button' className='add-victorem-button' onClick={() => this.addCalculator('victorem')}>+ VICTOREM</button>
                    {instructionBox}
                </div>
                {calculatorComponents}
            </div>
        );
    }
}

export default FrameRate;
