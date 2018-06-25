import React, { Component } from 'react';
import FlareCalculator from './containers/FlareCalculator';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flareCalculators: []
        };

        this.addFlare = this.addFlare.bind(this);
        this.deleteFlare = this.deleteFlare.bind(this);
    }

    unique_id() {
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters
        // after the decimal.
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    addFlare() {
        const flareCalculators = this.state.flareCalculators;
        const key = this.unique_id();
        this.setState({ flareCalculators: flareCalculators.concat({ id: key, calculator: <FlareCalculator key={key} id={key} deleteFlare={this.deleteFlare} /> }) });
    }

    deleteFlare(id) {
        // Get flare calculator with correct key
        const index = this.state.flareCalculators.findIndex(flareCalculator => flareCalculator.id === id);
        if (index === -1)
            return;
        
        // Remove calculator + rerender
        const newState = this.state;
        newState.flareCalculators.splice(index, 1);
        this.setState(newState);
    }

    renderCalculators() {
        return this.state.flareCalculators.map((flareCalculator) => {
            return flareCalculator.calculator;
        });
    }

    render() {
        return (
            <div className="App">
                <h3>
                    IOI Calculators
                </h3>
                <div>
                    <button type='button' className='AddFlare' onClick={this.addFlare}>+ Flare Calculator</button>
                </div>
                {this.renderCalculators()}
            </div>
        );
    }
}

export default App;
