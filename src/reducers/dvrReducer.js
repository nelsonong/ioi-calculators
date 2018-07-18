import React from 'react';
import { MODEL, CL_CONFIGS, CLPLUS_CONFIGS, CX_CONFIGS, CXPLUS_CONFIGS, SDI_CONFIGS, DRIVE_CAPACITY, LINK, MODE, MODES } from '../components/DVRCalculator/constants';
import {
    INITIALIZE_DVR_STATE,
    UPDATE_DVR_MODEL,
    PUSH_DVR_DATA_RATE,
    DELETE_DVR_DATA_RATE,
    REVERT_DVR_CAMERA_STATE,
    UPDATE_DVR_CONFIGURATION,
    UPDATE_DVR_RAID,
    UPDATE_DVR_DRIVE_MODEL,
    UPDATE_DVR_DRIVE_AMOUNT
} from '../actions/dvrActions';
import { DVRCamera } from '../components/DVRCalculator/components/DVRCamera';
import { flareCLDefaultState } from '..//components/FlareCLCalculator/constants';
import { flareCXDefaultState } from '../components/FlareCXCalculator/constants';
import { flareSDIDefaultState } from '../components/FlareSDICalculator/constants';
import uuid from 'uuid';
import { Map } from 'core-js';

const dvrReducer = (state = new Map(), action) => {
    const id = action.id;
    let calculators = new Map(state);
    let calculatorState = calculators.get(id);
    switch (action.type) {
        case INITIALIZE_DVR_STATE:
            calculatorState = reloadCameras(calculatorState, id);
            calculatorState = updateRecordingTime(calculatorState);
            break;

        case UPDATE_DVR_MODEL:
            const { model } = action;

            // Get link and configuration
            let link;
            let configurations;
            let mode;
            switch (model) {
                case MODEL.CORE2CL:
                    link = LINK.CL;
                    configurations = CL_CONFIGS;
                    mode = MODE.BASE;
                    break;
                case MODEL.CORE2CLPLUS:
                    link = LINK.CL;
                    configurations = CLPLUS_CONFIGS;
                    mode = MODE.BASE;
                    break;
                case MODEL.CORE2CX:
                    link = LINK.CX;
                    configurations = CX_CONFIGS;
                    mode = MODE.SINGLE;
                    break;
                case MODEL.CORE2CXPLUS:
                    link = LINK.CX;
                    configurations = CXPLUS_CONFIGS;
                    mode = MODE.SINGLE;
                    break;
                case MODEL.CORE2SDI:
                    link = LINK.SDI;
                    configurations = SDI_CONFIGS;
                    mode = MODE.SINGLE;
            }
            const configuration = configurations[0];

            calculatorState = Object.assign({}, calculatorState, {
                model,
                link,
                configuration,
                configurations,
                mode
            });

            calculatorState = reloadCameras(calculatorState, id);
            calculatorState = updateRecordingTime(calculatorState);
            break;

        case UPDATE_DVR_CONFIGURATION: {
            const { configuration } = action;
            calculatorState = Object.assign({}, calculatorState, {
                configuration
            });
            calculatorState = reloadCameras(calculatorState, id);
            calculatorState = updateRecordingTime(calculatorState);
            break;
        }

        case PUSH_DVR_DATA_RATE: {
            const { cameraId, dataRate } = action;
            let { dataRates } = calculatorState;
            dataRates = dataRates.filter(dataRate => dataRate.cameraId !== cameraId);
            dataRates.push({ cameraId, value: dataRate });
            calculatorState = Object.assign({}, calculatorState, {
                dataRates
            });
            
            calculatorState = updateTotalDataRate(calculatorState);
            calculatorState = updateRecordingTime(calculatorState);
            break;
        }

        case DELETE_DVR_DATA_RATE: {
            const { cameraId } = action;
            let { dataRates } = calculatorState;
            dataRates = dataRates.filter(dataRate => dataRate.cameraId !== cameraId);
            calculatorState = Object.assign({}, calculatorState, {
                dataRates
            });
            
            calculatorState = updateTotalDataRate(calculatorState);
            calculatorState = updateRecordingTime(calculatorState);
            break;
        }

        case REVERT_DVR_CAMERA_STATE: {
            const { cameraId, cameraState } = action;
            let { cameras } = calculatorState;
            cameras = new Map(cameras);
            cameras.set(cameraId, cameraState);
            calculatorState = Object.assign({}, calculatorState, {
                cameras
            });
            break;
        }

        case UPDATE_DVR_RAID:
            const { raid } = action;
            let { driveAmount, driveAmounts, driveCapacity } = calculatorState;
            switch (raid) {
                case 0:
                    driveAmount = 1;
                    driveAmounts = [ 1, 2, 3, 4, 5, 6 ];
                    break;
                
                case 1:
                    driveAmount = 2;
                    driveAmounts = [ 2, 4, 6 ];
                    break;

                case 5:
                    driveAmount = 3;
                    driveAmounts = [ 3, 6 ];
            }
            const totalCapacity = driveAmount * driveCapacity;
            calculatorState = Object.assign({}, calculatorState, {
                raid,
                driveAmount,
                driveAmounts,
                totalCapacity
            });
            calculatorState = updateRecordingTime(calculatorState);
            break;

        case UPDATE_DVR_DRIVE_MODEL: {
            const { driveModel } = action;
            const { driveAmount } = calculatorState;
            const driveCapacity = DRIVE_CAPACITY[driveModel];
            const totalCapacity = driveCapacity * driveAmount;
            calculatorState = Object.assign({}, calculatorState, {
                driveModel,
                driveCapacity,
                totalCapacity
            });
            calculatorState = updateRecordingTime(calculatorState);
            break;
        }

        case UPDATE_DVR_DRIVE_AMOUNT: {
            const { driveAmount } = action;
            const { driveCapacity } = calculatorState;
            const totalCapacity = driveAmount * driveCapacity;
            calculatorState = Object.assign({}, calculatorState, {
                driveAmount,
                totalCapacity
            });
            calculatorState = updateRecordingTime(calculatorState);
            break;
        }
            
        default:
            return state;
    }
    
    return calculators.set(id, calculatorState);
};

const reloadCameras = (calculatorState, dvrId) => {
    const { link, configuration } = calculatorState;

    // Reset cameras / insert mode
    let cameras = new Map();
    let cameraContainers = [];
    const modes = MODES[configuration];
    modes.forEach(mode => {
        const id = uuid();
        let cameraState;
        switch (link) {
            case LINK.CL:
                cameraState = flareCLDefaultState;
                break;

            case LINK.CX:
                cameraState = flareCXDefaultState;
                break;

            case LINK.SDI:
                cameraState = flareSDIDefaultState;
        }

        cameraState = Object.assign({}, cameraState, {
            dvrId,
            id,
            inDVR: true,
            mode
        });

        cameraContainers.push(
            <DVRCamera
                key={id}
                id={id}
                dvrId={dvrId}
                cameraState={cameraState}
                link={link}
                mode={mode}
            />
        );
        
        cameras.set(id, cameraState);
    });

    return Object.assign({}, calculatorState, {
        cameras,
        cameraContainers,
        dataRates: [],
        totalDataRate: 0
    });
};

const updateTotalDataRate = (calculatorState) => {
    const { dataRates } = calculatorState;
    let totalDataRate = 0;
    for (let dataRate of dataRates) {
        totalDataRate += dataRate.value;
    }
    return Object.assign({}, calculatorState, {
        totalDataRate
    });
}

const updateRecordingTime = (calculatorState) => {
    let { raid, totalCapacity, totalDataRate } = calculatorState;
    const seconds = totalCapacity / totalDataRate * 1024;   // Convert to MB/s
    switch (raid) {
        case 1:
            totalCapacity /= 2;
            break;
        case 5:
            totalCapacity /= 3;
    }
    let recordingTime = isFinite(seconds) ? secondsTohhmmss(seconds) : 'N/A';
    
    return Object.assign({}, calculatorState, {
        recordingTime
    });
};

const secondsTohhmmss = (totalSeconds) => {
    let hours   = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
    let seconds = totalSeconds - (hours * 3600) - (minutes * 60);
    
    // round seconds
    seconds = Math.round(seconds);
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds  < 10) ? "0" + seconds : seconds;

    let result = `${hours}h ${minutes}m ${seconds}s`;
    return result;
};

export default dvrReducer;