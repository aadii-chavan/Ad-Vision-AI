import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Calendar, ChevronDown } from 'lucide-react';

const data = [
  { month: 'Jan', overview: 120, sales: 180, revenue: 150 },
  { month: 'Feb', overview: 200, sales: 220, revenue: 180 },
  { month: 'Mar', overview: 150, sales: 160, revenue: 140 },
  { month: 'Apr', overview: 280, sales: 300, revenue: 250 },
  { month: 'May', overview: 220, sales: 240, revenue: 200 },
  { month: 'Jun', overview: 180, sales: 200, revenue: 170 },
  { month: 'Jul', overview: 250, sales: 280, revenue: 230 },
  { month: 'Aug', overview: 300, sales: 320, revenue: 280 },
  { month: 'Sep', overview: 240, sales: 260, revenue: 220 },
  { month: 'Oct', overview: 320, sales: 350, revenue: 300 },
  { month: 'Nov', overview: 280, sales: 300, revenue: 260 },
  { month: 'Dec', overview: 350, sales: 380, revenue: 320 },
];

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'sales', label: 'Sales' },
  { id: 'revenue', label: 'Revenue' }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass border border-border/50 rounded-lg p-3 shadow-lg">
        <p className="text-foreground font-medium">{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const StatisticsChart: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const getChartData = () => {
    return data.map(item => ({
      month: item.month,
      value: item[activeTab as keyof typeof item]
    }));
  };

  return (
    <div className="service-card group">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Statistics</h3>
          <p className="text-muted-foreground text-sm">Target you've set for each month.</p>
        </div>
        
        {/* Date Range Selector */}
        <div className="flex items-center space-x-2 bg-accent rounded-lg px-3 py-2 border border-border/30">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="text-foreground text-sm">Aug 16, 2025 - Aug 22, 2025</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={getChartData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              domain={[0, 250]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fill="url(#colorGradient)"
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Gradient definition for the area fill */}
      <svg style={{ height: 0 }}>
        <defs>
          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default StatisticsChart;
