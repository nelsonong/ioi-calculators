import React from 'react';
import { FlareCLFormat, FlareCXFormat, FlareSDIFormat } from './components';
import { FLARE_LINK } from '../../constants';

const FlareFormat = ({ link, clFormats, cxFormats, mode, handleChange }) => {
    switch (link) {
        case FLARE_LINK.CL:
            return (
                <FlareCLFormat
                    clFormats={clFormats}
                    mode={mode}
                    handleChange={handleChange}
                />
            );
        case FLARE_LINK.CX: 
            return (
                <FlareCXFormat
                    cxFormats={cxFormats}
                    mode={mode}
                    handleChange={handleChange}
                />
            );
        case FLARE_LINK.SDI:
            return (
                <FlareSDIFormat />
            );
    }
}

export default FlareFormat;