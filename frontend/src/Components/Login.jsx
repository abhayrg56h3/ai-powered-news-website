import React, { useContext, useState } from "react";
import axios from "axios";
import { Eye, EyeOff, Mail, Lock, User, Globe, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { myContext } from "./Context";

export default function NewsLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [register, setRegister] = useState(false);
  const { lightMode, setLightMode } = useContext(myContext);
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");

  async function handleGoogleLogin() {
    try {
      console.log("Login started");
      window.location.href = 'http://localhost:5000/api/auth/google';
    } catch (err) {
      console.log(err);
    }
  }

  async function handleLogin() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check email format
    if (!emailRegex.test(email)) {
      alert("❗ Please enter a valid email address ✉️");
      return;
    }
    
    if (register) {
      try {
        const response = await axios.post('/api/auth/signup', {
          email,
          password,
          name: fullName
        });
        console.log(response.data);
        setRegister(false);
        window.location.href = '/preferences';
      } catch (err) {
        if (err.response && err.response.status === 400) {
          alert("⚠️ User already exists!");
        } else {
          console.error("🚨 Signup Error:", err);
          alert("Something went wrong during signup.");
        }
      }
    } else {
      try {
        const response = await axios.post('/api/auth/login', {
          email,
          password,
          rememberMe
        });
        console.log("✅ Login Successful!", response.data);
        window.location.href = '/';
      } catch (err) {
        if (err.response && err.response.status === 401) {
          alert("❌ Invalid credentials!");
        } else {
          console.error("🚨 Login Error:", err);
          alert("Something went wrong during login.");
        }
      }
    }
  }

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
        className={`fixed top-4 right-4 z-50 p-3 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg ${
          lightMode 
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
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 shadow-xl transition-colors duration-300 ${
                lightMode ? "bg-white" : "bg-gray-800"
              }`}>
                <Globe className="w-10 h-10 text-orange-600" />
              </div>
              <h1 className={`text-5xl xl:text-6xl font-bold mb-4 transition-colors duration-300 ${
                lightMode ? "text-orange-900" : "text-white"
              }`}>
                NewsHub
              </h1>
              <p className={`text-xl xl:text-2xl font-medium transition-colors duration-300 ${
                lightMode ? "text-gray-600" : "text-gray-300"
              }`}>
                Stay Informed, Stay Ahead
              </p>
            </div>

            <div className="space-y-8">
              <h2 className={`text-3xl xl:text-4xl font-bold transition-colors duration-300 ${
                lightMode ? "text-gray-800" : "text-white"
              }`}>
                Connect to Breaking News
              </h2>
              <p className={`text-lg xl:text-xl transition-colors duration-300 ${
                lightMode ? "text-gray-600" : "text-gray-300"
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
                    <span className={`text-lg transition-colors duration-300 ${
                      lightMode ? "text-gray-700" : "text-gray-300"
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
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 shadow-lg transition-colors duration-300 ${
              lightMode ? "bg-white border border-gray-200" : "bg-gray-800 border border-gray-600"
            }`}>
              <Globe className="w-7 h-7 text-orange-600" />
            </div>
            <h1 className={`text-3xl font-bold transition-colors duration-300 ${
              lightMode ? "text-orange-900" : "text-white"
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
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-6 transition-colors duration-300 ${
                lightMode ? "bg-orange-50" : "bg-orange-900/30"
              }`}>
                <User className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className={`text-2xl font-bold mb-2 transition-colors duration-300 ${textPrimaryClass}`}>
                Welcome Back
              </h2>
              <p className={`text-sm transition-colors duration-300 ${textSecondaryClass}`}>
                {register ? "Create your account to get started" : "Sign in to access your personalized news feed"}
              </p>
            </div>

            <form className="space-y-6">

              {/* Username Input */}
              {register && <div>
                <label className={`block text-sm font-medium mb-3 transition-colors duration-300 ${textTertiaryClass}`}>
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className={`h-5 w-5 transition-colors duration-300 ${textSecondaryClass}`} />
                  </div>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={`w-full pl-11 pr-11 py-3 border rounded-xl transition-all duration-300 focus:ring-2 focus:ring-offset-2 text-sm ${inputClass} ${
                      !lightMode ? "focus:ring-offset-gray-800" : ""
                    }`}
                    placeholder="Enter your full name"
                  />
                  
                </div>
              </div>
}
              {/* Email Input */}
              <div>
                <label className={`block text-sm font-medium mb-3 transition-colors duration-300 ${textTertiaryClass}`}>
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className={`h-5 w-5 transition-colors duration-300 ${textSecondaryClass}`} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full pl-11 pr-4 py-3 border rounded-xl transition-all duration-300 focus:ring-2 focus:ring-offset-2 text-sm ${inputClass} ${
                      !lightMode ? "focus:ring-offset-gray-800" : ""
                    }`}
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className={`block text-sm font-medium mb-3 transition-colors duration-300 ${textTertiaryClass}`}>
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className={`h-5 w-5 transition-colors duration-300 ${textSecondaryClass}`} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full pl-11 pr-11 py-3 border rounded-xl transition-all duration-300 focus:ring-2 focus:ring-offset-2 text-sm ${inputClass} ${
                      !lightMode ? "focus:ring-offset-gray-800" : ""
                    }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute inset-y-0 right-0 pr-4 flex items-center transition-colors duration-300 hover:scale-110 ${textSecondaryClass}`}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              {!register && (
                <div className="flex items-center justify-between">
                  
                  <button
                    type="button"
                    onClick={() => navigate('/forgot')}
                    className="text-sm text-orange-600 hover:text-orange-800 font-medium transition-colors duration-300 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleLogin}
                type="button"
                className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white py-3 px-6 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-sm transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
              >
                {register ? 'Create Account' : 'Sign In'}
              </button>
            </form>

            {/* Toggle Register/Login */}
            <div className="mt-6 text-center">
              <p className={`text-sm transition-colors duration-300 ${textSecondaryClass}`}>
                {register ? "Already have an account?" : "Don't have an account?"}{" "}
                <button
                  onClick={() => setRegister(!register)}
                  className="text-orange-600 hover:text-orange-800 font-medium transition-colors duration-300 hover:underline"
                >
                  {register ? 'Sign In' : 'Create Account'}
                </button>
              </p>
            </div>

            {/* Divider */}
            <div className="relative mt-8">
              <div className="absolute inset-0 flex items-center">
                <div className={`w-full border-t transition-colors duration-300 ${
                  lightMode ? "border-gray-300" : "border-gray-600"
                }`}></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className={`px-4 transition-colors duration-300 ${
                  lightMode ? "bg-white text-gray-500" : "bg-gray-800 text-gray-400"
                }`}>
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Login */}
            <div className="mt-6">
              <button 
                onClick={handleGoogleLogin} 
                className={`w-full flex justify-center items-center py-3 px-4 border rounded-xl shadow-sm text-sm font-medium transition-all duration-300 hover:scale-[1.02] ${
                  lightMode 
                    ? "border-gray-300 text-gray-700 bg-white hover:bg-gray-50" 
                    : "border-gray-600 text-gray-300 bg-gray-700 hover:bg-gray-600"
                }`}
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </button>
            </div>

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