import React, { useContext, useEffect, useState } from 'react'
import HotTopics from './HotTopics'
import WeeklyRoundup from './WeeklyRoundUp'
import { ArrowRight, Sun, Moon, Menu, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { myContext } from './Context'

import {
  Search,
  BookmarkPlus,
} from "lucide-react";

export default function MultiComponent() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { lightMode, setLightMode } = useContext(myContext);

  // Theme classes
  const backgroundClass = lightMode 
    ? "bg-gradient-to-br from-gray-50 via-white to-blue-50" 
    : "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900";
    
  const textPrimaryClass = lightMode ? "text-gray-900" : "text-gray-100";
  const textSecondaryClass = lightMode ? "text-gray-600" : "text-gray-400";
  
  const sidebarClass = lightMode 
    ? "bg-white/90 backdrop-blur-md border-gray-200 shadow-xl" 
    : "bg-gray-800/90 backdrop-blur-md border-gray-700 shadow-2xl";

  const cardClass = lightMode 
    ? "bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg hover:shadow-xl" 
    : "bg-gray-800/80 backdrop-blur-sm border-gray-700 shadow-xl hover:shadow-2xl";

  return (
    <div className={`min-h-screen transition-all duration-500 ${backgroundClass}`}>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`fixed top-16 right-0 h-[calc(100vh-4rem)] w-80 z-50 transform transition-all duration-300 ease-in-out md:hidden ${
        sidebarOpen ? 'translate-x-0' : 'translate-x-full'
      } ${sidebarClass} border-l overflow-y-auto`}>
        <div className="p-6">
          <h3 className={`text-lg font-semibold mb-6 ${textPrimaryClass}`}>
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
              lightMode 
                ? "bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border border-blue-200" 
                : "bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500"
            }`}>
              <div className="flex items-center">
                <Search className={`w-5 h-5 mr-3 ${lightMode ? "text-blue-600" : "text-blue-400"}`} />
                <span className={`font-medium ${textPrimaryClass}`}>Search News</span>
              </div>
            </button>
            <button className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
              lightMode 
                ? "bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 border border-emerald-200" 
                : "bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500"
            }`}>
              <div className="flex items-center">
                <BookmarkPlus className={`w-5 h-5 mr-3 ${lightMode ? "text-emerald-600" : "text-emerald-400"}`} />
                <span className={`font-medium ${textPrimaryClass}`}>Saved Articles</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        
        {/* Universal Vertical Layout for All Devices */}
        <div className="space-y-8 lg:space-y-12">
          
          {/* Hot Topics Section */}
          <div className="w-full">
            <div className={`rounded-2xl lg:rounded-3xl border-2 transition-all duration-500 ${cardClass}`}>
              <div className="overflow-hidden rounded-2xl lg:rounded-3xl">
                <HotTopics />
              </div>
            </div>
          </div>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center py-4">
            <div className={`h-px flex-1 ${lightMode ? "bg-gradient-to-r from-transparent via-gray-300 to-transparent" : "bg-gradient-to-r from-transparent via-gray-600 to-transparent"}`}></div>
            <div className={`mx-6 p-3 rounded-full ${lightMode ? "bg-blue-100 text-blue-600" : "bg-gray-700 text-blue-400"}`}>
              <ArrowRight className="w-5 h-5" />
            </div>
            <div className={`h-px flex-1 ${lightMode ? "bg-gradient-to-r from-transparent via-gray-300 to-transparent" : "bg-gradient-to-r from-transparent via-gray-600 to-transparent"}`}></div>
          </div>

          {/* Weekly Roundup Section */}
          <div className="w-full">
            <div className={`rounded-2xl lg:rounded-3xl border-2 transition-all duration-500 ${cardClass}`}>
              <div className="overflow-hidden rounded-2xl lg:rounded-3xl">
                <WeeklyRoundup />
              </div>
            </div>
          </div>

        </div>

        {/* Floating Action Button for Mobile */}
        <div className="fixed bottom-6 right-6 md:hidden z-30">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`p-4 rounded-full shadow-lg transition-all duration-300 ${
              lightMode 
                ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200" 
                : "bg-blue-500 hover:bg-blue-400 text-white shadow-blue-900"
            }`}
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 ${
          lightMode ? "bg-gradient-to-br from-blue-400 to-purple-400" : "bg-gradient-to-br from-blue-600 to-purple-600"
        }`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-20 ${
          lightMode ? "bg-gradient-to-tr from-emerald-400 to-blue-400" : "bg-gradient-to-tr from-emerald-600 to-blue-600"
        }`}></div>
      </div>
    </div>
  );
}