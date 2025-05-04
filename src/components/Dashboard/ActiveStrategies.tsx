import React from 'react';
import { Play, Pause, BarChart } from 'lucide-react';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

interface Strategy {
  id: string;
  name: string;
  status: 'active' | 'paused';
  profit: number;
  profitPercentage: number;
  positions: number;
  symbol: string;
}

const ActiveStrategies: React.FC = () => {
  const strategies: Strategy[] = [
    { id: '1', name: 'HDFC Momentum', status: 'active', profit: 32575, profitPercentage: 2.3, positions: 2, symbol: 'HDFC' },
    { id: '2', name: 'Reliance MACD', status: 'active', profit: -12050, profitPercentage: -0.8, positions: 1, symbol: 'RELIANCE' },
    { id: '3', name: 'IT Sector RSI', status: 'paused', profit: 56025, profitPercentage: 4.2, positions: 0, symbol: 'INFY, TCS' },
  ];
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Active Strategies</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Strategy</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">P/L</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Positions</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {strategies.map((strategy) => (
              <tr key={strategy.id}>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{strategy.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{strategy.symbol}</div>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      strategy.status === 'active'
                        ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                    }`}
                  >
                    {strategy.status === 'active' ? 'Active' : 'Paused'}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className={`text-sm font-medium ${strategy.profit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {formatCurrency(strategy.profit)}
                  </div>
                  <div className={`text-xs ${strategy.profitPercentage >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {formatPercentage(strategy.profitPercentage)}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {strategy.positions}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                  <button 
                    className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => {
                      // Toggle strategy status
                      console.log(`Toggle strategy ${strategy.id}`);
                    }}
                  >
                    {strategy.status === 'active' ? (
                      <Pause size={18} className="text-gray-600 dark:text-gray-300" />
                    ) : (
                      <Play size={18} className="text-gray-600 dark:text-gray-300" />
                    )}
                  </button>
                  <button 
                    className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => {
                      // View strategy details
                      console.log(`View strategy ${strategy.id}`);
                    }}
                  >
                    <BarChart size={18} className="text-gray-600 dark:text-gray-300" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveStrategies;