
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import FlareCLCalculator from '../../../FlareCLCalculator';
import FlareCXCalculator from '../../../FlareCXCalculator';
import FlareSDICalculator from '../../../FlareSDICalculator';
import { LINK } from '../../constants';
import styles from './DVRCameraModal.css';

Modal.setAppElement('#root');

class DVRCameraModal extends Component {
    renderCamera = () => {
        switch (this.props.link) {
            case LINK.CL:
                return (
                    <FlareCLCalculator
                        id={this.props.id}
                        dvrId={this.props.dvrId}
                        mode={this.props.mode}
                    />
                );
            case LINK.CX:
                return (
                    <FlareCXCalculator
                        id={this.props.id}
                        dvrId={this.props.dvrId}
                        mode={this.props.mode}
                    />
                );
            case LINK.SDI:
                return (
                    <FlareSDICalculator
                        id={this.props.id}
                        dvrId={this.props.dvrId}
                        mode={this.props.mode}
                    />
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
                    <button type='button' className={styles.saveButton} onClick={this.props.saveAndCloseModal}>Save</button>
                </div>
            </div>
        </Modal>
    );
}

const mapStateToProps = (state, { isOpen, id, dvrId, cameraState, link, mode }) => ({
    isOpen,
    id,
    dvrId,
    cameraState,
    link,
    mode
});

const mapDispatchToProps = (dispatch, { closeModal, saveAndCloseModal }) => ({
    closeModal,
    saveAndCloseModal
});

export default connect(mapStateToProps, mapDispatchToProps)(DVRCameraModal);