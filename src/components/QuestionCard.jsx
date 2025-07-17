import React from 'react';

const QuestionCard = ({ question, options, selectedAnswer, onAnswerSelect, onNext }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-auto transform transition-all duration-300 hover:scale-[1.02]">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{question}</h2>
      <div className="space-y-3 mb-6">
        {options.map((option, index) => (
          <button
            key={index}
            className={`w-full text-left p-3 rounded-lg border-2 transition-all ${selectedAnswer === option 
              ? 'border-purple-500 bg-purple-50 text-purple-700' 
              : 'border-gray-200 hover:border-purple-300'}`}
            onClick={() => onAnswerSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <button
        onClick={onNext}
        disabled={!selectedAnswer}
        className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all ${selectedAnswer 
          ? 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-md' 
          : 'bg-gray-300 cursor-not-allowed'}`}
      >
        {selectedAnswer ? 'Submit Answer' : 'Select an option'}
      </button>
    </div>
  );
};

export default QuestionCard;