import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  ArrowLeft,
  BarChart2,
  Bell,
  User,
  Book,
  Clock,
  Calendar,
  FileText,
  Award,
  Download,
  Eye,
  CheckCircle,
  Check,
  Link as LinkIcon,
  ExternalLink,
  Upload,
  Database,
  Settings
} from "lucide-react";

export default function Module1() {
  const [activeTab, setActiveTab] = useState("overview");
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const switchTab = (tabId) => {
    setActiveTab(tabId);
    if (tabId !== 'quiz') {
      setShowQuizResults(false);
    }
  };

  const handleAnswerSelect = (questionId, answer) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      type: file.type,
      uploadDate: new Date().toLocaleDateString()
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
    event.target.value = ''; // Reset input
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const quizQuestions = [
    // Section 1: Data Requirements
    {
      id: 1,
      question: "Which of the following is not a required data item in the Premium Register?",
      options: [
        "a) Unique policy identifier",
        "b) Policy start-date",
        "c) Gross premium",
        "d) Claim status"
      ],
      correctAnswer: "d) Claim status",
      explanation: "Claim status belongs to claims data, not the Premium Register."
    },
    {
      id: 2,
      question: "The Exposure File is primarily used for the computation of:",
      options: [
        "a) Loss Ratio",
        "b) Unearned Premium Reserve (UPR)",
        "c) Solvency Margin",
        "d) Incurred But Not Reported (IBNR) claims"
      ],
      correctAnswer: "b) Unearned Premium Reserve (UPR)",
      explanation: "The Exposure File contains active in-force policies used in UPR calculations."
    },
    {
      id: 3,
      question: "Paid claims information should cover:",
      options: [
        "a) At least 3 years",
        "b) At least 5 years",
        "c) At least 6 years",
        "d) At least 10 years"
      ],
      correctAnswer: "c) At least 6 years",
      explanation: "Paid claims must cover a minimum of 6 years to capture historical claims experience."
    },
    {
      id: 4,
      question: "Which of the following must be confirmed in Paid Claims data?",
      options: [
        "a) That only settled claims are included",
        "b) That future claims projections are included",
        "c) That exposure adjustments are made",
        "d) That policy endorsements are tracked"
      ],
      correctAnswer: "a) That only settled claims are included",
      explanation: "The Paid Claims file should only include fully/partially settled claims."
    },
    {
      id: 5,
      question: "Outstanding claims are defined as:",
      options: [
        "a) Claims fully settled in the current year",
        "b) Claims that are reported but not yet paid",
        "c) Claims denied by reinsurers",
        "d) Claims that have been written off"
      ],
      correctAnswer: "b) Claims that are reported but not yet paid",
      explanation: "Outstanding claims = reported but unpaid."
    },
    {
      id: 6,
      question: "Which financial statements are required for general insurance valuation?",
      options: [
        "a) Management accounts only",
        "b) Audited accounts and management accounts",
        "c) Trial balance and solvency margin report",
        "d) Premium register and claims data"
      ],
      correctAnswer: "b) Audited accounts and management accounts",
      explanation: "Both audited accounts and management accounts are needed for valuation."
    },

    // Section 2: Data Checks
    {
      id: 7,
      question: "Which of the following is not a data check type described in the manual?",
      options: [
        "a) Reasonability & Appropriateness",
        "b) Consistency",
        "c) Completeness & Accuracy",
        "d) Predictive Analytics"
      ],
      correctAnswer: "d) Predictive Analytics",
      explanation: "The three checks are reasonability, consistency, and completeness/accuracy."
    },
    {
      id: 8,
      question: "An example of a reasonability check is:",
      options: [
        "a) Checking if policy start-date is after policy end-date",
        "b) Verifying solvency margins",
        "c) Comparing premium growth rates to GDP growth",
        "d) Forecasting next year's claims"
      ],
      correctAnswer: "a) Checking if policy start-date is after policy end-date",
      explanation: "Ensuring logical date sequences is a reasonability check."
    },
    {
      id: 9,
      question: "Which date sequence is correct according to the checks?",
      options: [
        "a) Claim reporting date → Claim loss-date → Claim payment date",
        "b) Claim loss-date → Claim reporting date → Claim payment date",
        "c) Policy end-date → Claim loss-date → Policy start-date",
        "d) Claim payment date → Claim reporting date → Claim loss-date"
      ],
      correctAnswer: "b) Claim loss-date → Claim reporting date → Claim payment date",
      explanation: "A claim must occur, then be reported, then be paid."
    },
    {
      id: 10,
      question: "A movement analysis in Outstanding Claims involves:",
      options: [
        "a) Reconciling opening, reported, and paid claims",
        "b) Checking only paid claims year-to-date",
        "c) Projecting ultimate claims",
        "d) Verifying solvency margins"
      ],
      correctAnswer: "a) Reconciling opening, reported, and paid claims",
      explanation: "Movement analysis ensures reconciliation of outstanding claims."
    },
    {
      id: 11,
      question: "Completeness checks require comparing GI data with:",
      options: [
        "a) Regulatory capital requirements",
        "b) The numbers in financial accounts",
        "c) Competitors' data",
        "d) Future claims estimates"
      ],
      correctAnswer: "b) The numbers in financial accounts",
      explanation: "Completeness is checked by reconciling GI data to accounts."
    },
    {
      id: 12,
      question: "When data errors occur, one valid approach is:",
      options: [
        "a) Always deleting the records",
        "b) Ignoring errors without documentation",
        "c) Correcting errors with client validation",
        "d) Creating synthetic claims data"
      ],
      correctAnswer: "c) Correcting errors with client validation",
      explanation: "Corrections must be validated with the client for auditability."
    },

    // Section 3: Data Handling & Reporting
    {
      id: 13,
      question: "Which factor should not guide how to treat data errors?",
      options: [
        "a) Purpose of the data",
        "b) Volume of data",
        "c) Number of actuaries in the team",
        "d) Ability to validate correction"
      ],
      correctAnswer: "c) Number of actuaries in the team",
      explanation: "Staffing is irrelevant; treatment depends on purpose, volume, and validation."
    },
    {
      id: 14,
      question: "Assumptions made when filling in missing data must:",
      options: [
        "a) Be approved by the reinsurer",
        "b) Be highlighted and reviewed by the Actuarial Manager",
        "c) Be omitted from reports",
        "d) Be reported only verbally"
      ],
      correctAnswer: "b) Be highlighted and reviewed by the Actuarial Manager",
      explanation: "All assumptions must be documented and signed off."
    },
    {
      id: 15,
      question: "Failed data checks and queries should be:",
      options: [
        "a) Corrected immediately without client involvement",
        "b) Summarized and sent to the client for clarification",
        "c) Ignored if immaterial",
        "d) Reported only at year-end"
      ],
      correctAnswer: "b) Summarized and sent to the client for clarification",
      explanation: "Queries must be documented and shared with the client."
    },
    {
      id: 16,
      question: "Summaries per class of business must include:",
      options: [
        "a) Claims and premiums by loss year/quarter",
        "b) Investment income by asset class",
        "c) Cashflows by product line",
        "d) Staff expenses by department"
      ],
      correctAnswer: "a) Claims and premiums by loss year/quarter",
      explanation: "Summaries include claims counts/amounts and premium data."
    },
    {
      id: 17,
      question: "Premium register summaries should present:",
      options: [
        "a) Gross and net written premium per underwriting year",
        "b) Gross incurred claims per loss year",
        "c) Net solvency position",
        "d) Policyholder age distribution"
      ],
      correctAnswer: "a) Gross and net written premium per underwriting year",
      explanation: "Premium summaries focus on gross and net premiums."
    }
  ];

  const calculateScore = () => {
    let correct = 0;
    quizQuestions.forEach(q => {
      if (quizAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return { correct, total: quizQuestions.length };
  };

  const isAnswerCorrect = (questionId, option) => {
    if (!showQuizResults) return false;
    const question = quizQuestions.find(q => q.id === questionId);
    return option === question.correctAnswer;
  };

  const isAnswerIncorrect = (questionId, option) => {
    if (!showQuizResults) return false;
    const question = quizQuestions.find(q => q.id === questionId);
    return quizAnswers[questionId] === option && option !== question.correctAnswer;
  };

  return (
    <div className="min-h-screen relative">
      {/* Background with blur (same as Modules page) */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/src/assets/bground.jpg')`,
          filter: "blur(4px) brightness(0.7)",
        }}
      />

      <main className="relative z-10 max-w-6xl mx-auto px-4 py-8">
       
        {/* Module Hero Container */}
        <div
          className="rounded-[40px] overflow-hidden mb-6 relative bg-black/75 backdrop-blur-xl border border-white/10 shadow-xl"
          data-aos="fade-up"
        >
         

          {/* Content */}
          <div className="p-6 flex flex-col space-y-4">
           
            {/* Icon + Title Row */}
            <div className="flex items-center space-x-4">
              <div className="inline-block p-4 rounded-full bg-sky-500/30 border border-sky-400/40">
                <Book className="w-9 h-9 text-sky-300" />
              </div>
              <h1 className="text-4xl font-extrabold text-sky-400">Data Cleaning and Validation</h1>
            </div>

            {/* Full-width Description */}
            <p className="text-base md:text-lg text-gray-200 leading-relaxed">
              Learn how to validate, clean, and standardize General Insurance Premium
              and Claims data. This module equips you with practical techniques to
              prepare actuarially fit datasets for pricing, reserving, and solvency monitoring.
            </p>

            {/* Buttons */}
            <div className="flex space-x-3">
              <button className="px-5 py-2 bg-sky-500/70 hover:bg-sky-600 text-white rounded-[20px] font-medium transition">
                Start Module
              </button>
            </div>
          </div>
        </div>

        {/* --- TAB NAVIGATION --- */}
<div className="mb-8" data-aos="fade-up">
  <div className="border-b border-gray-200/20">
    <nav className="flex space-x-8">
      <button
        onClick={() => switchTab('overview')}
        className={`pb-4 px-1 text-sm font-medium border-b-2 transition-all duration-300 ${
          activeTab === 'overview'
            ? 'border-sky-400 text-sky-400'
            : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
        }`}
      >
        Overview
      </button>
      <button
        onClick={() => switchTab('course')}
        className={`pb-4 px-1 text-sm font-medium border-b-2 transition-all duration-300 ${
          activeTab === 'course'
            ? 'border-sky-400 text-sky-400'
            : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
        }`}
      >
        Course Content
      </button>
      <button
        onClick={() => switchTab('assignments')}
        className={`pb-4 px-1 text-sm font-medium border-b-2 transition-all duration-300 ${
          activeTab === 'assignments'
            ? 'border-sky-400 text-sky-400'
            : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
        }`}
      >
        Assignments
      </button>
      <button
        onClick={() => switchTab('quiz')}
        className={`pb-4 px-1 text-sm font-medium border-b-2 transition-all duration-300 ${
          activeTab === 'quiz'
            ? 'border-sky-400 text-sky-400'
            : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
        }`}
      >
        Quiz
      </button>
    </nav>
  </div>
</div>

        {/* --- TAB CONTENTS --- */}
        <div className="space-y-6">

          {activeTab === 'overview' && (
  <div className="rounded-3xl bg-black/65 backdrop-blur-xl border border-white/10 p-6" data-aos="fade-up">
    <h3 className="text-xl font-bold text-white mb-4 relative inline-block">
      Module Objective
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-sky-400 to-blue-500 transform translate-y-1"></span>
    </h3>
    <p className="text-gray-200 mb-6 text-sm">
      This module aims to equip you with practical skills in validating, cleaning, and standardizing General Insurance Premium
      and Claims data. By the end of the module, you will be able to:
     
      <ul className="list-disc pl-5 mt-2">
        <li>Identify and correct data quality issues</li>
        <li>Apply consistent data standards</li>
        <li>Prepare accurate and reliable GI premium and claims datasets</li>
      </ul>
      This will strengthen the integrity of actuarial analysis, enhance financial reporting accuracy, and ensure compliance with regulatory requirements.
    </p>

    <h3 className="text-xl font-bold text-white mb-4 relative inline-block">
      Learning Outcomes
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-sky-400 to-blue-500 transform translate-y-1"></span>
    </h3>
    <ul className="list-disc pl-5 text-gray-200 space-y-2 mb-6 text-sm">
      <li>Identify and correct data inconsistencies in GI Premium and Claims datasets using standard validation and clean-up techniques.</li>
      <li>Detect and resolve data quality issues such as missing values, duplicates, inconsistencies, and misclassifications across GI datasets.</li>
      <li>Prepare actuarially fit datasets that can be seamlessly used for pricing, reserving, financial reporting, solvency monitoring, and regulatory submissions</li>
      <li>Develop and use standardized working templates that improve data quality, reproducibility, and compliance with internal technical procedures.</li>
    </ul>
  </div>
)}
         
{/* Course Content Tab */}
{activeTab === 'course' && (
  <div data-aos="fade-up">
    <div className="bg-black/40 backdrop-blur-md rounded-[40px] p-8 border border-white/10">
      {/* Intro */}
      <h3 className="text-2xl font-bold text-white mb-4">Course Content</h3>
      <p className="text-gray-300 mb-6">
        This module is guided by a comprehensive PDF manual.
        It contains all the instructions, worked examples, and exercises
        you need to master <span className="text-sky-400">Data Clean Up</span>.
        Download and use it as your primary reference throughout the module.
      </p>

      {/* Resource Card */}
      <div className="rounded-[30px] bg-sky-500/20 border border-sky-400/30 p-6 flex items-center justify-between hover:bg-sky-500/30 transition">
        <div className="flex items-center space-x-4">
          <div className="p-4 bg-sky-600/40 rounded-2xl">
            📄
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white">Data Clean Up Training Manual</h4>
            <p className="text-sm text-gray-300">PDF • 45 pages • 1.2 MB</p>
          </div>
        </div>
        <button className="px-6 py-2 bg-sky-500 hover:bg-sky-600 rounded-lg text-white transition">
          Download
        </button>
      </div>

      {/* Optional: Coming Soon */}
      <div className="mt-8 text-gray-400 text-sm italic">
        Supplementary resources will be added here in future updates.
      </div>
    </div>
  </div>
)}


          {/* QUIZ TAB */}
          {activeTab === 'quiz' && (
            <div className="rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 p-6 space-y-8" data-aos="fade-up">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-white">Quiz: Data Requirements & Checks</h3>
                {!showQuizResults && (
                  <button
                    onClick={() => setShowQuizResults(true)}
                    disabled={Object.keys(quizAnswers).length !== quizQuestions.length}
                    className="px-4 py-2 bg-sky-600 hover:bg-sky-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition"
                  >
                    Check Answers
                  </button>
                )}
                {showQuizResults && (
                  <div className="text-sky-400 font-semibold">
                    Score: {calculateScore().correct}/{calculateScore().total}
                  </div>
                )}
              </div>

              <div className="space-y-8">
                {quizQuestions.map((q) => (
                  <div key={q.id} className="bg-white/5 rounded-lg p-6">
                    <h4 className="text-lg font-medium text-white mb-4">
                      {q.id}. {q.question}
                    </h4>
                   
                    <div className="space-y-3">
                      {q.options.map((option) => (
                        <label
                          key={option}
                          className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${
                            isAnswerCorrect(q.id, option)
                              ? 'bg-green-500/20 border border-green-400'
                              : isAnswerIncorrect(q.id, option)
                                ? 'bg-red-500/20 border border-red-400'
                                : quizAnswers[q.id] === option
                                  ? 'bg-sky-500/20 border border-sky-400'
                                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`question-${q.id}`}
                            value={option}
                            checked={quizAnswers[q.id] === option}
                            onChange={() => handleAnswerSelect(q.id, option)}
                            className="mr-3"
                            disabled={showQuizResults}
                          />
                          <span className="text-gray-200">{option}</span>
                         
                          {showQuizResults && isAnswerCorrect(q.id, option) && (
                            <Check className="w-5 h-5 text-green-400 ml-auto" />
                          )}
                          {showQuizResults && isAnswerIncorrect(q.id, option) && (
                            <span className="w-5 h-5 text-red-400 ml-auto">✗</span>
                          )}
                        </label>
                      ))}
                    </div>

                    {showQuizResults && (
                      <div className="mt-4 p-4 bg-sky-500/10 border border-sky-400/30 rounded-lg">
                        <p className="text-sky-300 font-medium mb-2">Explanation:</p>
                        <p className="text-gray-200">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {showQuizResults && (
                <div className="text-center">
                  <button
                    onClick={() => {
                      setShowQuizResults(false);
                      setQuizAnswers({});
                    }}
                    className="px-6 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition"
                  >
                    Retake Quiz
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ASSIGNMENTS TAB */}
          {activeTab === 'assignments' && (
            <div className="rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 p-6 space-y-8" data-aos="fade-up">
              <h3 className="text-2xl font-bold text-white mb-6">Assignments</h3>
             
              {/* Data Subsection */}
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-blue-400 flex items-center gap-3">
                  <Database className="w-6 h-6" />
                  Data Files
                </h4>
                <p className="text-gray-300 mb-4">
                  Download the following datasets to practice your data cleaning and validation skills:
                </p>
               
                <div className="space-y-4">
                  {/* Premium Register Data */}
                  <div className="rounded-[30px] bg-blue-500/20 border border-blue-400/30 p-6 flex items-center justify-between hover:bg-blue-500/30 transition">
                    <div className="flex items-center space-x-4">
                      <div className="p-4 bg-blue-600/40 rounded-2xl">
                        📊
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white">Premium Register Data</h4>
                        <p className="text-sm text-gray-300">Excel • 2.4 MB • Sample dataset</p>
                      </div>
                    </div>
                    <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white transition">
                      Download
                    </button>
                  </div>

                  {/* Paid Claims Data */}
                  <div className="rounded-[30px] bg-green-500/20 border border-green-400/30 p-6 flex items-center justify-between hover:bg-green-500/30 transition">
                    <div className="flex items-center space-x-4">
                      <div className="p-4 bg-green-600/40 rounded-2xl">
                        📈
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white">Paid Claims Data</h4>
                        <p className="text-sm text-gray-300">Excel • 1.8 MB • Sample dataset</p>
                      </div>
                    </div>
                    <button className="px-6 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-white transition">
                      Download
                    </button>
                  </div>

                  {/* Outstanding Claims Data */}
                  <div className="rounded-[30px] bg-purple-500/20 border border-purple-400/30 p-6 flex items-center justify-between hover:bg-purple-500/30 transition">
                    <div className="flex items-center space-x-4">
                      <div className="p-4 bg-purple-600/40 rounded-2xl">
                        📋
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white">Outstanding Claims Data</h4>
                        <p className="text-sm text-gray-300">Excel • 3.1 MB • Sample dataset</p>
                      </div>
                    </div>
                    <button className="px-6 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg text-white transition">
                      Download
                    </button>
                  </div>
                </div>
              </div>

              {/* Working File Subsection */}
              <div className="space-y-4 pt-6 border-t border-white/10">
                <h4 className="text-xl font-semibold text-orange-400 flex items-center gap-3">
                  <Settings className="w-6 h-6" />
                  Working Files
                </h4>
                <p className="text-gray-300 mb-4">
                  Download these templates to structure your data cleaning workflow:
                </p>
               
                <div className="space-y-4">
                  {/* Claims Data Clean Up Template */}
                  <div className="rounded-[30px] bg-orange-500/20 border border-orange-400/30 p-6 flex items-center justify-between hover:bg-orange-500/30 transition">
                    <div className="flex items-center space-x-4">
                      <div className="p-4 bg-orange-600/40 rounded-2xl">
                        🛠️
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white">Claims Data Clean Up Template</h4>
                        <p className="text-sm text-gray-300">Excel • 0.8 MB • Structured template</p>
                      </div>
                    </div>
                    <button className="px-6 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg text-white transition">
                      Download
                    </button>
                  </div>

                  {/* Premium Data Clean Up Template */}
                  <div className="rounded-[30px] bg-yellow-500/20 border border-yellow-400/30 p-6 flex items-center justify-between hover:bg-yellow-500/30 transition">
                    <div className="flex items-center space-x-4">
                      <div className="p-4 bg-yellow-600/40 rounded-2xl">
                        ⚙️
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white">Premium Data Clean Up Template</h4>
                        <p className="text-sm text-gray-300">Excel • 0.9 MB • Structured template</p>
                      </div>
                    </div>
                    <button className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-white transition">
                      Download
                    </button>
                  </div>
                </div>
              </div>

              {/* Submission Subsection */}
              <div className="space-y-4 pt-6 border-t border-white/10">
                <h4 className="text-xl font-semibold text-emerald-400 flex items-center gap-3">
                  <Upload className="w-6 h-6" />
                  Submission
                </h4>
                <p className="text-gray-300 mb-4">
                  Upload your completed assignments for review and feedback:
                </p>
               
                <div className="rounded-3xl bg-emerald-500/10 border border-emerald-400/20 p-6">
                  {/* Upload Area */}
                  <div className="border-2 border-dashed border-emerald-400/30 rounded-2xl p-8 text-center hover:border-emerald-400/50 transition-colors">
                    <Upload className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                    <h5 className="text-lg font-semibold text-white mb-2">Upload Your Completed Work</h5>
                    <p className="text-gray-300 mb-4">
                      Drag and drop your files here, or click to browse
                    </p>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="inline-block px-6 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-lg text-white cursor-pointer transition"
                    >
                      Choose Files
                    </label>
                    <p className="text-xs text-gray-400 mt-2">
                      Supported formats: .xlsx, .xls, .pdf, .docx, .pptx (Max 50MB per file)
                    </p>
                  </div>

                  {/* Uploaded Files List */}
                  {uploadedFiles.length > 0 && (
                    <div className="mt-6">
                      <h6 className="text-md font-semibold text-white mb-3">Uploaded Files:</h6>
                      <div className="space-y-2">
                        {uploadedFiles.map(file => (
                          <div key={file.id} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                            <div className="flex items-center space-x-3">
                              <FileText className="w-4 h-4 text-emerald-400" />
                              <div>
                                <p className="text-white text-sm font-medium">{file.name}</p>
                                <p className="text-gray-400 text-xs">{file.size} • {file.uploadDate}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => removeFile(file.id)}
                              className="text-red-400 hover:text-red-300 transition"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                     
                      {/* Submit Button */}
                      <div className="mt-4 text-center">
                        <button className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-xl text-white font-semibold transition shadow-lg hover:shadow-emerald-500/25">
                          Submit All Files for Review
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

         
        </div>
      </main>
    </div>
  );
}