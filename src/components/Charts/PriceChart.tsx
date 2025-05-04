import React, { useEffect, useRef } from 'react';
import { createChart, ColorType } from 'lightweight-charts';
import { useTheme } from '../../contexts/ThemeContext';

interface PriceChartProps {
  data: {
    time: string;
    open: number;
    high: number;
    low: number;
    close: number;
  }[];
  symbol: string;
}

const PriceChart: React.FC<PriceChartProps> = ({ data, symbol }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const chartRef = useRef<any>(null);
  
  useEffect(() => {
    if (chartContainerRef.current && data.length > 0) {
      const isDarkTheme = theme === 'dark';
      
      // Clear the container first
      chartContainerRef.current.innerHTML = '';
      
      // Initialize the chart
      const chart = createChart(chartContainerRef.current, {
        layout: {
          background: { type: ColorType.Solid, color: isDarkTheme ? '#1F2937' : '#FFFFFF' },
          textColor: isDarkTheme ? '#D1D5DB' : '#1F2937',
        },
        grid: {
          vertLines: { color: isDarkTheme ? '#374151' : '#E5E7EB' },
          horzLines: { color: isDarkTheme ? '#374151' : '#E5E7EB' },
        },
        width: chartContainerRef.current.clientWidth,
        height: 400,
        timeScale: {
          timeVisible: true,
          secondsVisible: false,
        },
      });
      
      // Create the candlestick series
      const candleSeries = chart.addCandlestickSeries({
        upColor: '#10B981',
        downColor: '#EF4444',
        borderUpColor: '#10B981',
        borderDownColor: '#EF4444',
        wickUpColor: '#10B981',
        wickDownColor: '#EF4444',
      });
      
      // Set the data
      candleSeries.setData(data);
      
      // Fit the chart content
      chart.timeScale().fitContent();
      
      // Handle window resize
      const handleResize = () => {
        if (chartContainerRef.current) {
          chart.applyOptions({ width: chartContainerRef.current.clientWidth });
        }
      };
      
      window.addEventListener('resize', handleResize);
      
      chartRef.current = chart;
      
      return () => {
        window.removeEventListener('resize', handleResize);
        chart.remove();
      };
    }
  }, [data, theme]);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{symbol}</h3>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-xs font-medium rounded bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">1D</button>
          <button className="px-3 py-1 text-xs font-medium rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">1W</button>
          <button className="px-3 py-1 text-xs font-medium rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">1M</button>
          <button className="px-3 py-1 text-xs font-medium rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">1Y</button>
        </div>
      </div>
      <div ref={chartContainerRef} className="w-full h-[400px]" />
    </div>
  );
};

export default PriceChart;