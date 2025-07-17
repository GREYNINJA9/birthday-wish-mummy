import React from 'react';

const QuestionCard = ({ question, options, selectedAnswer, onAnswerSelect, onNext }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md mx-auto transform transition-all duration-300 hover:scale-[1.02] border-2 border-purple-100">
      <h2 className="text-2xl font-bold text-purple-800 mb-6 font-serif italic">
        {question}
      </h2>
      <div className="space-y-4 mb-6">
        {options.map((option, index) => (
          <button
            key={index}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all text-lg
              ${selectedAnswer === option 
                ? 'border-purple-500 bg-purple-100 text-purple-700 font-medium shadow-md' 
                : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'}`}
            onClick={() => onAnswerSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <button
        onClick={onNext}
        disabled={!selectedAnswer}
        className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-all text-lg
          ${selectedAnswer 
            ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg' 
            : 'bg-gray-300 cursor-not-allowed'}`}
      >
        {selectedAnswer ? 'Submit Answer' : 'Select an option'}
      </button>
    </div>
  );
};

export default QuestionCard;