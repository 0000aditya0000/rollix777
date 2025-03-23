import React, { useState } from 'react';
import { ArrowLeft, Camera, Mail, Phone, User, Shield, Edit2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '+1 234 567 8900',
    username: 'johndoe777',
    profileImage: '' // Base64 image string
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const getInitials = (name) => {
    const names = name.split(' ');
    return names.length > 1 ? names[0][0] + names[1][0] : names[0][0];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    console.log('Form Submitted:', formData);
  };

  return (
    <div className="pt-16 pb-24">
      <div className="px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link to="/" className="p-2 rounded-lg bg-[#252547] text-purple-400 hover:bg-[#2f2f5a] transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-white">My Profile</h1>
        </div>

        {/* Profile Picture */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white text-3xl font-bold overflow-hidden">
              {formData.profileImage ? (
                <img src={formData.profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                getInitials(formData.fullName)
              )}
            </div>
            <label className="absolute bottom-0 right-0 p-2 rounded-full bg-[#252547] text-purple-400 hover:bg-[#2f2f5a] transition-colors border border-purple-500/20 cursor-pointer">
              <Camera size={18} />
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          </div>
          <div className="mt-4 text-center">
            <h2 className="text-xl font-bold text-white">{formData.fullName}</h2>
            <p className="text-gray-400">VIP Level 2</p>
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl border border-purple-500/20 overflow-hidden">
            <div className="p-4 border-b border-purple-500/10 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">Personal Information</h3>
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="p-2 rounded-lg bg-[#1A1A2E] text-purple-400 hover:bg-purple-500/10 transition-colors"
              >
                <Edit2 size={18} />
              </button>
            </div>
            <div className="p-4 space-y-4">
              {['fullName', 'email', 'phone', 'username'].map((field, index) => (
                <div key={index} className="space-y-1">
                  <label className="text-sm text-gray-400">{field.replace(/([A-Z])/g, ' $1').trim()}</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      {field === 'fullName' && <User className="w-5 h-5 text-purple-400" />}
                      {field === 'email' && <Mail className="w-5 h-5 text-purple-400" />}
                      {field === 'phone' && <Phone className="w-5 h-5 text-purple-400" />}
                      {field === 'username' && <Shield className="w-5 h-5 text-purple-400" />}
                    </div>
                    <input
                      type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                      value={formData[field]}
                      onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                      disabled={!isEditing}
                      className="w-full py-2 pl-10 pr-4 bg-[#1A1A2E] border border-purple-500/20 rounded-lg text-white focus:outline-none focus:border-purple-500 disabled:opacity-50"
                    />
                  </div>
                </div>
              ))}

              {isEditing && (
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
                >
                  Save Changes
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
