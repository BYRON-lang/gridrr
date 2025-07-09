import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Show a funny message in the browser console on all pages
if (typeof window !== 'undefined' && window.console) {
  console.log('%c🦄 Welcome to the Gridrr dev console! If you see this, you are officially a unicorn hunter. 🦄', 'color: #7f5fff; font-size: 1.2rem; font-weight: bold;');
}

// If you want to start measuring performance in your app, pass a function
// 🦄 Nothing to see here, just unicorns debugging!
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
