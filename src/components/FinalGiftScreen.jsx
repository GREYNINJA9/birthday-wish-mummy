import React from 'react';
import Confetti from './Confetti';

const FinalGiftScreen = ({ friendName, coordinates, what3words, message }) => {
  const mapsUrl = `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`;
  const w3wUrl = `https://what3words.com/${what3words.replace('///', '')}`;
  const osmUrl = `https://www.openstreetmap.org/?mlat=${coordinates.lat}&mlon=${coordinates.lng}#map=18/${coordinates.lat}/${coordinates.lng}`;

  return (
    <div className="text-center">
      <Confetti />
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-auto animate-fadeIn">
        <h2 className="text-3xl font-bold text-purple-700 mb-4">🎉 Congratulations! 🎉</h2>
        <p className="text-xl text-gray-700 mb-6">
          chalo aapko sb pta h humare baare m ache se {friendName}! {message}
        </p>
        
        {/* OpenStreetMap Embed - FREE */}
        <div className="mb-6 rounded-lg overflow-hidden shadow-md">
          <iframe
            width="100%"
            height="300"
            style={{ border: 'none' }}
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${coordinates.lng-0.002},${coordinates.lat-0.002},${coordinates.lng+0.002},${coordinates.lat+0.002}&layer=mapnik&marker=${coordinates.lat},${coordinates.lng}`}
            allowFullScreen
          ></iframe>
          <a
            href={osmUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline mt-2 inline-block"
          >
            View Larger Map
          </a>
        </div>
        
        <div className="space-y-4">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-3 px-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-lg font-medium shadow-md transition-all"
          >
            Open in Google Maps 🗺️
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