import React, { useState, useEffect, useRef } from "react";
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
  ExternalLink,
  Upload,
  Database,
  Settings,
  Calculator,
  TrendingUp,
  BarChart,
  PieChart,
  Target,
  DollarSign,
  Shield,
  TrendingDown,
  Percent
} from "lucide-react";

export default function Module3({ theme = 'dark' }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const aosInitialized = useRef(false);

  useEffect(() => {
    if (!aosInitialized.current) {
      AOS.init({
        duration: 800,
        easing: "ease-in-out",
        once: true,
      });
      aosInitialized.current = true;
    }
  }, []);

  // Refresh AOS when theme or tab changes
  useEffect(() => {
    if (aosInitialized.current) {
      AOS.refresh();
    }
  }, [theme, activeTab]);

  // Theme-based styles - GREEN accent for financial/accounting module
  const getThemeStyles = () => {
    if (theme === 'light') {
      return {
        bg: 'bg-white/95',
        cardBg: 'bg-white/95',
        text: 'text-gray-900',
        textSecondary: 'text-gray-700',
        textTertiary: 'text-gray-600',
        border: 'border-white/30',
        hover: 'hover:bg-white',
        inputBg: 'bg-white/90',
        shadow: 'shadow-2xl shadow-emerald-500/10',
        accent: 'text-emerald-600',
        accentBg: 'bg-emerald-50/80',
        accentBorder: 'border-emerald-200/50',
        accentHover: 'hover:bg-emerald-100/80',
        gradientText: 'bg-gradient-to-r from-emerald-600 to-emerald-600 bg-clip-text text-transparent',
        transition: 'transition-all duration-300 ease-in-out'
      };
    }
    return {
      bg: 'bg-transparent',
      cardBg: 'bg-black/65',
      text: 'text-white',
      textSecondary: 'text-gray-200',
      textTertiary: 'text-gray-300',
      border: 'border-white/10',
      hover: 'hover:bg-white/10',
      inputBg: 'bg-white/5',
      shadow: 'shadow-xl',
      accent: 'text-emerald-400',
      accentBg: 'bg-emerald-500/20',
      accentBorder: 'border-emerald-400/30',
      accentHover: 'hover:bg-emerald-500/30',
      gradientText: 'text-emerald-400',
      transition: 'transition-all duration-300 ease-in-out'
    };
  };

  const styles = getThemeStyles();

  const downloadFile = (url, filename) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const switchTab = (tabId) => {
    setActiveTab(tabId);
    if (tabId !== 'quiz') {
      setShowQuizResults(false);
    }
    if (tabId === 'quiz') {
      setCurrentQuestionIndex(0);
    }
  };

  const handleAnswerSelect = (questionId, answer) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const submitQuiz = () => {
    setShowQuizResults(true);
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
    event.target.value = '';
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const quizQuestions = [
    {
      id: 1,
      question: "Under IFRS 17, the Liability for Remaining Coverage (LRC) primarily represents:",
      options: [
        "a) The present value of future claims payments",
        "b) The insurer's obligation to provide coverage for the unexpired portion of insurance contracts",
        "c) The total written premium for the financial year",
        "d) The reinsurance recoverables from cedants"
      ],
      correctAnswer: "b) The insurer's obligation to provide coverage for the unexpired portion of insurance contracts",
      explanation: "LRC represents the obligation to provide coverage for the remaining period of insurance contracts, before claims occur."
    },
    {
      id: 2,
      question: "The Unearned Premium Reserve (UPR) is calculated as:",
      options: [
        "a) Total written premium minus earned premium",
        "b) Total claims incurred minus claims paid",
        "c) Earned premium minus acquisition costs",
        "d) Gross premium minus commissions"
      ],
      correctAnswer: "a) Total written premium minus earned premium",
      explanation: "UPR = Written Premium - Earned Premium. It represents premium allocated to the unexpired risk period."
    },
    {
      id: 3,
      question: "Which method is commonly used to calculate earned premium for proportional recognition?",
      options: [
        "a) The 24th method",
        "b) The 365th method",
        "c) The discounted cash flow method",
        "d) The chain ladder method"
      ],
      correctAnswer: "b) The 365th method",
      explanation: "The 365th method (or days-proportional method) allocates premium evenly over the coverage period based on time elapsed."
    },
    {
      id: 4,
      question: "Deferred Acquisition Costs (DAC) represent:",
      options: [
        "a) Costs incurred to acquire new insurance contracts that are expensed immediately",
        "b) Costs incurred to acquire new insurance contracts that are capitalized and amortized over the coverage period",
        "c) Costs of settling claims",
        "d) Reinsurance commission expenses"
      ],
      correctAnswer: "b) Costs incurred to acquire new insurance contracts that are capitalized and amortized over the coverage period",
      explanation: "DAC are incremental costs directly attributable to acquiring insurance contracts, deferred and amortized as coverage is provided."
    },
    {
      id: 5,
      question: "If a policy with annual premium of KES 365,000 starts on July 1 and the reporting date is December 31, what is the earned premium?",
      options: [
        "a) KES 182,500",
        "b) KES 365,000",
        "c) KES 0",
        "d) KES 31,000"
      ],
      correctAnswer: "a) KES 182,500",
      explanation: "Using 365th method: 184 days elapsed / 365 days × KES 365,000 = KES 182,500."
    },
    {
      id: 6,
      question: "For the same policy (KES 365,000 annual premium, July 1 start, Dec 31 reporting), what is the UPR?",
      options: [
        "a) KES 182,500",
        "b) KES 365,000",
        "c) KES 0",
        "d) KES 182,500"
      ],
      correctAnswer: "a) KES 182,500",
      explanation: "UPR = Written Premium - Earned Premium = 365,000 - 182,500 = 182,500."
    },
    {
      id: 7,
      question: "Which of the following is NOT a component in the LRC roll-forward calculation?",
      options: [
        "a) Opening LRC balance",
        "b) Premiums received during the period",
        "c) Insurance revenue recognized",
        "d) Acquisition costs deferred"
      ],
      correctAnswer: "b) Premiums received during the period",
      explanation: "Premiums received is a cash flow item; LRC roll-forward uses insurance revenue and acquisition costs deferred/amortized."
    },
    {
      id: 8,
      question: "The amortization of DAC should generally match:",
      options: [
        "a) The pattern of claims payments",
        "b) The recognition of insurance revenue (earning of premium)",
        "c) The payment of commissions to agents",
        "d) The timing of reinsurance recoveries"
      ],
      correctAnswer: "b) The recognition of insurance revenue (earning of premium)",
      explanation: "DAC is amortized in proportion to the recognition of insurance revenue to match costs with related revenues."
    },
    {
      id: 9,
      question: "A key objective of IFRS 17 in relation to LRC is to:",
      options: [
        "a) Maximize reported profits in early years",
        "b) Provide transparent information about insurance contract profitability",
        "c) Minimize tax liabilities through reserve manipulation",
        "d) Simplify accounting by eliminating all deferrals"
      ],
      correctAnswer: "b) Provide transparent information about insurance contract profitability",
      explanation: "IFRS 17 aims to provide relevant, faithful representation of insurance contracts, including profit emergence patterns."
    },
    {
      id: 10,
      question: "Which financial statement is most affected by LRC calculations?",
      options: [
        "a) Statement of cash flows",
        "b) Statement of changes in equity",
        "c) Statement of financial position (balance sheet)",
        "d) Notes to financial statements only"
      ],
      correctAnswer: "c) Statement of financial position (balance sheet)",
      explanation: "LRC is a liability on the balance sheet; its changes affect insurance revenue in the income statement."
    },
    {
      id: 11,
      question: "When calculating UPR using the 365th method, weekends and holidays are:",
      options: [
        "a) Counted as full days",
        "b) Excluded from the calculation",
        "c) Counted as half-days",
        "d) Treated as earned premium days only"
      ],
      correctAnswer: "a) Counted as full days",
      explanation: "The 365th method typically uses actual calendar days, including weekends and holidays, unless contract specifies otherwise."
    },
    {
      id: 12,
      question: "Which of the following would increase the LRC balance?",
      options: [
        "a) Recognition of insurance revenue",
        "b) Amortization of DAC",
        "c) New contracts written during the period",
        "d) Claims incurred during the period"
      ],
      correctAnswer: "c) New contracts written during the period",
      explanation: "New contracts increase the obligation to provide future coverage, thus increasing LRC (before revenue recognition)."
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

  const isAnswerCorrect = (questionId) => {
    const question = quizQuestions.find(q => q.id === questionId);
    return quizAnswers[questionId] === question.correctAnswer;
  };

  return (
    <div className={`min-h-screen relative ${styles.transition}`}>
      {/* Background - Single element, always rendered */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-500"
        style={{
          backgroundImage: `url('/src/assets/bground.jpg')`,
        }}
      >
        {/* Overlay for theme effects */}
        <div
          className="absolute inset-0 transition-all duration-500"
          style={{
            background: theme === 'light'
              ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.65) 0%, rgba(5, 150, 105, 0.59) 100%)'
              : 'rgba(0, 0, 0, 0.3)',
            backdropFilter: theme === 'dark' ? 'blur(4px)' : 'blur(2px)',
          }}
        />
      </div>

      <main className={`relative z-10 max-w-6xl mx-auto px-4 py-8 ${styles.transition}`}>

        {/* Module Hero Container */}
        <div
          className={`rounded-[40px] overflow-hidden mb-6 relative ${theme === 'light'
            ? 'bg-white/95 shadow-2xl shadow-emerald-500/10 border border-white/30'
            : 'bg-black/75 backdrop-blur-xl border border-white/10 shadow-xl'
            } ${styles.transition}`}
          data-aos="fade-up"
        >
          <div className="p-6 md:p-8">
            <div className="flex items-center space-x-4 md:space-x-6">
              <div className={`inline-block p-4 rounded-full ${theme === 'light'
                ? 'bg-gradient-to-br from-emerald-400 to-emerald-500'
                : 'bg-emerald-500/30 border border-emerald-400/40'
                } ${styles.transition} flex-shrink-0`}>
                <DollarSign className={`w-9 h-9 ${theme === 'light' ? 'text-white' : 'text-emerald-300'} ${styles.transition}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className={`text-3xl md:text-4xl font-extrabold leading-tight ${theme === 'light'
                  ? 'bg-gradient-to-r from-emerald-600 to-emerald-600 bg-clip-text text-transparent bg-origin-padding'
                  : 'text-emerald-400'
                  } ${styles.transition}`}>
                  Liability for Remaining Coverage (LRC)
                </h1>
              </div>
            </div>

            <p className={`text-base md:text-lg leading-relaxed mt-4 md:mt-6 ${styles.textSecondary} ${styles.transition}`}>
              Master the calculation and analysis of Liability for Remaining Coverage under IFRS 17. This module covers Unearned Premium Reserve (UPR), Earned Premium, Deferred Acquisition Costs (DAC), and the comprehensive LRC roll-forward calculations essential for accurate financial reporting and compliance.
            </p>
          </div>
        </div>

        {/* TAB NAVIGATION */}
        <div className="mb-8" data-aos="fade-up">
          <div className={`border-b ${theme === 'light' ? 'border-emerald-200' : 'border-gray-200/20'} ${styles.transition}`}>
            <nav className="flex space-x-8">
              {['overview', 'course', 'assignments', 'quiz'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => switchTab(tab)}
                  className={`pb-4 text-sm font-medium border-b-2 transition-all duration-200 ${activeTab === tab
                    ? theme === 'light'
                      ? 'border-white text-white font-semibold bg-emerald-600/20 px-3 py-1 rounded-t-lg'
                      : 'border-emerald-400 text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-t-lg'
                    : theme === 'light'
                      ? 'border-transparent text-white/80 hover:text-white hover:border-white px-1'
                      : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300 px-1'
                    } ${styles.transition}`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* TAB CONTENTS */}
        <div className="space-y-6">

          {activeTab === 'overview' && (
            <div className={`rounded-3xl ${styles.cardBg} backdrop-blur-xl border ${styles.border} ${styles.shadow} p-6 ${styles.transition}`} data-aos="fade-up">
              <h3 className={`text-xl font-bold ${styles.text} mb-4 relative inline-block`}>
                Module Objective
                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${theme === 'light'
                  ? 'bg-gradient-to-r from-emerald-600 to-emerald-600'
                  : 'bg-gradient-to-r from-emerald-400 to-emerald-500'
                  } transform translate-y-1 ${styles.transition}`}></span>
              </h3>
              <p className={`${styles.textSecondary} mb-6 text-sm ${styles.transition}`}>
                This module aims to equip learners with practical skills in calculating and analyzing the Liability for Remaining Coverage (LRC). By the end of the module, participants will be able to determine Unearned Premium Reserve (UPR), calculate Earned Premium, apply Deferred Acquisition Costs (DAC), and derive the LRC using real insurance data. This will strengthen the accuracy of actuarial valuations, improve the reliability of financial reporting, and support compliance with IFRS 17 requirements.
              </p>

              <h3 className={`text-xl font-bold ${styles.text} mb-4 relative inline-block`}>
                Learning Outcomes
                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${theme === 'light'
                  ? 'bg-gradient-to-r from-emerald-600 to-emerald-600'
                  : 'bg-gradient-to-r from-emerald-400 to-emerald-500'
                  } transform translate-y-1 ${styles.transition}`}></span>
              </h3>
              <ul className={`list-disc pl-5 ${styles.textSecondary} space-y-2 mb-6 text-sm ${styles.transition}`}>
                <li>Understand the purpose and definitions of Unearned Premium Reserve (UPR), Earned Premium, Deferred Acquisition Costs (DAC), and Liability for Remaining Coverage (LRC) under IFRS 17</li>
                <li>Explain the interrelationship between UPR, Earned Premium, DAC, and LRC in the context of insurance contract liabilities and revenue recognition</li>
                <li>Apply practical methods, such as the 365th method, to calculate UPR and Earned Premium, and demonstrate how these flow into LRC</li>
                <li>Calculate unamortized DAC and incorporate it into the roll-forward calculation of LRC balances</li>
                <li>Perform step-by-step LRC roll-forward calculations using worked examples, linking premium receivables, written premium, earned premium, UPR, and DAC</li>
                <li>Interpret results to ensure compliance with IFRS 17 and produce financial statements that fairly represent insurance contract liabilities</li>
              </ul>
            </div>
          )}

          {/* Course Content Tab */}
          {activeTab === 'course' && (
            <div data-aos="fade-up">
              <div className={`${styles.cardBg} backdrop-blur-md rounded-[40px] p-8 border ${styles.border} ${styles.transition}`}>
                <h3 className={`text-2xl font-bold ${styles.text} mb-4 ${styles.transition}`}>Course Content</h3>
                <p className={`${styles.textTertiary} mb-6 ${styles.transition}`}>
                  This module is guided by comprehensive technical documents. They contain all the instructions, worked examples, and exercises you need to master <span className={styles.accent}>Liability for Remaining Coverage (LRC) Analysis</span>. Download and use them as your primary references throughout the module.
                </p>

                {/* Resource Card */}
                <div className={`rounded-[30px] ${styles.accentBg} border ${styles.accentBorder} p-6 flex items-center justify-between ${styles.accentHover} ${styles.transition}`}>
                  <div className="flex items-center space-x-4">
                    <div className={`p-4 ${theme === 'light' ? 'bg-emerald-200' : 'bg-emerald-600/40'} rounded-2xl ${styles.transition}`}>
                      📄
                    </div>
                    <div>
                      <h4 className={`text-lg font-semibold ${styles.text} ${styles.transition}`}>LRC Internal Technical Procedure</h4>
                      <p className={`text-sm ${styles.textTertiary} ${styles.transition}`}>KAFS_Internal Technical Procedures_Liability for Remaining Coverage Analysis_2025.docx • Comprehensive guide</p>
                    </div>
                  </div>
                  <a
                    href="/Training Modules/Module-3-LRC/Course Content/KAFS_Internal Technical Procedures_Liability for Remaining Coverage Analysis_2025.docx"
                    download="KAFS_Internal Technical Procedures_Liability for Remaining Coverage Analysis_2025.docx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-6 py-2 ${theme === 'light'
                      ? 'bg-gradient-to-r from-emerald-600 to-emerald-600 hover:from-emerald-700 hover:to-emerald-700 shadow-lg hover:shadow-xl'
                      : 'bg-emerald-500 hover:bg-emerald-600'
                      } rounded-lg text-white transition-all duration-200 flex items-center gap-2`}
                  >
                    <Download className="w-4 h-4" />
                    Download DOCX
                  </a>
                </div>

                {/* Manual Preview Note */}
                <div className={`mt-6 p-4 ${styles.inputBg} rounded-lg border ${styles.border} ${styles.transition}`}>
                  <h5 className={`${styles.text} font-semibold mb-2 ${styles.transition}`}>About This Document:</h5>
                  <p className={`${styles.textTertiary} text-sm ${styles.transition}`}>
                    This document contains Kenbright Actuarial and Financial Services Limited's Internal Technical Procedures for Liability for Remaining Coverage Analysis. It covers:
                  </p>
                  <ul className={`list-disc pl-5 mt-2 ${styles.textTertiary} text-sm ${styles.transition}`}>
                    <li>IFRS 17 requirements for LRC calculation</li>
                    <li>Step-by-step UPR and Earned Premium calculations</li>
                    <li>DAC amortization methods and principles</li>
                    <li>Comprehensive LRC roll-forward calculations</li>
                    <li>Practical examples and implementation guidance</li>
                  </ul>
                </div>

                <div className={`mt-8 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'} text-sm italic ${styles.transition}`}>
                  Supplementary resources will be added here in future updates.
                </div>
              </div>
            </div>
          )}

          {/* QUIZ TAB */}
          {activeTab === 'quiz' && (
            <div className={`rounded-3xl ${styles.cardBg} backdrop-blur-xl border ${styles.border} p-6 ${styles.transition}`} data-aos="fade-up">
              {!showQuizResults ? (
                <>
                  {/* Quiz Header */}
                  <div className="flex justify-between items-center mb-6">
                    <h3 className={`text-xl font-semibold ${styles.text} ${styles.transition}`}>Quiz: Liability for Remaining Coverage (LRC)</h3>
                    <div className={`${styles.textTertiary} ${styles.transition}`}>
                      Question {currentQuestionIndex + 1} of {quizQuestions.length}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className={`w-full ${theme === 'light' ? 'bg-gray-200' : 'bg-white/10'} rounded-full h-2 mb-8 ${styles.transition}`}>
                    <div
                      className={`h-2 rounded-full transition-all duration-300`}
                      style={{
                        width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`,
                        backgroundColor: theme === 'light' ? '#059669' : '#00E5FF'
                      }}
                    />
                  </div>

                  {/* Question Card */}
                  <div className={`${styles.inputBg} rounded-2xl p-6 mb-6 border ${styles.border} ${styles.transition}`}>
                    <h4 className={`text-lg font-medium ${styles.text} mb-4 ${styles.transition}`}>
                      {quizQuestions[currentQuestionIndex].question}
                    </h4>

                    <div className="space-y-2.5">
                      {quizQuestions[currentQuestionIndex].options.map((option) => (
                        <label
                          key={option}
                          className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${quizAnswers[quizQuestions[currentQuestionIndex].id] === option
                            ? theme === 'light'
                              ? 'bg-emerald-100 border-2 border-emerald-500'
                              : 'bg-emerald-500/30 border-2 border-emerald-400'
                            : theme === 'light'
                              ? 'bg-white border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                              : 'bg-white/5 border-2 border-white/10 hover:bg-white/10 hover:border-white/20'
                            } ${styles.transition}`}
                        >
                          <input
                            type="radio"
                            name={`question-${quizQuestions[currentQuestionIndex].id}`}
                            value={option}
                            checked={quizAnswers[quizQuestions[currentQuestionIndex].id] === option}
                            onChange={() => handleAnswerSelect(quizQuestions[currentQuestionIndex].id, option)}
                            className="mr-3 w-4 h-4"
                          />
                          <span className={`${styles.textSecondary} text-base ${styles.transition}`}>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between items-center">
                    <button
                      onClick={goToPreviousQuestion}
                      disabled={currentQuestionIndex === 0}
                      className={`px-6 py-3 ${theme === 'light'
                        ? 'bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200'
                        : 'bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800'
                        } disabled:cursor-not-allowed disabled:opacity-50 ${theme === 'light' ? 'text-gray-900' : 'text-white'
                        } rounded-lg transition flex items-center gap-2`}
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Previous
                    </button>

                    <div className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} text-sm ${styles.transition}`}>
                      {Object.keys(quizAnswers).length} of {quizQuestions.length} answered
                    </div>

                    {currentQuestionIndex < quizQuestions.length - 1 ? (
                      <button
                        onClick={goToNextQuestion}
                        className={`px-6 py-3 ${theme === 'light'
                          ? 'bg-emerald-600 hover:bg-emerald-700 shadow-lg hover:shadow-xl'
                          : 'bg-[#00B7D4] hover:bg-[#0097B2] shadow-lg hover:shadow-xl'
                          } text-white rounded-lg transition-all duration-200 flex items-center gap-2`}
                      >
                        Next
                        <ArrowLeft className="w-4 h-4 rotate-180" />
                      </button>
                    ) : (
                      <button
                        onClick={submitQuiz}
                        disabled={Object.keys(quizAnswers).length !== quizQuestions.length}
                        className={`px-8 py-3 ${theme === 'light'
                          ? 'bg-green-600 hover:bg-green-700 disabled:bg-gray-400 shadow-lg hover:shadow-xl'
                          : 'bg-green-600 hover:bg-green-700 disabled:bg-gray-600'
                          } disabled:cursor-not-allowed disabled:opacity-50 text-white rounded-lg transition-all duration-200 font-semibold`}
                      >
                        Submit Quiz
                      </button>
                    )}
                  </div>
                </>
              ) : (
                /* Results View */
                <div className="space-y-8">
                  {/* Score Card */}
                  <div className={`${theme === 'light'
                    ? 'bg-gradient-to-br from-emerald-100 via-emerald-100 to-emerald-100 border border-emerald-200 shadow-xl'
                    : 'bg-gradient-to-br from-emerald-500/20 to-emerald-500/20 border border-emerald-400/30'
                    } rounded-2xl p-8 text-center ${styles.transition}`}>
                    <Award className={`w-16 h-16 ${theme === 'light' ? 'text-emerald-600' : 'text-emerald-400'} mx-auto mb-4 ${styles.transition}`} />
                    <h3 className={`text-3xl font-bold ${styles.text} mb-2 ${styles.transition}`}>Quiz Complete!</h3>
                    <div className={`text-5xl font-extrabold ${theme === 'light' ? 'bg-gradient-to-r from-emerald-600 to-emerald-600 bg-clip-text text-transparent' : 'text-emerald-400'} mb-2 ${styles.transition}`}>
                      {calculateScore().correct}/{calculateScore().total}
                    </div>
                    <p className={`text-xl ${styles.textTertiary} ${styles.transition}`}>
                      {calculateScore().correct === calculateScore().total
                        ? 'Perfect Score! Excellent mastery of LRC concepts!'
                        : calculateScore().correct >= calculateScore().total * 0.7
                          ? 'Great job! You have a solid understanding of LRC calculations!'
                          : 'Review the module materials and try again to strengthen your understanding!'}
                    </p>
                    <div className={`mt-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} ${styles.transition}`}>
                      Score: {Math.round((calculateScore().correct / calculateScore().total) * 100)}%
                    </div>
                  </div>

                  {/* Answer Review */}
                  <div>
                    <h4 className={`text-2xl font-bold ${styles.text} mb-6 ${styles.transition}`}>Answer Review</h4>
                    <div className="space-y-6">
                      {quizQuestions.map((q, index) => (
                        <div
                          key={q.id}
                          className={`rounded-xl p-6 border-2 ${isAnswerCorrect(q.id)
                            ? theme === 'light'
                              ? 'bg-green-50 border-green-400'
                              : 'bg-green-500/10 border-green-400/30'
                            : theme === 'light'
                              ? 'bg-red-50 border-red-400'
                              : 'bg-red-500/10 border-red-400/30'
                            } ${styles.transition}`}
                        >
                          <div className="flex items-start gap-3 mb-4">
                            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isAnswerCorrect(q.id)
                              ? theme === 'light'
                                ? 'bg-green-200 text-green-700'
                                : 'bg-green-500/30 text-green-400'
                              : theme === 'light'
                                ? 'bg-red-200 text-red-700'
                                : 'bg-red-500/30 text-red-400'
                              } ${styles.transition}`}>
                              {isAnswerCorrect(q.id) ? (
                                <Check className="w-5 h-5" />
                              ) : (
                                <span className="text-lg font-bold">✗</span>
                              )}
                            </div>
                            <div className="flex-1">
                              <h5 className={`text-lg font-semibold ${styles.text} mb-3 ${styles.transition}`}>
                                Question {index + 1}: {q.question}
                              </h5>

                              {!isAnswerCorrect(q.id) && (
                                <div className={`mb-3 p-3 ${theme === 'light' ? 'bg-red-100' : 'bg-red-500/20'
                                  } rounded-lg ${styles.transition}`}>
                                  <p className={`text-sm ${theme === 'light' ? 'text-red-800' : 'text-red-300'} ${styles.transition}`}>
                                    <span className="font-semibold">Your answer:</span> {quizAnswers[q.id]}
                                  </p>
                                </div>
                              )}

                              <div className={`mb-3 p-3 ${theme === 'light' ? 'bg-green-100' : 'bg-green-500/20'
                                } rounded-lg ${styles.transition}`}>
                                <p className={`text-sm ${theme === 'light' ? 'text-green-800' : 'text-green-300'} ${styles.transition}`}>
                                  <span className="font-semibold">Correct answer:</span> {q.correctAnswer}
                                </p>
                              </div>

                              <div className={`p-4 ${theme === 'light'
                                ? 'bg-emerald-50 border border-emerald-200'
                                : 'bg-emerald-500/10 border border-emerald-400/20'
                                } rounded-lg ${styles.transition}`}>
                                <p className={`${theme === 'light' ? 'text-emerald-700' : 'text-emerald-300'} font-medium mb-2 ${styles.transition}`}>Explanation:</p>
                                <p className={`${styles.textSecondary} ${styles.transition}`}>{q.explanation}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Retake Button */}
                  <div className="text-center pt-4">
                    <button
                      onClick={() => {
                        setShowQuizResults(false);
                        setQuizAnswers({});
                        setCurrentQuestionIndex(0);
                      }}
                      className={`px-8 py-3 ${theme === 'light'
                        ? 'bg-gradient-to-r from-emerald-600 to-emerald-600 hover:from-emerald-700 hover:to-emerald-700 shadow-lg hover:shadow-xl'
                        : 'bg-emerald-600 hover:bg-emerald-700'
                        } text-white rounded-lg transition-all duration-200 font-semibold`}
                    >
                      Retake Quiz
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ASSIGNMENTS TAB */}
          {activeTab === 'assignments' && (
            <div className={`rounded-3xl ${styles.cardBg} backdrop-blur-xl border ${styles.border} p-6 space-y-8 ${styles.transition}`} data-aos="fade-up">
              <h3 className={`text-2xl font-bold ${styles.text} mb-6 ${styles.transition}`}>Assignments</h3>

              {/* Data Files Subsection */}
              <div className="space-y-4">
                <h4 className={`text-xl font-semibold ${theme === 'light' ? 'text-emerald-600' : 'text-emerald-400'} flex items-center gap-3 ${styles.transition}`}>
                  <Database className="w-6 h-6" />
                  Data Files
                </h4>
                <p className={`${styles.textTertiary} ${styles.transition}`}>
                  Download the following datasets to practice your LRC calculations:
                </p>

                <div className="space-y-4">
                  {/* Premium Register Data */}
                  <div className={`rounded-[30px] ${theme === 'light'
                    ? 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100'
                    : 'bg-emerald-500/20 border-emerald-400/30 hover:bg-emerald-500/30'
                    } border p-6 flex items-center justify-between ${styles.transition}`}>
                    <div className="flex items-center space-x-4">
                      <div className={`p-4 ${theme === 'light' ? 'bg-emerald-200' : 'bg-emerald-600/40'} rounded-2xl ${styles.transition}`}>
                        📊
                      </div>
                      <div>
                        <h4 className={`text-lg font-semibold ${styles.text} ${styles.transition}`}>Premium Register Data</h4>
                        <p className={`text-sm ${styles.textTertiary} ${styles.transition}`}>Premium Register_31_12_2024.xlsx • Year-end premium data</p>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadFile(
                        '/Training Modules/Module-3-LRC/Data/Premium Register_31_12_2024.xlsx',
                        'Premium Register_31_12_2024.xlsx'
                      )}
                      className={`px-6 py-2 ${theme === 'light'
                        ? 'bg-emerald-600 hover:bg-emerald-700'
                        : 'bg-emerald-500 hover:bg-emerald-600'
                        } rounded-lg text-white transition flex items-center gap-2`}
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                </div>
              </div>

              {/* Working Files Subsection */}
              <div className={`space-y-4 pt-6 border-t ${styles.border} ${styles.transition}`}>
                <h4 className={`text-xl font-semibold ${theme === 'light' ? 'text-orange-600' : 'text-orange-400'} flex items-center gap-3 ${styles.transition}`}>
                  <Settings className="w-6 h-6" />
                  Working Files
                </h4>
                <p className={`${styles.textTertiary} ${styles.transition}`}>
                  Download these templates to structure your LRC calculations:
                </p>

                <div className="space-y-4">
                  {/* LRC Analysis Template */}
                  <div className={`rounded-[30px] ${theme === 'light'
                    ? 'bg-orange-50 border-orange-200 hover:bg-orange-100'
                    : 'bg-orange-500/20 border-orange-400/30 hover:bg-orange-500/30'
                    } border p-6 flex items-center justify-between ${styles.transition}`}>
                    <div className="flex items-center space-x-4">
                      <div className={`p-4 ${theme === 'light' ? 'bg-orange-200' : 'bg-orange-600/40'} rounded-2xl ${styles.transition}`}>
                        🛠️
                      </div>
                      <div>
                        <h4 className={`text-lg font-semibold ${styles.text} ${styles.transition}`}>LRC Analysis Template</h4>
                        <p className={`text-sm ${styles.textTertiary} ${styles.transition}`}>LRC_Analysis.xlsx • Comprehensive LRC calculation workbook</p>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadFile(
                        '/Training Modules/Module-3-LRC/Working Files/LRC_Analysis.xlsx',
                        'LRC_Analysis.xlsx'
                      )}
                      className={`px-6 py-2 ${theme === 'light'
                        ? 'bg-orange-600 hover:bg-orange-700'
                        : 'bg-orange-500 hover:bg-orange-600'
                        } rounded-lg text-white transition flex items-center gap-2`}
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>

                  {/* UPR, GEP & DAC Analysis Template */}
                  <div className={`rounded-[30px] ${theme === 'light'
                    ? 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100'
                    : 'bg-yellow-500/20 border-yellow-400/30 hover:bg-yellow-500/30'
                    } border p-6 flex items-center justify-between ${styles.transition}`}>
                    <div className="flex items-center space-x-4">
                      <div className={`p-4 ${theme === 'light' ? 'bg-yellow-200' : 'bg-yellow-600/40'} rounded-2xl ${styles.transition}`}>
                        ⚙️
                      </div>
                      <div>
                        <h4 className={`text-lg font-semibold ${styles.text} ${styles.transition}`}>UPR, GEP & DAC Analysis Template</h4>
                        <p className={`text-sm ${styles.textTertiary} ${styles.transition}`}>UPR,GEP & DAC_Analysis.xlsx • Component calculations workbook</p>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadFile(
                        '/Training Modules/Module-3-LRC/Working Files/UPR,GEP & DAC_Analysis.xlsx',
                        'UPR,GEP & DAC_Analysis.xlsx'
                      )}
                      className={`px-6 py-2 ${theme === 'light'
                        ? 'bg-yellow-600 hover:bg-yellow-700'
                        : 'bg-yellow-500 hover:bg-yellow-600'
                        } rounded-lg text-white transition flex items-center gap-2`}
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                </div>
              </div>

              {/* Submission Subsection */}
              <div className={`space-y-4 pt-6 border-t ${styles.border} ${styles.transition}`}>
                <h4 className={`text-xl font-semibold ${theme === 'light' ? 'text-emerald-600' : 'text-emerald-400'} flex items-center gap-3 ${styles.transition}`}>
                  <Upload className="w-6 h-6" />
                  Submission
                </h4>
                <p className={`${styles.textTertiary} ${styles.transition}`}>
                  Upload your completed assignments for review and feedback:
                </p>

                <div className={`rounded-3xl ${theme === 'light'
                  ? 'bg-emerald-50 border-emerald-200'
                  : 'bg-emerald-500/10 border-emerald-400/20'
                  } border p-6 ${styles.transition}`}>
                  {/* Upload Area */}
                  <div className={`border-2 border-dashed ${theme === 'light'
                    ? 'border-emerald-300 hover:border-emerald-400'
                    : 'border-emerald-400/30 hover:border-emerald-400/50'
                    } rounded-2xl p-8 text-center transition-colors ${styles.transition}`}>
                    <Upload className={`w-12 h-12 ${theme === 'light' ? 'text-emerald-600' : 'text-emerald-400'} mx-auto mb-4 ${styles.transition}`} />
                    <h5 className={`text-lg font-semibold ${styles.text} mb-2 ${styles.transition}`}>Upload Your Completed Work</h5>
                    <p className={`${styles.textTertiary} mb-4 ${styles.transition}`}>
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
                      className={`inline-block px-6 py-2 ${theme === 'light'
                        ? 'bg-emerald-600 hover:bg-emerald-700'
                        : 'bg-emerald-500 hover:bg-emerald-600'
                        } rounded-lg text-white cursor-pointer transition`}
                    >
                      Choose Files
                    </label>
                    <p className={`text-xs ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} mt-2 ${styles.transition}`}>
                      Supported formats: .xlsx, .xls, .pdf, .docx, .pptx (Max 50MB per file)
                    </p>
                  </div>

                  {/* Uploaded Files List */}
                  {uploadedFiles.length > 0 && (
                    <div className="mt-6">
                      <h6 className={`text-md font-semibold ${styles.text} mb-3 ${styles.transition}`}>Uploaded Files:</h6>
                      <div className="space-y-2">
                        {uploadedFiles.map(file => (
                          <div key={file.id} className={`flex items-center justify-between ${styles.inputBg} rounded-lg p-3 ${styles.transition}`}>
                            <div className="flex items-center space-x-3">
                              <FileText className={`w-4 h-4 ${theme === 'light' ? 'text-emerald-600' : 'text-emerald-400'} ${styles.transition}`} />
                              <div>
                                <p className={`${styles.text} text-sm font-medium ${styles.transition}`}>{file.name}</p>
                                <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} text-xs ${styles.transition}`}>{file.size} • {file.uploadDate}</p>
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
                        <button className={`px-8 py-3 ${theme === 'light'
                          ? 'bg-emerald-600 hover:bg-emerald-700 shadow-md hover:shadow-lg'
                          : 'bg-emerald-500 hover:bg-emerald-600 shadow-lg hover:shadow-emerald-500/25'
                          } rounded-xl text-white font-semibold transition`}>
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