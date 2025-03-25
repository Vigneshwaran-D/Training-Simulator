import { useState } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { currentUser } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Link } from "wouter";

// Caller type definitions
interface Caller {
  id: number;
  name: string;
  age: number;
  role: string;
  avatar: string;
  purpose: string;
  behavior: string;
  category: string;
}

type CallerCategory = 
  | "informed-decisive" 
  | "confused-indecisive" 
  | "urgent-emotional" 
  | "social-talkative" 
  | "price-value";

// Callers data from the provided screenshots
const callers: Caller[] = [
  // Informed & Decisive Callers
  {
    id: 1,
    name: "John Carter",
    age: 45,
    role: "IT Manager",
    avatar: "male-1", // Will use a CSS class for the avatar
    purpose: "Wants clarification on a specific service detail",
    behavior: "Confident, direct, well-researched, asks precise questions",
    category: "informed-decisive"
  },
  {
    id: 2,
    name: "Jessica John",
    age: 42,
    role: "Compliance Officer",
    avatar: "female-1",
    purpose: "Seeks clarification on company policies and terms",
    behavior: "Detail-oriented, asks legalistic questions, references terms & conditions",
    category: "informed-decisive"
  },
  {
    id: 3,
    name: "Sarah Williams",
    age: 38,
    role: "IT Manager",
    avatar: "female-2",
    purpose: "Reporting a technical issue with detailed logs",
    behavior: "Uses technical jargon, expects logical explanations",
    category: "informed-decisive"
  },
  {
    id: 4,
    name: "Richard Bennett",
    age: 48,
    role: "Financial Analyst",
    avatar: "male-2",
    purpose: "Already familiar with the service, checking for upgrades",
    behavior: "Compares old and new features, expects concise updates",
    category: "informed-decisive"
  },
  
  // Confused & Indecisive Callers
  {
    id: 5,
    name: "Emily Johnson",
    age: 32,
    role: "Freelancer",
    avatar: "female-3",
    purpose: "Struggling to understand service options",
    behavior: "Repeats questions, unsure about terms, overwhelmed by choices",
    category: "confused-indecisive"
  },
  {
    id: 6,
    name: "James R.",
    age: 40,
    role: "Office Administrator",
    avatar: "male-3",
    purpose: "Keeps asking the same question differently",
    behavior: "Uncertain, seeks multiple confirmations, anxious",
    category: "confused-indecisive"
  },
  {
    id: 7,
    name: "Brian Thomas",
    age: 41,
    role: "Marketing Consultant",
    avatar: "male-4",
    purpose: "Can't decide which plan/service to choose",
    behavior: "Asks for multiple recommendations, hesitant, seeks reassurance",
    category: "confused-indecisive"
  },
  {
    id: 8,
    name: "Sophia Turner",
    age: 36,
    role: "Small Business Owner",
    avatar: "female-4",
    purpose: "Feels confused by too many service options",
    behavior: "Easily distracted, asks about unrelated topics, struggles with decision-making",
    category: "confused-indecisive"
  },
  
  // Urgent & Emotional Callers
  {
    id: 9,
    name: "David Wilson",
    age: 37,
    role: "Sales Executive",
    avatar: "male-5",
    purpose: "Needs an issue resolved immediately",
    behavior: "Speaks fast, interrupts, expresses urgency",
    category: "urgent-emotional"
  },
  {
    id: 10,
    name: "Jennifer Lewis",
    age: 30,
    role: "Stay-at-Home Parent",
    avatar: "female-5",
    purpose: "Experiencing high frustration, possibly personal stress affecting call",
    behavior: "Emotional, may cry, difficulty expressing the issue",
    category: "urgent-emotional"
  },
  {
    id: 11,
    name: "Lisa Brown",
    age: 44,
    role: "Healthcare Worker",
    avatar: "female-6",
    purpose: "Complaining about a service issue",
    behavior: "Raises voice, vents frustration, rejects solutions",
    category: "urgent-emotional"
  },
  {
    id: 12,
    name: "Robert Evans",
    age: 50,
    role: "Unemployed",
    avatar: "male-6",
    purpose: "Expresses extreme frustration, threatens to leave service or take legal action",
    behavior: "Aggressive, demanding, refuses to listen to explanations",
    category: "urgent-emotional"
  },
  
  // Social & Talkative Callers
  {
    id: 13,
    name: "Amanda S.",
    age: 47,
    role: "Event Planner",
    avatar: "female-7",
    purpose: "Needs assistance but enjoys long conversations",
    behavior: "Talks about unrelated topics, shares personal stories, difficult to keep on track",
    category: "social-talkative"
  },
  {
    id: 14,
    name: "Greg T.",
    age: 52,
    role: "Customer Relations Officer",
    avatar: "male-7",
    purpose: "Prefers a social chat before addressing the issue",
    behavior: "Engages in small talk, asks personal questions, enjoys building rapport",
    category: "social-talkative"
  },
  {
    id: 15,
    name: "Daniel Peterson",
    age: 34,
    role: "Marketing Manager",
    avatar: "male-8",
    purpose: "Handling the call while doing other tasks",
    behavior: "Distracted, asks for information to be repeated, background noise present",
    category: "social-talkative"
  },
  {
    id: 16,
    name: "Michelle Harris",
    age: 40,
    role: "Journalist",
    avatar: "female-8",
    purpose: "Explains issues with lengthy background stories",
    behavior: "Provides unnecessary details, takes time to get to the main point",
    category: "social-talkative"
  },
  
  // Price & Value Focused Callers
  {
    id: 17,
    name: "Mark Anderson",
    age: 50,
    role: "Small Business Owner",
    avatar: "male-9",
    purpose: "Inquiring about bulk pricing and contract details",
    behavior: "Focused on business impact, ROI-driven, expects clear pricing details",
    category: "price-value"
  },
  {
    id: 18,
    name: "Kevin Harris",
    age: 39,
    role: "Customer Service Agent",
    avatar: "male-10",
    purpose: "Needs step-by-step guidance for a simple issue",
    behavior: "Asks for constant reassurance, lacks confidence in decision-making",
    category: "price-value"
  },
  {
    id: 19,
    name: "Michael Robinson",
    age: 52,
    role: "Lawyer",
    avatar: "male-11",
    purpose: "Demands to speak with a manager",
    behavior: "Persistent, refuses standard responses, insists on escalation",
    category: "price-value"
  },
  {
    id: 20,
    name: "Maria Gonzalez",
    age: 39,
    role: "Restaurant Manager",
    avatar: "female-9",
    purpose: "Has contacted support multiple times with no resolution",
    behavior: "Frustrated, expresses loss of trust, questions credibility of support team",
    category: "price-value"
  },
  {
    id: 21,
    name: "Barbara Collins",
    age: 68,
    role: "Retired Teacher",
    avatar: "female-10",
    purpose: "Needs detailed explanations due to unfamiliarity with technology/services",
    behavior: "Speaks slowly, asks for clarification, prefers step-by-step guidance",
    category: "price-value"
  },
  {
    id: 22,
    name: "Thomas Reed",
    age: 37,
    role: "Team Supervisor",
    avatar: "male-12",
    purpose: "Calling on behalf of multiple people, relaying information",
    behavior: "Switches between different concerns, may involve others in the background",
    category: "price-value"
  },
  {
    id: 23,
    name: "Olivia Martinez",
    age: 29,
    role: "Teacher",
    avatar: "female-11",
    purpose: "Needs assistance but hesitant to explain",
    behavior: "Minimal responses, long pauses, reluctant to share details",
    category: "informed-decisive"
  },
  {
    id: 24,
    name: "Natalie Foster",
    age: 35,
    role: "Project Manager",
    avatar: "female-12",
    purpose: "Wants a quick resolution without unnecessary conversation",
    behavior: "Direct, short responses, expects efficiency",
    category: "informed-decisive"
  }
];

// Achievement badges data
interface Achievement {
  id: string;
  name: string;
  icon: string;
  unlocked: boolean;
}

const achievements: Achievement[] = [
  { id: "sprinter", name: "Sprinter", icon: "🏆", unlocked: true },
  { id: "seeker", name: "Seeker", icon: "🏆", unlocked: true },
  { id: "rookie", name: "Rookie", icon: "🏆", unlocked: true },
  { id: "expert", name: "Expert", icon: "🏆", unlocked: false },
  { id: "guardian", name: "Guardian", icon: "🏆", unlocked: false },
  { id: "legend", name: "Legend", icon: "🏆", unlocked: false }
];

// Leaderboard data
interface LeaderboardEntry {
  id: number;
  name: string;
  avatar: string;
  points: number;
  rank: number;
}

const leaderboard: LeaderboardEntry[] = [
  { id: 1, name: "Ethan Carter", avatar: "male-1", points: 480, rank: 1 },
  { id: 2, name: "Sophia Hayes", avatar: "female-1", points: 454, rank: 2 },
  { id: 3, name: "Liam Bennett", avatar: "male-2", points: 380, rank: 3 },
  { id: 4, name: "Olivia Reed", avatar: "female-2", points: 350, rank: 4 },
  { id: 5, name: "Mason Brooks", avatar: "male-3", points: 325, rank: 5 }
];

export default function Simulation() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CallerCategory>("informed-decisive");
  
  // Filter callers by the active category
  const filteredCallers = callers.filter(caller => caller.category === activeCategory);
  
  return (
    <div className="min-h-screen flex bg-[#F8F9FA] font-inter text-dark">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col">
        <Header 
          title="Simulation" 
          user={currentUser} 
          onMenuClick={() => setSidebarOpen(true)} 
        />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-full max-w-md">
              <input 
                type="text" 
                placeholder="Search Calls" 
                className="w-full px-4 py-2 pl-10 border border-gray-200 rounded-md"
              />
              <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
            <button className="px-4 py-2 bg-primary text-white rounded-md flex items-center gap-2">
              <i className="ri-search-line"></i>
              <span>Search Assessment</span>
            </button>
          </div>
          
          {/* Category Navigation */}
          <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
            <button 
              className={cn(
                "px-4 py-2 rounded-md whitespace-nowrap",
                activeCategory === "informed-decisive" 
                  ? "bg-primary text-white" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
              onClick={() => setActiveCategory("informed-decisive")}
            >
              Informed & Decisive Callers
            </button>
            <button 
              className={cn(
                "px-4 py-2 rounded-md whitespace-nowrap",
                activeCategory === "confused-indecisive" 
                  ? "bg-primary text-white" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
              onClick={() => setActiveCategory("confused-indecisive")}
            >
              Confused & Indecisive Callers
            </button>
            <button 
              className={cn(
                "px-4 py-2 rounded-md whitespace-nowrap",
                activeCategory === "urgent-emotional" 
                  ? "bg-primary text-white" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
              onClick={() => setActiveCategory("urgent-emotional")}
            >
              Urgent & Emotional Callers
            </button>
            <button 
              className={cn(
                "px-4 py-2 rounded-md whitespace-nowrap",
                activeCategory === "social-talkative" 
                  ? "bg-primary text-white" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
              onClick={() => setActiveCategory("social-talkative")}
            >
              Social & Talkative Callers
            </button>
            <button 
              className={cn(
                "px-4 py-2 rounded-md whitespace-nowrap",
                activeCategory === "price-value" 
                  ? "bg-primary text-white" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
              onClick={() => setActiveCategory("price-value")}
            >
              Price & Value Focused Callers
            </button>
          </div>
          
          {/* Main Content: Callers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredCallers.map((caller) => (
              <div key={caller.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="flex p-6">
                  <div className={`w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mr-4 ${caller.avatar}`}>
                    {/* This would typically be an actual avatar image */}
                    <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center">
                      <span className="text-xl font-medium text-gray-600">
                        {caller.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-medium">{caller.name}, {caller.age}</h3>
                        <p className="text-sm text-gray-medium">{caller.role}</p>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-sm font-medium">Purpose:</p>
                      <p className="text-sm text-gray-medium">{caller.purpose}</p>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm font-medium">Behavior:</p>
                      <p className="text-sm text-gray-medium">{caller.behavior}</p>
                    </div>
                    
                    <button className="px-3 py-1.5 bg-primary text-white text-sm rounded-md">
                      Start Assessment
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Achievements Section */}
          <div className="fixed top-20 right-6 w-64 bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-lg font-medium mb-4">Your Achievements</h3>
            
            <div className="grid grid-cols-3 gap-2 mb-6">
              {achievements.map((achievement) => (
                <div 
                  key={achievement.id} 
                  className="flex flex-col items-center"
                >
                  <div className={cn(
                    "w-12 h-12 rounded-md flex items-center justify-center mb-1",
                    achievement.unlocked ? "bg-[#e0e4f8] text-primary" : "bg-gray-100 text-gray-400"
                  )}>
                    <span className="text-xl">{achievement.icon}</span>
                  </div>
                  <p className="text-xs text-center">{achievement.name}</p>
                </div>
              ))}
            </div>
            
            <h3 className="text-lg font-medium mb-3">Leader Board</h3>
            
            <div className="space-y-3">
              {leaderboard.map((entry) => (
                <div 
                  key={entry.id}
                  className={cn(
                    "flex items-center p-2 rounded-md",
                    entry.rank === 1 ? "bg-[#e0e4f8]" : "bg-white"
                  )}
                >
                  <div className="text-sm font-medium w-6 text-center mr-2">
                    {entry.rank}
                    {entry.rank === 1 && <span className="text-xs">st</span>}
                    {entry.rank === 2 && <span className="text-xs">nd</span>}
                    {entry.rank === 3 && <span className="text-xs">rd</span>}
                    {entry.rank > 3 && <span className="text-xs">th</span>}
                  </div>
                  
                  <div className={`w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-2 ${entry.avatar}`}>
                    {/* This would typically be an actual avatar image */}
                    <div className={cn(
                      "w-full h-full rounded-full flex items-center justify-center text-xs font-medium",
                      entry.rank === 1 ? "bg-green-500 text-white" : "bg-orange-500 text-white"
                    )}>
                      {entry.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <p className="text-sm font-medium">{entry.name}</p>
                  </div>
                  
                  <div className="text-sm font-medium">
                    {entry.points} Points
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}