export interface User {
  id: string;
  name: string;
  email: string;
}

export interface MarketData {
  symbol: string;
  price: number;
  open: number;
  high: number;
  low: number;
  volume: number;
  change: number;
  changePercent: number;
  lastUpdated: string;
}

export interface Symbol {
  id: string;
  name: string;
}

export interface ChartDataPoint {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}