
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleCustomMode } from '../../../../actions/dvrActions';
import Modal from 'react-modal';
import FlareCLCalculator from '../../../FlareCLCalculator';
import FlareCXCalculator from '../../../FlareCXCalculator';
import FlareSDICalculator from '../../../FlareSDICalculator';
import CustomCLCalculator from '../../../CustomCLCalculator';
import styles from './DVRCameraModal.css';

Modal.setAppElement('#root');

class DVRCameraModal extends Component {
    renderCamera = () => {
        switch (this.props.cameraType) {
            case 'flare-cl':
                return (
                    <FlareCLCalculator
                        id={this.props.id}
                        dvrId={this.props.dvrId}
                        mode={this.props.mode}
                    />
                );
            case 'flare-cx':
                return (
                    <FlareCXCalculator
                        id={this.props.id}
                        dvrId={this.props.dvrId}
                        mode={this.props.mode}
                    />
                );
            case 'flare-sdi':
                return (
                    <FlareSDICalculator
                        id={this.props.id}
                        dvrId={this.props.dvrId}
                        mode={this.props.mode}
                    />
                );
            case 'custom-cl':
                return (
                    <CustomCLCalculator
                        id={this.props.id}
                        dvrId={this.props.dvrId}
                        mode={this.props.mode}
                    />
                );
        }
    }

    renderCustomButton = () => {
        switch (this.props.cameraType) {
            case 'custom-cl':
                return (
                    <button type='button' className={styles.flareClButton} onClick={this.props.handleToggleCustomMode}>
                        FLARE
                    </button>
                );
            default:
                return (
                    <button type='button' className={styles.customButton} onClick={this.props.handleToggleCustomMode}>
                        CUSTOM
                    </button>
                );
        }
    }

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
                <div>
                    {this.renderCustomButton()}
                    <button type='button' className={styles.saveButton} onClick={this.props.saveAndCloseModal}>SAVE</button>
                </div>
            </div>
        </Modal>
    );
}

const mapStateToProps = ({
    storageCalculators,
    frameRateCalculators
}, {
    isOpen,
    id,
    dvrId,
    cameraState,
    link,
    mode
}) => {
    const calculatorState = (!!dvrId) ? storageCalculators.get(dvrId).cameras.get(id) :
                                        frameRateCalculators.get(id);
    const { cameraType } = calculatorState;

    return {
        cameraType,
        isOpen,
        id,
        dvrId,
        cameraState,
        link,
        mode
    };
};

const mapDispatchToProps = (dispatch, { id, dvrId, closeModal, saveAndCloseModal }) => ({
    handleToggleCustomMode: () => dispatch(toggleCustomMode(dvrId, id)),
    closeModal,
    saveAndCloseModal
});

export default connect(mapStateToProps, mapDispatchToProps)(DVRCameraModal);