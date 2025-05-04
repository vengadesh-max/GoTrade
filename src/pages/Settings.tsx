import React, { useState } from 'react';
import { User, Mail, Lock, Bell, CreditCard, Plus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import Payment from './Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';




const Settings: React.FC = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  
  const [activeTab, setActiveTab] = useState('profile');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  
  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={16} /> },
    { id: 'security', label: 'Security', icon: <Lock size={16} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={16} /> },
    { id: 'billing', label: 'Billing & Payments', icon: <CreditCard size={16} /> },
  ];
  const handlePayment = () => {
    if (!paymentEmail || !paymentAmount) {
      alert('Please fill in both fields.');
      return;
    }
  
    // Simulated payment success
    alert(`You have successfully paid ₹${paymentAmount}. Confirmation sent to ${paymentEmail}.`);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Settings</h1>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="md:flex border-b border-gray-200 dark:border-gray-700">
          <div className="md:w-64 border-r border-gray-200 dark:border-gray-700">
            <nav className="p-4 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === tab.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="mr-3">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="flex-1 p-6">
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Profile Settings</h2>
                
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold mr-4">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{user?.name || 'User'}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email || 'user@example.com'}</p>
                  </div>
                </div>
                
                <form className="space-y-6">
                  <div>
                    <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullname"
                      defaultValue={user?.name || ''}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      defaultValue={user?.email || ''}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Timezone
                    </label>
                    <select
                      id="timezone"
                      defaultValue="UTC"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="UTC">UTC</option>
                      <option value="EST">Eastern Time (EST)</option>
                      <option value="CST">Central Time (CST)</option>
                      <option value="MST">Mountain Time (MST)</option>
                      <option value="PST">Pacific Time (PST)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={theme === 'dark'}
                        onChange={toggleTheme}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Dark Mode
                      </span>
                    </label>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-md"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {activeTab === 'security' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Security Settings</h2>
                
                <form className="space-y-6">
                  <div>
                    <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="current-password"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="new-password"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirm-password"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-md"
                    >
                      Update Password
                    </button>
                  </div>
                </form>
                
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-md font-medium text-gray-900 dark:text-white mb-4">Two-Factor Authentication</h3>
                  
                  <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 rounded-md">
                    <Plus size={16} className="mr-2" />
                    Enable 2FA
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Notification Preferences</h2>
                
                <div className="space-y-4">
                  <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                    <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">Email Notifications</h3>
                    
                    <div className="space-y-2">
                      <label className="flex items-center justify-between">
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          Trading alerts
                        </span>
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </label>
                      
                      <label className="flex items-center justify-between">
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          Strategy updates
                        </span>
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </label>
                      
                      <label className="flex items-center justify-between">
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          Account activity
                        </span>
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </label>
                      
                      <label className="flex items-center justify-between">
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          Marketing emails
                        </span>
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </label>
                    </div>
                  </div>
                  
                  <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                    <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">Push Notifications</h3>
                    
                    <div className="space-y-2">
                      <label className="flex items-center justify-between">
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          Trading alerts
                        </span>
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </label>
                      
                      <label className="flex items-center justify-between">
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          Strategy updates
                        </span>
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </label>
                      
                      <label className="flex items-center justify-between">
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          Account activity
                        </span>
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <button
                      type="button"
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-md"
                    >
                      Save Preferences
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'billing' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Billing & Payments</h2>
                
                <div className="mb-8">
                  <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">Current Plan</h3>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-md font-medium text-gray-900 dark:text-white">Free Plan</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Basic algorithmic trading features</p>
                      </div>
                      <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-md">
                        Upgrade
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">Payment Methods</h3>

                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">No payment methods added yet.</p>
                  </div>
                {/* Dropdown for selecting payment method */}
                <div className="mt-3 mb-4">
                    <label htmlFor="payment-method" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                      Select Payment Method
                    </label>
                    <select
                      id="payment-method"
                      value={selectedPaymentMethod}
                      onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">Choose an option</option>
                      <option value="gpay">Google Pay</option>
                      <option value="phonepe">PhonePe</option>
                      <option value="paytm">Paytm</option>
                    </select>
                </div>
                  <Payment />
                </div>

                
                <div>
                  <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">Billing History</h3>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">No billing history available.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;