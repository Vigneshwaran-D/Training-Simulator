import { useState } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { currentUser } from "@/lib/data";
import { cn } from "@/lib/utils";

// Event types and interfaces
type EventType = "training" | "assessment" | "meeting" | "deadline";
type ViewMode = "month" | "week" | "day" | "agenda";

interface CalendarEvent {
  id: number;
  title: string;
  description?: string;
  type: EventType;
  date: string; // ISO date string
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  location?: string;
  organizer?: string;
  participants?: string[];
  isAllDay: boolean;
  isRecurring: boolean;
  recurrencePattern?: string;
  reminderSet: boolean;
}

// Helper function to get a date range for the displayed month
const getDaysInMonth = (year: number, month: number) => {
  const date = new Date(year, month, 1);
  const days: Date[] = [];
  
  // Get the day of the week of the first day of the month (0-6, where 0 is Sunday)
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  
  // Add days from the previous month to start the calendar on Sunday
  const prevMonthDays = firstDay;
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevMonthYear = month === 0 ? year - 1 : year;
  const daysInPrevMonth = new Date(prevMonthYear, prevMonth + 1, 0).getDate();
  
  for (let i = daysInPrevMonth - prevMonthDays + 1; i <= daysInPrevMonth; i++) {
    days.push(new Date(prevMonthYear, prevMonth, i));
  }
  
  // Add all days in the current month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i));
  }
  
  // Add days from the next month to complete the last week
  const lastDay = new Date(year, month, daysInMonth).getDay();
  const nextMonthDays = 6 - lastDay;
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextMonthYear = month === 11 ? year + 1 : year;
  
  for (let i = 1; i <= nextMonthDays; i++) {
    days.push(new Date(nextMonthYear, nextMonth, i));
  }
  
  return days;
};

// Sample data for calendar events
const generateEvents = (): CalendarEvent[] => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const currentDay = now.getDate();
  
  const events: CalendarEvent[] = [
    {
      id: 1,
      title: "Security Protocol Training",
      description: "Mandatory training session on updated security protocols",
      type: "training",
      date: new Date(currentYear, currentMonth, currentDay + 1).toISOString(),
      startTime: "09:00",
      endTime: "11:30",
      location: "Training Room 2B",
      organizer: "Sarah Johnson",
      participants: ["Team Alpha", "Team Beta"],
      isAllDay: false,
      isRecurring: false,
      reminderSet: true
    },
    {
      id: 2,
      title: "Customer Service Assessment",
      description: "Quarterly assessment of customer service skills",
      type: "assessment",
      date: new Date(currentYear, currentMonth, currentDay + 2).toISOString(),
      startTime: "14:00",
      endTime: "16:00",
      location: "Assessment Center",
      organizer: "Michael Chen",
      participants: ["All Customer Service Representatives"],
      isAllDay: false,
      isRecurring: false,
      reminderSet: true
    },
    {
      id: 3,
      title: "Team Progress Review",
      description: "Monthly review of team training progress and performance metrics",
      type: "meeting",
      date: new Date(currentYear, currentMonth, currentDay).toISOString(),
      startTime: "10:00",
      endTime: "11:00",
      location: "Conference Room A",
      organizer: "Emma Rodriguez",
      participants: ["Department Managers", "Team Leads"],
      isAllDay: false,
      isRecurring: true,
      recurrencePattern: "Monthly on the 15th",
      reminderSet: true
    },
    {
      id: 4,
      title: "Compliance Documentation Deadline",
      description: "Deadline for submitting all required compliance documentation",
      type: "deadline",
      date: new Date(currentYear, currentMonth, currentDay + 5).toISOString(),
      startTime: "17:00",
      endTime: "17:00",
      organizer: "Compliance Department",
      isAllDay: false,
      isRecurring: false,
      reminderSet: true
    },
    {
      id: 5,
      title: "Annual Security Awareness Day",
      description: "Full day of security awareness activities and workshops",
      type: "training",
      date: new Date(currentYear, currentMonth, currentDay + 7).toISOString(),
      startTime: "09:00",
      endTime: "17:00",
      location: "Main Auditorium",
      organizer: "Security Department",
      participants: ["All Staff"],
      isAllDay: true,
      isRecurring: true,
      recurrencePattern: "Annually",
      reminderSet: true
    },
    {
      id: 6,
      title: "Crisis Response Simulation",
      description: "Practical simulation of crisis scenarios and appropriate responses",
      type: "training",
      date: new Date(currentYear, currentMonth, currentDay - 1).toISOString(),
      startTime: "13:00",
      endTime: "16:00",
      location: "Simulation Lab",
      organizer: "Daniel Wilson",
      participants: ["Response Team", "Support Staff"],
      isAllDay: false,
      isRecurring: false,
      reminderSet: true
    },
    {
      id: 7,
      title: "New Employee Onboarding",
      description: "Orientation session for new team members",
      type: "training",
      date: new Date(currentYear, currentMonth, currentDay + 3).toISOString(),
      startTime: "09:30",
      endTime: "15:30",
      location: "Training Center",
      organizer: "HR Department",
      participants: ["New Employees"],
      isAllDay: false,
      isRecurring: true,
      recurrencePattern: "First Monday of each month",
      reminderSet: true
    },
    {
      id: 8,
      title: "Performance Review Meetings",
      description: "Individual performance review sessions with team members",
      type: "meeting",
      date: new Date(currentYear, currentMonth, currentDay + 4).toISOString(),
      startTime: "09:00",
      endTime: "17:00",
      location: "Manager's Office",
      organizer: "Department Managers",
      isAllDay: true,
      isRecurring: false,
      reminderSet: true
    },
    {
      id: 9,
      title: "Data Privacy Certification Exam",
      description: "Final examination for Data Privacy Certification",
      type: "assessment",
      date: new Date(currentYear, currentMonth, currentDay + 6).toISOString(),
      startTime: "10:00",
      endTime: "12:00",
      location: "Testing Center",
      organizer: "Certification Board",
      participants: ["Enrolled Participants"],
      isAllDay: false,
      isRecurring: false,
      reminderSet: true
    },
    {
      id: 10,
      title: "Quarterly Training Plan Submission",
      description: "Deadline for department training plans for the next quarter",
      type: "deadline",
      date: new Date(currentYear, currentMonth, currentDay + 10).toISOString(),
      startTime: "17:00",
      endTime: "17:00",
      organizer: "Training Department",
      isAllDay: false,
      isRecurring: true,
      recurrencePattern: "Quarterly",
      reminderSet: true
    }
  ];
  
  return events;
};

// Sample data for upcoming events
const events = generateEvents();

export default function Calendar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Calendar state
  const today = new Date();
  const [viewDate, setViewDate] = useState(today);
  const [viewMode, setViewMode] = useState<ViewMode>("month");
  const [selectedDate, setSelectedDate] = useState<Date | null>(today);
  const [showEventModal, setShowEventModal] = useState(false);
  
  // Calculate days for the current month view
  const currentViewDays = getDaysInMonth(viewDate.getFullYear(), viewDate.getMonth());
  
  // Filter events for the selected date or current month
  const getEventsForDay = (day: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === day.getDate() &&
        eventDate.getMonth() === day.getMonth() &&
        eventDate.getFullYear() === day.getFullYear()
      );
    });
  };
  
  // Get all events for the currently displayed month
  const currentMonthEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getMonth() === viewDate.getMonth() && eventDate.getFullYear() === viewDate.getFullYear();
  });
  
  // Get upcoming events (from today onwards)
  const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date(today.setHours(0, 0, 0, 0)))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);
  
  // Function to navigate to previous/next month
  const navigateMonth = (direction: 'prev' | 'next') => {
    setViewDate(prevDate => {
      const newDate = new Date(prevDate);
      if (direction === 'prev') {
        newDate.setMonth(prevDate.getMonth() - 1);
      } else {
        newDate.setMonth(prevDate.getMonth() + 1);
      }
      return newDate;
    });
  };
  
  // Function to go to today
  const goToToday = () => {
    setViewDate(new Date());
    setSelectedDate(new Date());
  };
  
  // Function to render event indicator in calendar cell
  const renderEventIndicators = (day: Date) => {
    const dayEvents = getEventsForDay(day);
    if (dayEvents.length === 0) return null;
    
    // Group by type for colored indicators
    const hasTraining = dayEvents.some(e => e.type === 'training');
    const hasAssessment = dayEvents.some(e => e.type === 'assessment');
    const hasMeeting = dayEvents.some(e => e.type === 'meeting');
    const hasDeadline = dayEvents.some(e => e.type === 'deadline');
    
    return (
      <div className="flex space-x-1 mt-1 justify-center">
        {hasTraining && <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>}
        {hasAssessment && <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>}
        {hasMeeting && <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>}
        {hasDeadline && <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>}
      </div>
    );
  };
  
  // Function to get the appropriate background color for an event
  const getEventColor = (type: EventType) => {
    switch (type) {
      case 'training': return 'bg-blue-100 border-blue-500 text-blue-700';
      case 'assessment': return 'bg-purple-100 border-purple-500 text-purple-700';
      case 'meeting': return 'bg-green-100 border-green-500 text-green-700';
      case 'deadline': return 'bg-red-100 border-red-500 text-red-700';
      default: return 'bg-gray-100 border-gray-500 text-gray-700';
    }
  };
  
  return (
    <div className="min-h-screen flex bg-[#F8F9FA] font-inter text-dark">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col">
        <Header 
          title="Calendar" 
          user={currentUser} 
          onMenuClick={() => setSidebarOpen(true)} 
        />
        
        <main className="flex-1 p-6 bg-[#F8F9FA] overflow-auto">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main Calendar Section */}
            <div className="lg:w-3/4">
              {/* Calendar Controls */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-4">
                    <h2 className="text-xl font-semibold">
                      {viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </h2>
                    <div className="flex space-x-2">
                      <button 
                        className="p-1 rounded-full hover:bg-gray-100"
                        onClick={() => navigateMonth('prev')}
                      >
                        <i className="ri-arrow-left-s-line"></i>
                      </button>
                      <button 
                        className="p-1 rounded-full hover:bg-gray-100"
                        onClick={() => navigateMonth('next')}
                      >
                        <i className="ri-arrow-right-s-line"></i>
                      </button>
                      <button 
                        className="ml-2 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
                        onClick={goToToday}
                      >
                        Today
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="flex p-0.5 bg-gray-100 rounded-md">
                      <button 
                        className={cn(
                          "px-3 py-1 text-sm rounded-md",
                          viewMode === "month" ? "bg-white shadow-sm" : "hover:bg-gray-200"
                        )}
                        onClick={() => setViewMode("month")}
                      >
                        Month
                      </button>
                      <button 
                        className={cn(
                          "px-3 py-1 text-sm rounded-md",
                          viewMode === "week" ? "bg-white shadow-sm" : "hover:bg-gray-200"
                        )}
                        onClick={() => setViewMode("week")}
                      >
                        Week
                      </button>
                      <button 
                        className={cn(
                          "px-3 py-1 text-sm rounded-md",
                          viewMode === "day" ? "bg-white shadow-sm" : "hover:bg-gray-200"
                        )}
                        onClick={() => setViewMode("day")}
                      >
                        Day
                      </button>
                      <button 
                        className={cn(
                          "px-3 py-1 text-sm rounded-md",
                          viewMode === "agenda" ? "bg-white shadow-sm" : "hover:bg-gray-200"
                        )}
                        onClick={() => setViewMode("agenda")}
                      >
                        Agenda
                      </button>
                    </div>
                    
                    <button 
                      className="px-3 py-1.5 bg-primary text-white rounded-md text-sm flex items-center"
                      onClick={() => setShowEventModal(true)}
                    >
                      <i className="ri-add-line mr-1"></i>
                      <span>Add Event</span>
                    </button>
                  </div>
                </div>
                
                {/* Month Legend */}
                <div className="flex justify-end space-x-4 mb-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                    <span className="text-xs text-gray-600">Training</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-purple-500 mr-1"></div>
                    <span className="text-xs text-gray-600">Assessment</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                    <span className="text-xs text-gray-600">Meeting</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                    <span className="text-xs text-gray-600">Deadline</span>
                  </div>
                </div>
                
                {/* Filter options */}
                <div className="flex space-x-2 mb-2">
                  <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-sm rounded-md flex items-center">
                    <i className="ri-filter-line mr-1"></i>
                    <span>Filter</span>
                  </button>
                  <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-sm rounded-md">
                    All Events
                  </button>
                  <button className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-md">
                    Training
                  </button>
                  <button className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-md">
                    Assessment
                  </button>
                  <button className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-md">
                    Meeting
                  </button>
                  <button className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded-md">
                    Deadline
                  </button>
                </div>
              </div>
              
              {/* Month View Calendar */}
              {viewMode === "month" && (
                <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                  {/* Days of the week */}
                  <div className="grid grid-cols-7 border-b">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, i) => (
                      <div key={i} className="py-2 text-center text-sm font-medium text-gray-600">
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  {/* Calendar days */}
                  <div className="grid grid-cols-7 auto-rows-[minmax(100px,_1fr)]">
                    {currentViewDays.map((day, index) => {
                      // Check if this day is in the current month
                      const isCurrentMonth = day.getMonth() === viewDate.getMonth();
                      
                      // Check if this is today
                      const isToday = day.toDateString() === new Date().toDateString();
                      
                      // Check if this is the selected date
                      const isSelected = selectedDate && day.toDateString() === selectedDate.toDateString();
                      
                      // Get events for this day
                      const dayEvents = getEventsForDay(day);
                      
                      return (
                        <div 
                          key={index} 
                          className={cn(
                            "border p-1 relative",
                            !isCurrentMonth && "bg-gray-50 text-gray-400",
                            isToday && "bg-blue-50",
                            isSelected && "ring-2 ring-primary ring-inset"
                          )}
                          onClick={() => setSelectedDate(day)}
                        >
                          <div className="text-right mb-1">
                            <span 
                              className={cn(
                                "inline-block w-6 h-6 rounded-full text-sm leading-6 text-center",
                                isToday ? "bg-primary text-white" : "text-gray-700"
                              )}
                            >
                              {day.getDate()}
                            </span>
                          </div>
                          
                          {/* Event indicators */}
                          {renderEventIndicators(day)}
                          
                          {/* First 2 events for the day */}
                          <div className="space-y-1 mt-1 text-xs overflow-hidden max-h-[60px]">
                            {dayEvents.slice(0, 2).map((event, i) => (
                              <div 
                                key={i}
                                className={cn(
                                  "px-1 py-0.5 truncate border-l-2",
                                  getEventColor(event.type)
                                )}
                              >
                                {event.isAllDay ? 'All day: ' : `${event.startTime}: `}
                                {event.title}
                              </div>
                            ))}
                            
                            {/* More indicator if there are more events */}
                            {dayEvents.length > 2 && (
                              <div className="text-xs text-gray-500 px-1">
                                +{dayEvents.length - 2} more
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {/* Week View */}
              {viewMode === "week" && (
                <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                  <div className="grid grid-cols-8 border-b">
                    <div className="py-3 text-center text-sm font-medium text-gray-600 border-r">
                      Time
                    </div>
                    {Array.from({ length: 7 }).map((_, i) => {
                      const day = new Date(viewDate);
                      day.setDate(viewDate.getDate() - viewDate.getDay() + i);
                      const isToday = day.toDateString() === new Date().toDateString();
                      
                      return (
                        <div 
                          key={i} 
                          className={cn(
                            "py-3 text-center text-sm border-r last:border-r-0",
                            isToday ? "bg-blue-50 font-semibold" : "font-medium text-gray-600"
                          )}
                        >
                          <div>{day.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                          <div className={cn(
                            "w-7 h-7 rounded-full inline-flex items-center justify-center mt-1",
                            isToday ? "bg-primary text-white" : ""
                          )}>
                            {day.getDate()}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Time slots */}
                  <div className="max-h-[600px] overflow-y-auto">
                    {Array.from({ length: 12 }).map((_, hour) => (
                      <div key={hour} className="grid grid-cols-8 border-b last:border-b-0">
                        <div className="py-4 px-2 text-right text-xs text-gray-500 border-r">
                          {(hour + 8) % 12 || 12}:00 {hour + 8 < 12 ? 'AM' : 'PM'}
                        </div>
                        
                        {Array.from({ length: 7 }).map((_, day) => (
                          <div key={day} className="py-2 px-1 border-r last:border-r-0 relative min-h-[60px]">
                            {/* Placeholder for events */}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Day View */}
              {viewMode === "day" && (
                <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                  <div className="py-4 px-6 border-b">
                    <h3 className="font-semibold">
                      {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) || 
                       today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </h3>
                  </div>
                  
                  {/* Time slots */}
                  <div className="max-h-[600px] overflow-y-auto">
                    {Array.from({ length: 12 }).map((_, hour) => (
                      <div key={hour} className="grid grid-cols-12 border-b last:border-b-0">
                        <div className="col-span-1 py-4 px-2 text-right text-xs text-gray-500 border-r">
                          {(hour + 8) % 12 || 12}:00 {hour + 8 < 12 ? 'AM' : 'PM'}
                        </div>
                        
                        <div className="col-span-11 py-2 px-3 relative min-h-[60px]">
                          {/* Placeholder for events */}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Agenda View */}
              {viewMode === "agenda" && (
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="border-b py-3 px-6">
                    <h3 className="font-semibold">Upcoming Events</h3>
                  </div>
                  
                  <div className="divide-y">
                    {currentMonthEvents.map((event, index) => {
                      const eventDate = new Date(event.date);
                      
                      return (
                        <div key={index} className="p-4 flex">
                          <div className="w-16 mr-4 text-center">
                            <div className="text-sm font-medium">
                              {eventDate.toLocaleDateString('en-US', { day: 'numeric' })}
                            </div>
                            <div className="text-xs text-gray-500">
                              {eventDate.toLocaleDateString('en-US', { weekday: 'short' })}
                            </div>
                          </div>
                          
                          <div className={cn(
                            "flex-1 p-3 rounded-md border-l-4",
                            event.type === 'training' ? "border-blue-500 bg-blue-50" :
                            event.type === 'assessment' ? "border-purple-500 bg-purple-50" :
                            event.type === 'meeting' ? "border-green-500 bg-green-50" :
                            "border-red-500 bg-red-50"
                          )}>
                            <div className="flex justify-between">
                              <h4 className="font-medium">{event.title}</h4>
                              <div className="text-sm">
                                {event.isAllDay ? 'All day' : `${event.startTime} - ${event.endTime}`}
                              </div>
                            </div>
                            
                            {event.description && (
                              <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                            )}
                            
                            <div className="flex items-center mt-2 text-sm text-gray-500">
                              {event.location && (
                                <div className="flex items-center mr-4">
                                  <i className="ri-map-pin-line mr-1"></i>
                                  <span>{event.location}</span>
                                </div>
                              )}
                              
                              {event.organizer && (
                                <div className="flex items-center">
                                  <i className="ri-user-line mr-1"></i>
                                  <span>{event.organizer}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    
                    {currentMonthEvents.length === 0 && (
                      <div className="p-12 text-center">
                        <i className="ri-calendar-line text-5xl text-gray-300 mb-4"></i>
                        <h3 className="text-xl font-medium mb-2">No events found</h3>
                        <p className="text-gray-medium mb-6">
                          There are no events scheduled for this month.
                        </p>
                        <button 
                          className="px-4 py-2 bg-primary text-white rounded-md text-sm"
                          onClick={() => setShowEventModal(true)}
                        >
                          Add Event
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-1/4">
              {/* Mini Calendar */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="text-center mb-4">
                  <h3 className="font-medium">
                    {viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </h3>
                </div>
                
                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                  {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                    <div key={i} className="text-xs text-gray-500">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-1 text-center">
                  {currentViewDays.map((day, index) => {
                    // Check if this day is in the current month
                    const isCurrentMonth = day.getMonth() === viewDate.getMonth();
                    
                    // Check if this is today
                    const isToday = day.toDateString() === new Date().toDateString();
                    
                    // Check if this is the selected date
                    const isSelected = selectedDate && day.toDateString() === selectedDate.toDateString();
                    
                    // Check if there are events on this day
                    const hasEvents = getEventsForDay(day).length > 0;
                    
                    return (
                      <div key={index} className="relative">
                        <button 
                          className={cn(
                            "w-7 h-7 rounded-full text-xs leading-6 inline-flex items-center justify-center",
                            !isCurrentMonth && "text-gray-300",
                            isToday && !isSelected && "bg-blue-100 text-blue-700",
                            isSelected && "bg-primary text-white",
                            hasEvents && !isSelected && !isToday && "font-bold",
                            "hover:bg-gray-100"
                          )}
                          onClick={() => setSelectedDate(day)}
                        >
                          {day.getDate()}
                        </button>
                        {hasEvents && !isSelected && (
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-primary"></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Upcoming Events */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="border-b py-3 px-4">
                  <h3 className="font-semibold">Upcoming Events</h3>
                </div>
                
                <div className="divide-y">
                  {upcomingEvents.map((event, index) => {
                    const eventDate = new Date(event.date);
                    
                    return (
                      <div key={index} className="p-3 hover:bg-gray-50">
                        <div className="flex items-start">
                          <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center mr-3",
                            event.type === 'training' ? "bg-blue-100 text-blue-700" :
                            event.type === 'assessment' ? "bg-purple-100 text-purple-700" :
                            event.type === 'meeting' ? "bg-green-100 text-green-700" :
                            "bg-red-100 text-red-700"
                          )}>
                            <i className={
                              event.type === 'training' ? "ri-vidicon-line" :
                              event.type === 'assessment' ? "ri-checkbox-multiple-line" :
                              event.type === 'meeting' ? "ri-team-line" :
                              "ri-alarm-warning-line"
                            }></i>
                          </div>
                          
                          <div className="flex-1">
                            <h4 className="font-medium text-sm line-clamp-1">{event.title}</h4>
                            <div className="text-xs text-gray-500 mt-0.5">
                              {eventDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                              {!event.isAllDay && ` • ${event.startTime} - ${event.endTime}`}
                            </div>
                            {event.location && (
                              <div className="text-xs text-gray-500 mt-0.5 flex items-center">
                                <i className="ri-map-pin-line mr-1"></i>
                                <span>{event.location}</span>
                              </div>
                            )}
                          </div>
                          
                          <button className="text-gray-400 hover:text-gray-600">
                            <i className="ri-more-2-fill"></i>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  
                  {upcomingEvents.length === 0 && (
                    <div className="p-6 text-center">
                      <p className="text-gray-500">No upcoming events</p>
                    </div>
                  )}
                </div>
                
                <div className="border-t p-3 text-center">
                  <button className="text-sm text-primary font-medium">
                    View All Events
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}