import { useState } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { currentUser, achievements, currentTrainings } from "@/lib/data";
import { cn } from "@/lib/utils";

interface ProfileStat {
  label: string;
  value: string;
  icon: string;
}

interface Skill {
  name: string;
  level: number;
}

const profileStats: ProfileStat[] = [
  { label: "Courses Completed", value: "8", icon: "ri-book-mark-line" },
  { label: "Hours Spent", value: "42.5", icon: "ri-time-line" },
  { label: "Certificates", value: "3", icon: "ri-award-line" },
  { label: "Points Earned", value: "1,250", icon: "ri-star-line" },
];

const skills: Skill[] = [
  { name: "Cybersecurity", level: 85 },
  { name: "Data Privacy", level: 70 },
  { name: "Risk Assessment", level: 60 },
  { name: "Cloud Security", level: 50 },
  { name: "Compliance", level: 75 },
];

export default function Profile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"info" | "activity" | "achievements">("info");

  return (
    <div className="min-h-screen flex bg-[#F8F9FA] font-inter text-dark">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col">
        <Header 
          title="User Profile" 
          user={currentUser} 
          onMenuClick={() => setSidebarOpen(true)} 
        />
        
        <main className="flex-1 p-6 bg-[#F8F9FA] overflow-auto">
          {/* Profile Header */}
          <section className="mb-8 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="h-32 bg-primary/10 relative"></div>
            
            <div className="px-6 pb-6 relative">
              <div className="flex flex-col md:flex-row md:items-end -mt-12 mb-6">
                <div className="w-24 h-24 rounded-full bg-white p-1 shadow-md mr-4">
                  {currentUser.avatar ? (
                    <img 
                      src={currentUser.avatar} 
                      alt={currentUser.name} 
                      className="w-full h-full rounded-full object-cover" 
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-primary flex items-center justify-center text-white text-3xl font-medium">
                      {currentUser.initials}
                    </div>
                  )}
                </div>
                
                <div className="mt-4 md:mt-0">
                  <h1 className="text-2xl font-bold">{currentUser.name}</h1>
                  <p className="text-gray-medium">Security Specialist</p>
                </div>
                
                <div className="ml-auto mt-4 md:mt-0">
                  <button className="py-2 px-4 border border-primary text-primary rounded-md font-medium text-sm">
                    Edit Profile
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {profileStats.map(stat => (
                  <div key={stat.label} className="flex items-center">
                    <div className="w-12 h-12 bg-[#e0e4f8] rounded-md flex items-center justify-center text-primary mr-3">
                      <i className={`${stat.icon} text-xl`}></i>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-gray-medium">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Profile Tabs */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <div className="flex space-x-8">
                <button 
                  className={cn(
                    "py-3 px-1 text-sm font-medium",
                    activeTab === "info" ? "text-primary border-b-2 border-primary" : "text-gray-medium hover:text-gray-dark"
                  )}
                  onClick={() => setActiveTab("info")}
                >
                  Profile Information
                </button>
                <button 
                  className={cn(
                    "py-3 px-1 text-sm font-medium",
                    activeTab === "activity" ? "text-primary border-b-2 border-primary" : "text-gray-medium hover:text-gray-dark"
                  )}
                  onClick={() => setActiveTab("activity")}
                >
                  Activity
                </button>
                <button 
                  className={cn(
                    "py-3 px-1 text-sm font-medium",
                    activeTab === "achievements" ? "text-primary border-b-2 border-primary" : "text-gray-medium hover:text-gray-dark"
                  )}
                  onClick={() => setActiveTab("achievements")}
                >
                  Achievements
                </button>
              </div>
            </div>
          </div>
          
          {/* Profile Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-1">
              {activeTab === "info" && (
                <>
                  {/* Personal Information */}
                  <div className="bg-white rounded-lg shadow-sm mb-6">
                    <div className="p-4 border-b border-gray-200">
                      <h2 className="text-lg font-semibold">Personal Information</h2>
                    </div>
                    <div className="p-4 space-y-4">
                      <div>
                        <p className="text-sm text-gray-medium mb-1">Full Name</p>
                        <p className="font-medium">{currentUser.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-medium mb-1">Email</p>
                        <p className="font-medium">john.doe@example.com</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-medium mb-1">Phone</p>
                        <p className="font-medium">+1 (555) 123-4567</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-medium mb-1">Department</p>
                        <p className="font-medium">Information Security</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-medium mb-1">Location</p>
                        <p className="font-medium">San Francisco, CA</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Skills */}
                  <div className="bg-white rounded-lg shadow-sm mb-6">
                    <div className="p-4 border-b border-gray-200">
                      <h2 className="text-lg font-semibold">Skills</h2>
                    </div>
                    <div className="p-4 space-y-4">
                      {skills.map(skill => (
                        <div key={skill.name}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium">{skill.name}</span>
                            <span className="text-gray-medium">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
              
              {activeTab === "achievements" && (
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold">Badges</h2>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-6">
                      {achievements.map((achievement) => (
                        <div key={achievement.id} className="flex flex-col items-center">
                          <div className={cn(
                            "w-20 h-20 rounded-full flex items-center justify-center mb-2",
                            achievement.unlocked 
                              ? "bg-[#e0e4f8] text-primary" 
                              : "border-2 border-dashed border-gray-300 text-gray-300"
                          )}>
                            <i className={`${achievement.icon} text-3xl`}></i>
                          </div>
                          <span className="text-sm font-medium text-center">{achievement.name}</span>
                          <span className="text-xs text-gray-medium">
                            {achievement.unlocked ? "Earned" : "Locked"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === "activity" && (
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold">Recent Activity</h2>
                  </div>
                  <div className="p-0">
                    <div className="relative pl-8 pr-4 py-4 border-l-2 border-primary">
                      <div className="absolute left-0 top-4 -translate-x-1/2 w-4 h-4 rounded-full bg-primary"></div>
                      <p className="font-medium">Completed Module 2</p>
                      <p className="text-sm text-gray-medium">Cybersecurity Fundamentals</p>
                      <p className="text-xs text-gray-medium mt-1">Today, 10:30 AM</p>
                    </div>
                    <div className="relative pl-8 pr-4 py-4 border-l-2 border-gray-200">
                      <div className="absolute left-0 top-4 -translate-x-1/2 w-4 h-4 rounded-full bg-gray-200"></div>
                      <p className="font-medium">Started Module 3</p>
                      <p className="text-sm text-gray-medium">Cybersecurity Fundamentals</p>
                      <p className="text-xs text-gray-medium mt-1">Today, 10:45 AM</p>
                    </div>
                    <div className="relative pl-8 pr-4 py-4 border-l-2 border-gray-200">
                      <div className="absolute left-0 top-4 -translate-x-1/2 w-4 h-4 rounded-full bg-gray-200"></div>
                      <p className="font-medium">Earned Badge</p>
                      <p className="text-sm text-gray-medium">Quick Learner</p>
                      <p className="text-xs text-gray-medium mt-1">Yesterday, 3:15 PM</p>
                    </div>
                    <div className="relative pl-8 pr-4 py-4 border-l-2 border-gray-200">
                      <div className="absolute left-0 top-4 -translate-x-1/2 w-4 h-4 rounded-full bg-gray-200"></div>
                      <p className="font-medium">Completed Course</p>
                      <p className="text-sm text-gray-medium">Network Security Essentials</p>
                      <p className="text-xs text-gray-medium mt-1">Oct 15, 2:00 PM</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Right Column */}
            <div className="lg:col-span-2">
              {activeTab === "info" && (
                <>
                  {/* About Me */}
                  <div className="bg-white rounded-lg shadow-sm mb-6">
                    <div className="p-4 border-b border-gray-200">
                      <h2 className="text-lg font-semibold">About Me</h2>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-medium">
                        Security specialist with 5+ years of experience in information security and risk management. 
                        Specializing in vulnerability assessment, security architecture, and compliance frameworks.
                        Passionate about continuous learning and staying updated with the latest security threats and mitigation techniques.
                      </p>
                    </div>
                  </div>
                  
                  {/* Learning Progress */}
                  <div className="bg-white rounded-lg shadow-sm">
                    <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                      <h2 className="text-lg font-semibold">Current Training</h2>
                      <a href="#" className="text-primary text-sm">View All</a>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {currentTrainings.map(training => (
                        <div key={training.id} className="p-4 flex items-center">
                          <div className="w-10 h-10 bg-[#e0e4f8] rounded-md flex items-center justify-center text-primary mr-4">
                            <i className={`${training.icon} text-xl`}></i>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                              <h3 className="font-medium">{training.title}</h3>
                              <span className="text-xs text-gray-medium">
                                {training.progress}% Complete
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                              <div 
                                className="bg-primary h-2 rounded-full" 
                                style={{ width: `${training.progress}%` }}
                              ></div>
                            </div>
                            <div className="flex justify-between text-xs text-gray-medium">
                              <span>Module {training.currentModule}/{training.totalModules}</span>
                              <span>Due {training.dueDate}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
              
              {activeTab === "achievements" && (
                <>
                  {/* Certificates */}
                  <div className="bg-white rounded-lg shadow-sm mb-6">
                    <div className="p-4 border-b border-gray-200">
                      <h2 className="text-lg font-semibold">Certificates</h2>
                    </div>
                    <div className="divide-y divide-gray-200">
                      <div className="p-4 flex">
                        <div className="w-14 h-20 bg-[#e0e4f8] flex items-center justify-center text-primary mr-4 rounded-md">
                          <i className="ri-file-certificate-line text-2xl"></i>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium mb-1">Certified Security Specialist</h3>
                          <p className="text-sm text-gray-medium mb-2">
                            Completed comprehensive security training covering network security, data protection, and incident response.
                          </p>
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-medium">Issued: June 15, 2024</span>
                            <button className="text-primary font-medium">View Certificate</button>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 flex">
                        <div className="w-14 h-20 bg-[#e0e4f8] flex items-center justify-center text-primary mr-4 rounded-md">
                          <i className="ri-file-certificate-line text-2xl"></i>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium mb-1">Data Privacy Expert</h3>
                          <p className="text-sm text-gray-medium mb-2">
                            Specialized training in data privacy regulations, compliance requirements, and protection measures.
                          </p>
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-medium">Issued: March 10, 2024</span>
                            <button className="text-primary font-medium">View Certificate</button>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 flex">
                        <div className="w-14 h-20 bg-[#e0e4f8] flex items-center justify-center text-primary mr-4 rounded-md">
                          <i className="ri-file-certificate-line text-2xl"></i>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium mb-1">Risk Assessment Professional</h3>
                          <p className="text-sm text-gray-medium mb-2">
                            Advanced training in identifying, evaluating, and mitigating security risks in various environments.
                          </p>
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-medium">Issued: January 22, 2024</span>
                            <button className="text-primary font-medium">View Certificate</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Points and Leaderboard */}
                  <div className="bg-white rounded-lg shadow-sm">
                    <div className="p-4 border-b border-gray-200">
                      <h2 className="text-lg font-semibold">Leaderboard</h2>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-4">
                        <p className="font-medium">Your Ranking: #4</p>
                        <div className="flex items-center text-sm text-gray-medium">
                          <i className="ri-star-fill text-yellow-500 mr-1"></i>
                          <span>1,250 points</span>
                        </div>
                      </div>
                      
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
                  </div>
                </>
              )}
              
              {activeTab === "activity" && (
                <>
                  {/* Weekly Activity */}
                  <div className="bg-white rounded-lg shadow-sm mb-6">
                    <div className="p-4 border-b border-gray-200">
                      <h2 className="text-lg font-semibold">Weekly Activity</h2>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-2xl font-bold">8.5 hrs</p>
                          <p className="text-sm text-gray-medium">Time spent this week</p>
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-right">+2.5 hrs</p>
                          <p className="text-sm text-green-500 flex items-center justify-end">
                            <i className="ri-arrow-up-line mr-1"></i>
                            From last week
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-7 gap-1">
                          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => (
                            <div key={day} className="text-center text-xs text-gray-medium">
                              {day}
                            </div>
                          ))}
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                          <div className="h-24 bg-primary/20 rounded-md flex flex-col items-center justify-end p-1">
                            <div className="w-full h-30% bg-primary rounded-md"></div>
                            <p className="text-xs mt-1">1.5h</p>
                          </div>
                          <div className="h-24 bg-primary/20 rounded-md flex flex-col items-center justify-end p-1">
                            <div className="w-full h-60% bg-primary rounded-md"></div>
                            <p className="text-xs mt-1">3.0h</p>
                          </div>
                          <div className="h-24 bg-primary/20 rounded-md flex flex-col items-center justify-end p-1">
                            <div className="w-full h-40% bg-primary rounded-md"></div>
                            <p className="text-xs mt-1">2.0h</p>
                          </div>
                          <div className="h-24 bg-primary/20 rounded-md flex flex-col items-center justify-end p-1">
                            <div className="w-full h-20% bg-primary rounded-md"></div>
                            <p className="text-xs mt-1">1.0h</p>
                          </div>
                          <div className="h-24 bg-primary/20 rounded-md flex flex-col items-center justify-end p-1">
                            <div className="w-full h-20% bg-primary rounded-md"></div>
                            <p className="text-xs mt-1">1.0h</p>
                          </div>
                          <div className="h-24 bg-primary/20 rounded-md flex flex-col items-center justify-end p-1">
                            <div className="w-full h-0% bg-primary rounded-md"></div>
                            <p className="text-xs mt-1">0h</p>
                          </div>
                          <div className="h-24 bg-primary/20 rounded-md flex flex-col items-center justify-end p-1">
                            <div className="w-full h-0% bg-primary rounded-md"></div>
                            <p className="text-xs mt-1">0h</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress by Course */}
                  <div className="bg-white rounded-lg shadow-sm">
                    <div className="p-4 border-b border-gray-200">
                      <h2 className="text-lg font-semibold">Progress by Course</h2>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {currentTrainings.map(training => (
                        <div key={training.id} className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-start">
                              <div className="w-10 h-10 bg-[#e0e4f8] rounded-md flex items-center justify-center text-primary mr-3">
                                <i className={`${training.icon} text-xl`}></i>
                              </div>
                              <div>
                                <h3 className="font-medium">{training.title}</h3>
                                <p className="text-xs text-gray-medium">
                                  {training.timeRemaining} remaining • Due {training.dueDate}
                                </p>
                              </div>
                            </div>
                            <span className="text-xs bg-[#e0e4f8] text-primary px-2 py-0.5 rounded-full">
                              {training.status === "in-progress" ? "In Progress" : "Completed"}
                            </span>
                          </div>
                          
                          <div className="flex items-center mt-2">
                            <div className="w-full">
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-gray-medium">Progress</span>
                                <span className="font-medium">{training.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-primary h-2 rounded-full" 
                                  style={{ width: `${training.progress}%` }}
                                ></div>
                              </div>
                            </div>
                            <button className="ml-4 text-primary text-sm whitespace-nowrap">
                              Continue
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}