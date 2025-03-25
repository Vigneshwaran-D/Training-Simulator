import { useState } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { currentUser, achievements } from "@/lib/data";
import { cn } from "@/lib/utils";

interface Certificate {
  id: number;
  title: string;
  issueDate: string;
  expiryDate: string;
  description: string;
  issuer: string;
  category: string;
  verified: boolean;
}

const certificates: Certificate[] = [
  {
    id: 1,
    title: "Certified Security Specialist",
    issueDate: "June 15, 2024",
    expiryDate: "June 15, 2027", 
    description: "Comprehensive security training covering network security, data protection, and incident response.",
    issuer: "Cybersecurity Institute",
    category: "Security",
    verified: true
  },
  {
    id: 2,
    title: "Data Privacy Expert",
    issueDate: "March 10, 2024",
    expiryDate: "March 10, 2026",
    description: "Specialized training in data privacy regulations, compliance requirements, and protection measures.",
    issuer: "Privacy Standards Organization",
    category: "Privacy",
    verified: true
  },
  {
    id: 3,
    title: "Risk Assessment Professional",
    issueDate: "January 22, 2024",
    expiryDate: "January 22, 2027",
    description: "Advanced training in identifying, evaluating, and mitigating security risks in various environments.",
    issuer: "Global Security Association",
    category: "Risk",
    verified: true
  }
];

interface BadgeGroup {
  id: string;
  name: string;
  badges: {
    id: string;
    name: string;
    icon: string;
    unlocked: boolean;
    description: string;
    criteria: string;
  }[];
}

const badgeGroups: BadgeGroup[] = [
  {
    id: "performance",
    name: "Performance",
    badges: [
      {
        id: "quick-learner",
        name: "Quick Learner",
        icon: "ri-medal-line",
        unlocked: true,
        description: "Complete 3 training modules in a single day",
        criteria: "3/3 modules"
      },
      {
        id: "top-performer",
        name: "Top Performer",
        icon: "ri-award-line",
        unlocked: true,
        description: "Score in the top 10% in an assessment",
        criteria: "Top 8%"
      },
      {
        id: "overachiever",
        name: "Overachiever",
        icon: "ri-trophy-line",
        unlocked: false,
        description: "Complete all training modules ahead of schedule",
        criteria: "0/5 courses"
      },
      {
        id: "perfect-score",
        name: "Perfect Score",
        icon: "ri-star-line",
        unlocked: false,
        description: "Achieve 100% in any assessment",
        criteria: "0/1 assessments"
      }
    ]
  },
  {
    id: "engagement",
    name: "Engagement",
    badges: [
      {
        id: "time-master",
        name: "Time Master",
        icon: "ri-timer-line",
        unlocked: true,
        description: "Spend more than 8 hours training in a week",
        criteria: "8.5/8 hours"
      },
      {
        id: "consistent",
        name: "Consistent",
        icon: "ri-calendar-check-line",
        unlocked: false,
        description: "Log in and complete at least one module every day for a week",
        criteria: "4/7 days"
      },
      {
        id: "early-bird",
        name: "Early Bird",
        icon: "ri-sun-line",
        unlocked: false,
        description: "Complete training sessions before 9 AM for 5 days",
        criteria: "2/5 days"
      },
      {
        id: "weekend-warrior",
        name: "Weekend Warrior",
        icon: "ri-user-star-line",
        unlocked: false,
        description: "Complete training on both Saturday and Sunday",
        criteria: "0/2 days"
      }
    ]
  },
  {
    id: "completion",
    name: "Completion",
    badges: [
      {
        id: "first-completion",
        name: "First Completion",
        icon: "ri-checkbox-circle-line",
        unlocked: true,
        description: "Complete your first training course",
        criteria: "1/1 courses"
      },
      {
        id: "specialist",
        name: "Specialist",
        icon: "ri-focus-2-line",
        unlocked: false,
        description: "Complete all courses in a single category",
        criteria: "3/5 courses"
      },
      {
        id: "expert",
        name: "Expert",
        icon: "ri-user-settings-line",
        unlocked: false,
        description: "Complete all advanced level courses",
        criteria: "1/3 courses"
      },
      {
        id: "master",
        name: "Master",
        icon: "ri-hub-icon-t",
        unlocked: false,
        description: "Complete all available courses",
        criteria: "8/20 courses"
      }
    ]
  }
];

type TabType = "badges" | "certificates" | "points";

export default function Achievements() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("badges");

  return (
    <div className="min-h-screen flex bg-[#F8F9FA] font-inter text-dark">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col">
        <Header 
          title="Achievements" 
          user={currentUser} 
          onMenuClick={() => setSidebarOpen(true)} 
        />
        
        <main className="flex-1 p-6 bg-[#F8F9FA] overflow-auto">
          {/* Overview Section */}
          <section className="mb-8 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-4">Your Achievements</h1>
              <p className="text-gray-medium mb-6">
                Track your progress, earn badges, and showcase your certificates as you complete training courses.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#e0e4f8] rounded-md flex items-center justify-center text-primary mr-3">
                    <i className="ri-medal-line text-xl"></i>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">7</p>
                    <p className="text-sm text-gray-medium">Badges Earned</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#e0e4f8] rounded-md flex items-center justify-center text-primary mr-3">
                    <i className="ri-file-list-3-line text-xl"></i>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">3</p>
                    <p className="text-sm text-gray-medium">Certificates</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#e0e4f8] rounded-md flex items-center justify-center text-primary mr-3">
                    <i className="ri-trophy-line text-xl"></i>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">1,250</p>
                    <p className="text-sm text-gray-medium">Points Earned</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#e0e4f8] rounded-md flex items-center justify-center text-primary mr-3">
                    <i className="ri-user-star-line text-xl"></i>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">#4</p>
                    <p className="text-sm text-gray-medium">Leaderboard Rank</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Tabs Navigation */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <div className="flex space-x-8">
                <button 
                  className={cn(
                    "py-3 px-1 text-sm font-medium",
                    activeTab === "badges" ? "text-primary border-b-2 border-primary" : "text-gray-medium hover:text-gray-dark"
                  )}
                  onClick={() => setActiveTab("badges")}
                >
                  Badges
                </button>
                <button 
                  className={cn(
                    "py-3 px-1 text-sm font-medium",
                    activeTab === "certificates" ? "text-primary border-b-2 border-primary" : "text-gray-medium hover:text-gray-dark"
                  )}
                  onClick={() => setActiveTab("certificates")}
                >
                  Certificates
                </button>
                <button 
                  className={cn(
                    "py-3 px-1 text-sm font-medium",
                    activeTab === "points" ? "text-primary border-b-2 border-primary" : "text-gray-medium hover:text-gray-dark"
                  )}
                  onClick={() => setActiveTab("points")}
                >
                  Points & Rewards
                </button>
              </div>
            </div>
          </div>
          
          {/* Badges Content */}
          {activeTab === "badges" && (
            <div className="space-y-8">
              {badgeGroups.map(group => (
                <section key={group.id} className="bg-white rounded-lg shadow-sm">
                  <div className="p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold">{group.name} Badges</h2>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {group.badges.map(badge => (
                        <div key={badge.id} className="flex flex-col items-center">
                          <div className={cn(
                            "w-20 h-20 rounded-full flex items-center justify-center mb-3",
                            badge.unlocked 
                              ? "bg-[#e0e4f8] text-primary" 
                              : "border-2 border-dashed border-gray-300 text-gray-300"
                          )}>
                            <i className={`${badge.icon} text-3xl`}></i>
                          </div>
                          <h3 className="text-sm font-medium text-center mb-1">{badge.name}</h3>
                          <p className="text-xs text-gray-medium text-center mb-1">{badge.description}</p>
                          <span className={cn(
                            "text-xs px-2 py-0.5 rounded-full",
                            badge.unlocked ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"
                          )}>
                            {badge.unlocked ? "Earned" : badge.criteria}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              ))}
            </div>
          )}
          
          {/* Certificates Content */}
          {activeTab === "certificates" && (
            <div className="space-y-6">
              <section className="bg-white rounded-lg shadow-sm">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold">Your Certificates</h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {certificates.map(cert => (
                    <div key={cert.id} className="p-6">
                      <div className="flex flex-col md:flex-row items-start">
                        <div className="w-full md:w-64 bg-[#e0e4f8] h-40 flex items-center justify-center text-primary rounded-lg mb-4 md:mb-0 md:mr-6">
                          <div className="text-center">
                            <i className="ri-file-certificate-line text-4xl mb-2"></i>
                            <p className="text-sm">Certificate Preview</p>
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="text-lg font-semibold">{cert.title}</h3>
                              <p className="text-sm text-gray-medium">{cert.issuer}</p>
                            </div>
                            <span className={cn(
                              "text-xs px-2 py-1 rounded-full",
                              "bg-[#e0e4f8] text-primary"
                            )}>
                              {cert.category}
                            </span>
                          </div>
                          
                          <p className="text-sm text-gray-medium mb-4">
                            {cert.description}
                          </p>
                          
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <p className="text-xs text-gray-medium mb-1">Issued Date</p>
                              <p className="text-sm font-medium">{cert.issueDate}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-medium mb-1">Expiry Date</p>
                              <p className="text-sm font-medium">{cert.expiryDate}</p>
                            </div>
                          </div>
                          
                          <div className="flex space-x-3">
                            <button className="py-2 px-4 bg-primary text-white rounded-md text-sm font-medium">
                              Download Certificate
                            </button>
                            <button className="py-2 px-4 border border-gray-200 text-gray-medium rounded-md text-sm font-medium">
                              Share
                            </button>
                            {cert.verified && (
                              <div className="flex items-center text-green-500 text-sm ml-auto">
                                <i className="ri-check-line mr-1"></i>
                                <span>Verified</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              
              <section className="bg-white rounded-lg shadow-sm">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold">Recommended Certificates</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="mb-3">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Security</span>
                      </div>
                      <h3 className="font-medium mb-2">Advanced Network Security</h3>
                      <p className="text-sm text-gray-medium mb-4">
                        Gain expertise in securing complex network infrastructures against sophisticated threats.
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-medium">14 modules • 10 hours</span>
                        <button className="text-primary text-sm font-medium">Enroll</button>
                      </div>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="mb-3">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Analysis</span>
                      </div>
                      <h3 className="font-medium mb-2">Security Analysis Fundamentals</h3>
                      <p className="text-sm text-gray-medium mb-4">
                        Learn methods for analyzing security incidents and implementing effective countermeasures.
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-medium">10 modules • 8 hours</span>
                        <button className="text-primary text-sm font-medium">Enroll</button>
                      </div>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="mb-3">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Compliance</span>
                      </div>
                      <h3 className="font-medium mb-2">Security Compliance Framework</h3>
                      <p className="text-sm text-gray-medium mb-4">
                        Master regulatory requirements and implementing compliance controls.
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-medium">12 modules • 9 hours</span>
                        <button className="text-primary text-sm font-medium">Enroll</button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}
          
          {/* Points & Rewards Content */}
          {activeTab === "points" && (
            <div className="space-y-6">
              <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-lg shadow-sm">
                  <div className="p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold">Points History</h2>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <p className="text-2xl font-bold">1,250</p>
                        <p className="text-sm text-gray-medium">Total Points</p>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-right">+250</p>
                        <p className="text-sm text-green-500 flex items-center justify-end">
                          <i className="ri-arrow-up-line mr-1"></i>
                          This month
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-6 gap-1 mb-2">
                        <div className="text-center text-xs text-gray-medium col-span-1">
                          Jan
                        </div>
                        <div className="text-center text-xs text-gray-medium col-span-1">
                          Feb
                        </div>
                        <div className="text-center text-xs text-gray-medium col-span-1">
                          Mar
                        </div>
                        <div className="text-center text-xs text-gray-medium col-span-1">
                          Apr
                        </div>
                        <div className="text-center text-xs text-gray-medium col-span-1">
                          May
                        </div>
                        <div className="text-center text-xs text-gray-medium col-span-1">
                          Jun
                        </div>
                      </div>
                      <div className="grid grid-cols-6 gap-1">
                        <div className="h-24 bg-primary/20 rounded-md flex flex-col items-center justify-end p-1">
                          <div className="w-full h-40% bg-primary rounded-md"></div>
                          <p className="text-xs mt-1">200</p>
                        </div>
                        <div className="h-24 bg-primary/20 rounded-md flex flex-col items-center justify-end p-1">
                          <div className="w-full h-30% bg-primary rounded-md"></div>
                          <p className="text-xs mt-1">150</p>
                        </div>
                        <div className="h-24 bg-primary/20 rounded-md flex flex-col items-center justify-end p-1">
                          <div className="w-full h-70% bg-primary rounded-md"></div>
                          <p className="text-xs mt-1">350</p>
                        </div>
                        <div className="h-24 bg-primary/20 rounded-md flex flex-col items-center justify-end p-1">
                          <div className="w-full h-60% bg-primary rounded-md"></div>
                          <p className="text-xs mt-1">300</p>
                        </div>
                        <div className="h-24 bg-primary/20 rounded-md flex flex-col items-center justify-end p-1">
                          <div className="w-full h-50% bg-primary rounded-md"></div>
                          <p className="text-xs mt-1">250</p>
                        </div>
                        <div className="h-24 bg-primary/20 rounded-md flex flex-col items-center justify-end p-1">
                          <div className="w-full h-0% bg-primary rounded-md"></div>
                          <p className="text-xs mt-1">0</p>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-base font-semibold mt-6 mb-4">Recent Activities</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-[#e0e4f8] rounded-full flex items-center justify-center text-primary mr-3">
                            <i className="ri-check-line text-sm"></i>
                          </div>
                          <div>
                            <p className="font-medium">Completed Module 2</p>
                            <p className="text-xs text-gray-medium">Cybersecurity Fundamentals</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-green-500">+50 points</p>
                          <p className="text-xs text-gray-medium">Today</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-[#e0e4f8] rounded-full flex items-center justify-center text-primary mr-3">
                            <i className="ri-medal-line text-sm"></i>
                          </div>
                          <div>
                            <p className="font-medium">Earned Badge</p>
                            <p className="text-xs text-gray-medium">Quick Learner</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-green-500">+100 points</p>
                          <p className="text-xs text-gray-medium">Yesterday</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-[#e0e4f8] rounded-full flex items-center justify-center text-primary mr-3">
                            <i className="ri-time-line text-sm"></i>
                          </div>
                          <div>
                            <p className="font-medium">Weekly Goal Achievement</p>
                            <p className="text-xs text-gray-medium">8+ hours of training</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-green-500">+75 points</p>
                          <p className="text-xs text-gray-medium">3 days ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold">Rewards</h2>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-medium mb-4">
                      Redeem your points for exclusive rewards and benefits.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-medium">Premium Course Access</h3>
                          <span className="bg-[#e0e4f8] text-primary text-xs py-1 px-2 rounded-full">
                            500 points
                          </span>
                        </div>
                        <p className="text-sm text-gray-medium mb-4">
                          Get access to a premium training course of your choice.
                        </p>
                        <button className="w-full py-2 bg-primary text-white rounded-md text-sm font-medium">
                          Redeem Reward
                        </button>
                      </div>
                      
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-medium">Digital Badge Pack</h3>
                          <span className="bg-[#e0e4f8] text-primary text-xs py-1 px-2 rounded-full">
                            300 points
                          </span>
                        </div>
                        <p className="text-sm text-gray-medium mb-4">
                          Unlock a pack of exclusive digital badges for your profile.
                        </p>
                        <button className="w-full py-2 bg-primary text-white rounded-md text-sm font-medium">
                          Redeem Reward
                        </button>
                      </div>
                      
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-medium">1-on-1 Mentoring Session</h3>
                          <span className="bg-[#e0e4f8] text-primary text-xs py-1 px-2 rounded-full">
                            800 points
                          </span>
                        </div>
                        <p className="text-sm text-gray-medium mb-4">
                          Schedule a 30-minute mentoring session with an expert.
                        </p>
                        <button className="w-full py-2 bg-gray-200 text-gray-500 rounded-md text-sm font-medium" disabled>
                          Need 800 Points
                        </button>
                      </div>
                      
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-medium">Certificate Frame</h3>
                          <span className="bg-[#e0e4f8] text-primary text-xs py-1 px-2 rounded-full">
                            1,000 points
                          </span>
                        </div>
                        <p className="text-sm text-gray-medium mb-4">
                          Get a digital frame for all your certificates.
                        </p>
                        <button className="w-full py-2 bg-gray-200 text-gray-500 rounded-md text-sm font-medium" disabled>
                          Need 1,000 Points
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              
              <section className="bg-white rounded-lg shadow-sm">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold">Leaderboard</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center p-3 bg-[#e0e4f8] rounded-lg">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-medium text-sm mr-3">
                        1
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gray-200 mr-3"></div>
                      <div className="flex-1">
                        <p className="font-medium">Sarah Johnson</p>
                        <p className="text-xs text-gray-medium">Security Engineer</p>
                      </div>
                      <div className="flex items-center text-sm">
                        <i className="ri-star-fill text-yellow-500 mr-1"></i>
                        <span>1,820</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-600 font-medium text-sm mr-3">
                        2
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gray-200 mr-3"></div>
                      <div className="flex-1">
                        <p className="font-medium">Michael Chen</p>
                        <p className="text-xs text-gray-medium">Security Analyst</p>
                      </div>
                      <div className="flex items-center text-sm">
                        <i className="ri-star-fill text-yellow-500 mr-1"></i>
                        <span>1,650</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-600 font-medium text-sm mr-3">
                        3
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gray-200 mr-3"></div>
                      <div className="flex-1">
                        <p className="font-medium">Emily Rodriguez</p>
                        <p className="text-xs text-gray-medium">Security Specialist</p>
                      </div>
                      <div className="flex items-center text-sm">
                        <i className="ri-star-fill text-yellow-500 mr-1"></i>
                        <span>1,430</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 bg-primary/10 rounded-lg border border-primary/20">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-medium text-sm mr-3">
                        4
                      </div>
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-medium mr-3">
                        {currentUser.initials}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{currentUser.name}</p>
                        <p className="text-xs text-gray-medium">Security Specialist</p>
                      </div>
                      <div className="flex items-center text-sm">
                        <i className="ri-star-fill text-yellow-500 mr-1"></i>
                        <span>1,250</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-600 font-medium text-sm mr-3">
                        5
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gray-200 mr-3"></div>
                      <div className="flex-1">
                        <p className="font-medium">David Thompson</p>
                        <p className="text-xs text-gray-medium">Security Manager</p>
                      </div>
                      <div className="flex items-center text-sm">
                        <i className="ri-star-fill text-yellow-500 mr-1"></i>
                        <span>1,120</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}