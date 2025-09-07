"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BackButton from "@/components/BackButton";

type Subject = "Python" | "JavaScript";
type Level = "Beginner" | "Intermediate" | "Advanced";

const subjects: Subject[] = ["Python", "JavaScript"];
const levels: Level[] = ["Beginner", "Intermediate", "Advanced"];

const subjectDescriptions = {
  Python: "Learn Python programming from basics to advanced concepts",
  JavaScript: "Master JavaScript for web development and beyond"
};

const levelDescriptions = {
  Beginner: "Perfect for those new to programming",
  Intermediate: "For those with some programming experience",
  Advanced: "For experienced developers looking to deepen their skills"
};

export default function AILearningPage() {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();

  const handleGenerateSchedule = async () => {
    if (!selectedSubject || !selectedLevel) return;
    
    setIsGenerating(true);
    
    // Store selections in localStorage for the next page
    localStorage.setItem('learningSubject', selectedSubject);
    localStorage.setItem('learningLevel', selectedLevel);
    
    // Navigate to schedule page
    router.push('/ai-learning/schedule');
  };

  const canGenerate = selectedSubject && selectedLevel;

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-10 text-gray-900">
      <div className="page-hero mb-6 sm:mb-8 p-4 sm:p-6 md:p-10">
        <div className="flex items-start justify-between mb-4 sm:mb-6">
          <BackButton className="mt-1" />
        </div>
        <span className="badge badge-success text-xs sm:text-sm">AI Learning</span>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mt-2 text-gray-900">
          AI-Powered Learning Platform
        </h1>
        <p className="text-sm sm:text-base text-gray-700 mt-1 max-w-2xl">
          Get personalized learning schedules and comprehensive daily lessons tailored to your skill level.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
        {/* Subject Selection */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Choose Your Subject</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {subjects.map((subject) => (
              <button
                key={subject}
                onClick={() => setSelectedSubject(subject)}
                className={`p-4 sm:p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                  selectedSubject === subject
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedSubject === subject
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedSubject === subject && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">{subject}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">
                      {subjectDescriptions[subject]}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Level Selection */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Select Your Level</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {levels.map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`p-4 sm:p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                  selectedLevel === level
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedLevel === level
                      ? 'border-green-500 bg-green-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedLevel === level && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">{level}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">
                      {levelDescriptions[level]}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selection Summary */}
        {canGenerate && (
          <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 sm:p-6 rounded-2xl border border-blue-200">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Your Learning Plan</h3>
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-gray-700">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                {selectedSubject}
              </span>
              <span className="text-gray-400 hidden sm:inline">•</span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                {selectedLevel}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">
              We&apos;ll generate a personalized monthly schedule with daily lessons tailored to your level.
            </p>
          </div>
        )}

        {/* Generate Button */}
        <div className="text-center">
          <button
            onClick={handleGenerateSchedule}
            disabled={!canGenerate || isGenerating}
            className={`px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-200 w-full sm:w-auto ${
              canGenerate
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isGenerating ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Generating Schedule...</span>
              </div>
            ) : (
              'Generate Schedule'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
