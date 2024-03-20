// src/redux/actions/index.js
export const SET_QUIZ_SETTINGS = 'SET_QUIZ_SETTINGS';

export const setQuizSettings = (settings) => ({
  type: SET_QUIZ_SETTINGS,
  payload: settings,
});
