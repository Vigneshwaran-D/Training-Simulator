import { useState } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { currentUser } from "@/lib/data";
import { cn } from "@/lib/utils";

// Setting types
type SettingsCategory = "profile" | "account" | "notifications" | "appearance" | "privacy";

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  channels: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}

interface PrivacySetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

interface ThemeSetting {
  id: string;
  name: string;
  value: string;
  current: boolean;
}

interface LanguageSetting {
  code: string;
  name: string;
  current: boolean;
}

// Sample data for notification settings
const notificationSettings: NotificationSetting[] = [
  {
    id: "training-reminders",
    title: "Training Reminders",
    description: "Receive reminders about upcoming training sessions and deadlines",
    enabled: true,
    channels: {
      email: true,
      push: true,
      sms: false
    }
  },
  {
    id: "assessment-notifications",
    title: "Assessment Notifications",
    description: "Get notified when new assessments are available or when results are published",
    enabled: true,
    channels: {
      email: true,
      push: true,
      sms: true
    }
  },
  {
    id: "achievement-alerts",
    title: "Achievement Alerts",
    description: "Notifications when you earn new badges or certificates",
    enabled: true,
    channels: {
      email: false,
      push: true,
      sms: false
    }
  },
  {
    id: "progress-updates",
    title: "Progress Updates",
    description: "Weekly summaries of your training progress and achievements",
    enabled: false,
    channels: {
      email: true,
      push: false,
      sms: false
    }
  },
  {
    id: "system-announcements",
    title: "System Announcements",
    description: "Important updates about the training platform and new features",
    enabled: true,
    channels: {
      email: true,
      push: false,
      sms: false
    }
  }
];

// Sample data for privacy settings
const privacySettings: PrivacySetting[] = [
  {
    id: "progress-visibility",
    title: "Progress Visibility",
    description: "Allow other team members to see your training progress",
    enabled: true
  },
  {
    id: "achievements-visibility",
    title: "Achievements Visibility",
    description: "Share your earned badges and certificates on your public profile",
    enabled: true
  },
  {
    id: "leaderboard-participation",
    title: "Leaderboard Participation",
    description: "Include your ranking on team and department leaderboards",
    enabled: true
  },
  {
    id: "activity-tracking",
    title: "Activity Tracking",
    description: "Allow the system to track your learning patterns to provide personalized recommendations",
    enabled: false
  },
  {
    id: "usage-analytics",
    title: "Usage Analytics",
    description: "Share anonymized usage data to help improve the training platform",
    enabled: true
  }
];

// Sample data for theme settings
const themeSettings: ThemeSetting[] = [
  {
    id: "light",
    name: "Light",
    value: "light",
    current: true
  },
  {
    id: "dark",
    name: "Dark",
    value: "dark",
    current: false
  },
  {
    id: "system",
    name: "System",
    value: "system",
    current: false
  }
];

// Sample data for language settings
const languageSettings: LanguageSetting[] = [
  {
    code: "en",
    name: "English",
    current: true
  },
  {
    code: "es",
    name: "Español",
    current: false
  },
  {
    code: "fr",
    name: "Français",
    current: false
  },
  {
    code: "de",
    name: "Deutsch",
    current: false
  },
  {
    code: "zh",
    name: "中文",
    current: false
  },
  {
    code: "ja",
    name: "日本語",
    current: false
  }
];

export default function Settings() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<SettingsCategory>("profile");
  
  // Form states
  const [profileFormData, setProfileFormData] = useState({
    firstName: currentUser.name.split(' ')[0],
    lastName: currentUser.name.split(' ')[1] || '',
    email: "user@example.com",
    jobTitle: "Security Specialist",
    department: "Information Security",
    bio: "Experienced security professional with a focus on training and compliance."
  });
  
  const [accountFormData, setAccountFormData] = useState({
    username: "user123",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  const [notificationConfig, setNotificationConfig] = useState(notificationSettings);
  const [privacyConfig, setPrivacyConfig] = useState(privacySettings);
  const [themeConfig, setThemeConfig] = useState(themeSettings);
  const [languageConfig, setLanguageConfig] = useState(languageSettings);
  
  // Handle notification toggle
  const toggleNotification = (id: string, field: "enabled" | "email" | "push" | "sms") => {
    setNotificationConfig(prev => prev.map(setting => {
      if (setting.id === id) {
        if (field === "enabled") {
          return { ...setting, enabled: !setting.enabled };
        } else {
          return {
            ...setting,
            channels: {
              ...setting.channels,
              [field]: !setting.channels[field as keyof typeof setting.channels]
            }
          };
        }
      }
      return setting;
    }));
  };
  
  // Handle privacy toggle
  const togglePrivacy = (id: string) => {
    setPrivacyConfig(prev => prev.map(setting => {
      if (setting.id === id) {
        return { ...setting, enabled: !setting.enabled };
      }
      return setting;
    }));
  };
  
  // Handle theme change
  const changeTheme = (id: string) => {
    setThemeConfig(prev => prev.map(theme => ({
      ...theme,
      current: theme.id === id
    })));
  };
  
  // Handle language change
  const changeLanguage = (code: string) => {
    setLanguageConfig(prev => prev.map(lang => ({
      ...lang,
      current: lang.code === code
    })));
  };
  
  return (
    <div className="min-h-screen flex bg-[#F8F9FA] font-inter text-dark">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col">
        <Header 
          title="Settings" 
          user={currentUser} 
          onMenuClick={() => setSidebarOpen(true)} 
        />
        
        <main className="flex-1 p-6 bg-[#F8F9FA] overflow-auto">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Settings</h1>
            
            <div className="flex flex-col md:flex-row gap-6">
              {/* Settings Navigation */}
              <div className="md:w-64 space-y-1">
                <button 
                  className={cn(
                    "w-full text-left px-4 py-2 rounded-md flex items-center",
                    activeCategory === "profile" 
                      ? "bg-primary text-white" 
                      : "hover:bg-gray-100"
                  )}
                  onClick={() => setActiveCategory("profile")}
                >
                  <i className="ri-user-3-line mr-2"></i>
                  <span>Profile</span>
                </button>
                
                <button 
                  className={cn(
                    "w-full text-left px-4 py-2 rounded-md flex items-center",
                    activeCategory === "account" 
                      ? "bg-primary text-white" 
                      : "hover:bg-gray-100"
                  )}
                  onClick={() => setActiveCategory("account")}
                >
                  <i className="ri-lock-line mr-2"></i>
                  <span>Account & Security</span>
                </button>
                
                <button 
                  className={cn(
                    "w-full text-left px-4 py-2 rounded-md flex items-center",
                    activeCategory === "notifications" 
                      ? "bg-primary text-white" 
                      : "hover:bg-gray-100"
                  )}
                  onClick={() => setActiveCategory("notifications")}
                >
                  <i className="ri-notification-4-line mr-2"></i>
                  <span>Notifications</span>
                </button>
                
                <button 
                  className={cn(
                    "w-full text-left px-4 py-2 rounded-md flex items-center",
                    activeCategory === "appearance" 
                      ? "bg-primary text-white" 
                      : "hover:bg-gray-100"
                  )}
                  onClick={() => setActiveCategory("appearance")}
                >
                  <i className="ri-palette-line mr-2"></i>
                  <span>Appearance</span>
                </button>
                
                <button 
                  className={cn(
                    "w-full text-left px-4 py-2 rounded-md flex items-center",
                    activeCategory === "privacy" 
                      ? "bg-primary text-white" 
                      : "hover:bg-gray-100"
                  )}
                  onClick={() => setActiveCategory("privacy")}
                >
                  <i className="ri-shield-check-line mr-2"></i>
                  <span>Privacy</span>
                </button>
              </div>
              
              {/* Settings Content */}
              <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
                {/* Profile Settings */}
                {activeCategory === "profile" && (
                  <div>
                    <h2 className="text-xl font-semibold mb-6">Profile Settings</h2>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo</label>
                      <div className="flex items-center">
                        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 mr-4">
                          {currentUser.initials}
                        </div>
                        <div>
                          <button className="px-3 py-1.5 bg-primary text-white rounded-md text-sm">
                            Change Photo
                          </button>
                          <p className="text-xs text-gray-medium mt-1">
                            JPG, PNG or GIF. Max size 2MB.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <input 
                          type="text" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                          value={profileFormData.firstName}
                          onChange={e => setProfileFormData({...profileFormData, firstName: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input 
                          type="text" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                          value={profileFormData.lastName}
                          onChange={e => setProfileFormData({...profileFormData, lastName: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input 
                          type="email" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                          value={profileFormData.email}
                          onChange={e => setProfileFormData({...profileFormData, email: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                        <input 
                          type="text" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                          value={profileFormData.jobTitle}
                          onChange={e => setProfileFormData({...profileFormData, jobTitle: e.target.value})}
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                        <select 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          value={profileFormData.department}
                          onChange={e => setProfileFormData({...profileFormData, department: e.target.value})}
                        >
                          <option>Information Security</option>
                          <option>IT Operations</option>
                          <option>Customer Service</option>
                          <option>Human Resources</option>
                          <option>Finance</option>
                        </select>
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                        <textarea 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md h-24" 
                          value={profileFormData.bio}
                          onChange={e => setProfileFormData({...profileFormData, bio: e.target.value})}
                        ></textarea>
                      </div>
                    </div>
                    
                    <div className="border-t pt-6 flex justify-end">
                      <button className="px-4 py-2 bg-primary text-white rounded-md text-sm">
                        Save Changes
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Account Settings */}
                {activeCategory === "account" && (
                  <div>
                    <h2 className="text-xl font-semibold mb-6">Account & Security</h2>
                    
                    <div className="mb-8">
                      <h3 className="text-lg font-medium mb-4">Login Information</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                          <input 
                            type="text" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                            value={accountFormData.username}
                            onChange={e => setAccountFormData({...accountFormData, username: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-8">
                      <h3 className="text-lg font-medium mb-4">Change Password</h3>
                      
                      <div className="grid grid-cols-1 gap-4 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                          <input 
                            type="password" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                            value={accountFormData.currentPassword}
                            onChange={e => setAccountFormData({...accountFormData, currentPassword: e.target.value})}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                          <input 
                            type="password" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                            value={accountFormData.newPassword}
                            onChange={e => setAccountFormData({...accountFormData, newPassword: e.target.value})}
                          />
                          <p className="text-xs text-gray-medium mt-1">
                            Password must be at least 8 characters and include a number and special character.
                          </p>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                          <input 
                            type="password" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                            value={accountFormData.confirmPassword}
                            onChange={e => setAccountFormData({...accountFormData, confirmPassword: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-8">
                      <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
                      
                      <div className="p-4 bg-gray-50 rounded-md mb-4">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input 
                              id="tfa" 
                              type="checkbox" 
                              className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="tfa" className="font-medium text-gray-700">Enable Two-Factor Authentication</label>
                            <p className="text-gray-500">
                              Add an extra layer of security to your account by requiring a verification code in addition to your password.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <button className="px-4 py-2 border border-gray-300 rounded-md text-sm">
                        Set Up Two-Factor Authentication
                      </button>
                    </div>
                    
                    <div className="mb-8">
                      <h3 className="text-lg font-medium mb-4">Session Management</h3>
                      
                      <div className="bg-gray-50 rounded-md p-4 mb-4">
                        <h4 className="font-medium mb-2">Current Session</h4>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm">Desktop - Chrome</p>
                            <p className="text-xs text-gray-500">Started 2 hours ago</p>
                          </div>
                          <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                            Active Now
                          </span>
                        </div>
                      </div>
                      
                      <button className="px-4 py-2 border border-gray-300 rounded-md text-sm text-red-600">
                        Log Out of All Other Sessions
                      </button>
                    </div>
                    
                    <div className="border-t pt-6 flex justify-end">
                      <button className="px-4 py-2 bg-primary text-white rounded-md text-sm">
                        Save Changes
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Notification Settings */}
                {activeCategory === "notifications" && (
                  <div>
                    <h2 className="text-xl font-semibold mb-6">Notification Settings</h2>
                    
                    <div className="mb-6">
                      <div className="grid grid-cols-[auto,1fr,auto,auto,auto] gap-4 items-center mb-4 font-medium text-sm">
                        <div></div>
                        <div>Notification</div>
                        <div className="text-center">Email</div>
                        <div className="text-center">Push</div>
                        <div className="text-center">SMS</div>
                      </div>
                      
                      <div className="divide-y">
                        {notificationConfig.map((setting) => (
                          <div key={setting.id} className="py-4 grid grid-cols-[auto,1fr,auto,auto,auto] gap-4 items-center">
                            <div>
                              <div className="relative inline-block w-10 align-middle select-none">
                                <input 
                                  type="checkbox" 
                                  id={`toggle-${setting.id}`} 
                                  className="sr-only peer"
                                  checked={setting.enabled}
                                  onChange={() => toggleNotification(setting.id, "enabled")}
                                />
                                <label 
                                  htmlFor={`toggle-${setting.id}`}
                                  className="block h-6 overflow-hidden bg-gray-200 rounded-full cursor-pointer peer-checked:bg-primary"
                                >
                                  <span className="absolute inset-y-0 left-0 w-6 h-6 bg-white rounded-full shadow transform transition-transform duration-300 ease-in-out peer-checked:translate-x-4"></span>
                                </label>
                              </div>
                            </div>
                            
                            <div>
                              <label htmlFor={`toggle-${setting.id}`} className="font-medium cursor-pointer">
                                {setting.title}
                              </label>
                              <p className="text-xs text-gray-500">{setting.description}</p>
                            </div>
                            
                            <div className="text-center">
                              <input 
                                type="checkbox" 
                                className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                                checked={setting.channels.email}
                                disabled={!setting.enabled}
                                onChange={() => toggleNotification(setting.id, "email")}
                              />
                            </div>
                            
                            <div className="text-center">
                              <input 
                                type="checkbox" 
                                className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                                checked={setting.channels.push}
                                disabled={!setting.enabled}
                                onChange={() => toggleNotification(setting.id, "push")}
                              />
                            </div>
                            
                            <div className="text-center">
                              <input 
                                type="checkbox" 
                                className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                                checked={setting.channels.sms}
                                disabled={!setting.enabled}
                                onChange={() => toggleNotification(setting.id, "sms")}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="border-t pt-6 flex justify-end">
                      <button className="px-4 py-2 bg-primary text-white rounded-md text-sm">
                        Save Changes
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Appearance Settings */}
                {activeCategory === "appearance" && (
                  <div>
                    <h2 className="text-xl font-semibold mb-6">Appearance Settings</h2>
                    
                    <div className="mb-8">
                      <h3 className="text-lg font-medium mb-4">Theme</h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        {themeConfig.map((theme) => (
                          <div 
                            key={theme.id}
                            className={cn(
                              "border rounded-md p-4 cursor-pointer",
                              theme.current ? "border-primary ring-1 ring-primary" : "border-gray-200 hover:border-gray-300"
                            )}
                            onClick={() => changeTheme(theme.id)}
                          >
                            <div className="flex justify-between items-center mb-3">
                              <div className="font-medium">{theme.name}</div>
                              {theme.current && (
                                <div className="text-primary">
                                  <i className="ri-check-line"></i>
                                </div>
                              )}
                            </div>
                            
                            <div className={cn(
                              "h-20 rounded-md",
                              theme.id === "light" ? "bg-white border border-gray-200" : 
                              theme.id === "dark" ? "bg-gray-800" : 
                              "bg-gradient-to-r from-gray-100 to-gray-800"
                            )}>
                              <div className={cn(
                                "h-6 rounded-t-md",
                                theme.id === "light" ? "bg-gray-100" : 
                                theme.id === "dark" ? "bg-gray-900" : 
                                "bg-gradient-to-r from-gray-200 to-gray-900"
                              )}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-8">
                      <h3 className="text-lg font-medium mb-4">Language</h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        {languageConfig.map((language) => (
                          <div 
                            key={language.code}
                            className={cn(
                              "border rounded-md p-4 cursor-pointer",
                              language.current ? "border-primary ring-1 ring-primary" : "border-gray-200 hover:border-gray-300"
                            )}
                            onClick={() => changeLanguage(language.code)}
                          >
                            <div className="flex justify-between items-center">
                              <div className="font-medium">{language.name}</div>
                              {language.current && (
                                <div className="text-primary">
                                  <i className="ri-check-line"></i>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-8">
                      <h3 className="text-lg font-medium mb-4">Text Size</h3>
                      
                      <div className="w-full max-w-md">
                        <input 
                          type="range" 
                          min="1" 
                          max="3" 
                          step="1" 
                          defaultValue="2"
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>Small</span>
                          <span>Medium</span>
                          <span>Large</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t pt-6 flex justify-end">
                      <button className="px-4 py-2 bg-primary text-white rounded-md text-sm">
                        Save Changes
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Privacy Settings */}
                {activeCategory === "privacy" && (
                  <div>
                    <h2 className="text-xl font-semibold mb-6">Privacy Settings</h2>
                    
                    <div className="mb-8">
                      <div className="space-y-4">
                        {privacyConfig.map((setting) => (
                          <div key={setting.id} className="p-4 bg-gray-50 rounded-md">
                            <div className="flex items-start">
                              <div className="flex items-center h-5">
                                <input 
                                  id={`privacy-${setting.id}`} 
                                  type="checkbox" 
                                  className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                                  checked={setting.enabled}
                                  onChange={() => togglePrivacy(setting.id)}
                                />
                              </div>
                              <div className="ml-3 text-sm">
                                <label htmlFor={`privacy-${setting.id}`} className="font-medium text-gray-700">
                                  {setting.title}
                                </label>
                                <p className="text-gray-500">
                                  {setting.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-8">
                      <h3 className="text-lg font-medium mb-4">Data Management</h3>
                      
                      <div className="space-y-4">
                        <button className="px-4 py-2 border border-gray-300 rounded-md text-sm flex items-center">
                          <i className="ri-download-line mr-2"></i>
                          <span>Download Your Data</span>
                        </button>
                        
                        <button className="px-4 py-2 border border-red-300 text-red-600 rounded-md text-sm flex items-center">
                          <i className="ri-delete-bin-line mr-2"></i>
                          <span>Delete Account</span>
                        </button>
                      </div>
                    </div>
                    
                    <div className="border-t pt-6 flex justify-end">
                      <button className="px-4 py-2 bg-primary text-white rounded-md text-sm">
                        Save Changes
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}