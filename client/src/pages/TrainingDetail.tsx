import { useState } from "react";
import { useRoute } from "wouter";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { currentTrainings, currentUser } from "@/lib/data";
import { cn } from "@/lib/utils";

interface ModuleItem {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
}

// Mock module data for the training
const trainingModules: ModuleItem[] = [
  { id: 1, title: "Introduction to Cybersecurity", duration: "30m", completed: true },
  { id: 2, title: "Understanding Threats and Vulnerabilities", duration: "45m", completed: true },
  { id: 3, title: "Security Controls and Frameworks", duration: "1h", completed: false },
  { id: 4, title: "Network Security Best Practices", duration: "1h 15m", completed: false },
  { id: 5, title: "Security Incident Response", duration: "50m", completed: false },
];

export default function TrainingDetail() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [, params] = useRoute("/training/:id");
  const trainingId = params?.id ? parseInt(params.id) : 1;
  
  const training = currentTrainings.find(t => t.id === trainingId) || currentTrainings[0];
  const [activeModule, setActiveModule] = useState(training.currentModule);
  
  return (
    <div className="min-h-screen flex bg-[#F8F9FA] font-inter text-dark">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col">
        <Header 
          title="Training Detail" 
          user={currentUser} 
          onMenuClick={() => setSidebarOpen(true)} 
        />
        
        <main className="flex-1 p-6 bg-[#F8F9FA] overflow-auto">
          {/* Training Header */}
          <section className="mb-8 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#e0e4f8] rounded-md flex items-center justify-center text-primary mr-4">
                  <i className={`${training.icon} text-2xl`}></i>
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{training.title}</h1>
                  <div className="flex items-center text-sm text-gray-medium mt-1">
                    <span className="bg-[#e0e4f8] text-primary px-2 py-0.5 rounded-full text-xs mr-3">
                      {training.level}
                    </span>
                    <div className="flex items-center mr-3">
                      <i className="ri-book-open-line mr-1"></i>
                      <span>{training.totalModules} modules</span>
                    </div>
                    <div className="flex items-center">
                      <i className="ri-time-line mr-1"></i>
                      <span>Estimated: 8 hours</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-medium mb-4">
                  This comprehensive training covers all aspects of cybersecurity fundamentals, from understanding basic principles to implementing advanced security controls.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-gray-100 text-gray-medium px-3 py-1 rounded-full text-xs">Network Security</span>
                  <span className="bg-gray-100 text-gray-medium px-3 py-1 rounded-full text-xs">Data Protection</span>
                  <span className="bg-gray-100 text-gray-medium px-3 py-1 rounded-full text-xs">Risk Management</span>
                  <span className="bg-gray-100 text-gray-medium px-3 py-1 rounded-full text-xs">Compliance</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-medium">Overall Progress</span>
                  <span className="font-medium">{training.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: `${training.progress}%` }}
                  ></div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-medium">
                    <i className="ri-time-line mr-1"></i>
                    <span>{training.timeRemaining} remaining</span>
                  </div>
                  <div className="flex items-center text-gray-medium">
                    <i className="ri-calendar-line mr-1"></i>
                    <span>Due {training.dueDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Modules Section */}
          <section>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Module List */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold">Course Modules</h2>
                  </div>
                  
                  <div className="divide-y divide-gray-200">
                    {trainingModules.map((module) => (
                      <div 
                        key={module.id}
                        className={cn(
                          "p-4 cursor-pointer",
                          activeModule === module.id ? "bg-[#e0e4f8]" : "",
                          module.completed ? "opacity-70" : ""
                        )}
                        onClick={() => setActiveModule(module.id)}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <h3 className="font-medium flex items-center">
                            {module.completed && (
                              <i className="ri-check-line text-green-500 mr-2"></i>
                            )}
                            Module {module.id}: {module.title}
                          </h3>
                          <span className="text-xs text-gray-medium">{module.duration}</span>
                        </div>
                        
                        <div className="flex items-center mt-2">
                          {module.completed ? (
                            <span className="text-xs text-green-500">Completed</span>
                          ) : activeModule === module.id ? (
                            <span className="text-xs text-primary">In Progress</span>
                          ) : (
                            <span className="text-xs text-gray-medium">Not Started</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-4 border-t border-gray-200">
                    <button className="w-full py-2 bg-primary text-white rounded-md font-medium text-sm">
                      {activeModule > 1 && activeModule < trainingModules.length 
                        ? "Continue Training" 
                        : activeModule === trainingModules.length 
                          ? "Complete Course" 
                          : "Start Training"}
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Module Content */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold">
                      Module {activeModule}: {trainingModules[activeModule - 1]?.title}
                    </h2>
                  </div>
                  
                  <div className="p-6">
                    <div className="aspect-w-16 aspect-h-9 mb-6 bg-gray-200 rounded-lg overflow-hidden">
                      <div className="flex items-center justify-center h-full bg-[#e0e4f8]">
                        <div className="text-center">
                          <i className="ri-video-line text-4xl text-primary mb-2"></i>
                          <p className="text-gray-medium">Video Content</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="font-semibold mb-3">Module Overview</h3>
                      <p className="text-gray-medium mb-4">
                        This module provides an in-depth understanding of cybersecurity principles
                        and practical approaches to securing systems and networks. You'll learn about
                        threat models, vulnerability assessment, and implementation of security controls.
                      </p>
                      <ul className="list-disc list-inside text-gray-medium ml-2 space-y-2">
                        <li>Understanding common cybersecurity threats</li>
                        <li>Identifying vulnerabilities in systems and applications</li>
                        <li>Implementing appropriate security controls</li>
                        <li>Following security best practices</li>
                        <li>Documenting and reporting security findings</li>
                      </ul>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="font-semibold mb-3">Learning Resources</h3>
                      <div className="space-y-3">
                        <div className="flex items-center p-3 border border-gray-200 rounded-lg">
                          <i className="ri-file-pdf-line text-red-500 text-xl mr-3"></i>
                          <span className="text-sm">Module {activeModule} Slides.pdf</span>
                        </div>
                        <div className="flex items-center p-3 border border-gray-200 rounded-lg">
                          <i className="ri-links-line text-blue-500 text-xl mr-3"></i>
                          <span className="text-sm">Additional Resources</span>
                        </div>
                        <div className="flex items-center p-3 border border-gray-200 rounded-lg">
                          <i className="ri-file-list-3-line text-green-500 text-xl mr-3"></i>
                          <span className="text-sm">Practice Exercises</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-4">
                      <button 
                        className="flex-1 py-2 bg-gray-100 text-gray-600 rounded-md font-medium text-sm"
                        disabled={activeModule === 1}
                      >
                        Previous Module
                      </button>
                      <button 
                        className="flex-1 py-2 bg-primary text-white rounded-md font-medium text-sm"
                        disabled={activeModule === trainingModules.length}
                      >
                        Next Module
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}