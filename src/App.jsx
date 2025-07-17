import React, { useState } from 'react';
import { quizData } from './data/quizData';
import QuestionCard from './components/QuestionCard';
import MemoryReveal from './components/MemoryReveal';
import FinalGiftScreen from './components/FinalGiftScreen';
import ProgressBar from './components/ProgressBar';
import { motion, AnimatePresence } from 'framer-motion';

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
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-animated">
      <div className="max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {/* Landing Screen */}
          {currentScreen === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center glass-card p-8 rounded-2xl shadow-xl"
            >
              <motion.h1 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="text-4xl md:text-5xl font-bold text-white mb-6 font-fancy"
              >
                Happy Birthday, {quizData.friendName}! 🎉
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-white/90 mb-8"
              >
                Let's test how well you know me with this special birthday quiz!
              </motion.p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startQuiz}
                className="py-4 px-10 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xl font-semibold rounded-full shadow-lg"
              >
                Start Quiz
                <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </motion.button>
            </motion.div>
          )}

          {/* Quiz Screen */}
          {currentScreen === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="glass-card p-6 rounded-2xl shadow-xl"
            >
              <ProgressBar 
                currentStep={showMemory ? currentQuestionIndex + 1 : currentQuestionIndex} 
                totalSteps={quizData.questions.length} 
              />
              
              <AnimatePresence mode="wait">
                {!showMemory ? (
                  <motion.div
                    key="question"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <QuestionCard
                      question={quizData.questions[currentQuestionIndex].question}
                      options={getFilteredOptions()}
                      selectedAnswer={selectedAnswer}
                      onAnswerSelect={handleAnswerSelect}
                      onNext={handleNextQuestion}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="memory"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 100 }}
                  >
                    <MemoryReveal
                      memory={quizData.questions[currentQuestionIndex].memory}
                      onContinue={continueToNextQuestion}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Final Screen */}
          {currentScreen === 'final' && (
            <motion.div
              key="final"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 100 }}
              className="glass-card p-6 rounded-2xl shadow-xl"
            >
              <FinalGiftScreen
                friendName={quizData.friendName}
                coordinates={quizData.finalGift.coordinates}
                what3words={quizData.finalGift.what3words}
                message={quizData.finalGift.message}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;