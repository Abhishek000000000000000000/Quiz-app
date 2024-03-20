// src/redux/reducers/quizSettingsReducer.js
import { SET_QUIZ_SETTINGS } from '../actions';

const initialState = {
  name: '',
  category: '',
  difficulty: '',
  numberOfQuestions: 0,
};

const quizSettingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_QUIZ_SETTINGS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default quizSettingsReducer;
