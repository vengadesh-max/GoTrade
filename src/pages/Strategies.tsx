import React, { useState } from 'react';
import { Plus, Filter, Search, MoreVertical, Edit, Trash2, Copy, Play, Pause } from 'lucide-react';
import { formatPercentage } from '../utils/formatters';

interface Strategy {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'draft';
  performance: number;
  symbols: string[];
  createdAt: string;
}

const Strategies: React.FC = () => {
  const [strategies, setStrategies] = useState<Strategy[]>([
    {
      id: '1',
      name: 'BTC Momentum',
      description: 'Uses EMA crossovers to detect momentum shifts in Bitcoin',
      status: 'active',
      performance: 12.5,
      symbols: ['BTC-USD'],
      createdAt: '2025-03-15',
    },
    {
      id: '2',
      name: 'ETH MACD Crossover',
      description: 'MACD indicator for ETH price movement prediction',
      status: 'active',
      performance: -2.8,
      symbols: ['ETH-USD'],
      createdAt: '2025-03-20',
    },
    {
      id: '3',
      name: 'RSI Oversold Tech Stocks',
      description: 'Identifies oversold tech stocks using RSI<30',
      status: 'draft',
      performance: 0,
      symbols: ['AAPL', 'MSFT', 'GOOGL'],
      createdAt: '2025-04-01',
    },
    {
      id: '4',
      name: 'Daily Mean Reversion',
      description: 'Trades on daily price deviations from the 20-day moving average',
      status: 'paused',
      performance: 5.4,
      symbols: ['SPY', 'QQQ'],
      createdAt: '2025-03-10',
    },
  ]);
  
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  const toggleDropdown = (id: string) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };
  
  const toggleStrategyStatus = (id: string) => {
    setStrategies(
      strategies.map((strategy) => {
        if (strategy.id === id) {
          const newStatus = strategy.status === 'active' ? 'paused' : 
                           (strategy.status === 'paused' ? 'active' : strategy.status);
          return { ...strategy, status: newStatus };
        }
        return strategy;
      })
    );
    setActiveDropdown(null);
  };
  
  const duplicateStrategy = (id: string) => {
    const strategyToDuplicate = strategies.find((s) => s.id === id);
    if (strategyToDuplicate) {
      const newStrategy = {
        ...strategyToDuplicate,
        id: Date.now().toString(),
        name: `${strategyToDuplicate.name} (Copy)`,
        status: 'draft' as const,
        performance: 0,
      };
      setStrategies([...strategies, newStrategy]);
    }
    setActiveDropdown(null);
  };
  
  const deleteStrategy = (id: string) => {
    setStrategies(strategies.filter((strategy) => strategy.id !== id));
    setActiveDropdown(null);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Trading Strategies</h1>
        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-md flex items-center">
          <Plus size={16} className="mr-2" />
          Create Strategy
        </button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative w-full sm:w-96">
            <input
              type="text"
              placeholder="Search strategies..."
              className="w-full px-4 py-2 pl-10 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-100"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center">
              <Filter size={16} className="mr-2" />
              Filter
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Strategy</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Performance</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Assets</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Created</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {strategies.map((strategy) => (
                <tr key={strategy.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{strategy.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{strategy.description}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        strategy.status === 'active'
                          ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400'
                          : strategy.status === 'paused'
                          ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                      }`}
                    >
                      {strategy.status.charAt(0).toUpperCase() + strategy.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {strategy.status === 'draft' ? (
                      <span className="text-sm text-gray-500 dark:text-gray-400">—</span>
                    ) : (
                      <span
                        className={`text-sm font-medium ${
                          strategy.performance > 0
                            ? 'text-green-600 dark:text-green-400'
                            : strategy.performance < 0
                            ? 'text-red-600 dark:text-red-400'
                            : 'text-gray-500 dark:text-gray-400'
                        }`}
                      >
                        {formatPercentage(strategy.performance)}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {strategy.symbols.map((symbol) => (
                        <span
                          key={symbol}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400"
                        >
                          {symbol}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {strategy.createdAt}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                    <button
                      onClick={() => toggleDropdown(strategy.id)}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      <MoreVertical size={18} />
                    </button>
                    
                    {activeDropdown === strategy.id && (
                      <div className="absolute right-8 top-10 z-10 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700">
                        <div className="py-1">
                          <button
                            onClick={() => toggleStrategyStatus(strategy.id)}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            {strategy.status === 'active' ? (
                              <>
                                <Pause size={16} className="mr-2" />
                                Pause Strategy
                              </>
                            ) : (
                              <>
                                <Play size={16} className="mr-2" />
                                Activate Strategy
                              </>
                            )}
                          </button>
                          <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                            <Edit size={16} className="mr-2" />
                            Edit
                          </button>
                          <button
                            onClick={() => duplicateStrategy(strategy.id)}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <Copy size={16} className="mr-2" />
                            Duplicate
                          </button>
                          <button
                            onClick={() => deleteStrategy(strategy.id)}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <Trash2 size={16} className="mr-2" />
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
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

export default Strategies;