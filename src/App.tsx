import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { QueryProvider } from './contexts/QueryProvider';
import PublicRoute from './components/PublicRoute';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ToastProvider } from './contexts/ToastContext';
import CookiesPopup from './components/CookiesPopup';
import NewestPage from './pages/NewestPage';
import TagPage from './pages/TagPage';
import SearchPage from './pages/SearchPage';
import LoadingSpinner from './components/loaders/LoadingSpinner';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { getGeoInfo, recordAnalytics, AnalyticsData } from './services/analytics';

// Lazy imports after all other imports
const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const DiscoverPage = lazy(() => import('./pages/DiscoverPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const PostsPage = lazy(() => import('./pages/PostsPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const CreatePostPage = lazy(() => import('./pages/CreatePostPage'));
const PostPage = lazy(() => import('./pages/PostPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const CookiesPage = lazy(() => import('./pages/CookiesPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const AdsPage = lazy(() => import('./pages/AdsPage'));
const ResourcesPage = lazy(() => import('./pages/ResourcesPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const CareersPage = lazy(() => import('./pages/CareersPage'));
const SupportPage = lazy(() => import('./pages/SupportPage'));
const TrendingPage = lazy(() => import('./pages/TrendingPage'));
const PublicProfilePage = lazy(() => import('./pages/PublicProfilePage'));

function App() {
  return (
    <>
    <HelmetProvider>
      <ToastProvider>
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
        <CookiesPopup />
        <div className="App">
          <Suspense fallback={<div className="w-full min-h-screen flex items-center justify-center"><LoadingSpinner /></div>}>
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
              element={<PostPage />} 
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/ads" element={<AdsPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/cookies" element={<CookiesPage />} />
            <Route path="/trending" element={<TrendingPage />} />
            <Route path="/newest" element={<NewestPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/explore/tag/:tagName" element={<TagPage />} />
            {/* Public profile route, must be after all other specific routes */}
            <Route path=":displayName" element={<PublicProfilePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          </Suspense>
        </div>
      </Router>
    </QueryProvider>
      </ToastProvider>
    </HelmetProvider>
      <SpeedInsights />
    </>
  );
}

export default App;
