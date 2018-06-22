import React, { Component } from 'react';
import { LINK, CL_FORMATS, CX_FORMATS } from '../constants/flare';

class Format extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLink: props.link,
            currentModel: props.model,
            clFormats: CL_FORMATS.CL2_4m,
            cxFormats: CX_FORMATS.CX2_4m
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    // -------------- Change Handlers --------------
    handleInputChange(e) {
        const name = e.target.name;
        const value = (name === 'bitDepth' || name === 'linkCount') ? Number(e.target.value) : e.target.value;
        
        this.props.updateState({ [name]: value });
    }

    // -------------- Render UI --------------
    renderTitle() {
        return this.props.link === LINK.CL ? 'Camera Link Format' : 'CoaXPress Format';
    }

    renderFormats() {
        // If model has changed, reload formats
        const linkOrModelChanged = this.props.link !== this.state.currentLink || this.props.model !== this.state.currentModel;
        if (linkOrModelChanged) {
            this.setState({ currentLink: this.props.link, currentModel: this.props.model });
            if (this.state.currentLink === LINK.CL) {
                this.reloadCLFormats();
            } else {
                this.reloadCXFormats();
            }
        }

        if (this.props.link === LINK.CL) {
            return (
                <select name='format' onChange={this.handleInputChange}>
                    {this.renderCLFormats()}
                </select>
            );
        } else if (this.props.link === LINK.CX) {
            return (
                <div>
                    Bit Depth&nbsp;&nbsp;&nbsp;
                    <select name='bitDepth' onChange={this.handleInputChange}>
                        {this.renderCXBitDepths()}
                    </select>
                    <br />
                    Link Count&nbsp;
                    <select name='linkCount' onChange={this.handleInputChange}>
                        {this.renderCXLinkCounts()}
                    </select>&nbsp;&nbsp;
                    Link Speed&nbsp;
                    <select name='linkSpeed' onChange={this.handleInputChange}>
                        {this.renderCXLinkSpeeds()}
                    </select>
                </div>
            );
        }
    }

    // -------------- CL Format Controls --------------
    reloadCLFormats() {
        if (this.props.model.startsWith('12M')) {
            this.setState({ clFormats: CL_FORMATS.CL12m });
        } else {
            this.setState({ clFormats: CL_FORMATS.CL2_4m });
        }
    }

    renderCLFormats() {
        return this.state.clFormats.map((format, i) => {
            return <option key={i}>{format}</option>;
        });
    }

    // -------------- CX Format Controls --------------
    reloadCXFormats() {
        if (this.props.model.startsWith('48M')) {
            this.setState({ cxFormats: CX_FORMATS.CX48m });
        } else if (this.props.model.startsWith('12M')) {
            this.setState({ cxFormats: CX_FORMATS.CX12m });
        } else {
            this.setState({ cxFormats: CX_FORMATS.CX2_4m });
        }
    }

    renderCXBitDepths() {
        return this.state.cxFormats.BitDepths.map((bitDepth, i) => {
            return <option key={i} value={bitDepth}>{bitDepth}</option>;
        });
    }

    renderCXLinkCounts() {
        return this.state.cxFormats.LinkCounts.map((linkCount, i) => {
            return <option key={i} value={linkCount}>{linkCount}</option>;
        });
    }

    renderCXLinkSpeeds() {
        return this.state.cxFormats.LinkSpeeds.map((linkSpeed, i) => {
            return <option key={i} value={linkSpeed}>{linkSpeed}</option>;
        });
    }

    render() {
        return (
            <fieldset>
            <legend>{this.renderTitle()}</legend>
                {this.renderFormats()}
            </fieldset>
        );
    }
}

export default Format;