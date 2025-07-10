import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const COOKIES_KEY = 'cookiesAccepted';

const CookiesPopup: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(COOKIES_KEY);
    if (!accepted) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIES_KEY, 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-[9999] flex justify-center items-end pointer-events-none">
      <div className="bg-black text-white rounded-t-xl shadow-lg px-6 py-4 mb-0 flex flex-col md:flex-row items-center gap-4 max-w-2xl w-full md:w-auto pointer-events-auto">
        <span className="text-base md:text-lg">
          We use cookies to improve your experience. See our{' '}
          <Link to="/cookies" className="underline text-blue-400 hover:text-blue-200">Cookies Policy</Link>.
        </span>
        <button
          onClick={handleAccept}
          className="bg-white text-black font-semibold px-6 py-2 rounded-full shadow hover:bg-gray-200 transition-colors duration-200 ml-0 md:ml-4 mt-2 md:mt-0"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default CookiesPopup; 