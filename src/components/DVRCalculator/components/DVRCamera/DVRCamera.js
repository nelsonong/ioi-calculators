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
} from '../../../../actions/dvrActions';
import DVRCameraModal from '../DVRCameraModal';
import styles from './DVRCamera.css';

class DVRCamera extends Component {
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

  openModal = () => this.setState(() => ({ modalIsOpen: true }));

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
          <MdAddCircle size={43} />
        </button>
      </div>
    );
    if (this.state.added) {
      contents = this.state.isHovered ? (
        <div>
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
      dataRate,
    } = this.props;
    return (
      <div>
        <div className={styles.info}>
          {model}
        </div>
        <div className={styles.info}>
          {width}x{height}
        </div>
        <div className={styles.dataRate}>
          {(dataRate / 1024).toFixed(2)} GB/s
        </div>
      </div>
    );
  }

  render = () => {
    const root = cx(styles.root, { [styles.added]: !!this.state.added });
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
          && <DVRCameraModal
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
});

export default connect(mapStateToProps, mapDispatchToProps)(DVRCamera);
