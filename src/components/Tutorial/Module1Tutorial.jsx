import React from 'react';
import { useTutorial } from '../../contexts/TutorialContext';
import TutorialOverlay from './TutorialOverlay';
import TutorialPrompt from './TutorialPrompt';

const Module1Tutorial = () => {
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
      content: "🎯 Welcome to Module 1: Data Clean Up! Here you'll learn practical data validation and cleaning techniques.",
      scrollTo: '.rounded-\\[40px\\]',
      position: 'bottom'
    },
    {
      content: "Use these tabs to navigate: Overview (objectives), Course Content (materials), Assignments (practice), Quiz (test).",
      scrollTo: '.border-b',
      position: 'bottom'
    },
    {
      content: "The Overview tab shows Module Objectives - understand what you'll achieve and the skills you'll develop.",
      scrollTo: '#overview-tab',
      position: 'bottom'
    },
    {
      content: "Learning Outcomes detail the specific skills you'll gain. Read these to understand what you'll be able to do.",
      scrollTo: '.rounded-3xl',
      position: 'bottom'
    },
    {
      content: "Course Content tab has the training manual. Download and study this PDF - it's your main learning resource.",
      scrollTo: '#course-tab',
      position: 'bottom'
    },
    {
      content: "Assignments tab contains practice datasets. Download these Excel files to apply your learning with real data.",
      scrollTo: '#assignments-tab',
      position: 'bottom'
    },
    {
      content: "Quiz tab tests your understanding. Complete this after studying the materials and finishing assignments.",
      scrollTo: '#quiz-tab',
      position: 'bottom'
    },
    {
      content: "✅ Remember the workflow: 1) Study Course Content → 2) Complete Assignments → 3) Take Quiz. All three steps are required to finish!",
      scrollTo: null,
      position: 'center'
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

export default Module1Tutorial;