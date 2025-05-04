import React, { useState } from 'react';
import { BarChart, DollarSign, TrendingUp, TrendingDown, PieChart, Calendar } from 'lucide-react';
import { formatCurrency, formatPercentage } from '../utils/formatters';

const Portfolio: React.FC = () => {
  const [timeRange, setTimeRange] = useState('1W');
  
  const portfolioOverview = {
    totalValue: 25786.42,
    unrealizedPL: 1254.38,
    unrealizedPLPercent: 5.12,
    allocationByAsset: [
      { name: 'BTC', value: 40 },
      { name: 'ETH', value: 25 },
      { name: 'Stocks', value: 20 },
      { name: 'Stablecoins', value: 15 },
    ],
  };
  
  const openPositions = [
    { 
      id: '1', 
      symbol: 'BTC-USD', 
      quantity: 0.42, 
      entryPrice: 41250.50, 
      currentPrice: 43250.75,
      marketValue: 18165.32,
      unrealizedPL: 840.11,
      unrealizedPLPercent: 4.85,
    },
    { 
      id: '2', 
      symbol: 'ETH-USD', 
      quantity: 2.8, 
      entryPrice: 2280.75, 
      currentPrice: 2351.18,
      marketValue: 6583.30,
      unrealizedPL: 197.21,
      unrealizedPLPercent: 3.09,
    },
    { 
      id: '3', 
      symbol: 'AAPL', 
      quantity: 15, 
      entryPrice: 169.45, 
      currentPrice: 175.32,
      marketValue: 2629.80,
      unrealizedPL: 88.05,
      unrealizedPLPercent: 3.46,
    },
    { 
      id: '4', 
      symbol: 'USDC', 
      quantity: 3500, 
      entryPrice: 1, 
      currentPrice: 1,
      marketValue: 3500,
      unrealizedPL: 0,
      unrealizedPLPercent: 0,
    },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Portfolio</h1>
        <div className="flex items-center space-x-2">
          <div className="bg-white dark:bg-gray-800 rounded-md shadow border border-gray-200 dark:border-gray-700 flex">
            {['1D', '1W', '1M', '3M', 'YTD', 'ALL'].map((range) => (
              <button
                key={range}
                className={`px-3 py-1.5 text-xs font-medium ${
                  timeRange === range
                    ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setTimeRange(range)}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Portfolio Value</p>
            <DollarSign size={16} className="text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(portfolioOverview.totalValue)}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">Unrealized P/L</p>
            {portfolioOverview.unrealizedPL >= 0 ? (
              <TrendingUp size={16} className="text-green-500" />
            ) : (
              <TrendingDown size={16} className="text-red-500" />
            )}
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(portfolioOverview.unrealizedPL)}</p>
          <p className={`text-sm ${portfolioOverview.unrealizedPLPercent >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {formatPercentage(portfolioOverview.unrealizedPLPercent)}
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">Asset Allocation</p>
            <PieChart size={16} className="text-gray-400" />
          </div>
          <div className="flex items-center space-x-1 h-8">
            {portfolioOverview.allocationByAsset.map((asset, index) => (
              <div 
                key={asset.name}
                className="h-full rounded" 
                style={{ 
                  width: `${asset.value}%`, 
                  backgroundColor: [
                    'rgb(59, 130, 246)', // blue
                    'rgb(16, 185, 129)', // green
                    'rgb(249, 115, 22)', // orange
                    'rgb(139, 92, 246)', // purple
                  ][index % 4] 
                }}
                title={`${asset.name}: ${asset.value}%`}
              />
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {portfolioOverview.allocationByAsset.map((asset, index) => (
              <div key={asset.name} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-1" 
                  style={{ 
                    backgroundColor: [
                      'rgb(59, 130, 246)', // blue
                      'rgb(16, 185, 129)', // green
                      'rgb(249, 115, 22)', // orange
                      'rgb(139, 92, 246)', // purple
                    ][index % 4] 
                  }}
                />
                <span className="text-xs text-gray-600 dark:text-gray-300">{asset.name} {asset.value}%</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">Performance</p>
            <BarChart size={16} className="text-gray-400" />
          </div>
          <div className="h-9 bg-gray-100 dark:bg-gray-700 rounded-md relative overflow-hidden">
            <div 
              className={`absolute inset-y-0 left-0 ${portfolioOverview.unrealizedPLPercent >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
              style={{ width: `${Math.min(Math.abs(portfolioOverview.unrealizedPLPercent) * 5, 100)}%` }}
            ></div>
          </div>
          <div className="mt-2 flex justify-between items-center">
            <div className="flex items-center">
              <Calendar size={16} className="text-gray-400 mr-1" />
              <span className="text-xs text-gray-600 dark:text-gray-300">{timeRange}</span>
            </div>
            <span className={`text-xs font-medium ${portfolioOverview.unrealizedPLPercent >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {formatPercentage(portfolioOverview.unrealizedPLPercent)}
            </span>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Open Positions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Symbol</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Quantity</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Entry Price</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Current Price</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Market Value</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Unrealized P/L</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {openPositions.map((position) => (
                <tr key={position.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{position.symbol}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-right">
                    {position.quantity}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-right">
                    {formatCurrency(position.entryPrice)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-right">
                    {formatCurrency(position.currentPrice)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-right">
                    {formatCurrency(position.marketValue)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right">
                    <div className={`text-sm font-medium ${position.unrealizedPL >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {formatCurrency(position.unrealizedPL)}
                    </div>
                    <div className={`text-xs ${position.unrealizedPLPercent >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {formatPercentage(position.unrealizedPLPercent)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;