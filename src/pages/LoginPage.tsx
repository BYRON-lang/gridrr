import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/loaders/LoadingSpinner';
import { useToast } from '../contexts/ToastContext';

const EyeIcon = ({ visible, onClick }: { visible: boolean; onClick: () => void }) => (
  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600 flex items-center z-10" onClick={onClick} tabIndex={0} role="button" aria-label="Toggle password visibility">
    {visible ? (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M1 10C2.73 5.61 6.36 3 10 3c3.64 0 7.27 2.61 9 7-1.73 4.39-5.36 7-9 7-3.64 0-7.27-2.61-9-7z" stroke="#333533" strokeWidth="1.5"/><circle cx="10" cy="10" r="3" stroke="#20b2aa" strokeWidth="1.5"/></svg>
    ) : (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M1 10C2.73 5.61 6.36 3 10 3c3.64 0 7.27 2.61 9 7-1.73 4.39-5.36 7-9 7-3.64 0-7.27-2.61-9-7z" stroke="#333533" strokeWidth="1.5"/><path d="M4 4l12 12" stroke="#f5cb5c" strokeWidth="1.5"/></svg>
    )}
  </span>
);

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loginAsync, isLoggingIn, loginError } = useAuth();
  const toast = useToast();

  // Remove toast for login error, only show error above form
  React.useEffect(() => {
    // No toast for login errors on login page
  }, [loginError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginAsync({ email, password });
    } catch (err: any) {
      // Error is handled by React Query and loginError
    }
  };

  const getErrorMessage = () => {
    if (loginError) {
      // 🦄 Nothing to see here, just unicorns debugging!
    }
    if (loginError && 'response' in loginError) {
      const backendMsg = loginError.response?.data?.error || '';
      const status = loginError.response?.status;
      if (status === 400 && backendMsg === 'Email and password are required') {
        return 'Please enter both email and password.';
      }
      if (status === 404 && backendMsg === 'User not found') {
        return 'No account found with that email.';
      }
      // Fallback: for any 401 error, show incorrect email or password
      if (status === 401) {
        return 'Incorrect email or password.';
      }
      return 'An error occurred. Please try again.';
    }
    if (loginError && loginError.message) {
      return loginError.message;
    }
    return '';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <div className="flex justify-center items-center mb-2">
        <img src="/assets/logo1.png" alt="Logo" className="max-w-[60px] w-full h-auto block" />
      </div>
      <div className="text-4xl font-extralight text-gray-800 text-center mb-1">Sign into your account</div>
      <div className="text-base text-gray-600 text-center mb-1">
        or <Link to="/signup" className="text-teal-500 underline cursor-pointer font-extralight hover:text-teal-600">sign up</Link> if you not a member yet.
      </div>
      <div className="bg-white border border-gray-300 p-10 min-w-[380px] max-w-[480px] w-full mt-6 mx-auto flex flex-col items-center relative">
        {isLoggingIn && <LoadingSpinner overlay />}
        <form className="w-full flex flex-col gap-3" autoComplete="off" onSubmit={handleSubmit}>
          {loginError && (
            <div className="text-red-500 mb-4 text-center">
              {getErrorMessage()}
            </div>
          )}
          <label htmlFor="email" className="text-base text-gray-800 mb-1 font-normal">Email</label>
          <input
            id="email"
            type="email"
            className="w-full px-4 py-3 pr-10 border border-gray-300 text-base bg-white text-gray-800 outline-none transition-colors focus:border-teal-500 box-border"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="username"
            placeholder="Enter your email"
            required
            disabled={isLoggingIn}
          />
          <label htmlFor="password" className="text-base text-gray-800 mb-1 font-normal">Password</label>
          <div className="relative flex items-center">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              className="w-full px-4 py-3 pr-10 border border-gray-300 text-base bg-white text-gray-800 outline-none transition-colors focus:border-teal-500 box-border"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
              placeholder="Enter your password"
              required
              disabled={isLoggingIn}
            />
            <EyeIcon visible={showPassword} onClick={() => setShowPassword(v => !v)} />
          </div>
          <button 
            type="submit" 
            className="w-full py-3 bg-gray-800 text-white border-none rounded-full text-lg font-medium cursor-pointer mt-2 transition-colors hover:bg-gray-700 flex items-center justify-center min-h-[48px] disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-70"
            disabled={isLoggingIn}
          >
            Sign In
          </button>
        </form>
      </div>
      <div className="flex flex-row items-center justify-center gap-5 mt-5">
        <a href="#" className="text-base text-gray-800 font-extralight underline cursor-pointer transition-colors">Forgot Password?</a>
        <Link to="/signup" className="text-base text-gray-800 font-extralight underline cursor-pointer transition-colors">Create an account</Link>
      </div>
    </div>
  );
};

export default LoginPage; 