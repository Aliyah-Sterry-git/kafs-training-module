import React from 'react';
import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';

const TutorialOverlay = ({ 
  isActive, 
  currentStep, 
  totalSteps, 
  onNext, 
  onPrev, 
  onSkip, 
  onComplete,
  stepData 
}) => {
  if (!isActive || !stepData) return null;

  const { content, scrollTo, position = 'center' } = stepData;

  const getBubblePosition = () => {
    const positions = {
      top: 'top-20 left-1/2 transform -translate-x-1/2',
      bottom: 'bottom-20 left-1/2 transform -translate-x-1/2',
      left: 'top-1/2 left-20 transform -translate-y-1/2',
      right: 'top-1/2 right-20 transform -translate-y-1/2',
      center: 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
    };
    return positions[position];
  };

  const getTailPosition = () => {
    const tails = {
      top: 'bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 rotate-45',
      bottom: 'top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 rotate-45',
      left: 'right-0 top-1/2 transform -translate-y-1/2 translate-x-1 -rotate-45',
      right: 'left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 -rotate-45',
      center: 'hidden'
    };
    return tails[position];
  };

  return (
    <div className="fixed inset-0 z-[10000] pointer-events-none">
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />
      
      {/* Tutorial Cloud Bubble */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className={`fixed ${getBubblePosition()} pointer-events-auto`}
      >
        {/* Cloud Bubble */}
        <div className="relative bg-white/95 backdrop-blur-sm rounded-[2rem] p-6 shadow-2xl border border-white/80 max-w-xs mx-auto">
          {/* Cloud bumps */}
          <div className="absolute -top-3 -left-3 w-6 h-6 bg-white/95 rounded-full shadow-sm"></div>
          <div className="absolute -top-4 left-6 w-8 h-8 bg-white/95 rounded-full shadow-sm"></div>
          <div className="absolute -top-3 right-6 w-7 h-7 bg-white/95 rounded-full shadow-sm"></div>
          <div className="absolute -top-2 -right-3 w-6 h-6 bg-white/95 rounded-full shadow-sm"></div>
          
          {/* Content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: totalSteps }).map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index === currentStep ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <button
                onClick={onSkip}
                className="text-gray-400 hover:text-gray-600 p-1 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Message */}
            <div className="text-gray-700 mb-4 text-sm leading-relaxed">
              {content}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={() => onPrev(scrollTo)}
                disabled={currentStep === 0}
                className="flex items-center gap-1 px-3 py-1.5 text-gray-500 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-xs font-medium rounded-full border border-gray-300"
              >
                <ChevronLeft className="w-3 h-3" />
                Back
              </button>

              <span className="text-xs text-gray-400 px-2">
                {currentStep + 1} of {totalSteps}
              </span>

              {currentStep < totalSteps - 1 ? (
                <button
                  onClick={() => onNext(scrollTo)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full hover:shadow-lg transition-all text-xs font-medium shadow-md"
                >
                  Next
                  <ChevronRight className="w-3 h-3" />
                </button>
              ) : (
                <button
                  onClick={onComplete}
                  className="px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full hover:shadow-lg transition-all text-xs font-medium shadow-md"
                >
                  Finish
                </button>
              )}
            </div>
          </div>

          {/* Tail pointing to section */}
          <div className={`absolute w-4 h-4 bg-white/95 ${getTailPosition()} shadow-sm`}></div>
        </div>
      </motion.div>
    </div>
  );
};

export default TutorialOverlay;