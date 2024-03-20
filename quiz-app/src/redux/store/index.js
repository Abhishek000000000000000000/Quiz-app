// src/redux/store/index.js
import {  combineReducers, legacy_createStore } from 'redux';
import quizSettingsReducer from '../reducers/quizSettingsReducer';

const rootReducer = combineReducers({
  quizSettings: quizSettingsReducer,
});

const store = legacy_createStore(rootReducer);

export default store;
