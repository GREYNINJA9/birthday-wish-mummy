import React from 'react';

const MemoryReveal = ({ memory, onContinue }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-auto animate-fadeIn">
      <h3 className="text-xl font-semibold text-purple-700 mb-4">Memory Unlocked!</h3>
      
      {memory.type === 'image' ? (
        <img 
          src={memory.content} 
          alt="Memory" 
          className="w-full h-48 object-cover rounded-lg mb-4 shadow-sm"
        />
      ) : (
        <div className="relative pb-[56.25%] mb-4 rounded-lg overflow-hidden shadow-sm">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={memory.content}
            title="Memory video"
            style={{ border: 'none' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
      
      <p className="text-gray-700 mb-6 italic">"{memory.message}"</p>
      
      <button
        onClick={onContinue}
        className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg font-medium shadow-md transition-all"
      >
        Continue to Next Question
      </button>
    </div>
  );
};

export default MemoryReveal;