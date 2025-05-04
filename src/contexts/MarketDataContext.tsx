import React, { createContext, useContext, useState, useEffect } from 'react';
import { MarketData, Symbol } from '../types';
import { fetchMarketData, subscribeToMarketData } from '../services/marketDataService';

interface MarketDataContextType {
  marketData: MarketData | null;
  symbols: Symbol[];
  selectedSymbol: Symbol | null;
  isLoading: boolean;
  error: string | null;
  selectSymbol: (symbol: Symbol) => void;
}

const MarketDataContext = createContext<MarketDataContextType | undefined>(undefined);

export const useMarketData = () => {
  const context = useContext(MarketDataContext);
  if (!context) {
    throw new Error('useMarketData must be used within a MarketDataProvider');
  }
  return context;
};

export const MarketDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [symbols, setSymbols] = useState<Symbol[]>([]);
  const [selectedSymbol, setSelectedSymbol] = useState<Symbol | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize with some default symbols for demo
    const defaultSymbols: Symbol[] = [
      { id: 'BTC-USD', name: 'Bitcoin / USD' },
      { id: 'ETH-USD', name: 'Ethereum / USD' },
      { id: 'AAPL', name: 'Apple Inc.' },
      { id: 'MSFT', name: 'Microsoft Corporation' },
      { id: 'GOOGL', name: 'Alphabet Inc.' },
    ];
    
    setSymbols(defaultSymbols);
    setSelectedSymbol(defaultSymbols[0]);
    
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMarketData(defaultSymbols[0].id);
        setMarketData(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch market data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
    
    // Subscribe to real-time updates
    const unsubscribe = subscribeToMarketData((data) => {
      setMarketData((prevData) => {
        if (!prevData) return data;
        return {
          ...prevData,
          price: data.price,
          change: data.change,
          changePercent: data.changePercent,
          volume: data.volume,
          lastUpdated: data.lastUpdated,
        };
      });
    });
    
    return () => unsubscribe();
  }, []);
  
  useEffect(() => {
    if (selectedSymbol) {
      setIsLoading(true);
      fetchMarketData(selectedSymbol.id)
        .then((data) => {
          setMarketData(data);
          setError(null);
        })
        .catch((err) => {
          setError('Failed to fetch market data');
          console.error(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [selectedSymbol]);
  
  const selectSymbol = (symbol: Symbol) => {
    setSelectedSymbol(symbol);
  };
  
  return (
    <MarketDataContext.Provider
      value={{
        marketData,
        symbols,
        selectedSymbol,
        isLoading,
        error,
        selectSymbol,
      }}
    >
      {children}
    </MarketDataContext.Provider>
  );
};