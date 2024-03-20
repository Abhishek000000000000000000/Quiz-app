// src/components/QuizSetupPage.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {  setQuizSettings } from '../redux/actions';

const QuizSetupPage = ({ onStartQuiz }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [numberOfQuestions, setNumberOfQuestions] = useState('');

  const handleStartQuiz = () => {
    // Dispatch action to store quiz settings in Redux
    dispatch(
      setQuizSettings({
        name,
        category,
        difficulty,
        numberOfQuestions: parseInt(numberOfQuestions),
      })
    );

    // Trigger the callback function to start the quiz
    onStartQuiz();
  };

  return (
    <div>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Category:
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="9">General Knowledge</option>
          <option value="21">Sports</option>
          <option value="22">Geography</option>
        </select>
      </label>
      <label>
        Difficulty:
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </label>
      <label>
        Number of Questions:
        <input
          type="number"
          value={numberOfQuestions}
          onChange={(e) => setNumberOfQuestions(e.target.value)}
        />
      </label>
      <button onClick={handleStartQuiz}>Start Quiz</button>
    </div>
  );
};

export default QuizSetupPage;
