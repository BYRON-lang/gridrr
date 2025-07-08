import React, { useState, useEffect } from 'react';
import DiscoverHeader from '../components/DiscoverHeader';
import SettingsSidebar from '../components/SettingsSidebar';
import { useAuth } from '../hooks/useAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/authService';

const SettingsPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('settings');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileType, setProfileType] = useState<'individual' | 'group'>('individual');
  const { user, logout, isLoadingUser } = useAuth();
  const queryClient = useQueryClient();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState('');
  const [profileSuccess, setProfileSuccess] = useState('');
  const [profile, setProfile] = useState<any>({});

  React.useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const updateUserMutation = useMutation({
    mutationFn: authService.updateCurrentUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    },
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserMutation.mutate({ firstName, lastName, email });
  };

  const handleProfileCardClick = () => {
    setShowProfileModal(true);
  };

  const handleCloseModal = () => {
    setShowProfileModal(false);
    setProfileType('individual');
  };

  const handleSidebarTabSelect = (key: string) => {
    if (key === 'signout') {
      logout();
    } else {
      setSelectedTab(key);
    }
  };

  useEffect(() => {
    if (showProfileModal) {
      setProfileLoading(true);
      setProfileError('');
      authService.getProfile()
        .then(res => setProfile(res.data || {}))
        .catch(() => setProfile({}))
        .finally(() => setProfileLoading(false));
    }
  }, [showProfileModal]);

  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col">
      <DiscoverHeader />
      <div className="flex justify-center flex-1 h-full pt-24 bg-gray-100">
        <div className="flex w-full max-w-4xl mx-auto h-full bg-gray-100">
          <SettingsSidebar selectedTab={selectedTab} onTabSelect={handleSidebarTabSelect} className="fixed" />
          <div className="flex-1 h-full px-8 flex flex-col items-start ml-56">
            {selectedTab === 'settings' && (
              <>
                <h1 className="text-xl font-semibold text-gray-800 mb-4 mt-8">Account Settings</h1>
                <div className="bg-white rounded-lg shadow p-8 w-full max-w-xl">
                  {isLoadingUser ? (
                    <div className="text-gray-500">Loading...</div>
                  ) : (
                    <form onSubmit={handleSave}>
                      <div className="flex items-center gap-8 mb-4">
                        <label className="block text-sm text-gray-700 mb-0 whitespace-nowrap w-28">First Name</label>
                        <input type="text" className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" placeholder="Enter your first name" value={firstName} onChange={e => setFirstName(e.target.value)} />
                      </div>
                      <div className="flex items-center gap-8 mb-4">
                        <label className="block text-sm text-gray-700 mb-0 whitespace-nowrap w-28">Last Name</label>
                        <input type="text" className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" placeholder="Enter your last name" value={lastName} onChange={e => setLastName(e.target.value)} />
                      </div>
                      <div className="flex items-center gap-8 mb-6">
                        <label className="block text-sm text-gray-700 mb-0 whitespace-nowrap w-28">Email</label>
                        <input type="email" className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
                      </div>
                      <div className="flex justify-end">
                        <button type="submit" className="px-6 py-2 bg-black text-white rounded hover:bg-gray-900 transition-colors text-sm font-medium" disabled={updateUserMutation.isPending}>{updateUserMutation.isPending ? 'Saving...' : 'Save'}</button>
                      </div>
                      {success && <div className="text-green-600 text-sm mt-4">Saved successfully!</div>}
                    </form>
                  )}
                </div>
              </>
            )}
            {selectedTab === 'password' && (
              <>
                <h1 className="text-xl font-semibold text-gray-800 mb-4 mt-8">Password</h1>
                <div className="bg-white rounded-lg shadow p-8 w-full max-w-xl">
                  <PasswordChangeForm />
                </div>
              </>
            )}
            {selectedTab === 'profiles' && (
              <>
                <h1 className="text-xl font-semibold text-gray-800 mb-4 mt-8">Profiles</h1>
                {!showProfileModal ? (
                  profile && profile.display_name ? (
                    <div className="bg-white border border-gray-300 shadow p-8 w-full max-w-xl flex flex-col items-start">
                      <div className="text-lg font-semibold text-gray-800 mb-2">{profile.display_name}</div>
                      <div className="text-base text-gray-700 mb-4">This is your public profile.</div>
                      <button
                        className="px-6 py-2 bg-black text-white rounded hover:bg-gray-900 transition-colors text-sm font-medium"
                        onClick={handleProfileCardClick}
                      >
                        Edit Profile
                      </button>
                    </div>
                  ) : (
                    <div
                      className="bg-gray-100 border border-gray-300 shadow p-8 w-full max-w-xl h-32 flex flex-col justify-center cursor-pointer hover:bg-gray-200 transition-colors"
                      onClick={handleProfileCardClick}
                    >
                      <h2 className="text-lg font-semibold text-gray-800 mb-2">Create or Edit Your Profile</h2>
                      <div className="text-base text-gray-800 font-light">Add or update your public profile</div>
                    </div>
                  )
                ) : (
                  <ProfileForm
                    profile={profile}
                    setProfile={setProfile}
                    loading={profileLoading}
                    error={profileError}
                    success={profileSuccess}
                    setError={setProfileError}
                    setSuccess={setProfileSuccess}
                    setLoading={setProfileLoading}
                    onClose={handleCloseModal}
                  />
                )}
              </>
            )}
            {selectedTab === 'cancel' && (
              <div className="bg-white border border-gray-300 rounded-lg w-full max-w-xl p-8 mt-8">
                <h2 className="text-lg font-semibold text-red-600 mb-4">Warning</h2>
                <p className="text-base text-gray-800 mb-6">
                  Warning: Clicking the button below will permanently delete your account, including all data associated with your account whose email is <span className="font-semibold">{user?.email || '...'}</span>. This action cannot be undone.
                </p>
                <button className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm font-medium">Cancel Account</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const PasswordChangeForm: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match.');
      return;
    }
    setIsLoading(true);
    try {
      await authService.changePassword(currentPassword, newPassword);
      setSuccess('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Failed to update password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-8 mb-4">
        <label className="block text-sm text-gray-700 mb-0 whitespace-nowrap w-28">Current Password</label>
        <input type="password" className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" placeholder="Enter current password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
      </div>
      <div className="flex items-center gap-8 mb-4">
        <label className="block text-sm text-gray-700 mb-0 whitespace-nowrap w-28">New Password</label>
        <input type="password" className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" placeholder="Enter new password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
      </div>
      <div className="flex items-center gap-8 mb-6">
        <label className="block text-sm text-gray-700 mb-0 whitespace-nowrap w-28">Confirm Password</label>
        <input type="password" className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" placeholder="Confirm new password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
      </div>
      {error && <div className="text-red-600 text-sm mb-4">{error}</div>}
      {success && <div className="text-green-600 text-sm mb-4">{success}</div>}
      <div className="flex justify-end">
        <button type="submit" className="px-6 py-2 bg-black text-white rounded hover:bg-gray-900 transition-colors text-sm font-medium" disabled={isLoading}>{isLoading ? 'Saving...' : 'Save'}</button>
      </div>
    </form>
  );
};

const ProfileForm = ({ profile, setProfile, loading, error, success, setError, setSuccess, setLoading, onClose }: any) => {
  const [localProfile, setLocalProfile] = useState<any>(profile || {});
  useEffect(() => { setLocalProfile(profile || {}); }, [profile]);
  const handleChange = (field: string, value: any) => {
    setLocalProfile((prev: any) => ({ ...prev, [field]: value }));
  };
  const handleCheckbox = (role: string) => {
    const expertise = localProfile.expertise ? localProfile.expertise.split(',') : [];
    if (expertise.includes(role)) {
      handleChange('expertise', expertise.filter((r: string) => r !== role).join(','));
    } else {
      handleChange('expertise', [...expertise, role].join(','));
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setSuccess(''); setLoading(true);
    try {
      await authService.saveProfile(localProfile);
      setSuccess('Profile saved!');
      setTimeout(() => setSuccess(''), 2000);
      onClose();
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Failed to save profile.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-300 rounded-lg w-full max-w-xl p-8 relative">
                    <button
                      className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl"
        onClick={onClose}
                      aria-label="Close"
        type="button"
                    >
                      &times;
                    </button>
                    <div className="flex items-center gap-6 mb-6">
                      <div className="text-base font-medium text-gray-800">What best describes you?</div>
                      <div className="flex gap-3">
          <button type="button" className={`px-5 py-2 rounded-full border text-sm font-medium transition-colors duration-150 ${localProfile.profile_type === 'individual' ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`} onClick={() => handleChange('profile_type', 'individual')}>Individual</button>
          <button type="button" className={`px-5 py-2 rounded-full border text-sm font-medium transition-colors duration-150 ${localProfile.profile_type === 'group' ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`} onClick={() => handleChange('profile_type', 'group')}>Group</button>
                      </div>
                    </div>
                    <div className="flex items-center gap-8 mb-4">
                      <label className="block text-sm text-gray-700 mb-0 whitespace-nowrap w-28">Name</label>
        <input type="text" className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" placeholder="Enter your name" value={localProfile.display_name || ''} onChange={e => handleChange('display_name', e.target.value)} />
                    </div>
                    <div className="flex items-center gap-8 mb-4">
                      <label className="block text-sm text-gray-700 mb-0 whitespace-nowrap w-28">Website URL</label>
        <input type="text" className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" placeholder="Enter your website URL" value={localProfile.website || ''} onChange={e => handleChange('website', e.target.value)} />
                    </div>
      <div className="flex items-center gap-8 mb-4">
                      <label className="block text-sm text-gray-700 mb-0 whitespace-nowrap w-28">Contact Email</label>
        <input type="email" className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" placeholder="Enter your contact email" value={localProfile.contact_email || ''} onChange={e => handleChange('contact_email', e.target.value)} />
                    </div>
                    <div className="text-xs text-gray-500 pl-28 mb-6">This email will be displayed publicly on the profile</div>
                    <hr className="my-6 border-gray-200" />
                    <div className="flex items-center gap-8 mb-4">
                      <label className="block text-sm text-gray-700 mb-0 whitespace-nowrap w-28">Bio</label>
        <textarea className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black h-24 resize-none" placeholder="Enter your bio" value={localProfile.bio || ''} onChange={e => handleChange('bio', e.target.value)} />
                    </div>
                    <div className="mb-6">
                      <label className="block text-sm text-gray-700 mb-2">Expertise</label>
                      <div className="flex flex-col gap-2">
                        {/* UX Roles */}
                        <span className="font-semibold text-xs text-gray-500 mt-2">UX Roles</span>
                        <div className="grid grid-cols-3 gap-x-4 gap-y-2">
                          {["UX Designer", "UX Researcher", "Interaction Designer", "Information Architect"].map((expertise) => (
                            <label key={expertise} className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" className="accent-black" checked={localProfile.expertise?.includes(expertise) || false} onChange={() => handleCheckbox(expertise)} />
                              {expertise}
                            </label>
                          ))}
                        </div>
                        {/* UI & Visual Design Roles */}
                        <span className="font-semibold text-xs text-gray-500 mt-4">UI & Visual Design Roles</span>
                        <div className="grid grid-cols-3 gap-x-4 gap-y-2">
                          {["UI Designer", "Visual Designer", "Web Designer", "Mobile App Designer", "Product Designer"].map((expertise) => (
                            <label key={expertise} className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" className="accent-black" checked={localProfile.expertise?.includes(expertise) || false} onChange={() => handleCheckbox(expertise)} />
                              {expertise}
                            </label>
                          ))}
                        </div>
                        {/* Development Roles */}
                        <span className="font-semibold text-xs text-gray-500 mt-4">Development Roles</span>
                        <div className="grid grid-cols-3 gap-x-4 gap-y-2">
                          {["Frontend Developer", "Fullstack Developer", "Webflow Developer", "React Developer", "Mobile Developer (React Native / Flutter)"].map((expertise) => (
                            <label key={expertise} className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" className="accent-black" checked={localProfile.expertise?.includes(expertise) || false} onChange={() => handleCheckbox(expertise)} />
                              {expertise}
                            </label>
                          ))}
                        </div>
                        {/* Branding & Graphic Design Roles */}
                        <span className="font-semibold text-xs text-gray-500 mt-4">Branding & Graphic Design Roles</span>
                        <div className="grid grid-cols-3 gap-x-4 gap-y-2">
                          {["Graphic Designer", "Logo Designer", "Brand Identity Designer", "Illustrator", "Typography Artist"].map((expertise) => (
                            <label key={expertise} className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" className="accent-black" checked={localProfile.expertise?.includes(expertise) || false} onChange={() => handleCheckbox(expertise)} />
                              {expertise}
                            </label>
                          ))}
                        </div>
                        {/* Creative & Motion Roles */}
                        <span className="font-semibold text-xs text-gray-500 mt-4">Creative & Motion Roles</span>
                        <div className="grid grid-cols-3 gap-x-4 gap-y-2">
                          {["Motion Designer", "3D Designer", "Animator", "Video Editor"].map((expertise) => (
                            <label key={expertise} className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" className="accent-black" checked={localProfile.expertise?.includes(expertise) || false} onChange={() => handleCheckbox(expertise)} />
                              {expertise}
                            </label>
                          ))}
                        </div>
                        {/* Other Digital Roles */}
                        <span className="font-semibold text-xs text-gray-500 mt-4">Other Digital Roles</span>
                        <div className="grid grid-cols-3 gap-x-4 gap-y-2">
                          {["Content Creator", "UI/UX Copywriter", "Design Strategist", "Art Director", "Creative Director", "No-Code Designer (e.g. Webflow, Framer)"].map((expertise) => (
                            <label key={expertise} className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" className="accent-black" checked={localProfile.expertise?.includes(expertise) || false} onChange={() => handleCheckbox(expertise)} />
                              {expertise}
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                    <hr className="my-6 border-gray-200" />
                    <div className="flex items-center gap-8 mb-4">
                      <label className="block text-sm text-gray-700 mb-0 whitespace-nowrap w-28">Twitter/X Username</label>
        <input type="text" className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" placeholder="Enter your Twitter/X username (e.g. johndoe)" value={localProfile.twitter || ''} onChange={e => handleChange('twitter', e.target.value)} />
                    </div>
                    <div className="flex items-center gap-8 mb-4">
                      <label className="block text-sm text-gray-700 mb-0 whitespace-nowrap w-28">Instagram Username</label>
        <input type="text" className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" placeholder="Enter your Instagram username (e.g. johndoe)" value={localProfile.instagram || ''} onChange={e => handleChange('instagram', e.target.value)} />
                    </div>
                    <div className="flex items-center gap-8 mb-4">
                      <label className="block text-sm text-gray-700 mb-0 whitespace-nowrap w-28">LinkedIn Username</label>
        <input type="text" className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" placeholder="Enter your LinkedIn username (e.g. johndoe)" value={localProfile.linkedin || ''} onChange={e => handleChange('linkedin', e.target.value)} />
                    </div>
                    <div className="flex items-center gap-8">
                      <label className="block text-sm text-gray-700 mb-0 whitespace-nowrap w-28">Facebook Username</label>
        <input type="text" className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" placeholder="Enter your Facebook username (e.g. johndoe)" value={localProfile.facebook || ''} onChange={e => handleChange('facebook', e.target.value)} />
                    </div>
                    <div className="flex justify-end">
        <button type="submit" className="px-6 py-2 mt-10 bg-black text-white rounded hover:bg-gray-900 transition-colors text-sm font-medium" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
      </div>
      {error && <div className="text-red-600 text-sm mt-4">{error}</div>}
      {success && <div className="text-green-600 text-sm mt-4">{success}</div>}
    </form>
  );
};

export default SettingsPage; 