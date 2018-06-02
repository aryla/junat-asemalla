import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Search from './Search';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <App>
    <Search />
  </App>,
  document.getElementById('root')
);
registerServiceWorker();
