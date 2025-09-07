"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import BackButton from "@/components/BackButton";

type Subject = "Python" | "JavaScript";
type Level = "Beginner" | "Intermediate" | "Advanced";

interface ScheduleDay {
  date: string;
  topic: string;
  description: string;
  duration: number;
  completed: boolean;
}

interface MonthlySchedule {
  subject: Subject;
  level: Level;
  month: string;
  year: number;
  days: ScheduleDay[];
}

export default function SchedulePage() {
  const [schedule, setSchedule] = useState<MonthlySchedule | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const generateSchedule = useCallback(async (subject: Subject, level: Level) => {
    try {
      setLoading(true);
      setError(null);

      // Generate a sample schedule for now - in real implementation, this would call an AI API
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      
      const sampleSchedule: MonthlySchedule = {
        subject,
        level,
        month: currentDate.toLocaleString('default', { month: 'long' }),
        year: currentYear,
        days: []
      };

      // Generate topics based on subject and level
      const topics = generateTopics(subject, level);
      
      for (let day = 1; day <= daysInMonth; day++) {
        const topicIndex = (day - 1) % topics.length;
        const date = new Date(currentYear, currentMonth, day);
        
        sampleSchedule.days.push({
          date: date.toISOString().split('T')[0],
          topic: topics[topicIndex].title,
          description: topics[topicIndex].description,
          duration: topics[topicIndex].duration,
          completed: false
        });
      }

      setSchedule(sampleSchedule);
    } catch (err) {
      setError('Failed to generate schedule. Please try again.');
      console.error('Schedule generation error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const subject = localStorage.getItem('learningSubject') as Subject;
    const level = localStorage.getItem('learningLevel') as Level;
    
    if (!subject || !level) {
      router.push('/ai-learning');
      return;
    }

    generateSchedule(subject, level);
  }, [router, generateSchedule]);

  const generateTopics = (subject: Subject, level: Level) => {
    const topicMap = {
      Python: {
        Beginner: [
          { title: "Variables and Data Types", description: "Learn about Python variables and basic data types", duration: 30 },
          { title: "Control Structures", description: "If statements, loops, and conditional logic", duration: 45 },
          { title: "Functions", description: "Creating and using functions in Python", duration: 40 },
          { title: "Lists and Dictionaries", description: "Working with collections in Python", duration: 35 },
          { title: "File Handling", description: "Reading and writing files", duration: 30 },
          { title: "Error Handling", description: "Try-except blocks and debugging", duration: 25 },
          { title: "Practice Project", description: "Build a simple calculator", duration: 60 },
          { title: "Review and Assessment", description: "Review concepts and take a quiz", duration: 45 }
        ],
        Intermediate: [
          { title: "Object-Oriented Programming", description: "Classes, objects, and inheritance", duration: 50 },
          { title: "Modules and Packages", description: "Organizing code with modules", duration: 40 },
          { title: "Exception Handling", description: "Advanced error handling techniques", duration: 35 },
          { title: "File I/O Operations", description: "Advanced file operations", duration: 40 },
          { title: "Regular Expressions", description: "Pattern matching with regex", duration: 45 },
          { title: "Data Structures", description: "Advanced data structures", duration: 50 },
          { title: "Practice Project", description: "Build a file organizer", duration: 90 },
          { title: "Code Review", description: "Review and optimize your code", duration: 60 }
        ],
        Advanced: [
          { title: "Decorators", description: "Advanced Python decorators", duration: 60 },
          { title: "Generators and Iterators", description: "Memory-efficient iteration", duration: 50 },
          { title: "Context Managers", description: "Resource management with context managers", duration: 45 },
          { title: "Metaclasses", description: "Understanding Python metaclasses", duration: 70 },
          { title: "Concurrency", description: "Threading and multiprocessing", duration: 80 },
          { title: "Performance Optimization", description: "Profiling and optimization techniques", duration: 60 },
          { title: "Advanced Project", description: "Build a web scraper", duration: 120 },
          { title: "Code Architecture", description: "Design patterns and architecture", duration: 90 }
        ]
      },
      JavaScript: {
        Beginner: [
          { title: "Variables and Functions", description: "JavaScript basics and function declarations", duration: 30 },
          { title: "DOM Manipulation", description: "Working with HTML elements", duration: 45 },
          { title: "Events and Event Handling", description: "User interactions and events", duration: 40 },
          { title: "Arrays and Objects", description: "Working with JavaScript collections", duration: 35 },
          { title: "Conditional Logic", description: "If statements and switch cases", duration: 30 },
          { title: "Loops and Iteration", description: "For, while, and forEach loops", duration: 35 },
          { title: "Practice Project", description: "Build a to-do list app", duration: 60 },
          { title: "Review and Assessment", description: "Review concepts and take a quiz", duration: 45 }
        ],
        Intermediate: [
          { title: "ES6+ Features", description: "Arrow functions, destructuring, and more", duration: 50 },
          { title: "Promises and Async/Await", description: "Asynchronous JavaScript", duration: 60 },
          { title: "Modules and Imports", description: "ES6 modules and module systems", duration: 40 },
          { title: "Closures and Scope", description: "Understanding JavaScript scope", duration: 45 },
          { title: "Prototypes and Inheritance", description: "JavaScript's prototype system", duration: 50 },
          { title: "API Integration", description: "Working with REST APIs", duration: 55 },
          { title: "Practice Project", description: "Build a weather app", duration: 90 },
          { title: "Code Review", description: "Review and optimize your code", duration: 60 }
        ],
        Advanced: [
          { title: "Advanced Async Patterns", description: "Advanced asynchronous programming", duration: 70 },
          { title: "Design Patterns", description: "Common JavaScript design patterns", duration: 80 },
          { title: "Performance Optimization", description: "Optimizing JavaScript performance", duration: 60 },
          { title: "Testing and Debugging", description: "Unit testing and debugging techniques", duration: 65 },
          { title: "Build Tools and Bundlers", description: "Webpack, Babel, and modern tooling", duration: 75 },
          { title: "Framework Deep Dive", description: "Advanced framework concepts", duration: 90 },
          { title: "Advanced Project", description: "Build a full-stack application", duration: 150 },
          { title: "Architecture Patterns", description: "Scalable application architecture", duration: 100 }
        ]
      }
    };

    return topicMap[subject][level];
  };

  const handleDownloadSchedule = () => {
    if (!schedule) return;
    
    // Create a simple text-based schedule for download
    const scheduleText = `
${schedule.subject} Learning Schedule - ${schedule.level} Level
${schedule.month} ${schedule.year}

${schedule.days.map((day, index) => 
  `Day ${index + 1} (${new Date(day.date).toLocaleDateString()}): ${day.topic}
  Description: ${day.description}
  Duration: ${day.duration} minutes
  Status: ${day.completed ? 'Completed' : 'Pending'}
  
`).join('')}
    `;

    const blob = new Blob([scheduleText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${schedule.subject}-${schedule.level}-Schedule-${schedule.month}-${schedule.year}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleLessonClick = (day: ScheduleDay) => {
    // Store lesson details for the lesson page
    localStorage.setItem('currentLesson', JSON.stringify({
      subject: schedule?.subject,
      level: schedule?.level,
      topic: day.topic,
      description: day.description,
      duration: day.duration,
      date: day.date
    }));
    
    router.push('/ai-learning/lesson');
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10 text-gray-900">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Generating your personalized learning schedule...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-10 text-gray-900">
        <div className="text-center">
          <div className="text-red-600 mb-4">{error}</div>
          <button
            onClick={() => router.push('/ai-learning')}
            className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!schedule) return null;

  return (
    <div className="container mx-auto px-4 py-10 text-gray-900">
      <div className="page-hero mb-8 p-6 md:p-10">
        <div className="flex items-start justify-between mb-6">
          <BackButton className="mt-1" />
        </div>
        <span className="badge badge-success">Learning Schedule</span>
        <h1 className="text-3xl md:text-4xl font-extrabold mt-2 text-gray-900">
          {schedule.subject} Learning Schedule
        </h1>
        <p className="text-gray-700 mt-1 max-w-2xl">
          {schedule.level} Level • {schedule.month} {schedule.year}
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Schedule Header */}
        <div className="bg-white p-6 rounded-2xl shadow mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Your {schedule.month} Learning Journey
              </h2>
              <p className="text-gray-600 mt-1">
                {schedule.days.length} days of structured learning
              </p>
            </div>
            <button
              onClick={handleDownloadSchedule}
              className="mt-4 md:mt-0 bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Download Schedule</span>
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {schedule.days.map((day, index) => (
              <div
                key={day.date}
                className={`p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                  day.completed
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
                onClick={() => handleLessonClick(day)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-500">
                    Day {index + 1}
                  </span>
                  {day.completed && (
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                  {day.topic}
                </h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                  {day.description}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>⏱ {day.duration} min</span>
                  <span>{new Date(day.date).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Summary */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-2xl border border-blue-200 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Progress</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {schedule.days.filter(day => day.completed).length}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">
                {schedule.days.length - schedule.days.filter(day => day.completed).length}
              </div>
              <div className="text-sm text-gray-600">Remaining</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {Math.round((schedule.days.filter(day => day.completed).length / schedule.days.length) * 100)}%
              </div>
              <div className="text-sm text-gray-600">Progress</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
