
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { MdSave } from 'react-icons/lib/md';
import { toggleCamera } from '../../../../actions/core2Actions';
import FlareCLCalculator from '../../../FlareCLCalculator';
import FlareCXCalculator from '../../../FlareCXCalculator';
import FlareSDICalculator from '../../../FlareSDICalculator';
import RedwoodCalculator from '../../../RedwoodCalculator';
import VictoremCXCalculator from '../../../VictoremCXCalculator';
import VictoremSDICalculator from '../../../VictoremSDICalculator';
import CustomCLCalculator from '../../../CustomCLCalculator';
import CustomCXCalculator from '../../../CustomCXCalculator';
import CustomSDICalculator from '../../../CustomSDICalculator';
import GEVCalculator from '../../../GEVCalculator';
import NTSCCalculator from '../../../NTSCCalculator';
import { MODE } from '../../constants';
import styles from './Core2CameraModal.css';

Modal.setAppElement('#root');

class Core2CameraModal extends Component {
  renderCamera = () => {
    switch (this.props.cameraType) {
      case 'flare-cl':
        return (
          <FlareCLCalculator
            cameraId={this.props.cameraId}
            dvrId={this.props.dvrId}
            mode={this.props.mode}
          />
        );

      case 'flare-cx':
        return (
          <FlareCXCalculator
            cameraId={this.props.cameraId}
            dvrId={this.props.dvrId}
            mode={this.props.mode}
          />
        );

      case 'flare-sdi':
        return (
          <FlareSDICalculator
            cameraId={this.props.cameraId}
            dvrId={this.props.dvrId}
            mode={this.props.mode}
          />
        );

      case 'redwood':
        return (
          <RedwoodCalculator
            cameraId={this.props.cameraId}
            dvrId={this.props.dvrId}
            mode={this.props.mode}
          />
        );

      case 'victorem-cx':
        return (
          <VictoremCXCalculator
            cameraId={this.props.cameraId}
            dvrId={this.props.dvrId}
            mode={this.props.mode}
          />
        );

      case 'victorem-sdi':
        return (
          <VictoremSDICalculator
            cameraId={this.props.cameraId}
            dvrId={this.props.dvrId}
            mode={this.props.mode}
          />
        );

      case 'custom-cl':
        return (
          <CustomCLCalculator
            cameraId={this.props.cameraId}
            dvrId={this.props.dvrId}
            mode={this.props.mode}
          />
        );

      case 'custom-cx':
        return (
          <CustomCXCalculator
            cameraId={this.props.cameraId}
            dvrId={this.props.dvrId}
            mode={this.props.mode}
          />
        );

      case 'custom-sdi':
        return (
          <CustomSDICalculator
            cameraId={this.props.cameraId}
            dvrId={this.props.dvrId}
            mode={this.props.mode}
            model={this.props.model}
          />
        );

      case 'gev':
        return (
          <GEVCalculator
            cameraId={this.props.cameraId}
            dvrId={this.props.dvrId}
          />
        );

      case 'ntsc':
        return (
          <NTSCCalculator
            cameraId={this.props.cameraId}
            dvrId={this.props.dvrId}
          />
        );

      default:
        return '';
    }
  }

  renderCustomButtons = () => {
    switch (this.props.cameraType) {
      case 'flare-cl':
        return this.createButtons(['custom-cl']);

      case 'flare-cx':
        if (this.props.mode === MODE.QUAD) {
          return this.createButtons(['redwood', 'custom-cx']);
        }

        return this.createButtons(['redwood', 'victorem-cx', 'custom-cx']);

      case 'flare-sdi':
        return this.createButtons(['victorem-sdi', 'custom-sdi']);

      case 'redwood':
        if (this.props.mode === MODE.QUAD) {
          return this.createButtons(['flare-cx', 'custom-cx']);
        }

        return this.createButtons(['flare-cx', 'victorem-cx', 'custom-cx']);

      case 'victorem-cx':
        return this.createButtons(['redwood', 'flare-cx', 'custom-cx']);

      case 'victorem-sdi':
        return this.createButtons(['flare-sdi', 'custom-sdi']);

      case 'custom-cl':
        return this.createButtons(['flare-cl']);

      case 'custom-cx':
        if (this.props.mode === MODE.QUAD) {
          return this.createButtons(['redwood', 'flare-cx']);
        }

        return this.createButtons(['redwood', 'flare-cx', 'victorem-cx']);

      case 'custom-sdi':
        return this.createButtons(['flare-sdi', 'victorem-sdi']);

      default:
        return '';
    }
  }

  createButtons = cameraTypes => cameraTypes.map((cameraType, i) => {
    let buttonStyle;
    let text;
    switch (cameraType) {
      case 'flare-cl':
        buttonStyle = styles.flareClButton;
        text = 'FLARE';
        break;

      case 'flare-cx':
        buttonStyle = styles.flareCxButton;
        text = 'FLARE';
        break;

      case 'flare-sdi':
        buttonStyle = styles.flareSdiButton;
        text = 'FLARE';
        break;

      case 'redwood':
        buttonStyle = styles.redwoodButton;
        text = 'REDWOOD';
        break;

      case 'victorem-cx':
        buttonStyle = styles.victoremCxButton;
        text = 'VICTOREM';
        break;

      case 'victorem-sdi':
        buttonStyle = styles.victoremSdiButton;
        text = 'VICTOREM';
        break;

      case 'custom-cl':
      case 'custom-cx':
      case 'custom-sdi':
        buttonStyle = styles.customButton;
        text = 'CUSTOM';
        break;

      default:
        return '';
    }

    return (
      <button
        type='button'
        key={i}
        className={buttonStyle}
        onClick={() => this.props.handleToggleCamera(cameraType)}
      >
        {text}
      </button>
    );
  });

  render = () => (
    <Modal
      isOpen={this.props.modalIsOpen}
      contentLabel='Edit Camera'
      onRequestClose={this.props.closeModal}
      closeTimeoutMS={200}
      className={styles.root}
      overlayClassName={styles.overlay}
    >
      <div>
        <div className={styles.title}>
          <div className={styles.leftSpacer}></div>
          <div className={styles.text}>
            Edit Camera
          </div>
          <button type='button' className={styles.closeButton} onClick={this.props.closeModal}>✖</button>
        </div>
        {this.renderCamera()}
        <div className={styles.modalButtonsContainer}>
          <div>
            {this.renderCustomButtons()}
          </div>
          <button type='button' className={styles.saveButton} onClick={this.props.saveAndCloseModal}>
            <MdSave size={18} />
          </button>
        </div>
      </div>
    </Modal>
  );
}

const mapStateToProps = ({
  storageCalculators,
  frameRateCalculators,
}, {
  isOpen,
  cameraId,
  dvrId,
  cameraState,
  link,
  mode,
}) => {
  const calculatorState = dvrId
    ? storageCalculators[dvrId].cameras[cameraId]
    : frameRateCalculators[cameraId];
  const { cameraType } = calculatorState;
  const { model } = storageCalculators[dvrId];
  return {
    cameraType,
    isOpen,
    cameraId,
    dvrId,
    cameraState,
    link,
    mode,
    model,
  };
};

const mapDispatchToProps = (dispatch, {
  cameraId,
  dvrId,
  closeModal,
  saveAndCloseModal,
}) => ({
  closeModal,
  saveAndCloseModal,
  handleToggleCamera: cameraType => dispatch(toggleCamera(dvrId, cameraId, cameraType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Core2CameraModal);
