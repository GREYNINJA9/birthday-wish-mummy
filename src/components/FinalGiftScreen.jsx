import React from 'react';
import Confetti from './Confetti';

const FinalGiftScreen = ({ friendName, coordinates, what3words, message }) => {
  const mapsUrl = `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`;
  const w3wUrl = `https://what3words.com/${what3words.replace('///', '')}`;

  return (
    <div className="text-center">
      <Confetti />
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-auto animate-fadeIn">
        <h2 className="text-3xl font-bold text-purple-700 mb-4">🎉 Congratulations! 🎉</h2>
        <p className="text-xl text-gray-700 mb-6">
          You've completed the quiz, {friendName}! {message}
        </p>
        
        <div className="mb-6 rounded-lg overflow-hidden shadow-md">
          <iframe
            width="100%"
            height="300"
            frameBorder="0"
            style={{ border: 0 }}
            src={`https://www.google.com/maps/embed/v1/view?key=YOUR_API_KEY&center=${coordinates.lat},${coordinates.lng}&zoom=18&maptype=satellite`}
            allowFullScreen
          ></iframe>
        </div>
        
        <div className="space-y-4">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-3 px-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-lg font-medium shadow-md transition-all"
          >
            Navigate with Google Maps 🗺️
          </a>
          
          <a
            href={w3wUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-3 px-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-lg font-medium shadow-md transition-all"
          >
            Navigate with what3words (///{what3words.replace('///', '')}) 🎁
          </a>
        </div>
      </div>
    </div>
  );
};

export default FinalGiftScreen;
