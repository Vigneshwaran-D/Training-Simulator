import { useState } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { currentUser, recommendedTrainings } from "@/lib/data";
import { cn } from "@/lib/utils";

// Course category types
type CourseCategory = "all" | "security" | "privacy" | "response" | "analysis";

export default function Courses() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CourseCategory>("all");

  const filteredCourses = recommendedTrainings.filter(course => {
    if (activeCategory === "all") return true;
    return course.category.toLowerCase() === activeCategory;
  });

  const handleEnroll = (id: number) => {
    console.log(`Enroll in course: ${id}`);
    // In a real app, this would handle enrollment
  };

  return (
    <div className="min-h-screen flex bg-[#F8F9FA] font-inter text-dark">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col">
        <Header 
          title="Courses" 
          user={currentUser} 
          onMenuClick={() => setSidebarOpen(true)} 
        />
        
        <main className="flex-1 p-6 bg-[#F8F9FA] overflow-auto">
          {/* Hero Section */}
          <section className="mb-8 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="p-8 flex-1">
                <h1 className="text-2xl font-bold mb-3">Find the Perfect Course</h1>
                <p className="text-gray-medium mb-6">
                  Browse our extensive library of courses designed to help you grow professionally.
                </p>
                <div className="relative max-w-md">
                  <input 
                    type="text" 
                    placeholder="Search for courses..." 
                    className="w-full py-2 pl-10 pr-4 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <i className="ri-search-line absolute left-3 top-2.5 text-gray-medium"></i>
                </div>
              </div>
              <div className="bg-[#e0e4f8] flex items-center justify-center p-8 md:w-1/3">
                <img 
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                  alt="Course Banner" 
                  className="w-full max-w-xs object-cover rounded-md shadow-md"
                />
              </div>
            </div>
          </section>
          
          {/* Category Navigation */}
          <section className="mb-6">
            <div className="flex space-x-6 overflow-x-auto pb-3">
              <button 
                className={cn(
                  "px-4 py-2 rounded-full whitespace-nowrap",
                  activeCategory === "all" ? "bg-primary text-white" : "bg-white text-gray-medium hover:bg-gray-50"
                )}
                onClick={() => setActiveCategory("all")}
              >
                All Courses
              </button>
              <button 
                className={cn(
                  "px-4 py-2 rounded-full whitespace-nowrap",
                  activeCategory === "security" ? "bg-primary text-white" : "bg-white text-gray-medium hover:bg-gray-50"
                )}
                onClick={() => setActiveCategory("security")}
              >
                Security
              </button>
              <button 
                className={cn(
                  "px-4 py-2 rounded-full whitespace-nowrap",
                  activeCategory === "privacy" ? "bg-primary text-white" : "bg-white text-gray-medium hover:bg-gray-50"
                )}
                onClick={() => setActiveCategory("privacy")}
              >
                Privacy
              </button>
              <button 
                className={cn(
                  "px-4 py-2 rounded-full whitespace-nowrap",
                  activeCategory === "response" ? "bg-primary text-white" : "bg-white text-gray-medium hover:bg-gray-50"
                )}
                onClick={() => setActiveCategory("response")}
              >
                Response
              </button>
              <button 
                className={cn(
                  "px-4 py-2 rounded-full whitespace-nowrap",
                  activeCategory === "analysis" ? "bg-primary text-white" : "bg-white text-gray-medium hover:bg-gray-50"
                )}
                onClick={() => setActiveCategory("analysis")}
              >
                Analysis
              </button>
            </div>
          </section>
          
          {/* Courses Grid */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="h-40 relative">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute top-3 right-3 bg-white rounded-full p-1">
                      <i className="ri-bookmark-line text-primary"></i>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs bg-[#e0e4f8] text-primary px-2 py-1 rounded-full">
                        {course.category}
                      </span>
                      <div className="flex items-center text-yellow-500">
                        <i className="ri-star-fill text-xs"></i>
                        <span className="text-xs ml-1">{course.rating}</span>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold mb-1">{course.title}</h3>
                    
                    <p className="text-xs text-gray-medium mb-3 line-clamp-2">
                      {course.description}
                    </p>
                    
                    <div className="flex items-center text-xs text-gray-medium mb-3">
                      <div className="flex items-center mr-4">
                        <i className="ri-book-open-line mr-1"></i>
                        <span>{course.modules} modules</span>
                      </div>
                      <div className="flex items-center">
                        <i className="ri-time-line mr-1"></i>
                        <span>{course.duration}</span>
                      </div>
                    </div>
                    
                    <button 
                      className="w-full py-2 bg-primary text-white rounded-md font-medium text-sm"
                      onClick={() => handleEnroll(course.id)}
                    >
                      Enroll Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}