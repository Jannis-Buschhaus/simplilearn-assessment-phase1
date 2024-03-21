// This is the root file for the React application.

// Importing required modules
import React from 'react';
import ReactDOM from 'react-dom/client';

//Importing the Stroe and the Provider for the state of the app
import { Provider } from 'react-redux';
import store from './store'

//Importing the main App component
import App from './App';

// Importing style sheets
import './index.css';

// Creating root DOM node
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the App component within the Redux Provider for state management 
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);