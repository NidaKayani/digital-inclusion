"use client";

import { useState } from "react";
import BackButton from "@/components/BackButton";

type AssessmentRequest = {
  subject: string;
  level: string;
  topic: string;
  num_items: number;
  difficulty: string;
  style: string;
};

type AssessmentItem = {
  question: string;
  options?: string[];
  correct_answer?: number;
  explanation?: string;
};

type AssessmentResponse = {
  subject: string;
  level: string;
  topic: string;
  items?: AssessmentItem[];
  total_score?: number;
  passing_score?: number;
};

const subjects = ["Python", "JavaScript", "Web Development", "Data Science"];
const levels = ["Beginner", "Intermediate", "Advanced"];
const difficulties = ["Easy", "Medium", "Hard", "Mixed"];
const styles = ["Formative", "Summative", "Practice"];

const topicSuggestions = {
  Python: ["Variables & Data Types", "Control Structures", "Functions", "OOP", "File Handling", "Error Handling"],
  JavaScript: ["Variables & Functions", "DOM Manipulation", "Events", "Async Programming", "ES6+ Features", "APIs"],
  "Web Development": ["HTML Basics", "CSS Styling", "Responsive Design", "Bootstrap", "React Basics", "Node.js"],
  "Data Science": ["Pandas", "NumPy", "Matplotlib", "Data Cleaning", "Visualization", "Machine Learning"]
};

export default function AssessmentPage() {
  const [selectedSubject, setSelectedSubject] = useState("Python");
  const [selectedLevel, setSelectedLevel] = useState("Beginner");
  const [topic, setTopic] = useState("Variables & Data Types");
  const [numItems, setNumItems] = useState(5);
  const [difficulty, setDifficulty] = useState("Mixed");
  const [style, setStyle] = useState("Formative");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AssessmentResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSubjectChange = (subject: string) => {
    setSelectedSubject(subject);
    setTopic(topicSuggestions[subject as keyof typeof topicSuggestions][0]);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    setSelectedAnswers([]);
    setShowResults(false);

    const payload: AssessmentRequest = {
      subject: selectedSubject,
      level: selectedLevel,
      topic,
      num_items: numItems,
      difficulty: difficulty.toLowerCase(),
      style: style.toLowerCase(),
    };

    try {
      // Generate sample assessment for now
      const sampleAssessment = generateSampleAssessment(payload);
      setResult(sampleAssessment);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to generate assessment";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  const generateSampleAssessment = (payload: AssessmentRequest): AssessmentResponse => {
    const questions = generateQuestions(payload);
    return {
      subject: payload.subject,
      level: payload.level,
      topic: payload.topic,
      items: questions,
      total_score: questions.length * 10,
      passing_score: Math.ceil(questions.length * 10 * 0.7)
    };
  };

  const generateQuestions = (payload: AssessmentRequest): AssessmentItem[] => {
    const questionTemplates: Record<string, Record<string, AssessmentItem[]>> = {
      Python: {
        "Variables & Data Types": [
          {
            question: "Which of the following is the correct way to create a variable in Python?",
            options: ["var name = 'John'", "name = 'John'", "string name = 'John'", "name := 'John'"],
            correct_answer: 1,
            explanation: "In Python, you simply use the variable name followed by an equals sign and the value."
          },
          {
            question: "What data type is the value 3.14?",
            options: ["Integer", "Float", "String", "Boolean"],
            correct_answer: 1,
            explanation: "3.14 is a floating-point number (float) because it contains a decimal point."
          }
        ],
        "Control Structures": [
          {
            question: "What will be the output of: for i in range(3): print(i)",
            options: ["0, 1, 2", "1, 2, 3", "0, 1, 2, 3", "1, 2"],
            correct_answer: 0,
            explanation: "range(3) generates numbers from 0 to 2 (3 numbers total)."
          }
        ]
      },
      JavaScript: {
        "Variables & Functions": [
          {
            question: "Which keyword is used to declare a variable in modern JavaScript?",
            options: ["var", "let", "const", "Both let and const"],
            correct_answer: 3,
            explanation: "Modern JavaScript uses both 'let' and 'const' for variable declarations."
          }
        ]
      }
    };

    const subjectQuestions = questionTemplates[payload.subject];
    const topicQuestions: AssessmentItem[] = subjectQuestions?.[payload.topic] || [];
    
    // Repeat questions if needed to reach the requested number
    const questions: AssessmentItem[] = [];
    for (let i = 0; i < payload.num_items; i++) {
      const questionIndex = i % topicQuestions.length;
      if (topicQuestions[questionIndex]) {
        questions.push(topicQuestions[questionIndex]);
      }
    }
    
    return questions;
  };

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const calculateScore = () => {
    if (!result?.items) return 0;
    let correct = 0;
    result.items.forEach((item, index) => {
      if (selectedAnswers[index] === item.correct_answer) {
        correct++;
      }
    });
    return correct;
  };

  const handleSubmitAnswers = () => {
    setShowResults(true);
  };

  return (
    <div className="container mx-auto px-4 py-10 text-gray-900">
      <div className="page-hero mb-8 p-6 md:p-10">
        <div className="flex items-start justify-between mb-6">
          <BackButton className="mt-1" />
        </div>
        <span className="badge badge-success">Assessment</span>
        <h1 className="text-3xl md:text-4xl font-extrabold mt-2 text-gray-900">
          AI-Powered Assessment
        </h1>
        <p className="text-gray-700 mt-1 max-w-2xl">
          Generate personalized assessments and test your knowledge with interactive quizzes.
        </p>
      </div>

      {!result ? (
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Assessment Configuration */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Configure Your Assessment</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Subject Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">Subject</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {subjects.map((subject) => (
                    <button
                      key={subject}
                      type="button"
                      onClick={() => handleSubjectChange(subject)}
                      className={`p-3 rounded-xl border-2 transition-all duration-200 text-center ${
                        selectedSubject === subject
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {subject}
                    </button>
                  ))}
                </div>
              </div>

              {/* Level Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">Level</label>
                <div className="grid grid-cols-3 gap-3">
                  {levels.map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setSelectedLevel(level)}
                      className={`p-3 rounded-xl border-2 transition-all duration-200 text-center ${
                        selectedLevel === level
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Topic Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">Topic</label>
                <select
                  className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                >
                  {topicSuggestions[selectedSubject as keyof typeof topicSuggestions]?.map((topicOption) => (
                    <option key={topicOption} value={topicOption}>
                      {topicOption}
                    </option>
                  ))}
                </select>
              </div>

              {/* Assessment Settings */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Number of Questions</label>
                  <input
                    type="number"
                    className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={numItems}
                    min={3}
                    max={20}
                    onChange={(e) => setNumItems(parseInt(e.target.value || "3", 10))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Difficulty</label>
                  <select
                    className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                  >
                    {difficulties.map((diff) => (
                      <option key={diff} value={diff}>{diff}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Assessment Style</label>
                  <select
                    className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                  >
                    {styles.map((styleOption) => (
                      <option key={styleOption} value={styleOption}>{styleOption}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Generate Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Generating Assessment...</span>
                    </div>
                  ) : (
                    'Generate Assessment'
                  )}
                </button>
              </div>
            </form>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 p-4 rounded-xl">
              <div className="text-red-600 font-medium">{error}</div>
            </div>
          )}
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Assessment Header */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {result.subject} Assessment
                </h2>
                <p className="text-gray-600 mt-1">
                  {result.topic} • {result.level} Level • {result.items?.length} Questions
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-2">
                <button
                  onClick={() => {
                    setResult(null);
                    setSelectedAnswers([]);
                    setShowResults(false);
                  }}
                  className="bg-gray-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-700"
                >
                  New Assessment
                </button>
                {!showResults && (
                  <button
                    onClick={handleSubmitAnswers}
                    disabled={selectedAnswers.length !== result.items?.length}
                    className="bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Answers
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Questions */}
          <div className="space-y-6">
            {result.items?.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {item.question}
                    </h3>
                    <div className="space-y-2">
                      {item.options?.map((option, optionIndex) => (
                        <button
                          key={optionIndex}
                          onClick={() => handleAnswerSelect(index, optionIndex)}
                          disabled={showResults}
                          className={`w-full p-3 text-left rounded-lg border-2 transition-all duration-200 ${
                            selectedAnswers[index] === optionIndex
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          } ${
                            showResults && optionIndex === item.correct_answer
                              ? 'border-green-500 bg-green-50'
                              : ''
                          } ${
                            showResults && selectedAnswers[index] === optionIndex && optionIndex !== item.correct_answer
                              ? 'border-red-500 bg-red-50'
                              : ''
                          }`}
                        >
                          <span className="font-medium">{String.fromCharCode(65 + optionIndex)}.</span> {option}
                        </button>
                      ))}
                    </div>
                    {showResults && item.explanation && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <p className="text-gray-700">
                          <strong>Explanation:</strong> {item.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Results */}
          {showResults && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl border border-green-200">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Assessment Complete!
                </h3>
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {calculateScore()}/{result.items?.length}
                </div>
                <div className="text-gray-600 mb-4">
                  {Math.round((calculateScore() / (result.items?.length || 1)) * 100)}% Correct
                </div>
                <div className="text-sm text-gray-500">
                  Passing Score: {result.passing_score} points
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}