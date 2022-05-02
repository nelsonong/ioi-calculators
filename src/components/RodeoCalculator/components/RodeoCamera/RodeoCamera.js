import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  MdAddCircle,
  MdCreate,
  MdClear,
} from 'react-icons/lib/md';
import cx from 'classnames';
import {
  pushDataRate,
  deleteDataRate,
  revertCameraState,
  copyCameraState,
  pasteCameraState,
  duplicateCameraState,
} from '../../../../actions/rodeoActions';
import RodeoCameraModal from '../RodeoCameraModal';
import styles from './RodeoCamera.css';

class RodeoCamera extends Component {
  // FIXME: added prop not getting passed correctly from redux
  state = {
    isHovered: false,
    modalIsOpen: false,
    cachedCameraState: this.props.cameraState,
    added: this.props.added,
  };

  deleteCamera = () => {
    this.props.handleDeleteDataRate();
    this.setState(() => ({
      cachedCameraState: this.props.cameraState,
      added: false,
    }));
  }

  copyCamera = () => {
    this.props.handleCopyCameraState();
    this.setState(() => ({ isHovered: false }));
  }

  pasteCamera = () => {
    this.props.handlePasteCameraState();
    this.setState(() => ({ isHovered: false }));
  }

  duplicateCamera = () => {
    this.props.handleDuplicateCameraState();
    this.setState(() => ({ isHovered: false }));
  }

  openModal = () => this.setState(() => ({
    modalIsOpen: true,
    cachedCameraState: this.props.cameraState,
  }));

  closeModal = () => {
    this.setState(() => ({
      modalIsOpen: false,
      isHovered: false,
    }));
    this.props.handleRevertCameraState(this.state.cachedCameraState);
  }

  saveAndCloseModal = () => {
    this.props.handlePushDataRate(this.props.dataRate);
    this.setState(() => ({
      modalIsOpen: false,
      isHovered: false,
      cachedCameraState: this.props.cameraState,
      added: true,
    }));
  }

  openHoverOverlay = () => this.setState(() => ({ isHovered: true }));

  closeHoverOverlay = () => this.setState(() => ({ isHovered: false }));

  renderContents = () => {
    let contents = (
      <div className={styles.addButtonContainer} onClick={this.openModal}>
        <button type='button' className={styles.addButton}>
          <MdAddCircle size={46} />
        </button>
        <br/>
      </div>
    );
    if (this.props.added) {
      contents = this.state.isHovered ? (
        <div className={styles.hoverContainer} onClick={this.closeHoverOverlay}>
          <button type='button' className={styles.editButton} onClick={this.openModal}>
            <MdCreate size={18} />
          </button>
          <button type='button' className={styles.deleteButton} onClick={this.deleteCamera}>
            <MdClear size={18} />
          </button>
        </div>
      ) : (
        this.infoContents()
      );
    }

    return contents;
  }

  infoContents = () => {
    const {
      model,
      width,
      height,
      bitDepth,
      outputBitDepth,
      adcBitDepth,
      format,
      frameRate,
      dataRate,
    } = this.props;
    let bitDepthValue;
    if (bitDepth) {
      const bitDepthString = typeof bitDepth === 'string';
      bitDepthValue = bitDepthString ? Number(bitDepth.match(/\d+/)[0]) : bitDepth;
    } else if (outputBitDepth) {
      bitDepthValue = outputBitDepth;
    } else if (adcBitDepth) {
      bitDepthValue = adcBitDepth;
    }

    const bitDepthStyle = bitDepthValue >= 10 ? styles.infoSmall : styles.info;
    const bitDepthText = bitDepthValue ? `${bitDepthValue}-bit` : '';
    return (
      <div onClick={this.openHoverOverlay}>
        <div className={styles.info}>
          {model}
        </div>
        <div className={styles.info}>
          {width}x{height}
        </div>
        <div className={bitDepthStyle}>
          {bitDepthText} {Number(frameRate).toFixed(2)}fps
        </div>
        <div className={styles.dataRate}>
          {Number(dataRate).toFixed(2)} MB/s
        </div>
      </div>
    );
  }

  render = () => {
    const root = cx(styles.root, { [styles.added]: !!this.props.added });
    return (
      <div
        className={root}
        onMouseEnter={this.openHoverOverlay}
        onMouseLeave={this.closeHoverOverlay}
      >
        <div className={styles.title}>
          {this.props.mode}
        </div>
        {this.renderContents()}
        {
          this.state.modalIsOpen
          && <RodeoCameraModal
            modalIsOpen={this.state.modalIsOpen}
            cameraState={this.props.cameraState}
            cameraId={this.props.cameraId}
            dvrId={this.props.dvrId}
            link={this.props.link}
            mode={this.props.mode}
            closeModal={this.closeModal}
            saveAndCloseModal={this.saveAndCloseModal}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = ({ storageCalculators }, {
  cameraId,
  dvrId,
  link,
  mode,
}) => {
  const cameraState = storageCalculators[dvrId].cameras[cameraId];
  const {
    model,
    width,
    height,
    bitDepth,
    adcBitDepth,
    outputBitDepth,
    format,
    frameRate,
    dataRate,
    added,
  } = cameraState;
  return {
    cameraId,
    dvrId,
    link,
    mode,
    model,
    width,
    height,
    bitDepth,
    adcBitDepth,
    outputBitDepth,
    format,
    frameRate,
    dataRate,
    added: !!added,
    cameraState,
  };
};

const mapDispatchToProps = (dispatch, {
  cameraId,
  dvrId,
}) => ({
  handlePushDataRate: (dataRate) => {
    dispatch(pushDataRate(dvrId, cameraId, dataRate));
  },

  handleDeleteDataRate: () => {
    dispatch(deleteDataRate(dvrId, cameraId));
  },

  handleRevertCameraState: (cameraState) => {
    dispatch(revertCameraState(dvrId, cameraId, cameraState));
  },

  handleCopyCameraState: () => {
    dispatch(copyCameraState(dvrId, cameraId));
  },

  handlePasteCameraState: () => {
    dispatch(pasteCameraState(dvrId, cameraId));
  },

  handleDuplicateCameraState: () => {
    dispatch(duplicateCameraState(dvrId, cameraId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RodeoCamera);
