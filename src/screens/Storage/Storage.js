import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  SortableContainer,
  SortableElement,
} from 'react-sortable-hoc';
import uuid from 'uuid';
import {
  addCalculator,
  moveCalculator,
  clearCalculators,
} from '../../actions/managementActions';
import DVRCalculator from '../../components/DVRCalculator';
import InstructionBox from '../../components/InstructionBox';
import styles from './Storage.css';

const Calculator = SortableElement(({ id }) => (
  <DVRCalculator dvrId={id} />
));

const CalculatorList = SortableContainer(({ calculatorEntries }) => (
  <div className={styles.list}>
      {
        calculatorEntries.map((entry, i) => (
          <Calculator
            key={`item-${entry.id}`}
            index={i}
            id={entry.id}
          />
        ))
      }
  </div>
));

class Storage extends Component {
  state = { windowWidth: undefined };

  onSortEnd = ({
    oldIndex,
    newIndex,
  }) => this.props.handleMove(oldIndex, newIndex);

  handleResize = () => this.setState({ windowWidth: window.innerWidth });

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  renderButtonsContainer = () => {
    if (this.state.windowWidth > 640) {
      return (
        <div className={styles.buttonsContainer}>
          <div>
            <button type='button' className={styles.addButton} onClick={() => this.props.handleAdd('dvr')}>
              + DVR
            </button>
          </div>
          <div className={styles.spacer}></div>
          <div>
          </div>
          <div>
            <button type='button' className={styles.clearButton} onClick={this.props.handleClear}>CLEAR</button>
          </div>
        </div>
      );
    }

    return '';
  }

  render = () => {
    const calculatorEntries = this.props.order.map((id) => {
      const calculatorState = this.props.calculators[id];
      return {
        id,
        calculatorState,
      };
    });
    const text = 'Please click the button above to add a calculator.';
    const instructionBox = (calculatorEntries.length === 0) ? <InstructionBox text={text} /> : '';
    return (
      <div className={styles.root}>
        <div className={styles.container}>
          <div className={styles.title}>
            Storage Calculators
          </div>
          {this.renderButtonsContainer()}
          {instructionBox}
          <CalculatorList
            calculatorEntries={calculatorEntries}
            axis='xy'
            onSortStart={(_, event) => event.preventDefault()}
            onSortEnd={this.onSortEnd}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ storageCalculators }) => {
  const { order } = storageCalculators;
  return {
    calculators: storageCalculators,
    order,
  };
};

const mapDispatchToProps = dispatch => ({
  handleAdd: (cameraType) => {
    const dvrId = uuid();
    dispatch(addCalculator(dvrId, cameraType, true));
  },

  handleMove: (oldIndex, newIndex) => dispatch(moveCalculator(oldIndex, newIndex, true)),

  handleClear: () => dispatch(clearCalculators(true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Storage);
