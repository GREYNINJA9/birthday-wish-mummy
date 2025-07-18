const MemoryReveal = ({ memory, onContinue }) => {
  // Extract YouTube ID from both regular and shorts URLs
  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const isYouTube = memory.content.includes('youtube.com') || memory.content.includes('youtu.be');
  const youTubeId = isYouTube ? getYouTubeId(memory.content) : null;

  return (
    <div className="glass-card p-6 rounded-2xl shadow-xl">
      <h3 className="text-xl font-semibold text-purple-700 mb-4">Memory Unlocked!</h3>
      
      {memory.type === 'video' && isYouTube ? (
        <div className="relative pb-[56.25%] my-4"> {/* 16:9 aspect ratio */}
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youTubeId}?autoplay=1&rel=0`}
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : memory.type === 'video' ? (
        <video controls className="w-full rounded-lg my-4">
          <source src={memory.content} type="video/mp4" />
        </video>
      ) : (
        <img 
          src={memory.content} 
          alt="Memory" 
          className="w-full h-48 object-cover rounded-lg mb-4 shadow-sm"
        />
      )}
      
      <p className="text-gray-700 mb-6 italic">"{memory.message}"</p>
      
      <button
        onClick={onContinue}
        className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg font-medium shadow-md transition-all"
      >
        Continue
      </button>
    </div>
  );
};
export default MemoryReveal;