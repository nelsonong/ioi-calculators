import React, { Component } from 'React';
import DVRCalculator from '../../components/DVRCalculator';
import InstructionBox from '../../components/InstructionBox';
import './Storage.css';

class Storage extends Component {
    state = {
        calculators: []
    }

    unique_id = () => {
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters
        // after the decimal.
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    addCalculator = (type) => {
        const calculators = this.state.calculators;
        const key = this.unique_id();
        this.setState({ calculators: calculators.concat({
            id: key,
            calculator: <DVRCalculator key={key} id={key} deleteCalculator={this.deleteCalculator} /> })
        });
    }

    renderCalculators = () => {
        return this.state.calculators.map((calculator) => {
            return calculator.calculator;
        });
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

    render = () => {
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
                {this.renderCalculators()}
            </div>
        );
    }
}

export default Storage;