"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import BackButton from "@/components/BackButton";

interface LessonData {
  subject: string;
  level: string;
  topic: string;
  description: string;
  duration: number;
  date: string;
}

interface LessonContent {
  introduction: string;
  concepts: Array<{
    title: string;
    explanation: string;
    example: string;
  }>;
  interactiveExercise: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  };
  practiceProblems: Array<{
    problem: string;
    solution: string;
    hint: string;
  }>;
  summary: string;
  nextSteps: string[];
}

export default function LessonPage() {
  const [lessonData, setLessonData] = useState<LessonData | null>(null);
  const [lessonContent, setLessonContent] = useState<LessonContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [completed, setCompleted] = useState(false);
  const router = useRouter();

  const generateLessonContent = useCallback(async (lesson: LessonData) => {
    try {
      setLoading(true);
      setError(null);

      // Generate comprehensive lesson content based on the topic
      const content = generateContentForTopic(lesson);
      setLessonContent(content);
    } catch (err) {
      setError('Failed to generate lesson content. Please try again.');
      console.error('Lesson generation error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const storedLesson = localStorage.getItem('currentLesson');
    if (!storedLesson) {
      router.push('/ai-learning/schedule');
      return;
    }

    const lesson = JSON.parse(storedLesson) as LessonData;
    setLessonData(lesson);
    generateLessonContent(lesson);
  }, [router, generateLessonContent]);

  const generateContentForTopic = (lesson: LessonData): LessonContent => {
    // This would typically call an AI API, but for now we'll generate sample content
    const contentMap: Record<string, LessonContent> = {
      "Variables and Data Types": {
        introduction: "Variables are containers that store data values. In programming, variables allow us to store and manipulate different types of data. Understanding data types is fundamental to writing effective code.",
        concepts: [
          {
            title: "What are Variables?",
            explanation: "A variable is a named location in memory that stores a value. Think of it like a labeled box where you can put different things.",
            example: "name = 'Alice'\nage = 25\nis_student = True"
          },
          {
            title: "Data Types",
            explanation: "Data types define what kind of data a variable can hold. Common types include strings (text), integers (whole numbers), floats (decimal numbers), and booleans (True/False).",
            example: "text = 'Hello World'  # String\nnumber = 42  # Integer\ndecimal = 3.14  # Float\nflag = True  # Boolean"
          }
        ],
        interactiveExercise: {
          question: "Which of the following is the correct way to create a variable in Python?",
          options: [
            "var name = 'John'",
            "name = 'John'",
            "string name = 'John'",
            "name := 'John'"
          ],
          correctAnswer: 1,
          explanation: "In Python, you simply use the variable name followed by an equals sign and the value. No special keywords like 'var' or type declarations are needed."
        },
        practiceProblems: [
          {
            problem: "Create a variable called 'city' and assign it the value 'New York'",
            solution: "city = 'New York'",
            hint: "Use quotes around the text value since it's a string"
          },
          {
            problem: "Create a variable called 'population' and assign it the value 8.4 million",
            solution: "population = 8400000",
            hint: "Numbers don't need quotes, and you can write 8.4 million as 8400000"
          }
        ],
        summary: "Variables are essential building blocks in programming. They allow us to store and reference data throughout our programs. Understanding different data types helps us choose the right type for our data.",
        nextSteps: [
          "Practice creating variables with different data types",
          "Try using variables in simple calculations",
          "Experiment with string concatenation"
        ]
      },
      "Control Structures": {
        introduction: "Control structures allow your program to make decisions and repeat actions. They are the foundation of creating dynamic and interactive programs.",
        concepts: [
          {
            title: "If Statements",
            explanation: "If statements allow your program to make decisions based on conditions. The code inside an if block only runs when the condition is true.",
            example: "age = 18\nif age >= 18:\n    print('You are an adult')"
          },
          {
            title: "Loops",
            explanation: "Loops allow you to repeat code multiple times. The for loop is commonly used to iterate over sequences like lists or strings.",
            example: "for i in range(5):\n    print(f'Count: {i}')"
          }
        ],
        interactiveExercise: {
          question: "What will be the output of this code?\nfor i in range(3):\n    print(i)",
          options: [
            "0, 1, 2",
            "1, 2, 3",
            "0, 1, 2, 3",
            "1, 2"
          ],
          correctAnswer: 0,
          explanation: "range(3) generates numbers from 0 to 2 (3 numbers total), so the output will be 0, 1, 2."
        },
        practiceProblems: [
          {
            problem: "Write an if statement that prints 'Even' if a number is even",
            solution: "if number % 2 == 0:\n    print('Even')",
            hint: "Use the modulo operator (%) to check if a number is divisible by 2"
          },
          {
            problem: "Write a loop that prints numbers 1 to 10",
            solution: "for i in range(1, 11):\n    print(i)",
            hint: "range(1, 11) gives you numbers from 1 to 10"
          }
        ],
        summary: "Control structures give your programs the ability to make decisions and repeat actions. Mastering if statements and loops is crucial for writing dynamic programs.",
        nextSteps: [
          "Practice writing if-else statements",
          "Try nested loops",
          "Experiment with while loops"
        ]
      }
    };

    // Return content for the specific topic or a default lesson
    return contentMap[lesson.topic] || {
      introduction: `Welcome to today's lesson on ${lesson.topic}. This lesson is designed for ${lesson.level} level learners.`,
      concepts: [
        {
          title: "Introduction to the Topic",
          explanation: `This lesson covers the fundamentals of ${lesson.topic} at a ${lesson.level} level.`,
          example: "Example code will be provided throughout the lesson."
        }
      ],
      interactiveExercise: {
        question: "What is the main concept we're learning today?",
        options: [
          "Advanced programming techniques",
          lesson.topic,
          "Basic syntax",
          "Data structures"
        ],
        correctAnswer: 1,
        explanation: `Today we're focusing specifically on ${lesson.topic}.`
      },
      practiceProblems: [
        {
          problem: "Practice implementing the concepts learned today",
          solution: "Try to apply what you've learned in a simple project",
          hint: "Start with basic examples and gradually increase complexity"
        }
      ],
      summary: `Today's lesson on ${lesson.topic} provides a solid foundation for ${lesson.level} level learners.`,
      nextSteps: [
        "Practice the concepts learned",
        "Try the exercises",
        "Move to the next lesson when ready"
      ]
    };
  };

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleCheckAnswer = () => {
    setShowAnswer(true);
  };

  const handleCompleteLesson = () => {
    setCompleted(true);
    // In a real app, this would update the user's progress
    // For now, we'll just show a completion message
  };

  const handleDownloadLesson = () => {
    if (!lessonData || !lessonContent) return;

    const lessonText = `
${lessonData.subject} - ${lessonData.level} Level
Lesson: ${lessonData.topic}
Date: ${new Date(lessonData.date).toLocaleDateString()}
Duration: ${lessonData.duration} minutes

INTRODUCTION
${lessonContent.introduction}

CONCEPTS
${lessonContent.concepts.map((concept, index) => `
${index + 1}. ${concept.title}
${concept.explanation}

Example:
${concept.example}
`).join('')}

INTERACTIVE EXERCISE
Question: ${lessonContent.interactiveExercise.question}
Options:
${lessonContent.interactiveExercise.options.map((option, index) => `${index + 1}. ${option}`).join('\n')}
Correct Answer: ${lessonContent.interactiveExercise.options[lessonContent.interactiveExercise.correctAnswer]}
Explanation: ${lessonContent.interactiveExercise.explanation}

PRACTICE PROBLEMS
${lessonContent.practiceProblems.map((problem, index) => `
${index + 1}. ${problem.problem}
Solution: ${problem.solution}
Hint: ${problem.hint}
`).join('')}

SUMMARY
${lessonContent.summary}

NEXT STEPS
${lessonContent.nextSteps.map((step, index) => `${index + 1}. ${step}`).join('\n')}
    `;

    const blob = new Blob([lessonText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${lessonData.topic}-Lesson-${new Date(lessonData.date).toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10 text-gray-900">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Generating your personalized lesson...</p>
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
            onClick={() => router.push('/ai-learning/schedule')}
            className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700"
          >
            Back to Schedule
          </button>
        </div>
      </div>
    );
  }

  if (!lessonData || !lessonContent) return null;

  return (
    <div className="container mx-auto px-4 py-10 text-gray-900">
      <div className="page-hero mb-8 p-6 md:p-10">
        <div className="flex items-start justify-between mb-6">
          <BackButton className="mt-1" />
        </div>
        <span className="badge badge-success">Daily Lesson</span>
        <h1 className="text-3xl md:text-4xl font-extrabold mt-2 text-gray-900">
          {lessonData.topic}
        </h1>
        <p className="text-gray-700 mt-1 max-w-2xl">
          {lessonData.subject} • {lessonData.level} Level • {lessonData.duration} minutes
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Lesson Header */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {lessonData.topic}
              </h2>
              <p className="text-gray-600 mt-1">
                {new Date(lessonData.date).toLocaleDateString()} • {lessonData.duration} minutes
              </p>
            </div>
            <button
              onClick={handleDownloadLesson}
              className="mt-4 md:mt-0 bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Download Lesson</span>
            </button>
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Introduction</h3>
          <p className="text-gray-700 leading-relaxed">
            {lessonContent.introduction}
          </p>
        </div>

        {/* Concepts */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Key Concepts</h3>
          <div className="space-y-6">
            {lessonContent.concepts.map((concept, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {concept.title}
                </h4>
                <p className="text-gray-700 mb-3">
                  {concept.explanation}
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="text-sm font-semibold text-gray-600 mb-2">Example:</h5>
                  <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono">
                    {concept.example}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Exercise */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Interactive Exercise</h3>
          <div className="space-y-4">
            <p className="text-gray-700 font-medium">
              {lessonContent.interactiveExercise.question}
            </p>
            <div className="space-y-2">
              {lessonContent.interactiveExercise.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showAnswer}
                  className={`w-full p-3 text-left rounded-lg border-2 transition-all duration-200 ${
                    selectedAnswer === index
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  } ${
                    showAnswer && index === lessonContent.interactiveExercise.correctAnswer
                      ? 'border-green-500 bg-green-50'
                      : ''
                  } ${
                    showAnswer && selectedAnswer === index && index !== lessonContent.interactiveExercise.correctAnswer
                      ? 'border-red-500 bg-red-50'
                      : ''
                  }`}
                >
                  <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                </button>
              ))}
            </div>
            {selectedAnswer !== null && !showAnswer && (
              <button
                onClick={handleCheckAnswer}
                className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700"
              >
                Check Answer
              </button>
            )}
            {showAnswer && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">
                  <strong>Explanation:</strong> {lessonContent.interactiveExercise.explanation}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Practice Problems */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Practice Problems</h3>
          <div className="space-y-6">
            {lessonContent.practiceProblems.map((problem, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Problem {index + 1}
                </h4>
                <p className="text-gray-700 mb-3">
                  {problem.problem}
                </p>
                <details className="mb-2">
                  <summary className="cursor-pointer text-blue-600 hover:text-blue-800">
                    Show Hint
                  </summary>
                  <p className="text-gray-600 mt-2 text-sm">
                    {problem.hint}
                  </p>
                </details>
                <details>
                  <summary className="cursor-pointer text-green-600 hover:text-green-800">
                    Show Solution
                  </summary>
                  <pre className="text-gray-800 mt-2 text-sm font-mono bg-gray-50 p-2 rounded">
                    {problem.solution}
                  </pre>
                </details>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Summary</h3>
          <p className="text-gray-700 leading-relaxed">
            {lessonContent.summary}
          </p>
        </div>

        {/* Next Steps */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Next Steps</h3>
          <ul className="space-y-2">
            {lessonContent.nextSteps.map((step, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-blue-600 font-bold">{index + 1}.</span>
                <span className="text-gray-700">{step}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Completion */}
        {!completed && (
          <div className="text-center">
            <button
              onClick={handleCompleteLesson}
              className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 text-lg"
            >
              Mark Lesson as Complete
            </button>
          </div>
        )}

        {completed && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl border border-green-200 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Congratulations!
            </h3>
            <p className="text-gray-700 mb-4">
              You&apos;ve completed today&apos;s lesson on {lessonData.topic}. Great job!
            </p>
            <button
              onClick={() => router.push('/ai-learning/schedule')}
              className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700"
            >
              Back to Schedule
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
