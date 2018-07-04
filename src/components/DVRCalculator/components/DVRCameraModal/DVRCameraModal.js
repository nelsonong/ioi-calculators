
import React from 'react';
import Modal from 'react-modal';
import './DVRCameraModal.css';

Modal.setAppElement('#root');

const DVRCameraModal = ({ isOpen, camera, closeModal }) => (
    <Modal
        isOpen={isOpen}
        contentLabel='Edit Camera'
        onRequestClose={closeModal}
        closeTimeoutMS={200}
        className='dvr-camera-modal'
        overlayClassName='dvr-camera-modal-overlay'
    >
        <div>
            <div className='dvr-camera-modal-title-bar'>
                <div className='dvr-camera-modal-left-spacer'></div>
                <div className='dvr-camera-modal-title'>
                    Edit Camera
                </div>
                <button type='button' className='dvr-camera-modal-close-button' onClick={closeModal}>✖</button>
            </div>
            {camera}
        </div>
    </Modal>
);

export default DVRCameraModal;