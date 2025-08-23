import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', sales: 120 },
  { month: 'Feb', sales: 280 },
  { month: 'Mar', sales: 180 },
  { month: 'Apr', sales: 320 },
  { month: 'May', sales: 200 },
  { month: 'Jun', sales: 150 },
  { month: 'Jul', sales: 220 },
  { month: 'Aug', sales: 180 },
  { month: 'Sep', sales: 250 },
  { month: 'Oct', sales: 350 },
  { month: 'Nov', sales: 280 },
  { month: 'Dec', sales: 300 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass border border-border/50 rounded-lg p-3 shadow-lg">
        <p className="text-foreground font-medium">{`${label}`}</p>
        <p className="text-primary">{`Sales: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const MonthlySalesChart: React.FC = () => {
  return (
    <div className="service-card group">
      <h3 className="text-lg font-semibold text-foreground mb-6">Monthly Sales</h3>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              domain={[0, 400]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="sales" 
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlySalesChart;
