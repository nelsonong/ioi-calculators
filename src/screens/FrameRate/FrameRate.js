import React, { Component } from 'react';
import uuid from 'uuid';
import FlareCLCalculator from '../../components/FlareCLCalculator';
import FlareCXCalculator from '../../components/FlareCXCalculator';
import FlareSDICalculator from '../../components/FlareSDICalculator';
import VictoremCalculator from '../../components/VictoremCalculator';
import InstructionBox from '../../components/InstructionBox';
import './FrameRate.css';

class FrameRate extends Component {
    state = {
        calculators: []
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

        const calculators = this.state.calculators.concat({ id: key, calculator });
        this.setState(() => ({ calculators }));
    }

    // Remove calculator
    deleteCalculator = (id) => {
        const calculators = this.state.calculators.filter(calculator => calculator.id !== id);
        this.setState(() => ({ calculators }));
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
                    <button type='button' className='add-flare-button' onClick={() => this.addCalculator('flare-cl')}>+ FLARE CL</button>
                    <button type='button' className='add-flare-button' onClick={() => this.addCalculator('flare-cx')}>+ FLARE CX</button>
                    <button type='button' className='add-flare-button' onClick={() => this.addCalculator('flare-sdi')}>+ FLARE SDI</button>
                    <button type='button' className='add-victorem-button' onClick={() => this.addCalculator('victorem')}>+ VICTOREM</button>
                    {instructionBox}
                </div>
                {calculatorComponents}
            </div>
        );
    }
}

export default FrameRate;
