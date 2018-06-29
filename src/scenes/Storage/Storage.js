import React, { Component } from 'React';
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

    addCalculator = () => {

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
        return (
            <div className="storage">
                <div className='storage-title'>
                    Storage Calculators
                </div>
                <div>
                    <button type='button' className='add-dvr-button' onClick={() => this.addCalculator()}>+ DVR</button>
                </div>
                {this.renderCalculators()}
            </div>
        );
    }
}

export default Storage;