
import React from 'react';
import Modal from 'react-modal';
import styles from './DVRCameraModal.css';

Modal.setAppElement('#root');

const DVRCameraModal = ({ isOpen, camera, closeModal }) => (
    <Modal
        isOpen={isOpen}
        contentLabel='Edit Camera'
        onRequestClose={closeModal}
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
                <button type='button' className={styles.closeButton} onClick={closeModal}>✖</button>
            </div>
            {camera}
        </div>
    </Modal>
);

export default DVRCameraModal;