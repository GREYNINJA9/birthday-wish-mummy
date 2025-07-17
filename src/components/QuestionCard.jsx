import React from 'react';

const QuestionCard = ({ question, options, selectedAnswer, onAnswerSelect, onNext }) => {
  return (
    <div className="glass-card rounded-2xl p-8 w-full max-w-md mx-auto transform transition-all duration-300 hover:scale-[1.01] overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-6 relative z-10">
        <span className="text-gradient bg-clip-text">{question}</span>
      </h2>
      
      <div className="space-y-3 mb-6 relative z-10">
        {options.map((option, index) => (
          <button
            key={index}
            className={`w-full text-left p-4 rounded-xl transition-all duration-200
              ${selectedAnswer === option 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'bg-white/80 hover:bg-white text-gray-800 border border-gray-100 hover:border-purple-200 hover:shadow-md'}`}
            onClick={() => onAnswerSelect(option)}
          >
            <span className="flex items-center">
              <span className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center 
                ${selectedAnswer === option ? 'bg-white/20' : 'bg-purple-100'}`}>
                {selectedAnswer === option && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </span>
              {option}
            </span>
          </button>
        ))}
      </div>
      
      <button
        onClick={onNext}
        disabled={!selectedAnswer}
        className={`w-full py-3 px-4 rounded-xl font-bold transition-all duration-300 relative z-10 btn-hover-effect
          ${selectedAnswer 
            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
      >
        {selectedAnswer ? (
          <span className="flex items-center justify-center">
            Submit Answer
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        ) : (
          'Select an option'
        )}
      </button>
    </div>
  );
};

export default QuestionCard;