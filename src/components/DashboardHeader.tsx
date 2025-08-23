import React from 'react';
import { 
  Menu, 
  Search, 
  Sun, 
  Bell, 
  ChevronDown 
} from 'lucide-react';

const DashboardHeader: React.FC = () => {
  return (
    <div className="bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Hamburger menu */}
        <button className="text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-800 transition-colors">
          <Menu className="w-6 h-6" />
        </button>

        {/* Right side - Search and User */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search or type command..."
              className="pl-10 pr-20 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <kbd className="px-2 py-1 text-xs font-semibold text-gray-400 bg-gray-700 border border-gray-600 rounded">
                ⌘K
              </kbd>
            </div>
          </div>

          {/* Theme Toggle */}
          <button className="text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-800 transition-colors">
            <Sun className="w-5 h-5" />
          </button>

          {/* Notifications */}
          <button className="text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-800 transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">M</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-white text-sm font-medium">Musharof</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
