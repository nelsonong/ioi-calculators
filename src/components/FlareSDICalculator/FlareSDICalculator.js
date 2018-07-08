import React, { Component } from 'react';
import CalculatorTopBar from '../CalculatorTopBar';
import { FlareSDIModel, FlareSDIFormat, FlareSDIColor, FlareSDIResolution, FlareSDIFrameRate, FlareSDIOutput } from './components';
import { MODEL, MODELS, LINKS, SDI_TREE } from './constants';
import { calculateDataRate } from './utils/calculateDataRate';
import './FlareSDICalculator.css';

class FlareSDICalculator extends Component {
    state = {
        model: MODEL.Type2KSDI,
        models: MODELS,
        link: '',
        links: [],
        sdiInterface: '',
        sdiInterfaces: [],
        resolution: '',
        resolutions: [],
        color: '',
        colors: [],
        frameRate: '',
        frameRates: [],
        dataRate: 0,
        mode: this.props.mode
    };

    componentDidMount = () => {
        this.updateBelowModel(this.state.model);
    }

    // General change handler (requires input element to have name attribute)
    handleChange = (e) => {
        const { name } = e.target;
        let { value } = e.target;
        if (!isNaN(value)) value = Number(value);
        switch (name) {
            case 'model': {
                this.updateBelowModel(value);
                break;
            }
            case 'link': {
                this.setState(() => ({ link: value }));
                this.updateDataRate();
            }
            case 'sdiInterface': {
                const { model } = this.state;
                this.updateBelowInterface({ model, sdiInterface: value });
                break;
            }
            case 'resolution': {
                const { model, sdiInterface } = this.state;
                this.updateBelowResolution({ model, sdiInterface, resolution: value });
                break;
            }
            case 'color': {
                const { model, sdiInterface, resolution } = this.state;
                this.updateBelowColor({ model, sdiInterface, resolution, color: value });
                break;
            }
            case 'frameRate': {
                this.setState(() => ({ frameRate: value }));
                this.updateDataRate();
            }
        }
    }

    updateBelowModel = (model) => {
        const sdiInterfaces = Object.keys(SDI_TREE[model]);
        const sdiInterface = sdiInterfaces[0];
        const links = this.props.mode ? LINKS[model].filter(link => link === mode) : LINKS[model];
        const link = links[0];
        this.updateBelowInterface({model, sdiInterface, sdiInterfaces, link, links });
    }

    updateBelowInterface = (aboveInterface) => {
        const { model, sdiInterface } = aboveInterface;
        const resolutions = Object.keys(SDI_TREE[model][sdiInterface]);
        const resolution = resolutions[0];
        this.updateBelowResolution({ ...aboveInterface, resolution, resolutions });
    }

    updateBelowResolution = (aboveResolution) => {
        const { model, sdiInterface, resolution } = aboveResolution;
        const colors = Object.keys(SDI_TREE[model][sdiInterface][resolution]);
        const color = colors[0];
        this.updateBelowColor({ ...aboveResolution, color, colors });
    }

    updateBelowColor = (aboveColors) => {
        const { model, sdiInterface, resolution, color } = aboveColors;
        const frameRates = SDI_TREE[model][sdiInterface][resolution][color];
        const frameRate = frameRates[0];
        this.setState(() => ({ ...aboveColors, frameRate, frameRates }));
        this.updateDataRate();
    }

    updateDataRate = () => {
        this.setState(({ frameRate, link, resolution, color }) => {
            const dataRate = calculateDataRate(frameRate, link, resolution, color);
            return { dataRate };
        });
    }

    render = () => (
        <div className="flare-calculator">
            <CalculatorTopBar
                mode={this.state.mode}
                type={'Flare SDI'}
                deleteCalculator={this.props.deleteCalculator}
                id={this.props.id}
            />
            <FlareSDIModel
                model={this.state.model}
                models={this.state.models}
                handleChange={this.handleChange}
            />
            <FlareSDIFormat
                sdiInterface={this.state.sdiInterface}
                sdiInterfaces={this.state.sdiInterfaces}
                link={this.state.link}
                links={this.state.links}
                handleChange={this.handleChange}
            />
            <FlareSDIResolution
                resolution={this.state.resolution}
                resolutions={this.state.resolutions}
                handleChange={this.handleChange}
            />
            <FlareSDIColor
                color={this.state.color}
                colors={this.state.colors}
                handleChange={this.handleChange}
            />
            <FlareSDIFrameRate
                frameRate={this.state.frameRate}
                frameRates={this.state.frameRates}
                handleChange={this.handleChange}
            />
            <FlareSDIOutput
                frameRate={this.state.frameRate}
                dataRate={this.state.dataRate}
            />
        </div>
    );
}

FlareSDICalculator.defaultProps = {
    mode: false
};

export default FlareSDICalculator;
