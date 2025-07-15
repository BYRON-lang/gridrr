import React, { useRef, useState } from 'react';

interface UploadBoxProps {
  onClick: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileChange?: (files: File[]) => void;
}

const UploadBox: React.FC<UploadBoxProps> = ({ onClick, fileInputRef, onFileChange }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0) {
      setPreviewUrl(URL.createObjectURL(files[0]));
      if (onFileChange) onFileChange(files);
    }
  };

  return (
    <div
      className="w-full max-w-xs md:max-w-[800px] h-48 md:w-[800px] md:h-[600px] flex flex-col justify-center cursor-pointer select-none"
      style={{ background: 'none', border: 'none', boxShadow: 'none' }}
      onClick={onClick}
    >
      <input
        type="file"
        accept="image/*"
        multiple
        ref={fileInputRef}
        onChange={handleFileChange}
        onClick={e => e.stopPropagation()}
        className="hidden"
      />
      <div className="w-full flex flex-col items-end">
        {!previewUrl ? (
          <div className="w-full h-48 md:w-[500px] md:h-[400px] flex flex-col items-center justify-center gap-2 md:pr-4 md:pl-2">
            <div style={{ background: '#ff9800', borderRadius: '50%', width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </div>
            <span className="text-3xl font-bold hidden md:block">Click Or Drag & Drop</span>
            <span className="text-base text-gray-500 mt-1 hidden md:block">JPG, PNG, SVG, or GIF (max 5MB)</span>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center mt-4">
            <img src={previewUrl} alt="Preview" className="rounded-lg border border-gray-200 shadow mx-auto max-w-[1800px] w-full" />
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadBox; 