import { cn } from "@/lib/utils";
import { Link, useLocation } from "wouter";

interface SidebarItem {
  icon: string;
  label: string;
  path: string;
}

const sidebarItems: SidebarItem[] = [
  { icon: "ri-dashboard-line", label: "Dashboard", path: "/" },
  { icon: "ri-user-line", label: "User Profile", path: "/profile" },
  { icon: "ri-vidicon-line", label: "Simulation", path: "/simulation" },
  { icon: "ri-graduation-cap-line", label: "Courses", path: "/courses" },
  { icon: "ri-book-mark-line", label: "Library", path: "/library" },
  { icon: "ri-file-chart-line", label: "Reports", path: "/reports" },
  { icon: "ri-medal-line", label: "Achievements", path: "/achievements" },
  { icon: "ri-calendar-event-line", label: "Calendar", path: "/calendar" },
  { icon: "ri-settings-3-line", label: "Settings", path: "/settings" },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [location] = useLocation();

  return (
    <aside
      className={cn(
        "w-64 bg-white border-r border-gray-200 shadow-sm h-screen",
        "fixed top-0 left-0 z-30 md:relative transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}
    >
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold flex items-center">
          <span className="text-primary">Training</span>&nbsp;Simulator
        </h1>
      </div>
      
      <div className="py-4">
        <ul>
          {sidebarItems.map((item) => (
            <li key={item.label}>
              <Link 
                href={item.path}
                className={cn(
                  "flex items-center px-6 py-3 text-sm font-medium",
                  location === item.path 
                    ? "bg-[#e0e4f8] text-primary border-l-3 border-primary" 
                    : "text-gray-medium hover:bg-gray-100"
                )}
                onClick={() => {
                  if (isOpen) onClose();
                }}
              >
                <i className={`${item.icon} mr-3 text-xl`}></i>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mt-auto p-4 border-t border-gray-200">
        <a href="#" className="flex items-center px-2 py-2 text-sm font-medium text-gray-medium hover:bg-gray-100 rounded-md">
          <i className="ri-logout-box-line mr-3 text-xl"></i>
          <span>Logout</span>
        </a>
      </div>
    </aside>
  );
}
