import React, { useState } from 'react';
import PriceChart from '../components/Charts/PriceChart';
import { mockChartData } from '../mockData/chartData';
import { Calendar, Download, Settings } from 'lucide-react';
import { formatCurrency, formatPercentage } from '../utils/formatters';

const Backtesting: React.FC = () => {
  const [selectedStrategy, setSelectedStrategy] = useState('BTC Momentum');
  const [dateRange, setDateRange] = useState('3 Months');
  
  // Sample backtest results
  const backtestResults = {
    totalReturns: 18.5,
    maxDrawdown: -9.2,
    sharpeRatio: 1.8,
    winRate: 68,
    tradesCount: 42,
    profitFactor: 2.3,
    startingBalance: 10000,
    endingBalance: 11850,
  };
  
  const strategies = [
    'BTC Momentum',
    'ETH MACD Crossover',
    'RSI Oversold Tech Stocks',
    'Daily Mean Reversion',
  ];
  
  const dateRanges = [
    '1 Month',
    '3 Months',
    '6 Months',
    '1 Year',
    'Max',
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Backtesting</h1>
        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-md flex items-center">
          <Settings size={16} className="mr-2" />
          Configure Backtest
        </button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="strategy" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Strategy
            </label>
            <select
              id="strategy"
              value={selectedStrategy}
              onChange={(e) => setSelectedStrategy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm"
            >
              {strategies.map((strategy) => (
                <option key={strategy} value={strategy}>
                  {strategy}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Time Period
            </label>
            <div className="relative">
              <select
                id="dateRange"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-3 py-2 pl-9 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm"
              >
                {dateRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Calendar size={16} className="text-gray-400" />
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Actions
            </label>
            <button className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-sm flex items-center justify-center">
              <Download size={16} className="mr-2" />
              Export Results
            </button>
          </div>
        </div>
        
        <div className="mb-6">
          <PriceChart data={mockChartData} symbol="BTC/USD" />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Return</p>
            <p className={`text-xl font-semibold ${backtestResults.totalReturns >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {formatPercentage(backtestResults.totalReturns)}
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Max Drawdown</p>
            <p className="text-xl font-semibold text-red-600 dark:text-red-400">
              {formatPercentage(backtestResults.maxDrawdown)}
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Sharpe Ratio</p>
            <p className="text-xl font-semibold text-gray-900 dark:text-white">
              {backtestResults.sharpeRatio.toFixed(2)}
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Win Rate</p>
            <p className="text-xl font-semibold text-gray-900 dark:text-white">
              {backtestResults.winRate}%
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Starting Balance</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {formatCurrency(backtestResults.startingBalance)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Ending Balance</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {formatCurrency(backtestResults.endingBalance)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Net Profit</span>
              <span className={`text-sm font-medium ${backtestResults.endingBalance - backtestResults.startingBalance >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {formatCurrency(backtestResults.endingBalance - backtestResults.startingBalance)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Total Trades</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{backtestResults.tradesCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Profit Factor</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{backtestResults.profitFactor.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Trade Distribution</h3>
          <div className="h-48 flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm italic">
              Detailed trade distribution chart will appear here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Backtesting;