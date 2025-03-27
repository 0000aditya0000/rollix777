import React, { useEffect, useState, useRef } from "react";
import { ArrowLeft, Camera, Mail, Phone, User, Shield, Edit2, Upload } from "lucide-react";
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
        // Set profile image from base64 data if it exists
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

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
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

    setIsUploading(true);
    try {
      // Convert image to base64
      const base64Image = await convertToBase64(file);
      
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
      const updatedUserData = await updateUserData(userId, formData);
      setFormData(updatedUserData);
      setIsEditing(false);
      setToast({
        message: "Profile updated successfully",
        type: "success"
      });
    } catch (error) {
      setToast({
        message: error instanceof Error ? error.message : "Failed to update profile",
        type: "error"
      });
    }
  };

  return (
    <div className="pt-16 pb-24">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="px-4 py-6 space-y-6">
        <div className="flex items-center gap-4">
          <Link to="/" className="p-2 rounded-lg bg-[#252547] text-purple-400 hover:bg-[#2f2f5a] transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-white">My Profile</h1>
        </div>
        
        {/* Profile Picture Section */}
        <div className="bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl border border-purple-500/20 overflow-hidden">
          <div className="p-4 border-b border-purple-500/10 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white">Profile Picture</h3>
          </div>
          <div className="p-6 flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-[#1A1A2E] border-4 border-purple-500/20">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-600 to-pink-600">
                    <User className="w-16 h-16 text-white" />
                  </div>
                )}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="absolute bottom-0 right-0 p-2 bg-purple-600 rounded-full text-white hover:bg-purple-700 transition-colors disabled:opacity-50"
              >
                {isUploading ? (
                  <Upload className="w-5 h-5 animate-spin" />
                ) : (
                  <Camera className="w-5 h-5" />
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
            <p className="text-gray-400 text-sm text-center">
              {isUploading ? "Uploading..." : "Click the camera icon to upload a new profile picture"}
            </p>
          </div>
        </div>

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
              {["fullName", "email", "phone", "username"].map((field, index) => (
                <div key={index} className="space-y-1">
                  <label className="text-sm text-gray-400">{field.replace(/([A-Z])/g, " $1").trim()}</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      {field === "username" && <Shield className="w-5 h-5 text-purple-400" />}
                      {field === "fullName" && <User className="w-5 h-5 text-purple-400" />}
                      {field === "email" && <Mail className="w-5 h-5 text-purple-400" />}
                      {field === "phone" && <Phone className="w-5 h-5 text-purple-400" />}
                    </div>
                    <input
                      type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                      value={formData[field as keyof FormData]}
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
