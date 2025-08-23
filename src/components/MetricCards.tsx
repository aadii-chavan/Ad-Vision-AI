import React from 'react';
import { TrendingUp, TrendingDown, Users, ShoppingBag } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, isPositive, icon }) => (
  <div className="service-card group">
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-all duration-300">
        {icon}
      </div>
      <div className={`flex items-center space-x-1 text-sm font-medium ${
        isPositive ? 'text-green-500' : 'text-red-500'
      }`}>
        {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
        <span>{change}</span>
      </div>
    </div>
    
    <h3 className="text-muted-foreground text-sm font-medium mb-1">{title}</h3>
    <p className="text-2xl font-bold text-foreground">{value}</p>
  </div>
);

const MetricCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <MetricCard
        title="Customers"
        value="3,782"
        change="↑ 11.01%"
        isPositive={true}
        icon={<Users className="w-6 h-6 text-primary" />}
      />
      <MetricCard
        title="Orders"
        value="5,359"
        change="↓ 9.05%"
        isPositive={false}
        icon={<ShoppingBag className="w-6 h-6 text-primary" />}
      />
    </div>
  );
};

export default MetricCards;
