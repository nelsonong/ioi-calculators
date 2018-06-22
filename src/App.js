import React, { Component } from 'react';
import FlareCalculator from './containers/FlareCalculator';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flareCalculators: [ <FlareCalculator /> ]
        };

        this.addFlare = this.addFlare.bind(this);
    }

    addFlare() {
        const flareCalculators = this.state.flareCalculators;
        this.setState({ flareCalculators: flareCalculators.concat(<FlareCalculator />) });
    }

    render() {
        return (
            <div className="App">
                <h3>
                    Flare Frame Rate Calculator
                </h3>
                <div className='AddButtons'>
                    <button type='button' onClick={this.addFlare}>Add Flare Calculator</button>
                </div>
                {this.state.flareCalculators}
            </div>
        );
    }
}

export default App;
