import React, { Component } from 'react';
import { CAMERA_OPTION } from '../../constants';
import './Options.css';

class Options extends Component {
    handleInputChange = (e) => {
        const name = e.target.name;
        switch (name) {
            case 'none':
                this.props.updateState({ cameraOption: CAMERA_OPTION.NONE });
                break;
            case 'subSampling':
                this.props.updateState({ cameraOption: CAMERA_OPTION.SUBSAMPLING });
                break;
            case 'binv':
                this.props.updateState({ cameraOption: CAMERA_OPTION.BIN_VERTICAL });
                break;
            case 'bin2':
                this.props.updateState({ cameraOption: CAMERA_OPTION.BIN_2X2 });
                break;
            default:
                break;
        }
    }

    render = () => {
        return (
            <fieldset>
            <legend>Options</legend>
                <div className='options-outer'>
                    <div className='options-left'>
                        <input
                            type="radio"
                            name='none'
                            checked={this.props.cameraOption === CAMERA_OPTION.NONE}
                            onChange={this.handleInputChange}
                        />
                        <div className='options-label'>None</div>
                        <br />
                        <input
                            type="radio"
                            name='binv'
                            checked={this.props.cameraOption === CAMERA_OPTION.BIN_VERTICAL}
                            disabled={!this.props.supportsVerticalBinning}
                            onChange={this.handleInputChange}
                        />
                        <div className='options-label'>Vertical Bin</div>
                    </div>
                    <div className='options-right'>
                        <input
                            type="radio"
                            name='subSampling'
                            checked={this.props.cameraOption === CAMERA_OPTION.SUBSAMPLING}
                            disabled={!this.props.supportsSubSampling}
                            onChange={this.handleInputChange}
                        />
                        <div className='options-label'>Sub-Sample</div>
                        <br />
                        <input
                            type="radio"
                            name='bin2'
                            checked={this.props.cameraOption === CAMERA_OPTION.BIN_2X2}
                            disabled={!this.props.supports2x2Binning}
                            onChange={this.handleInputChange}
                        />
                        <div className='options-label'>2x2 Bin</div>
                    </div>
                </div>
            </fieldset>
        );
    }
}

export default Options;