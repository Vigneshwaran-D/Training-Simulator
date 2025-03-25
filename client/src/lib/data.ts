// Data structures for the Training Simulator application

export interface User {
  id: number;
  name: string;
  initials: string;
  avatar?: string;
}

export interface Progress {
  completed: number;
  total: number;
  completedText: string;
  remainingText: string;
}

export interface TimeSpent {
  hours: number;
  totalGoal: string;
  lastWeek: string;
}

export interface Achievement {
  id: string;
  name: string;
  icon: string;
  unlocked: boolean;
}

export interface Training {
  id: number;
  title: string;
  icon: string;
  level: string;
  currentModule: number;
  totalModules: number;
  progress: number;
  timeRemaining: string;
  dueDate: string;
  status: "completed" | "in-progress";
  active?: boolean;
}

export interface RecommendedTraining {
  id: number;
  title: string;
  description: string;
  category: string;
  rating: number;
  modules: number;
  duration: string;
  image: string;
}

// Mock data to render the UI
export const currentUser: User = {
  id: 1,
  name: "John Doe",
  initials: "JD"
};

export const overallProgress: Progress = {
  completed: 15,
  total: 20,
  completedText: "15 Modules",
  remainingText: "5 Modules"
};

export const weeklyTimeSpent: TimeSpent = {
  hours: 8,
  totalGoal: "16 hours",
  lastWeek: "6.5 hours"
};

export const achievements: Achievement[] = [
  {
    id: "quick-learner",
    name: "Quick Learner",
    icon: "ri-medal-line",
    unlocked: true
  },
  {
    id: "top-performer",
    name: "Top Performer",
    icon: "ri-award-line",
    unlocked: true
  },
  {
    id: "time-master",
    name: "Time Master",
    icon: "ri-timer-line",
    unlocked: true
  },
  {
    id: "upcoming",
    name: "Upcoming",
    icon: "ri-add-line",
    unlocked: false
  }
];

export const currentTrainings: Training[] = [
  {
    id: 1,
    title: "Cybersecurity Fundamentals",
    icon: "ri-computer-line",
    level: "Advanced",
    currentModule: 2,
    totalModules: 5,
    progress: 40,
    timeRemaining: "3h 20m",
    dueDate: "Oct 15",
    status: "in-progress",
    active: true
  },
  {
    id: 2,
    title: "Data Security Protocols",
    icon: "ri-shield-check-line",
    level: "Intermediate",
    currentModule: 3,
    totalModules: 6,
    progress: 60,
    timeRemaining: "2h 40m",
    dueDate: "Oct 22",
    status: "in-progress"
  },
  {
    id: 3,
    title: "Cloud Infrastructure",
    icon: "ri-database-2-line",
    level: "Advanced",
    currentModule: 4,
    totalModules: 8,
    progress: 25,
    timeRemaining: "5h 10m",
    dueDate: "Nov 5",
    status: "in-progress"
  }
];

export const recommendedTrainings: RecommendedTraining[] = [
  {
    id: 1,
    title: "Network Security Essentials",
    description: "Learn about firewall setup, intrusion detection, and secure network architecture.",
    category: "Security",
    rating: 4.8,
    modules: 8,
    duration: "4.5 hours",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=200&q=80"
  },
  {
    id: 2,
    title: "Data Privacy Compliance",
    description: "Master data protection regulations and implementation of privacy controls.",
    category: "Privacy",
    rating: 4.6,
    modules: 6,
    duration: "3.2 hours",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=200&q=80"
  },
  {
    id: 3,
    title: "Incident Response Planning",
    description: "Develop skills for effective security incident response and recovery.",
    category: "Response",
    rating: 4.9,
    modules: 7,
    duration: "5.0 hours",
    image: "https://images.unsplash.com/photo-1607705703571-c5a8695f18f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=200&q=80"
  },
  {
    id: 4,
    title: "Threat Intelligence Analysis",
    description: "Learn to identify, analyze and respond to emerging security threats.",
    category: "Analysis",
    rating: 4.7,
    modules: 9,
    duration: "6.5 hours",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=200&q=80"
  }
];
