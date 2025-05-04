import React from 'react';
import MarketOverview from '../components/Dashboard/MarketOverview';
import ActiveStrategies from '../components/Dashboard/ActiveStrategies';
import PriceChart from '../components/Charts/PriceChart';
import RecentTransactions from '../components/Dashboard/RecentTransactions';
import { mockChartData } from '../mockData/chartData';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
        <div className="flex items-center space-x-2">
         
        </div>
      </div>
      
      <MarketOverview />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PriceChart data={mockChartData} symbol="BTC/USD" />
        </div>
        <div>
          <RecentTransactions />
        </div>
      </div>
      
      <ActiveStrategies />
    </div>
  );
};

export default Dashboard;