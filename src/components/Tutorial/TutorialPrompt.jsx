import React from 'react';

const TutorialPrompt = ({ onStart, onSkip }) => {
  console.log('🚀 TUTORIAL: Rendering prompt');

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl p-6 max-w-sm mx-4 shadow-2xl">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">📚</span>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Module Tutorial</h2>
          <p className="text-gray-600">
            Get a quick guide on how to use the training modules?
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onSkip}
            className="flex-1 px-4 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Skip
          </button>
          <button
            onClick={onStart}
            className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
          >
            Start Guide
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorialPrompt;