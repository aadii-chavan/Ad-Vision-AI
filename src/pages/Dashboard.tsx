import React from 'react';
import Navbar from '@/components/Navbar';
import DashboardSidebar from '@/components/DashboardSidebar';
import MetricCards from '@/components/MetricCards';
import MonthlyTargetCard from '@/components/MonthlyTargetCard';
import MonthlySalesChart from '@/components/MonthlySalesChart';
import StatisticsChart from '@/components/StatisticsChart';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 grid-bg opacity-20"></div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5"></div>
      
      {/* Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      
      {/* Navbar - Fixed at top */}
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <Navbar />
      </div>
      
      {/* Sidebar - Fixed height with scroll */}
      <div className="fixed left-0 top-0 h-screen z-[90] pt-20">
        <div className="h-full overflow-y-auto">
          <DashboardSidebar />
        </div>
      </div>
      
      {/* Main Content - Scrollable area */}
      <div className="flex-1 ml-64 pt-20 relative z-10">
        <div className="h-full overflow-y-auto">
          <main className="p-6">
            {/* Top Row - Metric Cards and Monthly Target */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Metric Cards - Takes 2 columns */}
              <div className="lg:col-span-2">
                <MetricCards />
              </div>
              
              {/* Monthly Target Card - Takes 1 column */}
              <div className="lg:col-span-1">
                <MonthlyTargetCard />
              </div>
            </div>
            
            {/* Bottom Row - Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MonthlySalesChart />
              <StatisticsChart />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


