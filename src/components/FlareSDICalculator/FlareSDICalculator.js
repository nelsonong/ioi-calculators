import React, { Component } from 'react';
import CalculatorTopBar from '../CalculatorTopBar';
import { FlareSDIModel, FlareSDIFormat, FlareSDIColor, FlareSDIResolution, FlareSDIFrameRate, FlareSDIOutput } from './components';
import { MODEL, MODELS, LINKS, MODE, SDI_TREE } from './constants';
import { splitResolution } from './utils/splitResolution';
import { calculateDataRate } from './utils/calculateDataRate';
import styles from './FlareSDICalculator.css';

class FlareSDICalculator extends Component {
    state = {
        model: '',
        models: [],
        link: '',
        links: [],
        sdiInterface: '',
        sdiInterfaces: [],
        width: 0,
        height: 0,
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
        let models = MODELS;
        let links = LINKS[models[0]];
        const mode = this.state.mode;

        if (mode) {
            switch (mode) {
                case MODE.SINGLE:
                    models = [ MODEL.Type2KSDI ];
                    links = [ 1 ];
                    break;
                case MODE.DUAL:
                    models = [ MODEL.Type2KSDI, MODEL.Type4KSDI ]
                    links = [ 2 ];
                    break;
                case MODE.QUAD:
                    models = [ MODEL.Type4KSDI ];
                    links = [ 4 ];
            }
        }

        const model = models[0];
        const link = links[0];
        this.setState(() => ({ model, models, link, links }));
        this.updateBelowModel(model);
    }

    // General change handler (requires input element to have name attribute)
    handleChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        value = !isNaN(value) ? Number(value) : value;
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
                const [ width, height ] = splitResolution(value);
                this.updateBelowResolution({ model, sdiInterface, width, height, resolution: value });
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
        if (this.props.mode) {
            this.updateBelowInterface({ model, sdiInterface, sdiInterfaces });
        } else {
            const links = LINKS[model];
            const link = links[0];
            this.updateBelowInterface({ model, sdiInterface, sdiInterfaces, link, links });
        }
    }

    updateBelowInterface = (aboveInterface) => {
        const { model, sdiInterface } = aboveInterface;
        const resolutions = Object.keys(SDI_TREE[model][sdiInterface]);
        const resolution = resolutions[0];
        const [ width, height ] = splitResolution(resolution);
        this.updateBelowResolution({ ...aboveInterface, width, height, resolution, resolutions });
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
        this.setState(({ frameRate, link, width, height, color }) => {
            const dataRate = calculateDataRate(frameRate, link, width, height, color);
            return { dataRate };
        });
    }

    render = () => (
        <div className={styles.root}>
            <CalculatorTopBar
                inModal={this.state.mode}
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
