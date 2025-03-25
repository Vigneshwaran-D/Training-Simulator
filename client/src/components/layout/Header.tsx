import { User } from "@/lib/data";

interface HeaderProps {
  title: string;
  user: User;
  onMenuClick: () => void;
}

export default function Header({ title, user, onMenuClick }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      <div className="flex items-center">
        <button
          type="button"
          className="md:hidden mr-3 text-gray-medium"
          onClick={onMenuClick}
        >
          <i className="ri-menu-line text-xl"></i>
        </button>
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      
      <div className="flex items-center space-x-4">
        <button type="button" className="text-gray-medium hover:text-dark">
          <i className="ri-notification-3-line text-xl"></i>
        </button>
        <button type="button" className="text-gray-medium hover:text-dark">
          <i className="ri-search-line text-xl"></i>
        </button>
        
        <div className="flex items-center">
          {user.avatar ? (
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-medium">
              {user.initials}
            </div>
          )}
          <span className="ml-2 font-medium hidden md:inline-block">{user.name}</span>
        </div>
      </div>
    </header>
  );
}
