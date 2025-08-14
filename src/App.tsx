import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';

// Pages
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { DataInput } from './pages/DataInput';
import { Goals } from './pages/Goals';
import { Leaderboard } from './pages/Leaderboard';
import { CommunityTips } from './pages/CommunityTips';
import { Chat } from './pages/Chat';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Navigation />
                <main className="flex-1">
                  <Dashboard />
                </main>
                <Footer />
              </ProtectedRoute>
            } />
            
            <Route path="/input" element={
              <ProtectedRoute>
                <Navigation />
                <main className="flex-1">
                  <DataInput />
                </main>
                <Footer />
              </ProtectedRoute>
            } />
            
            <Route path="/goals" element={
              <ProtectedRoute>
                <Navigation />
                <main className="flex-1">
                  <Goals />
                </main>
                <Footer />
              </ProtectedRoute>
            } />
            
            <Route path="/leaderboard" element={
              <ProtectedRoute>
                <Navigation />
                <main className="flex-1">
                  <Leaderboard />
                </main>
                <Footer />
              </ProtectedRoute>
            } />
            
            <Route path="/community" element={
              <ProtectedRoute>
                <Navigation />
                <main className="flex-1">
                  <CommunityTips />
                </main>
                <Footer />
              </ProtectedRoute>
            } />

            <Route path="/chat" element={
              <ProtectedRoute>
                <Navigation />
                <main className="flex-1">
                  <Chat />
                </main>
                <Footer />
              </ProtectedRoute>
            } />
            
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;