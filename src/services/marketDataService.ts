import { MarketData } from '../types';
import { mockChartData } from '../mockData/chartData';

// Mock market data service - would connect to your Golang backend
export const fetchMarketData = async (symbol: string): Promise<MarketData> => {
  // In a real app, this would make a fetch/axios call to your API
  return new Promise((resolve) => {
    setTimeout(() => {
      const lastCandle = mockChartData[mockChartData.length - 1];
      
      resolve({
        symbol,
        price: lastCandle.close,
        open: lastCandle.open,
        high: lastCandle.high,
        low: lastCandle.low,
        volume: Math.floor(Math.random() * 10000000),
        change: lastCandle.close - mockChartData[mockChartData.length - 2].close,
        changePercent: ((lastCandle.close - mockChartData[mockChartData.length - 2].close) / mockChartData[mockChartData.length - 2].close) * 100,
        lastUpdated: new Date().toISOString(),
      });
    }, 500);
  });
};

// This would be a WebSocket connection in a real application
export const subscribeToMarketData = (callback: (data: MarketData) => void) => {
  let interval = setInterval(() => {
    const lastCandle = mockChartData[mockChartData.length - 1];
    const randomChange = (Math.random() - 0.5) * 100;
    const newPrice = lastCandle.close + randomChange;
    
    callback({
      symbol: 'BTC-USD',
      price: newPrice,
      open: lastCandle.open,
      high: Math.max(lastCandle.high, newPrice),
      low: Math.min(lastCandle.low, newPrice),
      volume: Math.floor(Math.random() * 10000000),
      change: randomChange,
      changePercent: (randomChange / lastCandle.close) * 100,
      lastUpdated: new Date().toISOString(),
    });
  }, 5000);
  
  return () => clearInterval(interval);
};