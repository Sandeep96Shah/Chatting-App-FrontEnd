import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { configureStore } from './store/index';
import { Provider } from 'react-redux';
import { BrowserRouter as Router} from "react-router-dom";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
      <App />
      </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
