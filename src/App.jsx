import React, { useState } from 'react';
import { quizData } from './data/quizData';
import QuestionCard from './components/QuestionCard';
import MemoryReveal from './components/MemoryReveal';
import FinalGiftScreen from './components/FinalGiftScreen';
import ProgressBar from './components/ProgressBar';

// Background SVG pattern
const backgroundStyle = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%237c3aed' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`,
  backgroundAttachment: 'fixed'
};

function App() {
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showMemory, setShowMemory] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);

  const startQuiz = () => {
    setCurrentScreen('quiz');
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer) {
      const currentQuestion = quizData.questions[currentQuestionIndex];
      const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
      
      if (!isCorrect) {
        setWrongAnswers([...wrongAnswers, {
          questionId: currentQuestion.id,
          wrongOption: selectedAnswer
        }]);
        alert(`Oops! "${selectedAnswer}" is incorrect. Try again!`);
        setSelectedAnswer('');
        return;
      }

      setUserAnswers([...userAnswers, { 
        questionId: currentQuestion.id, 
        answer: selectedAnswer, 
        isCorrect 
      }]);
      setShowMemory(true);
    }
  };

  const getFilteredOptions = () => {
    const currentQuestionId = quizData.questions[currentQuestionIndex]?.id;
    const wrongsForQuestion = wrongAnswers.filter(w => w.questionId === currentQuestionId);
    return quizData.questions[currentQuestionIndex]?.options.filter(option => 
      !wrongsForQuestion.some(w => w.wrongOption === option)
    ) || [];
  };

  const continueToNextQuestion = () => {
    setShowMemory(false);
    setSelectedAnswer('');
    
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentScreen('final');
    }
  };

  return (
    <div 
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8"
      style={backgroundStyle}
    >
      <div className="max-w-3xl mx-auto">
        {currentScreen === 'landing' && (
          <div className="text-center animate-fadeIn">
            <h1 className="text-4xl md:text-5xl font-bold text-purple-700 mb-6 font-fancy float-animation">
              Happy Birthday, {quizData.friendName}! 🎉
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Let's test how well you know me with this special birthday quiz!
            </p>
            <button
              onClick={startQuiz}
              className="py-3 px-8 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white text-xl font-semibold rounded-full shadow-lg btn-hover-effect"
            >
              Start Quiz
            </button>
          </div>
        )}

        {currentScreen === 'quiz' && (
          <div>
            <ProgressBar 
              currentStep={showMemory ? currentQuestionIndex + 1 : currentQuestionIndex} 
              totalSteps={quizData.questions.length} 
            />
            
            {!showMemory ? (
              <QuestionCard
                question={quizData.questions[currentQuestionIndex].question}
                options={getFilteredOptions()}
                selectedAnswer={selectedAnswer}
                onAnswerSelect={handleAnswerSelect}
                onNext={handleNextQuestion}
              />
            ) : (
              <MemoryReveal
                memory={quizData.questions[currentQuestionIndex].memory}
                onContinue={continueToNextQuestion}
              />
            )}
          </div>
        )}

        {currentScreen === 'final' && (
          <FinalGiftScreen
            friendName={quizData.friendName}
            coordinates={quizData.finalGift.coordinates}
            what3words={quizData.finalGift.what3words}
            message={quizData.finalGift.message}
          />
        )}
      </div>
    </div>
  );
}

export default App;