import React, { useState, useEffect } from 'react';
import DiscoverHeader from '../components/DiscoverHeader';
import { FiImage } from 'react-icons/fi';
import { authService } from '../services/authService';
import { createPost } from '../services/api';
import { useToast } from '../contexts/ToastContext';
import { useNavigate } from 'react-router-dom';
import UploadBox from '../components/UploadBox';
import { useQueryClient } from '@tanstack/react-query';

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
  const toast = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
      if (!profile || !profile.display_name) {
        setError('Please complete your profile in Settings before creating a post.');
        setLoading(false);
        toast.showToast('Please complete your profile in Settings before creating a post.');
        navigate('/settings', { replace: true });
        return;
      }
      if (!title.trim()) {
        setError('Title is required.'); setLoading(false); toast.showToast('Title is required.'); return;
      }
      if (images.length === 0) {
        setError('At least one image is required.'); setLoading(false); toast.showToast('At least one image is required.'); return;
      }
      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('tags', JSON.stringify(selectedTags));
      images.forEach((img) => formData.append('images', img));
      const data = await createPost(formData);
      setSuccess('Post created!');
      toast.showToast('Post Created Successfully');
      // Invalidate Discover posts query so Discover page refreshes
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      navigate('/discover', { replace: true });
    } catch (err: any) {
      setError(err?.message || 'Failed to create post.');
      toast.showToast(err?.message || 'Failed to create post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100">
      <DiscoverHeader />
      {/* Sticky Submit Button for Mobile */}
      <button
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-xs px-6 py-2 bg-black text-white font-semibold rounded-md shadow-md text-base z-30 block md:hidden"
        type="button"
        onClick={handleSubmit}
        disabled={loading || !profile || !profile.display_name}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
      {(!profile || !profile.display_name) && (
        <div className="fixed bottom-16 left-0 w-full bg-red-100 text-red-700 font-semibold py-3 text-center z-30 block md:hidden">
          Please complete your profile in Settings before creating a post.
        </div>
      )}
      {/* Desktop Submit Button: Top Right Corner */}
      <button
        className="hidden md:block fixed top-24 right-24 px-6 py-2 bg-black text-white font-semibold rounded-full shadow-md text-base z-40 hover:bg-gray-700 transition-colors"
        type="button"
        onClick={handleSubmit}
        disabled={loading || !profile || !profile.display_name}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
      <div className="flex flex-col md:flex-row pt-32 px-2 md:px-8 gap-0 md:gap-8 w-full max-w-full overflow-x-hidden">
        {/* Left Card (Sidebar) */}
        <div
          className="w-full md:w-96 p-4 md:p-8 flex flex-col items-start bg-gray-100 z-10 md:fixed md:left-0 md:top-32"
          style={{ background: 'none', minHeight: 'auto' }}
        >
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
        {/* Right Dotted Box (Image Upload/Preview) */}
        <div className="flex-1 flex flex-col justify-start items-center md:justify-center md:items-center mt-4 md:mt-0 w-full max-w-full md:ml-24" style={{ minHeight: 'auto' }}>
          {images.length === 0 ? (
            <UploadBox onClick={handleBoxClick} fileInputRef={fileInputRef} onFileChange={setImages} />
          ) : (
            <div className="flex flex-col items-center w-full max-w-xs md:max-w-[800px] gap-4 md:gap-6 py-4 overflow-y-auto">
              {images.map((file, idx) => {
                const url = URL.createObjectURL(file);
                return (
                  <img
                    key={idx}
                    src={url}
                    alt={`upload-preview-${idx}`}
                    className="w-full max-w-xs md:max-w-3xl h-auto object-contain block mx-auto rounded-none shadow-none border-none"
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