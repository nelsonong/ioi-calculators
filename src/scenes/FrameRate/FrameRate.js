import React, { Component } from 'react';
import FlareCalculator from './components/FlareCalculator';
import VictoremCalculator from './components/VictoremCalculator';
import InstructionBox from '../../components/InstructionBox';
import './FrameRate.css';

class FrameRate extends Component {
    state = {
        calculators: []
    };

    unique_id = () => {
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters
        // after the decimal.
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    addCalculator = (type) => {
        const calculators = this.state.calculators;
        const key = this.unique_id();
        if (type === 'flare') {
            this.setState({ calculators: calculators.concat({ id: key, calculator: <FlareCalculator key={key} id={key} deleteCalculator={this.deleteCalculator} /> }) });
        } else if (type === 'victorem') {
            this.setState({ calculators: calculators.concat({ id: key, calculator: <VictoremCalculator key={key} id={key} deleteCalculator={this.deleteCalculator} /> }) });
        }
    }

    deleteCalculator = (id) => {
        // Get calculator with id
        const index = this.state.calculators.findIndex(calculator => calculator.id === id);
        if (index === -1)
            return;
        
        // Remove calculator + rerender
        const newState = this.state;
        newState.calculators.splice(index, 1);
        this.setState(newState);
    }

    renderCalculators = () => {
        return this.state.calculators.map((calculator) => {
            return calculator.calculator;
        });
    }

    render = () => {
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
                {this.renderCalculators()}
            </div>
        );
    }
}

export default FrameRate;
