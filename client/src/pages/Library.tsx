import { useState } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { currentUser } from "@/lib/data";
import { cn } from "@/lib/utils";

// Resource types
type ResourceType = "videos" | "documents" | "guides" | "templates" | "all";
type ResourceCategory = "security" | "privacy" | "compliance" | "general" | "all";
type ResourceLevel = "beginner" | "intermediate" | "advanced" | "all";

interface Resource {
  id: number;
  title: string;
  description: string;
  type: Exclude<ResourceType, "all">;
  category: Exclude<ResourceCategory, "all">;
  level: Exclude<ResourceLevel, "all">;
  author: string;
  date: string;
  duration?: string; // For videos
  pageCount?: number; // For documents
  thumbnail: string;
  tags: string[];
  views: number;
  downloads: number;
  saved: boolean;
}

// Sample data for the library resources
const resources: Resource[] = [
  {
    id: 1,
    title: "Customer Service Excellence: Managing Difficult Conversations",
    description: "Learn proven techniques for handling challenging customer interactions with confidence and professionalism.",
    type: "videos",
    category: "general",
    level: "intermediate",
    author: "Sarah Johnson",
    date: "Jun 15, 2024",
    duration: "45 min",
    thumbnail: "video-1",
    tags: ["communication", "difficult customers", "de-escalation"],
    views: 1245,
    downloads: 320,
    saved: true
  },
  {
    id: 2,
    title: "Security Protocols Reference Guide",
    description: "A comprehensive reference document outlining all security protocols and procedures to be followed during customer interactions.",
    type: "documents",
    category: "security",
    level: "advanced",
    author: "Michael Chen",
    date: "May 3, 2024",
    pageCount: 24,
    thumbnail: "doc-1",
    tags: ["security", "protocols", "reference"],
    views: 890,
    downloads: 456,
    saved: false
  },
  {
    id: 3,
    title: "Privacy Compliance Training",
    description: "Essential training covering all aspects of data privacy regulations and compliant customer data handling.",
    type: "videos",
    category: "privacy",
    level: "beginner",
    author: "Emma Rodriguez",
    date: "Apr 22, 2024",
    duration: "32 min",
    thumbnail: "video-2",
    tags: ["privacy", "compliance", "data protection"],
    views: 1678,
    downloads: 589,
    saved: true
  },
  {
    id: 4,
    title: "Call Assessment Template",
    description: "Standardized template for evaluating customer service calls and providing constructive feedback.",
    type: "templates",
    category: "general",
    level: "intermediate",
    author: "Daniel Wilson",
    date: "Mar 15, 2024",
    pageCount: 3,
    thumbnail: "template-1",
    tags: ["assessment", "feedback", "evaluation"],
    views: 2145,
    downloads: 1290,
    saved: false
  },
  {
    id: 5,
    title: "Handling Emotional Customers Guide",
    description: "Step-by-step guide for maintaining professionalism when dealing with highly emotional customer interactions.",
    type: "guides",
    category: "general",
    level: "intermediate",
    author: "Jessica Lee",
    date: "Feb 28, 2024",
    pageCount: 18,
    thumbnail: "guide-1",
    tags: ["emotional customers", "empathy", "professionalism"],
    views: 1567,
    downloads: 890,
    saved: true
  },
  {
    id: 6,
    title: "Compliance Checklist for Customer Information",
    description: "Essential checklist to ensure all customer interactions meet compliance requirements for information handling.",
    type: "templates",
    category: "compliance",
    level: "beginner",
    author: "Robert Brown",
    date: "Feb 10, 2024",
    pageCount: 2,
    thumbnail: "template-2",
    tags: ["compliance", "checklist", "information security"],
    views: 935,
    downloads: 621,
    saved: false
  },
  {
    id: 7,
    title: "Advanced De-escalation Techniques",
    description: "Video training showcasing advanced techniques for de-escalating tense customer situations.",
    type: "videos",
    category: "general",
    level: "advanced",
    author: "Thomas Clark",
    date: "Jan 25, 2024",
    duration: "58 min",
    thumbnail: "video-3",
    tags: ["de-escalation", "conflict resolution", "difficult customers"],
    views: 1823,
    downloads: 742,
    saved: true
  },
  {
    id: 8,
    title: "Data Breach Response Protocol",
    description: "Comprehensive guide outlining the steps to take in case of a potential data breach during customer interactions.",
    type: "guides",
    category: "security",
    level: "advanced",
    author: "Linda Martinez",
    date: "Jan 12, 2024",
    pageCount: 27,
    thumbnail: "guide-2",
    tags: ["security", "data breach", "incident response"],
    views: 763,
    downloads: 412,
    saved: false
  }
];

export default function Library() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Filters
  const [typeFilter, setTypeFilter] = useState<ResourceType>("all");
  const [categoryFilter, setCategoryFilter] = useState<ResourceCategory>("all");
  const [levelFilter, setLevelFilter] = useState<ResourceLevel>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "popular">("newest");
  
  // Filter and sort resources
  const filteredResources = resources.filter(resource => {
    // Apply type filter
    if (typeFilter !== "all" && resource.type !== typeFilter) return false;
    
    // Apply category filter
    if (categoryFilter !== "all" && resource.category !== categoryFilter) return false;
    
    // Apply level filter
    if (levelFilter !== "all" && resource.level !== levelFilter) return false;
    
    // Apply search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        resource.title.toLowerCase().includes(searchLower) ||
        resource.description.toLowerCase().includes(searchLower) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    return true;
  }).sort((a, b) => {
    // Sort by newest (date) or most popular (views)
    if (sortBy === "newest") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return b.views - a.views;
    }
  });
  
  return (
    <div className="min-h-screen flex bg-[#F8F9FA] font-inter text-dark">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col">
        <Header 
          title="Resource Library" 
          user={currentUser} 
          onMenuClick={() => setSidebarOpen(true)} 
        />
        
        <main className="flex-1 p-6 bg-[#F8F9FA] overflow-auto">
          {/* Search and Actions */}
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <div className="relative w-full max-w-md">
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="w-full px-4 py-2 pl-10 border border-gray-200 rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <label htmlFor="sortBy" className="text-sm font-medium text-gray-600">Sort by:</label>
                <select 
                  id="sortBy" 
                  className="border border-gray-200 rounded-md text-sm p-1" 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "newest" | "popular")}
                >
                  <option value="newest">Newest</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
              
              <button className="px-4 py-2 bg-primary text-white rounded-md text-sm flex items-center gap-2">
                <i className="ri-add-line"></i>
                <span>Upload Resource</span>
              </button>
            </div>
          </div>
          
          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Resource Type Filter */}
              <div>
                <label className="text-sm font-medium text-gray-600 mb-1 block">Resource Type</label>
                <div className="flex flex-wrap gap-2">
                  <button 
                    className={cn(
                      "px-3 py-1 text-xs rounded-full",
                      typeFilter === "all" 
                        ? "bg-primary text-white" 
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    )}
                    onClick={() => setTypeFilter("all")}
                  >
                    All
                  </button>
                  <button 
                    className={cn(
                      "px-3 py-1 text-xs rounded-full",
                      typeFilter === "videos" 
                        ? "bg-primary text-white" 
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    )}
                    onClick={() => setTypeFilter("videos")}
                  >
                    Videos
                  </button>
                  <button 
                    className={cn(
                      "px-3 py-1 text-xs rounded-full",
                      typeFilter === "documents" 
                        ? "bg-primary text-white" 
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    )}
                    onClick={() => setTypeFilter("documents")}
                  >
                    Documents
                  </button>
                  <button 
                    className={cn(
                      "px-3 py-1 text-xs rounded-full",
                      typeFilter === "guides" 
                        ? "bg-primary text-white" 
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    )}
                    onClick={() => setTypeFilter("guides")}
                  >
                    Guides
                  </button>
                  <button 
                    className={cn(
                      "px-3 py-1 text-xs rounded-full",
                      typeFilter === "templates" 
                        ? "bg-primary text-white" 
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    )}
                    onClick={() => setTypeFilter("templates")}
                  >
                    Templates
                  </button>
                </div>
              </div>
              
              {/* Category Filter */}
              <div>
                <label className="text-sm font-medium text-gray-600 mb-1 block">Category</label>
                <div className="flex flex-wrap gap-2">
                  <button 
                    className={cn(
                      "px-3 py-1 text-xs rounded-full",
                      categoryFilter === "all" 
                        ? "bg-primary text-white" 
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    )}
                    onClick={() => setCategoryFilter("all")}
                  >
                    All
                  </button>
                  <button 
                    className={cn(
                      "px-3 py-1 text-xs rounded-full",
                      categoryFilter === "security" 
                        ? "bg-primary text-white" 
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    )}
                    onClick={() => setCategoryFilter("security")}
                  >
                    Security
                  </button>
                  <button 
                    className={cn(
                      "px-3 py-1 text-xs rounded-full",
                      categoryFilter === "privacy" 
                        ? "bg-primary text-white" 
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    )}
                    onClick={() => setCategoryFilter("privacy")}
                  >
                    Privacy
                  </button>
                  <button 
                    className={cn(
                      "px-3 py-1 text-xs rounded-full",
                      categoryFilter === "compliance" 
                        ? "bg-primary text-white" 
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    )}
                    onClick={() => setCategoryFilter("compliance")}
                  >
                    Compliance
                  </button>
                  <button 
                    className={cn(
                      "px-3 py-1 text-xs rounded-full",
                      categoryFilter === "general" 
                        ? "bg-primary text-white" 
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    )}
                    onClick={() => setCategoryFilter("general")}
                  >
                    General
                  </button>
                </div>
              </div>
              
              {/* Level Filter */}
              <div>
                <label className="text-sm font-medium text-gray-600 mb-1 block">Level</label>
                <div className="flex flex-wrap gap-2">
                  <button 
                    className={cn(
                      "px-3 py-1 text-xs rounded-full",
                      levelFilter === "all" 
                        ? "bg-primary text-white" 
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    )}
                    onClick={() => setLevelFilter("all")}
                  >
                    All
                  </button>
                  <button 
                    className={cn(
                      "px-3 py-1 text-xs rounded-full",
                      levelFilter === "beginner" 
                        ? "bg-primary text-white" 
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    )}
                    onClick={() => setLevelFilter("beginner")}
                  >
                    Beginner
                  </button>
                  <button 
                    className={cn(
                      "px-3 py-1 text-xs rounded-full",
                      levelFilter === "intermediate" 
                        ? "bg-primary text-white" 
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    )}
                    onClick={() => setLevelFilter("intermediate")}
                  >
                    Intermediate
                  </button>
                  <button 
                    className={cn(
                      "px-3 py-1 text-xs rounded-full",
                      levelFilter === "advanced" 
                        ? "bg-primary text-white" 
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    )}
                    onClick={() => setLevelFilter("advanced")}
                  >
                    Advanced
                  </button>
                </div>
              </div>
              
              {/* Clear Filters */}
              <div className="flex items-end">
                <button 
                  className="px-4 py-1.5 border border-gray-200 text-sm rounded-md hover:bg-gray-50"
                  onClick={() => {
                    setTypeFilter("all");
                    setCategoryFilter("all");
                    setLevelFilter("all");
                    setSearchTerm("");
                  }}
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
          
          {/* Results Count */}
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              Showing {filteredResources.length} resources
            </p>
          </div>
          
          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className={cn(
                  "h-40 bg-gray-200 relative",
                  resource.type === "videos" ? "bg-blue-50" :
                  resource.type === "documents" ? "bg-green-50" :
                  resource.type === "guides" ? "bg-purple-50" : "bg-yellow-50"
                )}>
                  {/* Thumbnail placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <i className={cn(
                      "text-4xl",
                      resource.type === "videos" ? "ri-video-line text-blue-500" :
                      resource.type === "documents" ? "ri-file-text-line text-green-500" :
                      resource.type === "guides" ? "ri-book-open-line text-purple-500" : 
                      "ri-file-list-3-line text-yellow-500"
                    )}></i>
                  </div>
                  
                  {/* Resource type badge */}
                  <div className="absolute top-3 left-3">
                    <span className={cn(
                      "px-2 py-1 text-xs rounded-full",
                      resource.type === "videos" ? "bg-blue-100 text-blue-700" :
                      resource.type === "documents" ? "bg-green-100 text-green-700" :
                      resource.type === "guides" ? "bg-purple-100 text-purple-700" : 
                      "bg-yellow-100 text-yellow-700"
                    )}>
                      {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                    </span>
                  </div>
                  
                  {/* Bookmark button */}
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <i className={`${resource.saved ? 'ri-bookmark-fill text-primary' : 'ri-bookmark-line text-gray-400'}`}></i>
                  </button>
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium mb-1 line-clamp-2 h-12">{resource.title}</h3>
                  <p className="text-sm text-gray-medium mb-3 line-clamp-2 h-10">
                    {resource.description}
                  </p>
                  
                  <div className="flex justify-between items-center text-xs text-gray-medium mb-3">
                    <span>{resource.author}</span>
                    <span>{resource.date}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-medium mb-3">
                    <div className="flex items-center">
                      <i className="ri-eye-line mr-1"></i>
                      <span>{resource.views}</span>
                    </div>
                    <div className="flex items-center">
                      <i className="ri-download-line mr-1"></i>
                      <span>{resource.downloads}</span>
                    </div>
                    <div className="flex items-center">
                      {resource.duration ? (
                        <>
                          <i className="ri-time-line mr-1"></i>
                          <span>{resource.duration}</span>
                        </>
                      ) : (
                        <>
                          <i className="ri-file-list-line mr-1"></i>
                          <span>{resource.pageCount} pages</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {resource.tags.slice(0, 3).map((tag, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                    {resource.tags.length > 3 && (
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">
                        +{resource.tags.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex justify-between">
                    <button className="px-3 py-1.5 bg-primary text-white rounded-md text-sm flex-1 mr-2">
                      {resource.type === "videos" ? "Watch" : "View"}
                    </button>
                    <button className="px-3 py-1.5 border border-gray-200 rounded-md text-sm">
                      <i className="ri-download-line"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Empty State */}
          {filteredResources.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg shadow-sm">
              <i className="ri-search-line text-5xl text-gray-300 mb-4"></i>
              <h3 className="text-xl font-medium mb-2">No resources found</h3>
              <p className="text-gray-medium mb-6">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <button 
                className="px-4 py-2 bg-primary text-white rounded-md text-sm"
                onClick={() => {
                  setTypeFilter("all");
                  setCategoryFilter("all");
                  setLevelFilter("all");
                  setSearchTerm("");
                }}
              >
                Clear All Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}