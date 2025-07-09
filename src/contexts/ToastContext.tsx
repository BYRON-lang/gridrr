import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface ToastContextType {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });

  const showToast = useCallback((message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast({ message: '', visible: false }), 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: toast.visible ? 40 : -100,
          margin: '0 auto',
          width: 'fit-content',
          minWidth: 260,
          maxWidth: '90vw',
          zIndex: 9999,
          transition: 'bottom 0.4s cubic-bezier(.4,0,.2,1)',
          pointerEvents: 'none',
        }}
      >
        {toast.visible && (
          <div
            style={{
              background: '#232323',
              color: '#fff',
              borderRadius: 16,
              padding: '16px 32px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
              fontSize: 18,
              fontWeight: 500,
              textAlign: 'center',
              pointerEvents: 'auto',
            }}
          >
            {toast.message}
          </div>
        )}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx;
}; 