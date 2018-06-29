import React from 'react';
import ReactDOM from 'react-dom';
import FrameRate from './FrameRate';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FrameRate />, div);
  ReactDOM.unmountComponentAtNode(div);
});
