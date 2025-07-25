import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/loaders/LoadingSpinner';

const EyeIcon = ({ visible, onClick }: { visible: boolean; onClick: () => void }) => (
  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600 flex items-center z-10" onClick={onClick} tabIndex={0} role="button" aria-label="Toggle password visibility">
    {visible ? (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M1 10C2.73 5.61 6.36 3 10 3c3.64 0 7.27 2.61 9 7-1.73 4.39-5.36 7-9 7-3.64 0-7.27-2.61-9-7z" stroke="#333533" strokeWidth="1.5"/><circle cx="10" cy="10" r="3" stroke="#20b2aa" strokeWidth="1.5"/></svg>
    ) : (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M1 10C2.73 5.61 6.36 3 10 3c3.64 0 7.27 2.61 9 7-1.73 4.39-5.36 7-9 7-3.64 0-7.27-2.61-9-7z" stroke="#333533" strokeWidth="1.5"/><path d="M4 4l12 12" stroke="#f5cb5c" strokeWidth="1.5"/></svg>
    )}
  </span>
);

const SignupPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const { signup, isSigningUp, signupError } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!acceptedTerms) {
      return;
    }

    signup({
      firstName,
      lastName,
      email,
      password,
      acceptedTerms,
    });
  };

  const getErrorMessage = () => {
    if (signupError && 'response' in signupError) {
      return signupError.response?.data?.error || 'An error occurred during signup';
    }
    return '';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <div className="flex justify-center items-center mb-2">
        <img src="/assets/logo1.png" alt="Logo" className="max-w-[60px] w-full h-auto block" />
      </div>
      <div className="text-4xl font-extralight text-gray-800 text-center mb-1">Create a new account</div>
      <div className="bg-white border border-gray-300 p-10 min-w-[380px] max-w-[480px] w-full mt-6 mx-auto flex flex-col items-center relative">
        {isSigningUp && <LoadingSpinner overlay />}
        <form className="w-full flex flex-col gap-3" autoComplete="off" onSubmit={handleSubmit}>
          {signupError && (
            <div className="text-red-500 mb-4 text-center">
              {getErrorMessage()}
            </div>
          )}
          <label htmlFor="firstName" className="text-base text-gray-800 mb-1 font-normal">First Name</label>
          <input
            id="firstName"
            type="text"
            className="w-full px-4 py-3 pr-10 border border-gray-300 text-base bg-white text-gray-800 outline-none transition-colors focus:border-teal-500 box-border"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            placeholder="Enter your first name"
            required
            disabled={isSigningUp}
          />
          <label htmlFor="lastName" className="text-base text-gray-800 mb-1 font-normal">Last Name</label>
          <input
            id="lastName"
            type="text"
            className="w-full px-4 py-3 pr-10 border border-gray-300 text-base bg-white text-gray-800 outline-none transition-colors focus:border-teal-500 box-border"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            placeholder="Enter your last name"
            required
            disabled={isSigningUp}
          />
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
            disabled={isSigningUp}
          />
          <label htmlFor="password" className="text-base text-gray-800 mb-1 font-normal">Password</label>
          <div className="relative flex items-center">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              className="w-full px-4 py-3 pr-10 border border-gray-300 text-base bg-white text-gray-800 outline-none transition-colors focus:border-teal-500 box-border"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="new-password"
              placeholder="Enter your password"
              required
              disabled={isSigningUp}
            />
            <EyeIcon visible={showPassword} onClick={() => setShowPassword(v => !v)} />
          </div>
          <div className="flex items-center gap-2 mt-2 mb-1">
            <input
              id="terms"
              type="checkbox"
              className="w-4 h-4 accent-teal-500"
              checked={acceptedTerms}
              onChange={e => setAcceptedTerms(e.target.checked)}
              disabled={isSigningUp}
            />
            <label htmlFor="terms" className="text-sm text-gray-800 font-extralight cursor-pointer">
              I accept the <Link to="/terms" className="text-teal-500 underline font-extralight cursor-pointer transition-colors hover:text-gray-800">terms and conditions</Link>
            </label>
          </div>
          <button 
            type="submit" 
            className="w-full py-3 bg-gray-800 text-white border-none rounded-full text-lg font-medium cursor-pointer mt-2 transition-colors hover:bg-gray-700 flex items-center justify-center min-h-[48px] disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-70"
            disabled={isSigningUp || !acceptedTerms}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage; 