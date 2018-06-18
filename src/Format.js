import React, { Component } from 'react';

class CameraLinkFormat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clFormats:
            {
                cl_2_4m: {
                    formats: [ 'Base 8-bit x 2', 'Base 10-bit x 2', 'Base 8-bit x 3', 'Medium 10-bit x 4', 'Full 8-bit x 8', '80-bit 10-bit x 8', '80-bit 8-bit x 10' ]
                },
                cl_12m: {
                    formats: [ 'Base 8-bit x 2', 'Base 10-bit x 2', 'Base 8-bit x 3', 'Medium 10-bit x 4', 'Full 8-bit x 8', '80-bit 10-bit x 8', '80-bit 8-bit x 10', 
                                'Dual Full 8-bit x 16', 'Dual 80-bit 10-bit x 16', 'Dual 80-bit 8-bit x 20' ]
                }
            },
            cxFormats:
            {
                cx_2_4m: {
                    bitDepths: [ 8, 10 ],
                    linkCounts: [ 1, 2 ],
                    linkSpeeds: [ 'CXP-3' ]
                },
                cx_12m: {
                    bitDepths: [ 8, 10 ],
                    linkCounts: [ 1, 2, 4 ],
                    linkSpeeds: [ 'CXP-3', 'CXP-5', 'CXP-6' ]
                },
                cx_48m: {
                    bitDepths: [ 8, 10, 12 ],
                    linkCounts: [ 1, 2, 4 ],
                    linkSpeeds: [ 'CXP-2', 'CXP-3', 'CXP-5', 'CXP-6' ]
                }
            }
        };

        this.handleChangeFormat = this.handleChangeFormat.bind(this);
        this.handleChangeBitDepth = this.handleChangeBitDepth.bind(this);
        this.handleChangeLinkCount = this.handleChangeLinkCount.bind(this);
        this.handleChangeLinkSpeed = this.handleChangeLinkSpeed.bind(this);
    }

    renderTitle() {
        return this.props.link === 'cl' ? 'Camera Link Format' : 'CoaXPress Format';
    }

    // -------------- Change Handlers --------------
    handleChangeFormat(e) {
        this.setState({
            format: e.target.value
        });

        this.props.updateState({ format: e.target.value });
    }

    handleChangeBitDepth(e) {
        this.setState({
            format: e.target.value
        });

        this.props.updateState({ bitDepth: e.target.value });
    }

    handleChangeLinkCount(e) {
        this.setState({
            format: e.target.value
        });

        this.props.updateState({ linkCount: e.target.value });
    }

    handleChangeLinkSpeed(e) {
        this.setState({
            format: e.target.value
        });

        this.props.updateState({ linkSpeed: e.target.value });
    }

    // -------------- Render Formats --------------
    renderFormats() {
        if (this.props.link === 'cl') {
            return (
                <select onChange={this.handleChangeFormat}>
                    {this.renderCLFormats()}
                </select>
            );
        } else if (this.props.link === 'cx') {
            return (
                <div>
                    Bit Depth&nbsp;&nbsp;&nbsp;
                    <select onChange={this.handleChangeBitDepth}>
                        {this.renderCXBitDepths()}
                    </select>
                    <br />
                    Link Count&nbsp;
                    <select onChange={this.handleChangeLinkCount}>
                        {this.renderCXLinkCounts()}
                    </select>&nbsp;&nbsp;
                    Link Speed&nbsp;
                    <select onChange={this.handleChangeLinkSpeed}>
                        {this.renderCXLinkSpeeds()}
                    </select>
                </div>
            );
        }
    }

    // -------------- CL Format Controls --------------
    renderCLFormats() {
        let formats;
        if (this.props.model.startsWith('12M')) {
            formats = this.state.clFormats.cl_12m.formats;
        } else {
            formats = this.state.clFormats.cl_2_4m.formats;
        }

        return formats.map((format, i) => {
            return <option key={i}>{format}</option>;
        });
    }

    // -------------- CX Format Controls --------------
    renderCXBitDepths() {
        let bitDepths;
        if (this.props.model.startsWith('48M')) {
            bitDepths = this.state.cxFormats.cx_48m.bitDepths;
        } else if (this.props.model.startsWith('12M')) {
            bitDepths = this.state.cxFormats.cx_12m.bitDepths;
        } else {
            bitDepths = this.state.cxFormats.cx_2_4m.bitDepths;
        }

        return bitDepths.map((bitDepth, i) => {
            return <option key={i}>{bitDepth}</option>;
        });
    }

    renderCXLinkCounts() {
        let linkCounts;
        if (this.props.model.startsWith('48M')) {
            linkCounts = this.state.cxFormats.cx_48m.linkCounts;
        } else if (this.props.model.startsWith('12M')) {
            linkCounts = this.state.cxFormats.cx_12m.linkCounts;
        } else {
            linkCounts = this.state.cxFormats.cx_2_4m.linkCounts;
        }

        return linkCounts.map((linkCount, i) => {
            return <option key={i}>{linkCount}</option>;
        });
    }

    renderCXLinkSpeeds() {
        let linkSpeeds;
        if (this.props.model.startsWith('48M')) {
            linkSpeeds = this.state.cxFormats.cx_48m.linkSpeeds;
        } else if (this.props.model.startsWith('12M')) {
            linkSpeeds = this.state.cxFormats.cx_12m.linkSpeeds;
        } else {
            linkSpeeds = this.state.cxFormats.cx_2_4m.linkSpeeds;
        }

        return linkSpeeds.map((linkSpeed, i) => {
            return <option key={i}>{linkSpeed}</option>;
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

export default CameraLinkFormat;