import React from 'react';
import { useTutorial } from '../../contexts/TutorialContext';
import TutorialOverlay from './TutorialOverlay';
import TutorialPrompt from './TutorialPrompt';

const ModulesTutorial = () => {
  const { 
    isTutorialActive, 
    currentStep, 
    showTutorialPrompt,
    startTutorial, 
    skipTutorial, 
    nextStep, 
    prevStep, 
    completeTutorial 
  } = useTutorial();

  const steps = [
    {
      content: "📚 Welcome to your Training Modules! This is where all your courses are organized in a structured learning path.",
      scrollTo: '.max-w-7xl',
      position: 'center'
    },
    {
      content: "Your Progress tracker shows your overall completion percentage. Watch this grow as you complete more modules!",
      scrollTo: '.bg-black\\/40:nth-child(1)',
      position: 'right'
    },
    {
      content: "Module Status shows what's available: Green = Ready to start, Orange = In progress, Red = Locked (unlocks later).",
      scrollTo: '.bg-black\\/40:nth-child(2)',
      position: 'right'
    },
    {
      content: "Each module card shows the topic, description, and progress. Accessible modules are ready for you to begin learning!",
      scrollTo: '.grid-cols-1',
      position: 'bottom'
    },
    {
      content: "Click on Module 1: Data Clean Up to start your first training module! This teaches essential data skills for actuaries.",
      scrollTo: 'a[href*="/modules/1"]',
      position: 'bottom'
    }
  ];

  if (showTutorialPrompt) {
    return <TutorialPrompt onStart={startTutorial} onSkip={skipTutorial} />;
  }

  if (!isTutorialActive) return null;

  return (
    <TutorialOverlay
      isActive={isTutorialActive}
      currentStep={currentStep}
      totalSteps={steps.length}
      onNext={nextStep}
      onPrev={prevStep}
      onSkip={skipTutorial}
      onComplete={completeTutorial}
      stepData={steps[currentStep]}
    />
  );
};

export default ModulesTutorial;