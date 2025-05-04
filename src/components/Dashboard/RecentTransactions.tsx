import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

interface Transaction {
  id: string;
  type: 'buy' | 'sell';
  symbol: string;
  amount: number;
  price: number;
  date: string;
}

const RecentTransactions: React.FC = () => {
  const transactions: Transaction[] = [
    { id: '1', type: 'buy', symbol: 'BTC', amount: 0.05, price: 43250.75, date: '2025-04-22 09:32' },
    { id: '2', type: 'sell', symbol: 'ETH', amount: 1.2, price: 2351.18, date: '2025-04-21 15:48' },
    { id: '3', type: 'buy', symbol: 'AAPL', amount: 10, price: 175.32, date: '2025-04-20 11:23' },
    { id: '4', type: 'buy', symbol: 'ETH', amount: 0.8, price: 2340.65, date: '2025-04-19 10:15' },
    { id: '5', type: 'sell', symbol: 'MSFT', amount: 5, price: 321.45, date: '2025-04-18 14:57' },
  ];
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow h-full">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Transactions</h2>
      </div>
      <div className="overflow-y-auto" style={{ maxHeight: '352px' }}>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {transactions.map((transaction) => (
            <li key={transaction.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${transaction.type === 'buy' ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'}`}>
                    {transaction.type === 'buy' ? (
                      <ArrowDown size={16} className="text-green-600 dark:text-green-400" />
                    ) : (
                      <ArrowUp size={16} className="text-red-600 dark:text-red-400" />
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {transaction.type === 'buy' ? 'Bought' : 'Sold'} {transaction.amount} {transaction.symbol}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {formatCurrency(transaction.price * transaction.amount)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    @ {formatCurrency(transaction.price)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button className="w-full text-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
          View All Transactions
        </button>
      </div>
    </div>
  );
};

export default RecentTransactions;