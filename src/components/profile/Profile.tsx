import React, { useEffect, useState, useRef } from "react";
import { ArrowLeft, Camera, Mail, Phone, User, Shield, Edit2, Upload, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { fetchUserData, updateUserData } from "../../lib/services/userService.js";
import Toast from "../Toast";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  username: string;
  image: string;
}

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    username: "",
    image: "",
  });

  useEffect(() => {
    const getUserData = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return console.error("User ID not found in localStorage");

      try {
        const userData = await fetchUserData(userId);
        setFormData({
          fullName: userData.name || "",
          email: userData.email || "",
          phone: userData.phone || "",
          username: userData.username || "",
          image: userData.image || "",
        });
        if (userData.image) {
          setProfileImage(userData.image);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setToast({
          message: "Failed to load profile data",
          type: "error"
        });
      }
    };

    getUserData();
  }, []);

  const compressImage = (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Calculate new dimensions while maintaining aspect ratio
          let width = img.width;
          let height = img.height;
          const maxSize = 800; // Maximum dimension
          
          if (width > height && width > maxSize) {
            height = Math.round((height * maxSize) / width);
            width = maxSize;
          } else if (height > maxSize) {
            width = Math.round((width * maxSize) / height);
            height = maxSize;
          }
          
          canvas.width = width;
          canvas.height = height;
          
          if (!ctx) {
            reject(new Error('Could not get canvas context'));
            return;
          }
          
          ctx.drawImage(img, 0, 0, width, height);
          
          // Convert to blob with reduced quality
          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error('Failed to compress image'));
              }
            },
            'image/jpeg',
            0.7 // Quality parameter (0.7 = 70% quality)
          );
        };
        img.onerror = (error) => reject(error);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const convertToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to convert file to base64'));
        }
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setToast({
        message: "Please select a valid image file",
        type: "error"
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setToast({
        message: "Image size should be less than 5MB",
        type: "error"
      });
      return;
    }

    setIsUploading(true);
    try {
      // Compress image first
      const compressedBlob = await compressImage(file);
      
      // Convert compressed image to base64
      const base64Image = await convertToBase64(compressedBlob);
      
      // Update formData with base64 image
      setFormData(prev => ({
        ...prev,
        image: base64Image
      }));
      
      // Update profile image display
      setProfileImage(base64Image);
      
      setIsUploading(false);
      setToast({
        message: "Profile picture updated successfully",
        type: "success"
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      setIsUploading(false);
      setToast({
        message: "Failed to upload profile picture",
        type: "error"
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");
    if (!userId) {
      setToast({
        message: "User ID not found",
        type: "error"
      });
      return;
    }

    try {
      // Create a new object with all form data including the image
      const payload = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        username: formData.username,
        image: formData.image // Make sure image is included in the payload
      };

      console.log('Submitting payload:', payload); // Debug log
      const updatedUserData = await updateUserData(userId, payload);
      setFormData(updatedUserData);
      setIsEditing(false);
      setToast({
        message: "Profile updated successfully",
        type: "success"
      });
    } catch (error) {
      console.error('Error updating profile:', error); // Debug log
      setToast({
        message: error instanceof Error ? error.message : "Failed to update profile",
        type: "error"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1A2E] via-[#14142B] to-[#1A1A2E] py-12">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
            <Link 
              to="/" 
              className="p-2 sm:p-3 mt-2 rounded-xl bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition-all duration-300 hover:scale-105 transform"
            >
              <ArrowLeft size={20} className="sm:w-6 sm:h-6" />
            </Link>
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold text-white mt-6">Profile Settings</h1>
              <p className="text-sm sm:text-base text-purple-300/60 mt-2">View and update your personal information</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Left Column - Profile Card */}
          <div className="col-span-12 lg:col-span-4 space-y-6 h-fit lg:h-full">
            <div className="bg-[#252547]/50 backdrop-blur-xl rounded-2xl border border-purple-500/20 overflow-hidden shadow-2xl h-full">
              <div className="relative h-24 sm:h-32 bg-gradient-to-r from-purple-600/20 to-pink-600/20">
                <div className="absolute -bottom-12 sm:-bottom-16 w-full flex justify-center">
                  <div className="relative group">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-4 border-[#252547] transition-all duration-300 transform group-hover:scale-105 shadow-xl">
                      {profileImage ? (
                        <img
                          src={profileImage}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-600 to-pink-600">
                          <User className="w-16 h-16 text-white/80" />
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="absolute -bottom-1 right-0 p-2 sm:p-3 bg-purple-600 rounded-full text-white hover:bg-purple-700 transition-all duration-300 transform hover:scale-110 disabled:opacity-50 shadow-lg group-hover:translate-y-0 translate-y-2"
                    >
                      {isUploading ? (
                        <Upload className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
                      ) : (
                        <Camera className="w-3 h-3 sm:w-4 sm:h-4" />
                      )}
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                </div>
              </div>

              <div className="px-4 sm:px-6 pt-16 sm:pt-20 pb-4 sm:pb-6">
                <div className="text-center space-y-1 sm:space-y-2">
                  <h3 className="text-xl sm:text-2xl font-semibold text-white">{formData.fullName || "Your Name"}</h3>
                  <p className="text-sm text-purple-300/60">@{formData.username || "username"}</p>
                </div>
              </div>
            </div>

            
          </div>

          {/* Right Column - Edit Form */}
          <div className="col-span-12 lg:col-span-8 h-fit lg:h-full">
            <div className="bg-[#252547]/50 backdrop-blur-xl rounded-2xl border border-purple-500/20 overflow-hidden shadow-2xl h-full">
              <div className="p-4 sm:p-6 border-b border-purple-500/10 flex flex-row justify-between items-center">
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg sm:text-xl font-semibold text-white">Personal Information</h3>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-sm sm:text-base transition-all duration-300 flex items-center gap-2 whitespace-nowrap
                    ${isEditing 
                      ? 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20' 
                      : 'bg-purple-600 text-white hover:bg-purple-700'}`}
                >
                  {isEditing ? (
                    <>Cancel</>
                  ) : (
                    <>
                      <Edit2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                      <span>Edit Profile</span>
                    </>
                  )}
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { field: "fullName", icon: User, label: "Full Name", placeholder: "Enter your full name" },
                    { field: "username", icon: Shield, label: "Username", placeholder: "Choose a username" },
                    { field: "email", icon: Mail, label: "Email Address", placeholder: "Enter your email" },
                    { field: "phone", icon: Phone, label: "Phone Number", placeholder: "Enter your phone number" }
                  ].map(({ field, icon: Icon, label, placeholder }) => (
                    <div key={field} className="space-y-2">
                      <label className="text-sm font-medium text-purple-300/80 flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        {label}
                      </label>
                      <input
                        type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                        value={formData[field as keyof FormData]}
                        onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                        disabled={!isEditing}
                        placeholder={placeholder}
                        className={`w-full py-3.5 px-4 rounded-xl text-white placeholder-purple-300/30
                          transition-all duration-300 ${
                            isEditing
                              ? 'bg-purple-900/20 border border-purple-500/20 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20'
                              : 'bg-purple-900/10 border border-transparent'
                          } disabled:opacity-75`}
                      />
                    </div>
                  ))}
                </div>

                {isEditing && (
                  <div className="mt-8">
                    <button
                      type="submit"
                      className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-medium 
                        hover:opacity-90 transition-all duration-300 transform hover:scale-[1.01] 
                        focus:outline-none focus:ring-2 focus:ring-purple-500/50 shadow-xl
                        flex items-center justify-center gap-2"
                    >
                      <Check size={20} />
                      Save Changes
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
