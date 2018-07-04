import React, { Component } from 'react';
import { DVRCameraModal } from '../DVRCameraModal';
import FlareCalculator from '../../../FlareCalculator';
import plus from './images/plus.png';
import edit from './images/edit.png';
import remove from './images/remove.png';
import './DVRCamera.css';

class DVRCamera extends Component {
    state = {
        modal: null,
        camera: React.createRef(),
        model: '',
        format: '',
        resolution: '',
        isHovered: false,
        modalIsOpen: true,
        modal: '',
        format: '',
        resolution: '',
        dataRate: 0
    };

    addCamera = () => {
        const camera = <FlareCalculator ref={this.state.camera} link={this.props.link} mode={this.props.mode} />;
        const modal = <DVRCameraModal isOpen={this.state.modalIsOpen} camera={camera} closeModal={this.closeModal} />;
        this.setState(() => ({ added: true, modalIsOpen: true, modal }));
    }

    openModal = () => {
        this.setState(() => ({ modalIsOpen: true }));
    }

    closeModal = () => {
        console.log(this.state.camera.current);
        const calculatorState = this.state.camera.current.state;
        const { model, format, width, height, frameRate } = calculatorState;
        const resolution = `${width}x${height}`;
        const dataRate = (frameRate * width * height) / 1000000000;    // In GB/s
        this.setState(() => ({ model, format, resolution, dataRate, modalIsOpen: false, isHovered: false }));
        
        this.props.pushDataRate(this.props.id, dataRate);
    }

    deleteCamera = () => {
        this.setState(() => ({ added: false, modalIsOpen: true, modal: null }));
        this.props.deleteDataRate(this.props.id);
    }

    openHoverOverlay = () => {
        this.setState(() => ({ isHovered: true }));
    }

    closeHoverOverlay = () => {
        this.setState(() => ({ isHovered: false }));
    }

    startContents = () => (
        <button type='button' className='dvr-camera-add-button' onClick={this.addCamera}><img src={plus}></img></button>
    );

    infoContents = () => (
        <div>
            <div className='dvr-camera-info'>
                {this.state.model}
            </div>
            <div className='dvr-camera-info'>
                {this.state.format}
            </div>
            <div className='dvr-camera-info'>
                {this.state.resolution}
            </div>
        </div>
    );

    hoverContents = () => (
        <div>
            <button type='button' className='dvr-camera-edit-button' onClick={this.openModal}><img src={edit}></img></button>
            <button type='button' className='dvr-camera-close-button' onClick={this.deleteCamera}><img src={remove}></img></button>
        </div>
    );

    render = () => {
        if (this.state.added && this.state.modalIsOpen) {
            return (
                <div>
                    {this.state.modal}
                </div>
            );
        }
        
        let contents = this.startContents();
        let className = 'dvr-camera-container';
        if (this.state.added) {
            contents = this.state.isHovered ? this.hoverContents() : this.infoContents();
            className += ' dvr-camera-container-added';
        }

        return (
            <div className={className} onMouseEnter={this.openHoverOverlay} onMouseLeave={this.closeHoverOverlay}>
                <div className='dvr-camera-title'>
                    {this.props.mode}
                </div>
                {contents}
            </div>
        );
    }
}

export default DVRCamera;