import React, { useEffect, useState } from 'react';

const QuestionCard = ({ question, options, selectedAnswer, onAnswerSelect, onNext }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className={`max-w-md mx-auto transition-all duration-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      {/* Question Card */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-6 mb-6 border border-white/20">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 font-serif">
          {question}
        </h2>
      </div>
      
      {/* Options List */}
      <div className="space-y-3 mb-6">
        {options.map((option, index) => (
          <button
            key={index}
            className={`w-full text-left p-4 rounded-lg transition-all duration-200 flex items-center
              ${selectedAnswer === option
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                : 'bg-white/90 hover:bg-white border border-gray-100 hover:border-purple-200 hover:shadow-sm'}`}
            onClick={() => onAnswerSelect(option)}
          >
            <span className={`inline-block w-5 h-5 rounded-full mr-3 flex-shrink-0 border-2
              ${selectedAnswer === option ? 'border-white' : 'border-gray-300'}`}>
              {selectedAnswer === option && (
                <span className="block w-2 h-2 bg-white rounded-full m-auto"></span>
              )}
            </span>
            {option}
          </button>
        ))}
      </div>
      
      {/* Submit Button */}
      <div className="text-center">
        <button
          onClick={onNext}
          disabled={!selectedAnswer}
          className={`inline-flex items-center px-6 py-3 rounded-full font-medium transition-all duration-300
            ${selectedAnswer
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
        >
          Submit Answer
          {selectedAnswer && (
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;