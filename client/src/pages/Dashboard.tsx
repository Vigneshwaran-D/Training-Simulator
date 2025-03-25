import { useState } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import ProgressCard from "@/components/dashboard/ProgressCard";
import TrainingCard from "@/components/dashboard/TrainingCard";
import RecommendedCard from "@/components/dashboard/RecommendedCard";
import { 
  achievements, 
  currentTrainings, 
  currentUser, 
  overallProgress, 
  recommendedTrainings, 
  weeklyTimeSpent 
} from "@/lib/data";
import { cn } from "@/lib/utils";

type TabType = "all" | "in-progress" | "completed";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("all");

  const filteredTrainings = currentTrainings.filter(training => {
    if (activeTab === "all") return true;
    return training.status === activeTab;
  });

  const handleContinueTraining = (id: number) => {
    console.log(`Continue training: ${id}`);
    // In a real app, this would navigate to the training module
  };

  const handleEnroll = (id: number) => {
    console.log(`Enroll in training: ${id}`);
    // In a real app, this would handle enrollment
  };

  const progressPercentage = Math.round((overallProgress.completed / overallProgress.total) * 100);
  const timePercentage = Math.round((weeklyTimeSpent.hours / 16) * 100);

  return (
    <div className="min-h-screen flex bg-[#F8F9FA] font-inter text-dark">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col">
        <Header 
          title="Training Dashboard" 
          user={currentUser} 
          onMenuClick={() => setSidebarOpen(true)} 
        />
        
        <main className="flex-1 p-6 bg-[#F8F9FA] overflow-auto">
          {/* Overview Section */}
          <section className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Overall Progress Card */}
              <ProgressCard 
                title="Overall Progress"
                subtitle="Your training progress"
                progress={overallProgress}
                percentage={progressPercentage}
                valueText={`${progressPercentage}%`}
                color="hsl(230, 76%, 57%)" // Primary color
              />
              
              {/* Time Spent Card */}
              <ProgressCard 
                title="Time Spent"
                subtitle="This week"
                progress={{
                  completed: weeklyTimeSpent.hours,
                  total: 16,
                  completedText: "Total goal",
                  remainingText: "Last week"
                }}
                percentage={timePercentage}
                valueText={`${weeklyTimeSpent.hours}h`}
                color="hsl(183, 92%, 38%)" // Secondary color
              />
              
              {/* Achievements Card */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-lg font-semibold">Achievements</h3>
                    <p className="text-gray-medium text-sm">Your badges and certificates</p>
                  </div>
                  <div className="text-gray-medium">
                    <i className="ri-more-2-fill"></i>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="grid grid-cols-2 gap-4">
                    {achievements.map((achievement) => (
                      <div key={achievement.id} className="flex flex-col items-center">
                        <div className={cn(
                          "w-14 h-14 rounded-full flex items-center justify-center mb-2",
                          achievement.unlocked 
                            ? "bg-[#e0e4f8] text-primary" 
                            : "border-2 border-dashed border-gray-300 text-gray-300"
                        )}>
                          <i className={`${achievement.icon} text-2xl`}></i>
                        </div>
                        <span className="text-xs text-gray-medium">{achievement.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Current Training Section */}
          <section className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Current Training</h2>
              <div className="tab-navigation flex space-x-6">
                <button 
                  className={cn(
                    "px-1 py-2",
                    activeTab === "all" ? "text-primary border-b-2 border-primary font-semibold" : "text-gray-medium"
                  )}
                  onClick={() => setActiveTab("all")}
                >
                  All
                </button>
                <button 
                  className={cn(
                    "px-1 py-2",
                    activeTab === "in-progress" ? "text-primary border-b-2 border-primary font-semibold" : "text-gray-medium"
                  )}
                  onClick={() => setActiveTab("in-progress")}
                >
                  In Progress
                </button>
                <button 
                  className={cn(
                    "px-1 py-2",
                    activeTab === "completed" ? "text-primary border-b-2 border-primary font-semibold" : "text-gray-medium"
                  )}
                  onClick={() => setActiveTab("completed")}
                >
                  Completed
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTrainings.map((training) => (
                <TrainingCard 
                  key={training.id} 
                  training={training} 
                  onClick={handleContinueTraining}
                />
              ))}
            </div>
          </section>
          
          {/* Recommended Training Section */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Recommended Training</h2>
              <a href="#" className="text-primary text-sm font-medium flex items-center">
                <span>View All</span>
                <i className="ri-arrow-right-s-line ml-1"></i>
              </a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedTrainings.map((training) => (
                <RecommendedCard 
                  key={training.id} 
                  training={training} 
                  onEnroll={handleEnroll}
                />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
