import React, { useState, useEffect } from 'react';
import DiscoverHeader from '../components/DiscoverHeader';
import { FiImage } from 'react-icons/fi';
import { authService } from '../services/authService';
import { createPost } from '../services/api';

const ImageIcon = FiImage as React.ComponentType<{ size?: number; className?: string }>;

export const PRESET_TAGS = [
  'Website Design', 'Landing Pages', 'Login Pages', 'Registration Forms', 'Contact Pages', 'About Pages',
  'Mobile Apps', 'Dashboard Design', 'Settings Pages', 'Profile Pages', 'Navigation Menus', 'Onboarding',
  'Buttons', 'Cards', 'Modals', 'Dropdowns', 'Forms', 'Icons',
  'E-commerce', 'SaaS', 'Portfolio', 'Blog', 'Social Media', 'Admin Panel'
];

const CreatePostPage: React.FC = () => {
  const [tags, setTags] = useState<string[]>(PRESET_TAGS);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [title, setTitle] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    authService.getProfile().then(res => setProfile(res.data)).catch(() => setProfile(null));
  }, []);

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleTagClick = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async () => {
    setError(''); setSuccess(''); setLoading(true);
    try {
      if (!title.trim()) {
        setError('Title is required.'); setLoading(false); return;
      }
      if (images.length === 0) {
        setError('At least one image is required.'); setLoading(false); return;
      }
      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('tags', JSON.stringify(selectedTags));
      images.forEach((img) => formData.append('images', img));
      const data = await createPost(formData);
      setSuccess('Post created!');
      setTitle(''); setSelectedTags([]); setImages([]);
    } catch (err: any) {
      setError(err?.message || 'Failed to create post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100">
      <DiscoverHeader />
      {/* Fixed Submit Button Top Right, below header */}
      <button
        className="fixed right-12 z-20 px-6 py-2 bg-black text-white rounded-full font-semibold shadow hover:bg-gray-700 transition-colors"
        style={{ top: '104px' }}
        type="button"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
      <div className="flex flex-row pt-32 px-8">
        {/* Left Card */}
        <div
          className="p-8 flex flex-col items-start w-96 fixed left-0 top-32 bg-gray-100 z-10"
          style={{ background: 'none', minHeight: 'calc(100vh - 8rem)' }}
        >
          {profile && (
            <div className="mb-6">
              <div className="text-lg font-semibold text-black">{profile.display_name}</div>
              <div className="text-xs text-gray-500">{profile.expertise}</div>
            </div>
          )}
          <h2 className="text-xl font-bold mb-4">Title</h2>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black mb-6"
            placeholder="Enter post title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <div className="w-full">
            <h3 className="text-base font-semibold mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag) => (
                <button
                  type="button"
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors duration-150 focus:outline-none
                    ${selectedTags.includes(tag) ? 'bg-black text-white border-black' : 'bg-gray-200 text-gray-700 border-gray-200 hover:bg-gray-300'}`}
                >
                  {tag}
                </button>
              ))}
            </div>
            <form onSubmit={handleAddTag} className="flex gap-2">
              <input
                type="text"
                className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Add tag"
                value={newTag}
                onChange={e => setNewTag(e.target.value)}
              />
              <button type="submit" className="px-4 py-1 bg-black text-white rounded text-sm font-medium">Add</button>
            </form>
          </div>
          {error && <div className="text-red-600 text-sm mt-4">{error}</div>}
          {success && <div className="text-green-600 text-sm mt-4">{success}</div>}
        </div>
        {/* Right Dotted Box */}
        <div className="flex-1 flex justify-center items-start" style={{ minHeight: '100vh', marginLeft: 384 }}>
          {images.length === 0 ? (
            <div
              className="w-[800px] h-[600px] border-2 border-dotted border-gray-400 rounded-lg flex flex-col items-center justify-center cursor-pointer select-none overflow-y-auto"
              style={{ background: 'none' }}
              onClick={handleBoxClick}
            >
              <input
                type="file"
                accept="image/*"
                multiple
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />
              <ImageIcon size={80} className="text-gray-400 mb-4" />
              <span className="text-gray-500 text-lg font-medium">Click or drag to upload images</span>
              <span className="text-gray-400 text-sm mt-2">(You can select multiple images)</span>
            </div>
          ) : (
            <div className="flex flex-col items-center w-full gap-6 py-4 overflow-y-auto">
              {images.map((file, idx) => {
                const url = URL.createObjectURL(file);
                return (
                  <img
                    key={idx}
                    src={url}
                    alt={`upload-preview-${idx}`}
                    style={{ width: 1200, height: 800, objectFit: 'contain', display: 'block', margin: '0 auto', borderRadius: 0, boxShadow: 'none', border: 'none' }}
                    onLoad={() => URL.revokeObjectURL(url)}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage; 