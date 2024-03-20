import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const QuizPage = () => {
  const quizSettings = useSelector((state) => state.quizSettings);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [timer, setTimer] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);


  useEffect(() => {
    // Fetch questions based on quiz settings
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `https://opentdb.com/api.php?amount=${quizSettings.numberOfQuestions}&category=${quizSettings.category}&difficulty=${quizSettings.difficulty}&type=multiple`
        );
        const data = await response.json();
        setQuestions(data.results);
        startTimer();
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [quizSettings]);

  useEffect(() => {
    if (currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
      startTimer();
    }
  }, [currentQuestionIndex]);

  const startTimer = () => {
    clearTimeout(timer);
    const difficulty = quizSettings.difficulty;
    let timeInSeconds;
    switch (difficulty) {
      case 'hard':
        timeInSeconds = 10;
        break;
      case 'medium':
        timeInSeconds = 20;
        break;
      case 'easy':
      default:
        timeInSeconds = 30;
        break;
    }

    setTimer(
      setTimeout(() => {
        handleNextQuestion();
      }, timeInSeconds * 1000)
    );
  };

  const handleNextQuestion = () => {
    clearTimeout(timer);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setSelectedAnswer(null);
    setFeedback('');
  };

  const handlePreviousQuestion = () => {
    clearTimeout(timer);
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    setSelectedAnswer(null);
    setFeedback('');
  };

  const handleAnswerSubmit = () => {
    clearTimeout(timer);
    // Check if the selected answer is correct
    const correctAnswer = questions[currentQuestionIndex].correct_answer;
    if (selectedAnswer === correctAnswer) {
        setCorrectAnswers((prevCount) => prevCount + 1);
      setFeedback('Correct!');
    } else {
        setIncorrectAnswers((prevCount) => prevCount + 1);
      setFeedback('Incorrect!');
    }
    console.log('Selected answer:', selectedAnswer);
    console.log('Correct answer:', correctAnswer);

  };

  const handleSubmitQuiz = () => {
    setQuizSubmitted(true);
  };


  const currentQuestion = questions[currentQuestionIndex];

  if (quizSubmitted) {
    const totalQuestions = questions.length;
    const totalScore = correctAnswers * 10;

    return (
      <div>
        <h1>Quiz Results</h1>
        <p>Total Questions: {totalQuestions}</p>
        <p>Correct Answers: {correctAnswers}</p>
        <p>Incorrect Answers: {incorrectAnswers}</p>
        <p>Total Score: {totalScore}</p>
      </div>
    );
  }

  return (
    <div>
    {currentQuestion && (
        <>
          <p>Question {currentQuestionIndex + 1} of {quizSettings.numberOfQuestions}</p>
          <h3>{currentQuestion.question}</h3>
          <div>
            {currentQuestion.incorrect_answers.map((answer, index) => (
              <button
                key={index}
                style={{ marginRight: '10px' }}
                onClick={() => setSelectedAnswer(answer)}
              >
                {answer}
              </button>
            ))}
            <button
              style={{ marginRight: '10px' }}
              onClick={() => setSelectedAnswer(currentQuestion.correct_answer)}
            >
              {currentQuestion.correct_answer}
            </button>
          </div>
          <button disabled={currentQuestionIndex === 0} onClick={handlePreviousQuestion}>Previous</button>
          <button disabled={currentQuestionIndex === questions.length - 1} onClick={handleNextQuestion}>Next</button>
          {currentQuestionIndex === questions.length - 1 ? (
            <button onClick={handleSubmitQuiz}>Submit</button>
          ) : (
            <button onClick={handleAnswerSubmit}>Submit Answer</button>
          )}
          {feedback && <p>{feedback}</p>}
        </>
      )}
    </div>
  );
};

export default QuizPage;
