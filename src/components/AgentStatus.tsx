'use client';

import { useEffect, useState } from 'react';
import { usePWA } from '@/hooks/usePWA';

const learningPlan = [
  "Module 1: Basic Math",
  "Quiz 1: Math Fundamentals", 
  "Module 2: Reading Comprehension",
  "Quiz 2: Reading Skills"
];

export default function AgentStatus() {
  const [currentStep, setCurrentStep] = useState(0);
  const [status, setStatus] = useState("Agent: On track with your plan!");
  
  // Initialize PWA functionality
  usePWA();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        const nextStep = prev + 1;
        if (nextStep < learningPlan.length) {
          setStatus(`Agent: Currently working on "${learningPlan[nextStep]}".`);
          // Simulate an offline action - the agent pre-fetches content
          console.log(`Agent is pre-fetching content for the next step: "${learningPlan[nextStep + 1]}"...`);
        } else {
          setStatus("Agent: All tasks complete! Great job!");
        }
        return nextStep;
      });
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform">
      {status}
    </div>
  );
}
