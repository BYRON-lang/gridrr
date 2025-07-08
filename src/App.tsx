import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DiscoverPage from './pages/DiscoverPage';
import SettingsPage from './pages/SettingsPage';
import ProtectedRoute from './components/ProtectedRoute';
import { QueryProvider } from './contexts/QueryProvider';
import PostsPage from './pages/PostsPage';
import PublicRoute from './components/PublicRoute';
import ProfilePage from './pages/ProfilePage';
import CreatePostPage from './pages/CreatePostPage';
import PostPage from './pages/PostPage';
import { Helmet, HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Gridrr - Where Great Design Meets Great Minds</title>
        <meta name="description" content="Gridrr connects designers and innovators to share, discover, and collaborate on world-class creative work." />
        <meta property="og:title" content="Gridrr - Where Great Design Meets Great Minds" />
        <meta property="og:description" content="Gridrr connects designers and innovators to share, discover, and collaborate on world-class creative work." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gridrr.com/" />
        <meta property="og:image" content="/logo512.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Gridrr - Where Great Design Meets Great Minds" />
        <meta name="twitter:description" content="Gridrr connects designers and innovators to share, discover, and collaborate on world-class creative work." />
        <meta name="twitter:image" content="/logo512.png" />
      </Helmet>
      <QueryProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<PublicRoute><HomePage /></PublicRoute>} />
              <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
              <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />
              <Route 
                path="/discover" 
                element={
                  <ProtectedRoute>
                    <DiscoverPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <ProtectedRoute>
                    <SettingsPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/posts" 
                element={
                  <ProtectedRoute>
                    <PostsPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/create-post" 
                element={
                  <ProtectedRoute>
                    <CreatePostPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/post/:id" 
                element={
                  <ProtectedRoute>
                    <PostPage />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </QueryProvider>
    </HelmetProvider>
  );
}

export default App;
