import React, { Component } from 'react';
import FlareCalculator from './containers/FlareCalculator';
import './App.css';

class App extends Component {
  render() {
    return (
        <div className="App">
            <h3>
                Flare Frame Rate Calculator
            </h3>
            <FlareCalculator />
            <FlareCalculator />
            <FlareCalculator />
        </div>
    );
  }
}

export default App;
