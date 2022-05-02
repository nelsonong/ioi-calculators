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
import Core2Calculator from '../../components/Core2Calculator';
import RodeoCalculator from '../../components/RodeoCalculator';
import InstructionBox from '../../components/InstructionBox';
import styles from './DVRs.css';

const Calculator = SortableElement(({
  id,
  calculatorState,
}) => {
  const { cameraType } = calculatorState;
  switch (cameraType) {
    case 'core2':
      return <Core2Calculator dvrId={id} />;

    case 'rodeo':
      return <RodeoCalculator dvrId={id} />;

    default:
      return '';
  }
});

const CalculatorList = SortableContainer(({ calculatorEntries }) => (
  <div className={styles.list}>
      {
        calculatorEntries.map((entry, i) => (
          <Calculator
            key={`item-${entry.id}`}
            index={i}
            id={entry.id}
            calculatorState={entry.calculatorState}
          />
        ))
      }
  </div>
));

class DVRs extends Component {
  // Cancel sorting if the event target is an input, textarea, select or option
  shouldCancelStart = (e) => {
    const tagName = e.target.tagName.toLowerCase();
    if (['button', 'select', 'svg', 'path'].includes(tagName)) {
      return true;
    }

    if (tagName === 'div') {
      const { className } = e.target;
      if (className.includes('Core2Camera')) {
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
    const text = `Please select the button above to add a DVR calculator.
    The calculator will have camera slots that should be filled with the camera type
    you plan to connect to the DVR. The data rate and recording time will be displayed
    at the bottom.`;
    const instructionBox = (calculatorEntries.length === 0) ? <InstructionBox text={text} /> : '';
    return (
      <div className={styles.root}>
        <div className={styles.container}>
          <div className={styles.title}>
            DVR Calculators
          </div>
          <div className={`${styles.buttonsContainer}`}>
            <div>
              <div className={`${styles.buttonContainer} ${styles.buttonsInner}`}>
                <div className={styles.buttonContainerText}>CORE 2</div>
                <button type='button' className={styles.addCore2Button} onClick={() => this.props.handleAdd('core2')}>
                  +
                </button>
              </div>
              <div className={`${styles.buttonContainer} ${styles.buttonsInner}`}>
                <div className={styles.buttonContainerText}>RODEO</div>
                <button type='button' className={styles.addRodeoButton} onClick={() => this.props.handleAdd('rodeo')}>
                  +
                </button>
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DVRs);
