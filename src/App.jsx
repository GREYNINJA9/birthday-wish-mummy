import React, { useState } from 'react';
import { quizData } from './data/quizData';
import QuestionCard from './components/QuestionCard';
import MemoryReveal from './components/MemoryReveal';
import FinalGiftScreen from './components/FinalGiftScreen';
import ProgressBar from './components/ProgressBar';

function App() {
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showMemory, setShowMemory] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]); // New state for wrong answers

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
        // Add wrong answer to track incorrect options
        setWrongAnswers([...wrongAnswers, {
          questionId: currentQuestion.id,
          wrongOption: selectedAnswer
        }]);
        alert(`Oops! "${selectedAnswer}" is incorrect. Try again!`);
        setSelectedAnswer(''); // Clear selection
        return; // Don't proceed to next question
      }

      // Only proceed if answer is correct
      setUserAnswers([...userAnswers, { 
        questionId: currentQuestion.id, 
        answer: selectedAnswer, 
        isCorrect 
      }]);
      setShowMemory(true);
    }
  };

  // Filter out wrong answers for current question
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {currentScreen === 'landing' && (
          <div className="text-center animate-fadeIn">
            <h1 className="text-4xl md:text-5xl font-bold text-purple-700 mb-6 font-fancy">
              Happy Birthday, {quizData.friendName}! 🎉
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Let's test how well you know me with this special birthday quiz!
            </p>
            <button
              onClick={startQuiz}
              className="py-3 px-8 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white text-xl font-semibold rounded-full shadow-lg transform transition-all duration-300 hover:scale-105"
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