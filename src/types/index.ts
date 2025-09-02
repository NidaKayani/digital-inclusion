// Type definitions for the Digital Inclusion app

export interface TeamMember {
  name: string;
  role: string;
  description: string;
  borderColor: string;
  roleColor: string;
}

export interface FeatureSectionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  reverse?: boolean;
  bgColor?: string;
  iconBgColor?: string;
}

export interface LearningPlanItem {
  id: string;
  title: string;
  type: 'module' | 'quiz' | 'assessment';
  completed: boolean;
}

export interface AgentStatus {
  currentStep: number;
  status: string;
  isOnline: boolean;
}
