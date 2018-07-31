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
  // Cancel sorting if the event target is an input, textarea, select or option
  shouldCancelStart = (e) => {
    const tagName = e.target.tagName.toLowerCase();
    if (['button', 'select', 'svg', 'path'].includes(tagName)) {
      return true;
    }

    if (tagName === 'div') {
      const { className } = e.target;
      if (className.includes('DVRCamera')) {
        return true;
      }
    }

    return false;
  }

  onSortEnd = ({
    oldIndex,
    newIndex,
  }) => this.props.handleMove(oldIndex, newIndex);

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
          {instructionBox}
          <CalculatorList
            calculatorEntries={calculatorEntries}
            axis='xy'
            shouldCancelStart={this.shouldCancelStart}
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
