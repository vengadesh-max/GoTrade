import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { MarketDataProvider } from './contexts/MarketDataContext';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Strategies from './pages/Strategies';
import Backtesting from './pages/Backtesting';
import Portfolio from './pages/Portfolio';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/Auth/ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MarketDataProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route index element={<Dashboard />} />
              <Route path="strategies" element={<Strategies />} />
              <Route path="backtesting" element={<Backtesting />} />
              <Route path="portfolio" element={<Portfolio />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </MarketDataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;