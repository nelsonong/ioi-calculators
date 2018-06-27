import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import FrameRate from './scenes/FrameRate/FrameRate';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<FrameRate />, document.getElementById('root'));
registerServiceWorker();
