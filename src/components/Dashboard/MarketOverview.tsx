import React from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

interface MarketOverviewItemProps {
  title: string;
  value: string;
  change: number;
  period: string;
}

const MarketOverviewItem: React.FC<MarketOverviewItemProps> = ({ title, value, change, period }) => {
  const isPositive = change >= 0;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <DollarSign size={16} className="text-gray-400" />
      </div>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
      <div className={`flex items-center mt-2 ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
        {isPositive ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
        <span className="text-sm font-medium">{formatPercentage(change)}</span>
        <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">{period}</span>
      </div>
    </div>
  );
};

const MarketOverview: React.FC = () => {
  const marketItems = [
    { title: 'NIFTY 50', value: formatCurrency(19850.75), change: 1.34, period: 'Today' },
    { title: 'SENSEX', value: formatCurrency(65351.18), change: 0.98, period: 'Today' },
    { title: 'Bank NIFTY', value: '44,153.02', change: 0.78, period: 'Today' },
    { title: 'India VIX', value: '14.76', change: -0.45, period: 'Today' },
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {marketItems.map((item, index) => (
        <MarketOverviewItem
          key={index}
          title={item.title}
          value={item.value}
          change={item.change}
          period={item.period}
        />
      ))}
    </div>
  );
};

export default MarketOverview;