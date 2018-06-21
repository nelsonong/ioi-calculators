import React, { Component } from 'react';
import Calculator from './components/Calculator';
import './App.css';

class App extends Component {
  render() {
    return (
        <div className="App">
            <h3>
                Flare Frame Rate Calculator
            </h3>
            <Calculator />
            <Calculator />
            <Calculator />
        </div>
    );
  }
}

export default App;
