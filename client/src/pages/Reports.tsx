import { useState } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { currentUser } from "@/lib/data";
import { cn } from "@/lib/utils";

// Report type definition
type ReportType = "performance" | "progress" | "assessment" | "all";
type DateRange = "today" | "week" | "month" | "quarter" | "year" | "custom";

interface Report {
  id: number;
  title: string;
  description: string;
  type: Exclude<ReportType, "all">;
  dateGenerated: string;
  lastViewed?: string;
  creator: string;
  format: "pdf" | "excel" | "csv";
  size: string;
  status: "completed" | "scheduled" | "processing";
  frequency?: "daily" | "weekly" | "monthly" | "quarterly" | "yearly" | "one-time";
  starred: boolean;
}

// Sample data for reports
const reports: Report[] = [
  {
    id: 1,
    title: "Monthly Performance Summary",
    description: "Comprehensive summary of agent performance metrics including call resolution rates, satisfaction scores and response times.",
    type: "performance",
    dateGenerated: "Jun 01, 2024",
    lastViewed: "Jun 15, 2024",
    creator: "System",
    format: "pdf",
    size: "2.4 MB",
    status: "completed",
    frequency: "monthly",
    starred: true
  },
  {
    id: 2,
    title: "Weekly Training Progress",
    description: "Detailed breakdown of training completion rates, assessment scores and time spent by each team member.",
    type: "progress",
    dateGenerated: "Jun 12, 2024",
    lastViewed: "Jun 14, 2024",
    creator: "Sarah Johnson",
    format: "excel",
    size: "1.8 MB",
    status: "completed",
    frequency: "weekly",
    starred: false
  },
  {
    id: 3,
    title: "Customer Assessment Analytics",
    description: "Analysis of customer interaction assessments with insights on common challenges and successful resolution strategies.",
    type: "assessment",
    dateGenerated: "Jun 10, 2024",
    creator: "Michael Chen",
    format: "pdf",
    size: "3.5 MB",
    status: "completed",
    starred: true
  },
  {
    id: 4,
    title: "Quarterly Performance Trends",
    description: "Long-term analysis of performance metrics showing trends and patterns over the last quarter.",
    type: "performance",
    dateGenerated: "Apr 01, 2024",
    lastViewed: "May 15, 2024",
    creator: "System",
    format: "excel",
    size: "4.2 MB",
    status: "completed",
    frequency: "quarterly",
    starred: false
  },
  {
    id: 5,
    title: "Team Simulation Results",
    description: "Comparative analysis of team performance in customer interaction simulations with personalized feedback.",
    type: "assessment",
    dateGenerated: "Jun 05, 2024",
    creator: "Emma Roberts",
    format: "pdf",
    size: "2.9 MB",
    status: "completed",
    starred: false
  },
  {
    id: 6,
    title: "Daily Training Digest",
    description: "Summary of all training activities completed in the last 24 hours with completion status and time spent.",
    type: "progress",
    dateGenerated: "Jun 15, 2024",
    creator: "System",
    format: "pdf",
    size: "1.1 MB",
    status: "scheduled",
    frequency: "daily",
    starred: false
  },
  {
    id: 7,
    title: "Custom Performance Report",
    description: "Customized report analyzing specific performance metrics for selected team members.",
    type: "performance",
    dateGenerated: "Jun 08, 2024",
    lastViewed: "Jun 10, 2024",
    creator: "You",
    format: "excel",
    size: "3.7 MB",
    status: "completed",
    frequency: "one-time",
    starred: true
  },
  {
    id: 8,
    title: "Annual Training Effectiveness",
    description: "Comprehensive analysis of training program effectiveness, completion rates, and impact on performance metrics.",
    type: "progress",
    dateGenerated: "Jan 15, 2024",
    lastViewed: "Mar 20, 2024",
    creator: "System",
    format: "pdf",
    size: "5.2 MB",
    status: "completed",
    frequency: "yearly",
    starred: false
  }
];

// Chart data types
interface ChartData {
  label: string;
  value: number;
}

// Sample data for charts
const performanceData: ChartData[] = [
  { label: "Jan", value: 72 },
  { label: "Feb", value: 68 },
  { label: "Mar", value: 74 },
  { label: "Apr", value: 78 },
  { label: "May", value: 82 },
  { label: "Jun", value: 85 }
];

const trainingData: ChartData[] = [
  { label: "Jan", value: 42 },
  { label: "Feb", value: 53 },
  { label: "Mar", value: 62 },
  { label: "Apr", value: 68 },
  { label: "May", value: 74 },
  { label: "Jun", value: 80 }
];

const assessmentData: ChartData[] = [
  { label: "Jan", value: 15 },
  { label: "Feb", value: 22 },
  { label: "Mar", value: 28 },
  { label: "Apr", value: 32 },
  { label: "May", value: 38 },
  { label: "Jun", value: 45 }
];

export default function Reports() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Filters and sorting
  const [typeFilter, setTypeFilter] = useState<ReportType>("all");
  const [dateRange, setDateRange] = useState<DateRange>("month");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "a-z">("newest");
  
  // Filter and sort reports
  const filteredReports = reports.filter(report => {
    // Apply type filter
    if (typeFilter !== "all" && report.type !== typeFilter) return false;
    
    // Apply search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        report.title.toLowerCase().includes(searchLower) ||
        report.description.toLowerCase().includes(searchLower) ||
        report.creator.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  }).sort((a, b) => {
    // Sort by date (newest/oldest) or alphabetically
    if (sortBy === "newest") {
      return new Date(b.dateGenerated).getTime() - new Date(a.dateGenerated).getTime();
    } else if (sortBy === "oldest") {
      return new Date(a.dateGenerated).getTime() - new Date(b.dateGenerated).getTime();
    } else {
      return a.title.localeCompare(b.title);
    }
  });
  
  // Calculate counts
  const totalReports = reports.length;
  const starredReports = reports.filter(r => r.starred).length;
  const completedReports = reports.filter(r => r.status === "completed").length;
  const scheduledReports = reports.filter(r => r.status === "scheduled").length;
  
  // Function to render chart based on data
  const renderChart = (data: ChartData[], color: string) => {
    const max = Math.max(...data.map(d => d.value));
    
    return (
      <div className="flex h-40 items-end space-x-2">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div 
              className={`w-full ${color} rounded-t-sm`} 
              style={{ height: `${(item.value / max) * 100}%` }}
            ></div>
            <span className="text-xs mt-1">{item.label}</span>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="min-h-screen flex bg-[#F8F9FA] font-inter text-dark">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col">
        <Header 
          title="Reports" 
          user={currentUser} 
          onMenuClick={() => setSidebarOpen(true)} 
        />
        
        <main className="flex-1 p-6 bg-[#F8F9FA] overflow-auto">
          {/* Dashboard Overview */}
          <section className="mb-8">
            <h1 className="text-2xl font-bold mb-6">Reports Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-[#e0e4f8] flex items-center justify-center text-primary mr-4">
                    <i className="ri-file-chart-line text-xl"></i>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{totalReports}</p>
                    <p className="text-sm text-gray-medium">Total Reports</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-[#e0e4f8] flex items-center justify-center text-primary mr-4">
                    <i className="ri-star-line text-xl"></i>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{starredReports}</p>
                    <p className="text-sm text-gray-medium">Starred Reports</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-[#e0e4f8] flex items-center justify-center text-primary mr-4">
                    <i className="ri-check-line text-xl"></i>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{completedReports}</p>
                    <p className="text-sm text-gray-medium">Completed</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-[#e0e4f8] flex items-center justify-center text-primary mr-4">
                    <i className="ri-calendar-line text-xl"></i>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{scheduledReports}</p>
                    <p className="text-sm text-gray-medium">Scheduled</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Charts row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Performance Metrics</h3>
                  <select className="text-xs border border-gray-200 rounded-md p-1">
                    <option>Last 6 months</option>
                    <option>Last year</option>
                  </select>
                </div>
                {renderChart(performanceData, "bg-blue-500")}
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Training Completion</h3>
                  <select className="text-xs border border-gray-200 rounded-md p-1">
                    <option>Last 6 months</option>
                    <option>Last year</option>
                  </select>
                </div>
                {renderChart(trainingData, "bg-green-500")}
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Assessment Count</h3>
                  <select className="text-xs border border-gray-200 rounded-md p-1">
                    <option>Last 6 months</option>
                    <option>Last year</option>
                  </select>
                </div>
                {renderChart(assessmentData, "bg-purple-500")}
              </div>
            </div>
          </section>
          
          {/* Reports list section */}
          <section>
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
              <h2 className="text-xl font-semibold">Your Reports</h2>
              
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 bg-primary text-white rounded-md text-sm flex items-center gap-2">
                  <i className="ri-add-line"></i>
                  <span>Create Report</span>
                </button>
              </div>
            </div>
            
            {/* Search and filters */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-wrap justify-between gap-4">
                <div className="relative w-full max-w-md">
                  <input 
                    type="text" 
                    placeholder="Search reports..." 
                    className="w-full px-4 py-2 pl-10 border border-gray-200 rounded-md"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>
                
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600">Type:</label>
                    <select 
                      className="border border-gray-200 rounded-md text-sm p-2"
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value as ReportType)}
                    >
                      <option value="all">All Reports</option>
                      <option value="performance">Performance</option>
                      <option value="progress">Progress</option>
                      <option value="assessment">Assessment</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600">Date:</label>
                    <select 
                      className="border border-gray-200 rounded-md text-sm p-2"
                      value={dateRange}
                      onChange={(e) => setDateRange(e.target.value as DateRange)}
                    >
                      <option value="today">Today</option>
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                      <option value="quarter">This Quarter</option>
                      <option value="year">This Year</option>
                      <option value="custom">Custom Range</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600">Sort:</label>
                    <select 
                      className="border border-gray-200 rounded-md text-sm p-2"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as "newest" | "oldest" | "a-z")}
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="a-z">Alphabetical</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Reports Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 text-left">
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Creator</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Format</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredReports.map((report) => (
                      <tr key={report.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="text-gray-400 hover:text-primary">
                            <i className={`${report.starred ? 'ri-star-fill text-yellow-400' : 'ri-star-line'}`}></i>
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium">{report.title}</div>
                            <div className="text-sm text-gray-medium truncate max-w-xs">
                              {report.description}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={cn(
                            "px-2 py-1 text-xs rounded-full",
                            report.type === "performance" ? "bg-blue-100 text-blue-700" :
                            report.type === "progress" ? "bg-green-100 text-green-700" : 
                            "bg-purple-100 text-purple-700"
                          )}>
                            {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div>{report.dateGenerated}</div>
                          {report.lastViewed && (
                            <div className="text-xs text-gray-medium">
                              Viewed: {report.lastViewed}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {report.creator}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <i className={cn(
                              "mr-1",
                              report.format === "pdf" ? "ri-file-pdf-line text-red-500" :
                              report.format === "excel" ? "ri-file-excel-line text-green-500" : 
                              "ri-file-list-line text-gray-500"
                            )}></i>
                            <span className="text-sm">
                              {report.format.toUpperCase()} • {report.size}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={cn(
                            "px-2 py-1 text-xs rounded-full",
                            report.status === "completed" ? "bg-green-100 text-green-700" :
                            report.status === "scheduled" ? "bg-yellow-100 text-yellow-700" : 
                            "bg-blue-100 text-blue-700"
                          )}>
                            {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                          </span>
                          {report.frequency && report.frequency !== "one-time" && (
                            <div className="text-xs text-gray-medium mt-1">
                              {report.frequency.charAt(0).toUpperCase() + report.frequency.slice(1)}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex items-center space-x-2">
                            <button className="text-gray-400 hover:text-gray-600 p-1">
                              <i className="ri-eye-line"></i>
                            </button>
                            <button className="text-gray-400 hover:text-gray-600 p-1">
                              <i className="ri-download-line"></i>
                            </button>
                            <button className="text-gray-400 hover:text-gray-600 p-1">
                              <i className="ri-more-2-fill"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Empty state */}
              {filteredReports.length === 0 && (
                <div className="p-12 text-center">
                  <i className="ri-file-search-line text-5xl text-gray-300 mb-4"></i>
                  <h3 className="text-xl font-medium mb-2">No reports found</h3>
                  <p className="text-gray-medium mb-6">
                    Try adjusting your search criteria or create a new report.
                  </p>
                  <button 
                    className="px-4 py-2 bg-primary text-white rounded-md text-sm"
                    onClick={() => {
                      setTypeFilter("all");
                      setSearchTerm("");
                    }}
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}