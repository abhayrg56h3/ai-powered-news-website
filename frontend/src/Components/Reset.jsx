import React, { useContext, useState } from "react";
import axios from "axios";
import { Eye, EyeOff, Mail, Lock, User, Globe, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { myContext } from "./Context";
import { useParams } from "react-router-dom";

export default function Reset() {
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState("");
    const { lightMode, setLightMode } = useContext(myContext);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { token } = useParams();
    const navigate = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/reset/${token}`, { password: newPassword });
            console.log(response.data);
            alert("Password reset successful");
            navigate("/login");
        } catch (error) {
            console.error("Error resetting password:", error);
            alert("Failed to reset password");
        }
    };

    // Theme classes
    const backgroundClass = lightMode
        ? "bg-gradient-to-br from-gray-50 to-white"
        : "bg-gradient-to-br from-gray-900 to-gray-800";

    const leftPanelClass = lightMode
        ? "bg-gradient-to-br from-orange-50 to-gray-100"
        : "bg-gradient-to-br from-gray-800 to-gray-900";

    const cardClass = lightMode
        ? "bg-white border-gray-200 shadow-lg"
        : "bg-gray-800 border-gray-700 shadow-2xl";

    const textPrimaryClass = lightMode ? "text-gray-900" : "text-gray-100";
    const textSecondaryClass = lightMode ? "text-gray-600" : "text-gray-400";
    const textTertiaryClass = lightMode ? "text-gray-700" : "text-gray-300";

    const inputClass = lightMode
        ? "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-orange-500 focus:border-orange-500"
        : "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-500 focus:ring-orange-400 focus:border-orange-400";

    return (
        <div className={`min-h-screen flex transition-colors duration-300 ${backgroundClass}`}>
            {/* Theme Toggle Button */}
            <button
                onClick={() => setLightMode(!lightMode)}
                className={`fixed top-4 right-4 z-50 p-3 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg ${lightMode
                        ? "bg-white text-gray-800 hover:bg-gray-100 border border-gray-200"
                        : "bg-gray-800 text-yellow-400 hover:bg-gray-700 border border-gray-600"
                    }`}
                aria-label="Toggle theme"
            >
                {lightMode ? (
                    <Moon className="w-5 h-5" />
                ) : (
                    <Sun className="w-5 h-5" />
                )}
            </button>

            {/* Left Side - Branding */}
            <div className={`hidden lg:flex lg:w-1/2 xl:w-3/5 ${leftPanelClass} relative overflow-hidden transition-colors duration-300`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-20 h-20 bg-orange-500 rounded-full"></div>
                    <div className="absolute top-32 right-20 w-16 h-16 bg-orange-400 rounded-full"></div>
                    <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-orange-300 rounded-full"></div>
                    <div className="absolute bottom-32 right-10 w-12 h-12 bg-orange-600 rounded-full"></div>
                </div>

                <div className="relative z-10 flex flex-col justify-center items-center p-8 xl:p-12 w-full">
                    {/* Branding Content */}
                    <div className="text-center max-w-lg">
                        <div className="mb-12">
                            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 shadow-xl transition-colors duration-300 ${lightMode ? "bg-white" : "bg-gray-800"
                                }`}>
                                <Globe className="w-10 h-10 text-orange-600" />
                            </div>
                            <h1 className={`text-5xl xl:text-6xl font-bold mb-4 transition-colors duration-300 ${lightMode ? "text-orange-900" : "text-white"
                                }`}>
                                NewsHub
                            </h1>
                            <p className={`text-xl xl:text-2xl font-medium transition-colors duration-300 ${lightMode ? "text-gray-600" : "text-gray-300"
                                }`}>
                                Stay Informed, Stay Ahead
                            </p>
                        </div>

                        <div className="space-y-8">
                            <h2 className={`text-3xl xl:text-4xl font-bold transition-colors duration-300 ${lightMode ? "text-gray-800" : "text-white"
                                }`}>
                                Connect to Breaking News
                            </h2>
                            <p className={`text-lg xl:text-xl transition-colors duration-300 ${lightMode ? "text-gray-600" : "text-gray-300"
                                }`}>
                                Access real-time news updates from around the world with personalized insights.
                            </p>

                            <div className="mt-8 space-y-4 text-left">
                                {[
                                    "Breaking news alerts",
                                    "Personalized news feed",
                                    "Premium investigative reports",
                                    "Global coverage in real-time"
                                ].map((feature, index) => (
                                    <div key={index} className="flex items-center group">
                                        <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mr-4 group-hover:scale-125 transition-transform duration-300"></div>
                                        <span className={`text-lg transition-colors duration-300 ${lightMode ? "text-gray-700" : "text-gray-300"
                                            }`}>
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-4 sm:p-6 lg:p-8">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden text-center mb-8">
                        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 shadow-lg transition-colors duration-300 ${lightMode ? "bg-white border border-gray-200" : "bg-gray-800 border border-gray-600"
                            }`}>
                            <Globe className="w-7 h-7 text-orange-600" />
                        </div>
                        <h1 className={`text-3xl font-bold transition-colors duration-300 ${lightMode ? "text-orange-900" : "text-white"
                            }`}>
                            NewsHub
                        </h1>
                        <p className={`text-sm mt-2 transition-colors duration-300 ${textSecondaryClass}`}>
                            Stay informed with the latest news
                        </p>
                    </div>

                    {/* Login Form */}
                    <div className={`rounded-2xl border p-8 transition-colors duration-300 ${cardClass}`}>
                        {/* Form Heading */}
                        <div className="text-center mb-8">
                            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-6 transition-colors duration-300 ${lightMode ? "bg-orange-50" : "bg-orange-900/30"
                                }`}>
                                <User className="w-5 h-5 text-orange-600" />
                            </div>
                            <h2 className={`text-2xl font-bold mb-2 transition-colors duration-300 ${textPrimaryClass}`}>
                                Welcome Back
                            </h2>
                            <p className={`text-sm transition-colors duration-300 ${textSecondaryClass}`}>
                                Reset Your Password
                            </p>
                        </div>

                        <form className="space-y-6">

                            
                           
                            

                            {/* Password Input */}
                            <div>
                                <label className={`block text-sm font-medium mb-3 transition-colors duration-300 ${textTertiaryClass}`}>
                                   New Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className={`h-5 w-5 transition-colors duration-300 ${textSecondaryClass}`} />
                                    </div>
                                    <input
                                        type={showNewPassword ? "text" : "password"}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className={`w-full pl-11 pr-11 py-3 border rounded-xl transition-all duration-300 focus:ring-2 focus:ring-offset-2 text-sm ${inputClass} ${!lightMode ? "focus:ring-offset-gray-800" : ""
                                            }`}
                                        placeholder="Enter your new password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        className={`absolute inset-y-0 right-0 pr-4 flex items-center transition-colors duration-300 hover:scale-110 ${textSecondaryClass}`}
                                    >
                                        {showNewPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className={`block text-sm font-medium mb-3 transition-colors duration-300 ${textTertiaryClass}`}>
                                   Confirm Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className={`h-5 w-5 transition-colors duration-300 ${textSecondaryClass}`} />
                                    </div>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className={`w-full pl-11 pr-11 py-3 border rounded-xl transition-all duration-300 focus:ring-2 focus:ring-offset-2 text-sm ${inputClass} ${!lightMode ? "focus:ring-offset-gray-800" : ""
                                            }`}
                                        placeholder="Enter your new password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className={`absolute inset-y-0 right-0 pr-4 flex items-center transition-colors duration-300 hover:scale-110 ${textSecondaryClass}`}
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            

                            {/* Submit Button */}
                            <button
                                // onClick={handleLogin}
                                onClick={handleResetPassword}
                                type="button"
                                className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white py-3 px-6 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-sm transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                            >
                                Reset
                            </button>
                        </form>

                     

                       


                        {/* Terms and Privacy */}
                        <div className="mt-6 text-center">
                            <p className={`text-xs transition-colors duration-300 ${textSecondaryClass}`}>
                                By continuing, you agree to our{" "}
                                <a href="#" className="text-orange-600 hover:text-orange-800 font-medium transition-colors duration-300">
                                    Terms of Service
                                </a>{" "}
                                and{" "}
                                <a href="#" className="text-orange-600 hover:text-orange-800 font-medium transition-colors duration-300">
                                    Privacy Policy
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}