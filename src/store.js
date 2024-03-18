//Import the necessary libraries
import {createStore} from 'redux';
import rootReducer from './reducers';

//Create and export the store to be used by the Provider Component in index.js
const store=createStore(rootReducer);

export default store;