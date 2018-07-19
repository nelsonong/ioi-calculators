import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushDataRate, deleteDataRate, revertCameraState } from '../../../../actions/dvrActions';
import { DVRCameraModal } from '../DVRCameraModal';
import cx from 'classnames';
import plus from '../../../../images/plus.png';
import edit from '../../../../images/edit.png';
import remove from '../../../../images/remove.png';
import styles from './DVRCamera.css';

class DVRCamera extends Component {
    state = {
        modal: null,
        added: false,
        isHovered: false,
        modalIsOpen: false,
        cachedCameraState: this.props.cameraState
    };

    addCamera = () => {
        this.openModal();
    }

    deleteCamera = () => {
        this.setState(() => ({ added: false, modal: null }));
        this.props.handleDeleteDataRate();
    }

    openModal = () => this.setState(() => ({ modalIsOpen: true }));

    closeModal = () => {
        this.setState(() => ({ modalIsOpen: false, isHovered: false }));
        this.props.handleRevertCameraState(this.state.cachedCameraState);
    }

    saveAndCloseModal = () => {
        this.setState(() => ({
            modalIsOpen: false,
            added: true,
            isHovered: false,
            cachedCameraState: this.props.cameraState
        }));
        
        this.props.handlePushDataRate(this.props.cameraState.dataRate);
    }

    openHoverOverlay = () => this.setState(() => ({ isHovered: true }));

    closeHoverOverlay = () => this.setState(() => ({ isHovered: false }));

    renderContents = () => {
        let contents = (
            <button type='button' className={styles.addButton} onClick={this.addCamera}><img src={plus}></img></button>
        );

        if (this.state.added) {
            contents = this.state.isHovered ? (
                <div>
                    <button type='button' className={styles.editButton} onClick={this.openModal}><img src={edit}></img></button>
                    <button type='button' className={styles.deleteButton} onClick={this.deleteCamera}><img src={remove}></img></button>
                </div>
            ) : (
                this.infoContents()
            );
        }
        return contents;
    }

    infoContents = () => {
        const { model, width, height, dataRate } = this.props.cameraState;
        return (
            <div>
                {
                    model &&
                    <div className={styles.info}>
                        {model}
                    </div>
                }
                <div className={styles.info}>
                    {this.props.cameraState.width}x{this.props.cameraState.height}
                </div>
                <div className={styles.dataRate}>
                    {(this.props.cameraState.dataRate / 1024).toFixed(2)} GB/s
                </div>
            </div>
        );
    }

    render = () => {
        const root = cx(styles.root, {
            [styles.added]: !!this.state.added
        });
        return (
            <div className={root} onMouseEnter={this.openHoverOverlay} onMouseLeave={this.closeHoverOverlay}>
                <div className={styles.title}>
                    {this.props.mode}
                </div>
                {this.renderContents()}
                {
                    this.state.modalIsOpen &&
                    <DVRCameraModal
                        modalIsOpen={this.state.modalIsOpen}
                        cameraState={this.props.cameraState}
                        id={this.props.id}
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

const mapStateToProps = (state, { id, dvrId, link, mode }) => {
    const cameraState = state.storageCalculators.get(dvrId).cameras.get(id);
    return {
        id,
        dvrId,
        cameraState,
        link,
        mode
    };
};

const mapDispatchToProps = (dispatch, { id, dvrId }) => ({
    handlePushDataRate: (dataRate) => {
        dataRate = Number(dataRate);
        dispatch(pushDataRate(dvrId, id, dataRate));
    },
    handleDeleteDataRate: () => {
        dispatch(deleteDataRate(dvrId, id));
    },
    handleRevertCameraState: (cameraState) => {
        dispatch(revertCameraState(dvrId, id, cameraState));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(DVRCamera);