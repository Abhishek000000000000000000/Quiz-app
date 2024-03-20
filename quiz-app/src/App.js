
import logo from './logo.svg';
import './App.css';

import QuizSetupPage from './Components/QuizSetupPage';
import QuizPage from './Components/QuizPage';
import { useState } from 'react';

function App() {
  const [quizStarted, setQuizStarted] = useState(false);

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  return (
    <div className="App">
        <div className="App">
          {/* Your app content goes here */}
          {!quizStarted && <QuizSetupPage onStartQuiz={handleStartQuiz} />}
      {quizStarted && <QuizPage />}

        </div>
    

    </div>
  );
}

export default App;

