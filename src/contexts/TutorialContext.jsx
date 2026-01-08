import React, { createContext, useContext, useState, useEffect } from 'react';

const TutorialContext = createContext();

export const useTutorial = () => {
  const context = useContext(TutorialContext);
  if (!context) {
    throw new Error('useTutorial must be used within a TutorialProvider');
  }
  return context;
};

export const TutorialProvider = ({ children }) => {
  const [isTutorialActive, setIsTutorialActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showTutorialPrompt, setShowTutorialPrompt] = useState(true);

  const scrollToSection = (selector) => {
    if (!selector) return;
    
    setTimeout(() => {
      const element = document.querySelector(selector);
      if (element) {
        // Remove any existing highlights
        document.querySelectorAll('.tutorial-highlight').forEach(el => {
          el.classList.remove('tutorial-highlight', 'ring-4', 'ring-blue-400', 'ring-opacity-60');
        });
        
        // Add highlight to current element
        element.classList.add('tutorial-highlight', 'ring-4', 'ring-blue-400', 'ring-opacity-60');
        
        // Scroll to element
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center'
        });

        // Remove highlight after 3 seconds
        setTimeout(() => {
          element.classList.remove('tutorial-highlight', 'ring-4', 'ring-blue-400', 'ring-opacity-60');
        }, 3000);
      }
    }, 100);
  };

  const startTutorial = () => {
    setIsTutorialActive(true);
    setCurrentStep(0);
    setShowTutorialPrompt(false);
  };

  const skipTutorial = () => {
    setIsTutorialActive(false);
    setShowTutorialPrompt(false);
  };

  const nextStep = (scrollTo = null) => {
    setCurrentStep(prev => {
      const nextStep = prev + 1;
      if (scrollTo) {
        scrollToSection(scrollTo);
      }
      return nextStep;
    });
  };

  const prevStep = (scrollTo = null) => {
    setCurrentStep(prev => {
      const prevStep = Math.max(0, prev - 1);
      if (scrollTo) {
        scrollToSection(scrollTo);
      }
      return prevStep;
    });
  };

  const completeTutorial = () => {
    setIsTutorialActive(false);
  };

  const value = {
    isTutorialActive,
    currentStep,
    showTutorialPrompt,
    startTutorial,
    skipTutorial,
    nextStep,
    prevStep,
    completeTutorial,
    scrollToSection
  };

  return (
    <TutorialContext.Provider value={value}>
      {children}
    </TutorialContext.Provider>
  );
};