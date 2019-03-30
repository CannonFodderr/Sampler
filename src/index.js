import React from 'react';
import ReactDOM from 'react-dom';
import {SamplerContextStore} from './contexts/SamplerContext';
import App from './components/App/App';

ReactDOM.render(
    <SamplerContextStore>
      <App />
    </SamplerContextStore>,
    document.getElementById('root')
  );

