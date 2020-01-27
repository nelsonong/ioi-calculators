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
import FlareCLCalculator from '../../components/FlareCLCalculator';
import FlareCXCalculator from '../../components/FlareCXCalculator';
import FlareSDICalculator from '../../components/FlareSDICalculator';
import VictoremCXCalculator from '../../components/VictoremCXCalculator';
import VictoremSDICalculator from '../../components/VictoremSDICalculator';
import VolucamCalculator from '../../components/VolucamCalculator';
import InstructionBox from '../../components/InstructionBox';
import styles from './FrameRate.css';

const Calculator = SortableElement(({
  id,
  calculatorState,
}) => {
  const { cameraType } = calculatorState;
  switch (cameraType) {
    case 'flare-cl':
      return <FlareCLCalculator cameraId={id} />;

    case 'flare-cx':
      return <FlareCXCalculator cameraId={id} />;

    case 'flare-sdi':
      return <FlareSDICalculator cameraId={id} />;

    case 'victorem-cx':
      return <VictoremCXCalculator cameraId={id} />;

    case 'victorem-sdi':
      return <VictoremSDICalculator cameraId={id} />;

    case 'volucam':
      return <VolucamCalculator cameraId={id} />;

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

class FrameRate extends Component {
  state = { windowWidth: undefined };

  // Cancel sorting if the event target is an input, textarea, select or option
  shouldCancelStart = (e) => {
    if (['button', 'input', 'select', 'option'].includes(e.target.tagName.toLowerCase())) {
      return true;
    }

    return false;
  }

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
    if (this.state.windowWidth < 825) {
      return (
        <div className={`${styles.buttonsContainer} ${styles.blockButtonsContainer}`}>
          <div className={`${styles.buttonContainer} ${styles.blockButtonContainer}`}>
            <div className={styles.buttonContainerText}>FLARE</div>
            <button type='button' className={styles.flareClButton} onClick={() => this.props.handleAdd('flare-cl')}>
              + CL
            </button>
            <button type='button' className={styles.flareCxButton} onClick={() => this.props.handleAdd('flare-cx')}>
              + CX
            </button>
            <button type='button' className={styles.flareSdiButton} onClick={() => this.props.handleAdd('flare-sdi')}>
              + SDI
              </button>
          </div>
          <div className={`${styles.buttonContainer} ${styles.blockButtonContainer}`}>
            <div className={styles.buttonContainerText}>VICTOREM</div>
            <button
              type='button'
              className={styles.victoremCxButton}
              onClick={() => this.props.handleAdd('victorem-cx')}
            >
              + CX
            </button>
            <button
              type='button'
              className={styles.victoremSdiButton}
              onClick={() => this.props.handleAdd('victorem-sdi')}
            >
              + SDI
            </button>
          </div>
          <div className={`${styles.buttonContainer} ${styles.blockButtonContainer}`}>
            <div className={styles.buttonContainerText}>VOLUCAM</div>
            <button type='button' className={styles.volucamButton} onClick={() => this.props.handleAdd('volucam')}>
              +
            </button>
          </div>
          <button
            type='button'
            className={`${styles.clearButton} ${styles.blockButton}`}
            onClick={this.props.handleClear}>
            CLEAR
          </button>
        </div>
      );
    }

    return (
      <div className={styles.buttonsContainer}>
        <div>
          <div className={styles.buttonContainer}>
            <div className={styles.buttonContainerText}>FLARE</div>
            <button type='button' className={styles.flareClButton} onClick={() => this.props.handleAdd('flare-cl')}>
              + CL
            </button>
            <button type='button' className={styles.flareCxButton} onClick={() => this.props.handleAdd('flare-cx')}>
              + CX
            </button>
            <button type='button' className={styles.flareSdiButton} onClick={() => this.props.handleAdd('flare-sdi')}>
              + SDI
            </button>
          </div>
          <div className={styles.buttonSpacer}></div>
          <div className={styles.buttonContainer}>
            <div className={styles.buttonContainerText}>VICTOREM</div>
              <button
                type='button'
                className={styles.victoremCxButton}
                onClick={() => this.props.handleAdd('victorem-cx')}
              >
                + CX
              </button>
              <button
                type='button'
                className={styles.victoremSdiButton}
                onClick={() => this.props.handleAdd('victorem-sdi')}
              >
                + SDI
              </button>
            </div>
          <div className={styles.buttonSpacer}></div>
          <div className={styles.buttonContainer}>
            <div className={styles.buttonContainerText}>VOLUCAM</div>
            <button type='button' className={styles.volucamButton} onClick={() => this.props.handleAdd('volucam')}>
              +
            </button>
          </div>
          <div className={styles.buttonSpacer}></div>
        </div>
        <div>
          <div className={styles.buttonSpacer}></div>
          <button type='button' className={styles.clearButton} onClick={this.props.handleClear}>CLEAR</button>
        </div>
      </div>
    );
  }

  render = () => {
    const calculatorEntries = this.props.order.map((id) => {
      const calculatorState = this.props.calculators[id];
      return {
        id,
        calculatorState,
      };
    });
    const text = 'Please select a button above to add a calculator.';
    const instructionBox = (calculatorEntries.length === 0) ? <InstructionBox text={text} /> : '';
    return (
      <div className={styles.root}>
        <div className={styles.container}>
          <div className={styles.title}>
            Frame Rate Calculators
          </div>
          {this.renderButtonsContainer()}
          {instructionBox}
          <CalculatorList
            calculatorEntries={calculatorEntries}
            axis='xy'
            shouldCancelStart={this.shouldCancelStart}
            onSortStart={(_, e) => e.preventDefault()}
            onSortEnd={this.onSortEnd}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ frameRateCalculators }) => {
  const { order } = frameRateCalculators;
  return {
    calculators: frameRateCalculators,
    order,
  };
};

const mapDispatchToProps = dispatch => ({
  handleAdd: (cameraType) => {
    const cameraId = uuid();
    dispatch(addCalculator(cameraId, cameraType));
  },

  handleMove: (oldIndex, newIndex) => dispatch(moveCalculator(oldIndex, newIndex)),

  handleClear: () => dispatch(clearCalculators()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FrameRate);
