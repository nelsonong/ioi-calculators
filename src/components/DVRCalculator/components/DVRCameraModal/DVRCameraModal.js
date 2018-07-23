
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleCustomMode } from '../../../../actions/dvrActions';
import Modal from 'react-modal';
import FlareCLCalculator from '../../../FlareCLCalculator';
import FlareCXCalculator from '../../../FlareCXCalculator';
import FlareSDICalculator from '../../../FlareSDICalculator';
import CustomCLCalculator from '../../../CustomCLCalculator';
import CustomCXCalculator from '../../../CustomCXCalculator';
import GEVCalculator from '../../../GEVCalculator';
import styles from './DVRCameraModal.css';

Modal.setAppElement('#root');

class DVRCameraModal extends Component {
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

            case 'gev':
                return (
                    <GEVCalculator
                        cameraId={this.props.cameraId}
                        dvrId={this.props.dvrId}
                    />
                );
        }
    }

    renderCustomButton = () => {
        switch (this.props.cameraType) {
            case 'custom-cl':
                return (
                    <button type='button' className={styles.flareClButton} onClick={this.props.handleToggleCustomMode}>
                        FLARE CL
                    </button>
                );

            case 'custom-cx':
                return (
                    <button type='button' className={styles.flareCxButton} onClick={this.props.handleToggleCustomMode}>
                        FLARE CX
                    </button>
                );

            case 'flare-sdi':
            case 'gev':
                return '';
                
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
    cameraId,
    dvrId,
    cameraState,
    link,
    mode
}) => {
    const calculatorState = !!dvrId
        ? storageCalculators[dvrId].cameras[cameraId]
        : frameRateCalculators[cameraId];
    const { cameraType } = calculatorState;

    return {
        cameraType,
        isOpen,
        cameraId,
        dvrId,
        cameraState,
        link,
        mode
    };
};

const mapDispatchToProps = (dispatch, {
    cameraId,
    dvrId,
    closeModal,
    saveAndCloseModal
}) => ({
    handleToggleCustomMode: () => dispatch(toggleCustomMode(dvrId, cameraId)),
    closeModal,
    saveAndCloseModal
});

export default connect(mapStateToProps, mapDispatchToProps)(DVRCameraModal);