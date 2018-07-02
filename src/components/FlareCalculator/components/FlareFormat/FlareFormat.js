import React, { Component } from 'react';
import { FLARE_LINK, FLARE_CL_FORMATS, FLARE_CX_FORMATS } from '../../constants';
import './FlareFormat.css';

class FlareFormat extends Component {
    state = {
        currentLink: this.props.link,
        currentModel: this.props.model,
        clFormats: FLARE_CL_FORMATS.CL2_4m,
        cxFormats: FLARE_CX_FORMATS.CX2_4m
    };

    // -------------- Change Handlers --------------
    handleInputChange = (e) => {
        const name = e.target.name;
        const value = (name === 'bitDepth' || name === 'linkCount') ? Number(e.target.value) : e.target.value;
        
        this.props.updateState({ [name]: value });
    }

    // -------------- Render UI --------------
    renderTitle = () => {
        return this.props.link === FLARE_LINK.CL ? 'Camera Link Format' : 'CoaXPress Format';
    }

    renderFormats = () => {
        // If model has changed, reload formats
        const linkOrModelChanged = this.props.link !== this.state.currentLink || this.props.model !== this.state.currentModel;
        if (linkOrModelChanged) {
            this.setState({ currentLink: this.props.link, currentModel: this.props.model });
            if (this.state.currentLink === FLARE_LINK.CL) {
                this.reloadCLFormats();
            } else {
                this.reloadCXFormats();
            }
        }

        if (this.props.link === FLARE_LINK.CL) {
            return (
                <select name='format' onChange={this.handleInputChange}>
                    {this.renderCLFormats()}
                </select>
            );
        } else if (this.props.link === FLARE_LINK.CX) {
            return (
                <div>
                    <div className='flare-format-left'>
                        <div className='flare-format-labels'>
                            <div className='flare-format-label'>Bit Depth</div>
                            <div className='flare-format-label'>Links</div>
                        </div>
                        <div className='flare-format-selects'>
                            <select className='flare-format-select' name='bitDepth' onChange={this.handleInputChange}>
                                {this.renderCXBitDepths()}
                            </select>
                            <select className='flare-format-select' name='linkCount' onChange={this.handleInputChange}>
                                {this.renderCXLinkCounts()}
                            </select>
                        </div>
                    </div>
                    <div className='flare-format-right'>
                        <div className='flare-format-label'>Link Speed</div>
                        <select className='flare-format-select' name='linkSpeed' onChange={this.handleInputChange}>
                            {this.renderCXLinkSpeeds()}
                        </select>
                    </div>
                </div>
            );
        }
    }

    // -------------- CL Format Controls --------------
    reloadCLFormats = () => {
        if (this.props.model.startsWith('12M')) {
            this.setState({ clFormats: FLARE_CL_FORMATS.CL12m });
        } else {
            this.setState({ clFormats: FLARE_CL_FORMATS.CL2_4m });
        }
    }

    renderCLFormats = () => {
        return this.state.clFormats.map((format, i) => {
            return <option key={i}>{format}</option>;
        });
    }

    // -------------- CX Format Controls --------------
    reloadCXFormats = () => {
        if (this.props.model.startsWith('48M')) {
            this.setState({ cxFormats: FLARE_CX_FORMATS.CX48m });
        } else if (this.props.model.startsWith('12M')) {
            this.setState({ cxFormats: FLARE_CX_FORMATS.CX12m });
        } else {
            this.setState({ cxFormats: FLARE_CX_FORMATS.CX2_4m });
        }
    }

    renderCXBitDepths = () => {
        return this.state.cxFormats.BitDepths.map((bitDepth, i) => {
            return <option key={i} value={bitDepth}>{bitDepth}</option>;
        });
    }

    renderCXLinkCounts = () => {
        return this.state.cxFormats.LinkCounts.map((linkCount, i) => {
            return <option key={i} value={linkCount}>{linkCount}</option>;
        });
    }

    renderCXLinkSpeeds = () => {
        return this.state.cxFormats.LinkSpeeds.map((linkSpeed, i) => {
            return <option key={i} value={linkSpeed}>{linkSpeed}</option>;
        });
    }

    render = () => {
        return (
            <fieldset>
            <legend>{this.renderTitle()}</legend>
                {this.renderFormats()}
            </fieldset>
        );
    }
}

export default FlareFormat;