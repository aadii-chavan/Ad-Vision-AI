import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Calendar, 
  User, 
  CheckSquare, 
  MessageCircle, 
  Zap,
  ChevronDown
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  hasDropdown?: boolean;
  onClick?: () => void;
  to?: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, hasDropdown, onClick, to }) => {
  const location = useLocation();
  const isActive = to ? location.pathname.startsWith(to) : false;

  const content = (
    <div className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-300 group ${
      isActive
        ? 'bg-accent text-accent-foreground'
        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer'
    }`}>
      <div className="flex items-center space-x-3">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="flex items-center space-x-2">
        {hasDropdown && <ChevronDown className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />}
      </div>
    </div>
  );

  if (to) {
    return (
      <Link to={to} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <div onClick={onClick} role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined}>
      {content}
    </div>
  );
};

const DashboardSidebar: React.FC = () => {
  return (
    <div className="w-64 glass border-r border-border/50 flex flex-col">
      {/* Navigation */}
      <div className="flex-1 py-6">
        {/* MENU Section */}
        <div className="px-4 mb-8">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-2">
            MENU
          </h3>
          <div className="space-y-2">
            <SidebarItem 
              icon={<LayoutDashboard className="w-5 h-5" />} 
              label="Home" 
              hasDropdown={true}
              to="/dashboard"
            />
            <SidebarItem 
              icon={<ShoppingCart className="w-5 h-5" />} 
              label="Competitor Ads" 
              hasDropdown={true}
              to="/competitor-ads"
            />
            <SidebarItem 
              icon={<Calendar className="w-5 h-5" />} 
              label="Analytics" 
              hasDropdown={true}
              to="/analytics"
            />
            <SidebarItem 
              icon={<User className="w-5 h-5" />} 
              label="Smart Insights" 
              hasDropdown={true}
              to="/smart-insights"
            />
            <SidebarItem 
              icon={<CheckSquare className="w-5 h-5" />} 
              label="Campaign Creation" 
              hasDropdown={true}
              to="/campaign-creation"
            />
            {/* Removed: Forms, Tables, Pages */}
          </div>
        </div>

        {/* SUPPORT Section */}
        <div className="px-4 mb-8">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-2">
            SUPPORT
          </h3>
          <div className="space-y-2">
            <SidebarItem 
              icon={<MessageCircle className="w-5 h-5" />} 
              label="Chat" 
              hasDropdown={true}
              to="/chat"
            />
            {/* Removed: Support Ticket, Email */}
          </div>
        </div>

        {/* OTHERS Section */}
        <div className="px-4 mb-8">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-2">
            OTHERS
          </h3>
          <div className="space-y-2">
            {/* Removed: Charts, UI Elements */}
            <SidebarItem 
              icon={<Zap className="w-5 h-5" />} 
              label="Profile" 
              hasDropdown={true}
            />
          </div>
        </div>
      </div>

      {/* Footer removed as requested */}
    </div>
  );
};

export default DashboardSidebar;
