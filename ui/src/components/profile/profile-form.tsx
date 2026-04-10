"use client";

import { useState } from "react";

export function ProfileForm() {
  const [formData, setFormData] = useState({
    name: "Haris Ozturk",
    email: "haris@benefactorteam.com",
    phone: "+44 7700 900000",
    bio: "Passionate about community-led impact and global fundraising solutions. Building Benefactor to empower everyone to make a difference.",
    language: "en",
    notifications: {
      email: true,
      phone: false,
    }
  });

  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1200);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white rounded-xl border border-gray-100 p-6 md:p-8 shadow-sm">
      <div className="space-y-6">
        <h3 className="text-lg font-bold text-primary-navy border-b border-gray-100 pb-3">Personal Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-text-gray uppercase ml-1">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full h-12 px-4 border border-gray-200 rounded-md text-sm text-text-dark focus:outline-none focus:border-primary-navy transition-colors bg-bg-off-white/30"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-text-gray uppercase ml-1">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full h-12 px-4 border border-gray-200 rounded-md text-sm text-text-dark focus:outline-none focus:border-primary-navy transition-colors bg-bg-off-white/30"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-text-gray uppercase ml-1">Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full h-12 px-4 border border-gray-200 rounded-md text-sm text-text-dark focus:outline-none focus:border-primary-navy transition-colors bg-bg-off-white/30"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-text-gray uppercase ml-1">Preferred Language</label>
            <select
              value={formData.language}
              onChange={(e) => setFormData({...formData, language: e.target.value})}
              className="w-full h-12 px-4 border border-gray-200 rounded-md text-sm text-text-dark focus:outline-none focus:border-primary-navy transition-colors bg-bg-off-white/30 appearance-none"
            >
              <option value="en">English (US)</option>
              <option value="tr">Türkçe</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-text-gray uppercase ml-1">Bio</label>
          <textarea
            rows={4}
            value={formData.bio}
            onChange={(e) => setFormData({...formData, bio: e.target.value})}
            className="w-full px-4 py-3 border border-gray-200 rounded-md text-sm text-text-dark focus:outline-none focus:border-primary-navy transition-colors bg-bg-off-white/30 resize-none"
            placeholder="Tell us a bit about yourself..."
          />
        </div>
      </div>

      <div className="space-y-6 pt-2">
        <h3 className="text-lg font-bold text-primary-navy border-b border-gray-100 pb-3">Notification Preferences</h3>
        
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={formData.notifications.email} 
                onChange={() => setFormData({...formData, notifications: {...formData.notifications, email: !formData.notifications.email}})}
              />
              <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-primary-yellow transition-colors" />
              <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
            </div>
            <span className="text-sm font-medium text-text-dark group-hover:text-primary-navy transition-colors">Receive updates via Email</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={formData.notifications.phone}
                onChange={() => setFormData({...formData, notifications: {...formData.notifications, phone: !formData.notifications.phone}})}
              />
              <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-primary-yellow transition-colors" />
              <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
            </div>
            <span className="text-sm font-medium text-text-dark group-hover:text-primary-navy transition-colors">Receive text notifications on Phone</span>
          </label>
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-gray-100">
        <p className="text-xs text-text-gray max-w-[280px]">
          Make sure your contact information is correct so our team can reach you for campaign reviews.
        </p>
        
        <div className="flex items-center gap-4">
          {showSuccess && (
            <span className="text-sm font-semibold text-green-600 animate-in fade-in slide-in-from-bottom-2">
              Changes saved successfully!
            </span>
          )}
          <button
            type="submit"
            disabled={isSaving}
            className="h-11 px-8 rounded-btn font-bold text-sm bg-primary-yellow text-primary-navy hover:brightness-110 shadow-sm transition-all flex items-center gap-2 min-w-[140px] justify-center"
          >
            {isSaving ? (
              <div className="w-4 h-4 border-2 border-primary-navy border-t-transparent rounded-full animate-spin" />
            ) : "Save Changes"}
          </button>
        </div>
      </div>
    </form>
  );
}
