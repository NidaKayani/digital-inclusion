"use client";

import { useState, useEffect } from "react";
import BackButton from "@/components/BackButton";

interface ProgressData {
  currentStreak: number;
  longestStreak: number;
  modulesCompleted: number;
  totalModules: number;
  masteryLevel: number;
  totalStudyTime: number;
  weeklyGoal: number;
  weeklyProgress: number;
  achievements: Achievement[];
  recentActivity: Activity[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  date?: string;
}

interface Activity {
  id: string;
  type: 'lesson' | 'assessment' | 'practice';
  title: string;
  subject: string;
  score?: number;
  date: string;
  duration: number;
}

export default function ProgressPage() {
  const [progressData, setProgressData] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('week');

  useEffect(() => {
    // Simulate loading progress data
    setTimeout(() => {
      setProgressData({
        currentStreak: 7,
        longestStreak: 15,
        modulesCompleted: 14,
        totalModules: 20,
        masteryLevel: 3,
        totalStudyTime: 42, // hours
        weeklyGoal: 10, // hours
        weeklyProgress: 7,
        achievements: [
          {
            id: '1',
            title: 'First Steps',
            description: 'Complete your first lesson',
            icon: '🎯',
            unlocked: true,
            date: '2024-01-15'
          },
          {
            id: '2',
            title: 'Streak Master',
            description: 'Maintain a 7-day learning streak',
            icon: '🔥',
            unlocked: true,
            date: '2024-01-20'
          },
          {
            id: '3',
            title: 'Assessment Ace',
            description: 'Score 90% or higher on an assessment',
            icon: '🏆',
            unlocked: true,
            date: '2024-01-22'
          },
          {
            id: '4',
            title: 'Python Pro',
            description: 'Complete all Python modules',
            icon: '🐍',
            unlocked: false
          },
          {
            id: '5',
            title: 'JavaScript Jedi',
            description: 'Master JavaScript fundamentals',
            icon: '⚡',
            unlocked: false
          }
        ],
        recentActivity: [
          {
            id: '1',
            type: 'lesson',
            title: 'Functions and Scope',
            subject: 'JavaScript',
            date: '2024-01-25',
            duration: 45
          },
          {
            id: '2',
            type: 'assessment',
            title: 'Python Basics Quiz',
            subject: 'Python',
            score: 85,
            date: '2024-01-24',
            duration: 30
          },
          {
            id: '3',
            type: 'practice',
            title: 'Code Challenges',
            subject: 'JavaScript',
            date: '2024-01-23',
            duration: 60
          },
          {
            id: '4',
            type: 'lesson',
            title: 'Object-Oriented Programming',
            subject: 'Python',
            date: '2024-01-22',
            duration: 50
          }
        ]
      });
      setLoading(false);
    }, 1000);
  }, []);

  const getProgressPercentage = () => {
    if (!progressData) return 0;
    return Math.round((progressData.modulesCompleted / progressData.totalModules) * 100);
  };

  const getWeeklyProgressPercentage = () => {
    if (!progressData) return 0;
    return Math.round((progressData.weeklyProgress / progressData.weeklyGoal) * 100);
  };


  const getMasteryLabel = (level: number) => {
    if (level <= 2) return 'Beginner';
    if (level <= 4) return 'Intermediate';
    return 'Advanced';
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10 text-gray-900">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your progress...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!progressData) return null;

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-10 text-gray-900">
      <div className="page-hero mb-6 sm:mb-8 p-4 sm:p-6 md:p-10">
        <div className="flex items-start justify-between mb-4 sm:mb-6">
          <BackButton className="mt-1" />
        </div>
        <span className="badge badge-success text-xs sm:text-sm">Progress</span>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mt-2 text-gray-900">
          Your Learning Journey
        </h1>
        <p className="text-sm sm:text-base text-gray-700 mt-1 max-w-2xl">
          Track your progress, celebrate achievements, and stay motivated on your learning path.
        </p>
      </div>

      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        {/* Progress Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Current Streak */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 sm:p-6 rounded-2xl border border-orange-200">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-xl sm:text-2xl">🔥</span>
              </div>
              <span className="text-xs sm:text-sm text-orange-600 font-medium">Current</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
              {progressData.currentStreak}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Day Streak</div>
            <div className="text-xs text-orange-600 mt-2">
              Best: {progressData.longestStreak} days
            </div>
          </div>

          {/* Modules Completed */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6 rounded-2xl border border-blue-200">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-xl sm:text-2xl">📚</span>
              </div>
              <span className="text-xs sm:text-sm text-blue-600 font-medium">Progress</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
              {progressData.modulesCompleted}/{progressData.totalModules}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Modules</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
            <div className="text-xs text-blue-600 mt-1">
              {getProgressPercentage()}% Complete
            </div>
          </div>

          {/* Mastery Level */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 sm:p-6 rounded-2xl border border-purple-200">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-xl sm:text-2xl">⭐</span>
              </div>
              <span className="text-xs sm:text-sm text-purple-600 font-medium">Mastery</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
              Level {progressData.masteryLevel}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">
              {getMasteryLabel(progressData.masteryLevel)}
            </div>
            <div className="flex space-x-1 mt-2">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={`w-2 h-2 rounded-full ${
                    level <= progressData.masteryLevel ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                ></div>
              ))}
            </div>
          </div>

          {/* Study Time */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 sm:p-6 rounded-2xl border border-green-200">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-xl sm:text-2xl">⏱️</span>
              </div>
              <span className="text-xs sm:text-sm text-green-600 font-medium">Total</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
              {progressData.totalStudyTime}h
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Study Time</div>
            <div className="text-xs text-green-600 mt-2">
              This week: {progressData.weeklyProgress}h
            </div>
          </div>
        </div>

        {/* Weekly Goal Progress */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Weekly Goal</h3>
            <span className="text-sm text-gray-500">
              {progressData.weeklyProgress}h / {progressData.weeklyGoal}h
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${getWeeklyProgressPercentage()}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>0h</span>
            <span className="font-medium">{getWeeklyProgressPercentage()}% Complete</span>
            <span>{progressData.weeklyGoal}h</span>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {progressData.achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  achievement.unlocked
                    ? 'border-green-200 bg-green-50'
                    : 'border-gray-200 bg-gray-50 opacity-60'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`text-2xl ${achievement.unlocked ? '' : 'grayscale'}`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${
                      achievement.unlocked ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {achievement.title}
                    </h4>
                    <p className={`text-sm ${
                      achievement.unlocked ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {achievement.description}
                    </p>
                    {achievement.unlocked && achievement.date && (
                      <p className="text-xs text-green-600 mt-1">
                        Unlocked {new Date(achievement.date).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value as 'week' | 'month' | 'year')}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>
          <div className="space-y-4">
            {progressData.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  {activity.type === 'lesson' && <span className="text-lg">📖</span>}
                  {activity.type === 'assessment' && <span className="text-lg">📝</span>}
                  {activity.type === 'practice' && <span className="text-lg">💻</span>}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{activity.title}</h4>
                  <p className="text-sm text-gray-600">
                    {activity.subject} • {activity.duration} minutes
                    {activity.score && ` • Score: ${activity.score}%`}
                  </p>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(activity.date).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Motivational Message */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-200 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Keep up the great work! 🎉
          </h3>
          <p className="text-gray-600">
            You&apos;re making excellent progress. Every lesson brings you closer to your goals.
          </p>
        </div>
      </div>
    </div>
  );
}