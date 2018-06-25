import React, { Component } from 'react';
import FlareCalculator from './containers/FlareCalculator';
import VictoremCalculator from './containers/VictoremCalculator';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            calculators: []
        };

        this.addCalculator = this.addCalculator.bind(this);
        this.deleteCalculator = this.deleteCalculator.bind(this);
    }

    unique_id() {
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters
        // after the decimal.
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    addCalculator(type) {
        const calculators = this.state.calculators;
        const key = this.unique_id();
        if (type === 'flare') {
            this.setState({ calculators: calculators.concat({ id: key, calculator: <FlareCalculator key={key} id={key} deleteCalculator={this.deleteCalculator} /> }) });
        } else if (type === 'victorem') {
            this.setState({ calculators: calculators.concat({ id: key, calculator: <VictoremCalculator key={key} id={key} deleteCalculator={this.deleteCalculator} /> }) });
        }
    }

    deleteCalculator(id) {
        // Get calculator with id
        const index = this.state.calculators.findIndex(calculator => calculator.id === id);
        if (index === -1)
            return;
        
        // Remove calculator + rerender
        const newState = this.state;
        newState.calculators.splice(index, 1);
        this.setState(newState);
    }

    renderCalculators() {
        return this.state.calculators.map((calculator) => {
            return calculator.calculator;
        });
    }

    render() {
        return (
            <div className="App">
                <h3>
                    IOI Calculators
                </h3>
                <div>
                    <button type='button' className='AddFlare' onClick={() => this.addCalculator('flare')}>+ Flare Calculator</button>
                    <button type='button' className='AddVictorem' onClick={() => this.addCalculator('victorem')}>+ Victorem Calculator</button>
                </div>
                {this.renderCalculators()}
            </div>
        );
    }
}

export default App;
