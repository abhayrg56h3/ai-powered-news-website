import React, { useState, useEffect, useContext } from "react";
import { useRef } from "react";
import { myContext } from "./Context";
import axios from "axios";
import {
  User,
  Mail,
  Globe,
  MapPin,
  Clock,
  Heart,
  BookOpen,
  Settings,
  Moon,
  Sun,
  Lock,
  LogOut,
  Download,
  Trash2,
  Edit3,
  Camera,
  ChevronRight,
  Bell,
  Shield,
  Eye,
  Smartphone,
  Check,
  X,
  AlertTriangle,
  Save,
  RefreshCw,
  Calendar,
  TrendingUp,
  BarChart3,
  Filter,
  FileText,
} from "lucide-react";








// Main Profile Component
export default function ProfilePage() {
  const { lightMode, currUser } = useContext(myContext);
  

  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState("");
  const inputRef = useRef(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [file, setFile] = useState(null);
  const [name, setName] = useState(null);
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
    // Success message helper
  const showSuccess = (message) => {
    setShowSuccessMessage(message);
    setShowErrorMessage("");
    setTimeout(() => setShowSuccessMessage(""), 3000);
  };

  // Error message helper
  const showError = (message) => {
    setShowErrorMessage(message);
    setShowSuccessMessage("");
    setTimeout(() => setShowErrorMessage(""), 3000);
  };
  useEffect(() => {
    if (!currUser) return;
    setName(currUser.name);
  }, [currUser]);
  const handleClick = () => {
    inputRef.current?.click(); // Trigger file input click
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file); // Convert to local blob URL
      setFile(file);
      setPreviewURL(url); // Store URL to state
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", file);

    try{
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/upload`, formData);

      showSuccess("Profile picture updated successfully!");
      setPreviewURL(res.data.imageUrl); // Update preview with uploaded URL
    } catch (err) {
      console.error("❌ Upload error:", err);
      showError("Upload failed");

    }
  };





  // Save profile changes
  const handleSave = async () => {
    if (!name) {
      showError("Name is required!");
      return;
    }
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/name`, { name });
      console.log(res.data);
      currUser.name = name; // Update local state
      showSuccess("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      showError("Failed to update profile.");
    }

  };

  // Confirm action
  const confirmAction = async (action) => {
    switch (action) {
      case "delete":
        try {
           console.log("Deleting account...");
           await axios.delete(`${import.meta.env.VITE_API_URL}/api/user/delete`);
            await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/logout`);

          showSuccess("Account deleted successfully.");
          window.location.reload(); // Reload to clear user state
        } catch (err) {
          console.error(err);
          showError("Failed to delete account.");
        }
    
        break;
      case "logout":
        try{
          await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/logout`);
          showSuccess("Logged out successfully.");
          window.location.reload(); // Reload to clear user state
        }
        catch(err){
          console.error(err);
          showError("Failed to logout.");
        }
        
        break;
      case "password":
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
          showError("Passwords do not match!");
          return;
        }
        if (passwordForm.newPassword.length < 6) {
          showError("Password must be at least 6 characters.");
          return;
        }
        try{
          const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/password`, {
            oldPassword: passwordForm.oldPassword,
            newPassword: passwordForm.newPassword,
            confirmPassword: passwordForm.confirmPassword,
          });
          showSuccess("Password changed successfully!");
        } catch (err) {
          console.error(err);
          showError("Failed to change password.");
        }
        setPasswordForm({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        break;
    }
    setShowConfirmDialog(null);
  };

  return (

   <div className={`min-h-screen transition-all duration-500 ${!lightMode
      ? "bg-gradient-to-br from-slate-900 via-purple-900/20 to-gray-900"
      : "bg-gradient-to-br from-blue-50 via-indigo-50/30 to-white"
      }`}>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-4 -right-4 w-72 h-72 rounded-full opacity-20 blur-3xl ${!lightMode ? "bg-purple-500" : "bg-blue-400"}`}></div>
        <div className={`absolute -bottom-8 -left-8 w-96 h-96 rounded-full opacity-10 blur-3xl ${!lightMode ? "bg-orange-500" : "bg-indigo-400"}`}></div>
      </div>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-6 right-6 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-8 py-4 rounded-2xl shadow-2xl z-50 flex items-center backdrop-blur-sm border border-white/20 transform animate-pulse">
          <div className="w-6 h-6 mr-3 bg-white/20 rounded-full flex items-center justify-center">
            <Check className="w-4 h-4" />
          </div>
          <span className="font-medium">{showSuccessMessage}</span>
        </div>
      )}

      {/* Error Message */}
      {showErrorMessage && (
        <div className="fixed top-6 right-6 bg-gradient-to-r from-red-500 to-rose-500 text-white px-8 py-4 rounded-2xl shadow-2xl z-50 flex items-center backdrop-blur-sm border border-white/20 transform animate-pulse">
          <div className="w-6 h-6 mr-3 bg-white/20 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <span className="font-medium">{showErrorMessage}</span>
        </div>
      )}

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl border transform scale-100 transition-all duration-300 ${!lightMode 
            ? "bg-gray-800/95 text-white border-gray-700/50 backdrop-blur-xl" 
            : "bg-white/95 backdrop-blur-xl border-gray-200/50"
            }`}>
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center mr-4 shadow-lg">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">Confirm Action</h3>
            </div>
            <div className={`mb-8 ${!lightMode ? "text-gray-300" : "text-gray-600"}`}>
              {showConfirmDialog === "delete" &&
                <div className="space-y-2">
                  <p className="font-medium text-red-500">⚠️ Danger Zone</p>
                  <p>Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost.</p>
                </div>}

              {showConfirmDialog === "logout" &&
                <p>Are you sure you want to logout? You'll need to sign in again to access your account.</p>}
              
              {showConfirmDialog === "password" && (
                <div className="space-y-5 mt-6">
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Current Password"
                      value={passwordForm.oldPassword}
                      onChange={(e) =>
                        setPasswordForm({
                          ...passwordForm,
                          oldPassword: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-200 ${!lightMode
                        ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                        : "border-gray-200 bg-white/50 placeholder-gray-500"
                        }`}
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="New Password"
                      value={passwordForm.newPassword}
                      onChange={(e) =>
                        setPasswordForm({
                          ...passwordForm,
                          newPassword: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-200 ${!lightMode
                        ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                        : "border-gray-200 bg-white/50 placeholder-gray-500"
                        }`}
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Confirm New Password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) =>
                        setPasswordForm({
                          ...passwordForm,
                          confirmPassword: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-200 ${!lightMode
                        ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                        : "border-gray-200 bg-white/50 placeholder-gray-500"
                        }`}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => confirmAction(showConfirmDialog)}
                className={`flex-1 px-6 py-4 rounded-2xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg ${showConfirmDialog === "delete"
                  ? "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white shadow-red-500/25"
                  : "bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white shadow-orange-500/25"
                  }`}
              >
                {showConfirmDialog === "delete" ? "Delete Forever" : "Confirm"}
              </button>
              <button
                onClick={() => setShowConfirmDialog(null)}
                className={`flex-1 px-6 py-4 rounded-2xl font-semibold transition-all duration-200 transform hover:scale-105 ${!lightMode
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-200 shadow-lg"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-lg"
                  }`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-12 pt-24 sm:pt-40 relative z-10">

        {/* Header with Theme Toggle */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6">
          <div className="relative">
            <div className={`absolute -inset-4 rounded-3xl opacity-20 blur-xl ${!lightMode ? "bg-purple-500" : "bg-blue-400"}`}></div>
            <div className="relative">
              <h1 className={`text-4xl sm:text-5xl font-black mb-3 bg-gradient-to-r bg-clip-text text-transparent ${!lightMode 
                ? "from-white via-purple-200 to-purple-300" 
                : "from-gray-900 via-blue-700 to-purple-600"
                }`}>
                Profile Dashboard
              </h1>
              <p className={`text-lg sm:text-xl ${!lightMode ? "text-gray-300" : "text-gray-600"
                }`}>
                ✨ Manage your account with style
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className={`rounded-3xl shadow-2xl border p-8 sm:p-10 transition-all duration-500 hover:shadow-3xl hover:scale-105 backdrop-blur-xl ${!lightMode
              ? "bg-gray-800/80 border-gray-700/50"
              : "bg-white/80 border-gray-200/50"
              }`}>
              <div className="text-center">
                <div className="relative inline-block mb-8">
                  <div className={`absolute inset-0 rounded-full blur-lg opacity-60 ${!lightMode ? "bg-purple-500" : "bg-blue-400"}`}></div>
                  <img 
                    className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-white/20 shadow-2xl object-cover" 
                    src={previewURL || currUser?.profilePicture} 
                    alt="Profile" 
                  />
                  <button
                    className="absolute bottom-2 right-2 w-12 h-12 bg-gradient-to-r from-orange-600 to-orange-500 rounded-full flex items-center justify-center text-white hover:from-orange-700 hover:to-orange-600 transition-all duration-300 shadow-xl transform hover:scale-110 border-2 border-white/20"
                    onClick={handleClick}
                  >
                    <input
                      type="file"
                      ref={inputRef}
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <Camera className="w-5 h-5" />
                  </button>
                  {file && (
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                      <button
                        onClick={handleUpload}
                        className="px-6 py-2 text-sm bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 font-medium"
                      >
                        Upload Photo
                      </button>
                    </div>
                  )}
                </div>

                {isEditing ? (
                  <div className="space-y-6 mt-8">
                    <div className="relative">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) =>
                          setName(e.target.value)
                        }
                        className={`w-full px-5 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-200 text-center font-medium ${!lightMode
                          ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                          : "border-gray-200 bg-white/50 placeholder-gray-500"
                          }`}
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="flex space-x-4">
                      <button
                        onClick={handleSave}
                        className="flex-1 bg-gradient-to-r from-orange-600 to-orange-500 text-white px-6 py-4 rounded-2xl text-sm font-bold hover:from-orange-700 hover:to-orange-600 flex items-center justify-center transition-all duration-200 shadow-xl transform hover:scale-105"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className={`flex-1 px-6 py-4 rounded-2xl text-sm font-bold transition-all duration-200 transform hover:scale-105 shadow-lg ${!lightMode
                          ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                          : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                          }`}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className={`text-2xl font-bold mb-8 ${!lightMode ? "text-white" : "text-gray-900"
                      }`}>
                      {currUser?.name}
                    </h2>
                    <div className={`space-y-6 text-sm ${!lightMode ? "text-gray-300" : "text-gray-600"
                      }`}>
                      <div className={`flex items-center justify-center p-4 rounded-2xl ${!lightMode ? "bg-gray-700/30" : "bg-gray-50/50"}`}>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mr-3">
                          <Mail className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium">{currUser?.email}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsEditing(true)}
                      className={`mt-10 flex items-center justify-center w-full px-8 py-4 rounded-2xl text-sm font-bold transition-all duration-300 hover:scale-105 shadow-lg ${!lightMode
                        ? "bg-gradient-to-r from-orange-900/40 to-orange-800/40 text-orange-300 hover:from-orange-900/60 hover:to-orange-800/60 border border-orange-500/20"
                        : "bg-gradient-to-r from-orange-50 to-orange-100 text-orange-600 hover:from-orange-100 hover:to-orange-200 border border-orange-200"
                        }`}
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit Profile
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="lg:col-span-2">
            <div className={`rounded-3xl shadow-2xl border p-8 sm:p-10 transition-all duration-500 hover:shadow-3xl backdrop-blur-xl ${!lightMode
              ? "bg-gray-800/80 border-gray-700/50"
              : "bg-white/80 border-gray-200/50"
              }`}>
              <div className="flex items-center mb-8">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br flex items-center justify-center mr-4 ${!lightMode ? "from-purple-600 to-blue-600" : "from-blue-600 to-purple-600"}`}>
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <h3 className={`text-2xl font-bold ${!lightMode ? "text-white" : "text-gray-900"
                  }`}>
                  Account Settings
                </h3>
              </div>

              <div className="space-y-6">
                {/* Change Password */}
                {!currUser?.googleId && (
                  <button
                    onClick={() => setShowConfirmDialog("password")}
                    className={`w-full flex items-center justify-between p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] group border-2 ${!lightMode
                      ? "bg-gray-700/50 hover:bg-gray-600/50 text-gray-200 border-gray-600/50 hover:border-blue-500/50"
                      : "bg-gradient-to-r from-blue-50/50 to-indigo-50/50 hover:from-blue-100/50 hover:to-indigo-100/50 text-gray-700 border-blue-200/50 hover:border-blue-400/50"
                      }`}
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mr-4 shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
                        <Lock className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-lg">Change Password</p>
                        <p className={`text-sm ${!lightMode ? "text-gray-400" : "text-gray-500"}`}>
                          🔐 Update your account security
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                )}

                {/* Logout */}
                <button
                  onClick={() => setShowConfirmDialog("logout")}
                  className={`w-full flex items-center justify-between p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] group border-2 ${!lightMode
                    ? "bg-gray-700/50 hover:bg-gray-600/50 text-gray-200 border-gray-600/50 hover:border-yellow-500/50"
                    : "bg-gradient-to-r from-yellow-50/50 to-orange-50/50 hover:from-yellow-100/50 hover:to-orange-100/50 text-gray-700 border-yellow-200/50 hover:border-yellow-400/50"
                    }`}
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mr-4 shadow-lg group-hover:shadow-yellow-500/25 transition-all duration-300">
                      <LogOut className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-lg">Logout</p>
                      <p className={`text-sm ${!lightMode ? "text-gray-400" : "text-gray-500"}`}>
                        👋 Sign out of your account
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" />
                </button>

                {/* Delete Account */}
                <button
                  onClick={() => setShowConfirmDialog("delete")}
                  className={`w-full flex items-center justify-between p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] group border-2 ${!lightMode
                    ? "bg-red-900/20 hover:bg-red-900/40 text-red-400 border-red-500/30 hover:border-red-400/50"
                    : "bg-gradient-to-r from-red-50/50 to-rose-50/50 hover:from-red-100/50 hover:to-rose-100/50 text-red-600 border-red-200/50 hover:border-red-400/50"
                    }`}
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center mr-4 shadow-lg group-hover:shadow-red-500/25 transition-all duration-300">
                      <Trash2 className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-lg">Delete Account</p>
                      <p className={`text-sm ${!lightMode ? "text-red-300" : "text-red-500"}`}>
                        ⚠️ Permanently delete your account
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}