import React, { useContext,useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ComputerIcon from "@mui/icons-material/Computer";
import { myContext } from './Context';
export default function NavbarDropDown({ content }) {
  const [startIndex, setStartIndex] = useState(0);
  const visibleItems = Math.min(5, content?.length);
  const navigate=useNavigate();
  const newsItems = content;
  const {lightMode}=useContext(myContext);
   const [isLoading, setIsLoading] = useState(true); // 🚨 Add local loading state

  useEffect(() => {
    if (content && content.length > 0) {
      setIsLoading(false); // ⛳ Only mark as loaded when content is valid
    }
  }, [content]);
if(isLoading){
   return (
  <div
    className={`w-full max-w-7xl top-[70px] left-1/2 transform -translate-x-1/2 fixed rounded-2xl shadow-2xl px-6 py-4 z-50 backdrop-blur-sm h-[400px] flex items-center justify-center ${
      lightMode
        ? "bg-white"
        : "bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95 border border-gray-700/50"
    }`}
  >
    <div className="text-center">
      {/* Animated pulse circles */}
      <div className="relative mb-8">
        <div
          className={`w-20 h-20 rounded-full animate-pulse ${
            lightMode
              ? "bg-gradient-to-r from-indigo-400 to-purple-400"
              : "bg-gradient-to-r from-indigo-600 to-purple-600"
          }`}
        ></div>
        <div
          className={`absolute top-2 left-2 w-16 h-16 rounded-full animate-ping ${
            lightMode
              ? "bg-gradient-to-r from-purple-300 to-indigo-300"
              : "bg-gradient-to-r from-purple-700 to-indigo-700"
          }`}
        ></div>
        <div
          className={`absolute top-4 left-4 w-12 h-12 rounded-full animate-bounce ${
            lightMode
              ? "bg-gradient-to-r from-indigo-200 to-purple-200"
              : "bg-gradient-to-r from-indigo-800 to-purple-800"
          }`}
        ></div>
      </div>

      {/* Loading dots animation */}
      <div className="flex items-center justify-center space-x-2 mb-6">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full animate-bounce ${
              lightMode
                ? "bg-gradient-to-r from-indigo-500 to-purple-500"
                : "bg-gradient-to-r from-indigo-400 to-purple-400"
            }`}
            style={{ animationDelay: `${i * 0.1}s` }}
          ></div>
        ))}
      </div>

      {/* Loading text with shimmer effect */}
      <div className="relative">
        <div
          className={`text-2xl font-bold bg-clip-text text-transparent animate-pulse bg-300% animate-shimmer ${
            lightMode
              ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600"
              : "bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-300"
          }`}
        >
          Loading News...
        </div>
        <div
          className={`text-sm mt-2 animate-pulse ${
            lightMode ? "text-gray-500" : "text-gray-400"
          }`}
        >
          Fetching the latest stories for you
        </div>
      </div>

      {/* Skeleton cards preview */}
      <div className="grid grid-cols-5 gap-4 mt-8 opacity-30">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`rounded-xl h-32 animate-pulse ${
              lightMode
                ? "bg-gradient-to-br from-gray-100 to-gray-200"
                : "bg-gradient-to-br from-gray-700 to-gray-800"
            }`}
            style={{ animationDelay: `${i * 0.1}s` }}
          ></div>
        ))}
      </div>
    </div>

    {/* Floating particles */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute w-2 h-2 rounded-full animate-ping"
        style={{
          top: "10%",
          left: "10%",
          animationDelay: "1s",
          backgroundColor: lightMode ? "#a5b4fc" : "#4f46e5",
        }}
      ></div>
      <div
        className="absolute w-1 h-1 rounded-full animate-ping"
        style={{
          top: "20%",
          right: "16%",
          animationDelay: "1.5s",
          backgroundColor: lightMode ? "#c4b5fd" : "#7c3aed",
        }}
      ></div>
      <div
        className="absolute w-1.5 h-1.5 rounded-full animate-ping"
        style={{
          bottom: "16%",
          left: "20%",
          animationDelay: "2s",
          backgroundColor: lightMode ? "#c7d2fe" : "#312e81",
        }}
      ></div>
      <div
        className="absolute w-1 h-1 rounded-full animate-ping"
        style={{
          bottom: "10%",
          right: "10%",
          animationDelay: "0.5s",
          backgroundColor: lightMode ? "#ddd6fe" : "#5b21b6",
        }}
      ></div>
    </div>
  </div>
);
  }
  const totalItems = newsItems.length;
  const endIndex = Math.min(startIndex + visibleItems, totalItems);
  const currentItems = newsItems.slice(startIndex, endIndex);
  const remItems = newsItems.slice(0, (startIndex + visibleItems) % totalItems);

  const nextSlide = () => {
    setStartIndex((prev) => (prev + 1) % totalItems);
  };

  const prevSlide = () => {
    setStartIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Technology':
        return 'text-amber-600';
      case 'Politics':
        return 'text-blue-600';
      default:
        return 'text-purple-600';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Business':
        return <BusinessCenterIcon  fontSize='small' />;
      case 'Politics':
        return <AccountBalanceIcon fontSize='small' />;
      default:
        return <ComputerIcon fontSize='small' />;
    }
  };



 if(content.length == 0){
    return (
      <div className={`w-full max-w-7xl top-[70px] left-1/2 transform -translate-x-1/2 fixed rounded-2xl shadow-2xl px-6 py-4 z-50 backdrop-blur-sm h-[400px] flex items-center justify-center ${
        lightMode 
          ? 'bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/20 border border-indigo-200/50' 
          : 'bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95 border border-gray-700/50'
      }`}>
        <div className="text-center max-w-md">
          {/* Empty state illustration */}
          <div className="relative mb-8">
            <div className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center ${
              lightMode 
                ? 'bg-gradient-to-br from-gray-100 to-gray-200' 
                : 'bg-gradient-to-br from-gray-700 to-gray-600'
            }`}>
              <div className={`w-16 h-16 rounded-full border-4 border-dashed flex items-center justify-center ${
                lightMode 
                  ? 'border-gray-300' 
                  : 'border-gray-500'
              }`}>
                <svg className={`w-8 h-8 ${
                  lightMode ? 'text-gray-400' : 'text-gray-500'
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
            </div>
            
            {/* Floating decorative elements */}
            <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full animate-pulse ${
              lightMode 
                ? 'bg-gradient-to-r from-indigo-300 to-purple-300' 
                : 'bg-gradient-to-r from-indigo-400 to-purple-400'
            }`}></div>
            <div className={`absolute -bottom-2 -left-2 w-4 h-4 rounded-full animate-pulse ${
              lightMode 
                ? 'bg-gradient-to-r from-purple-300 to-indigo-300' 
                : 'bg-gradient-to-r from-purple-400 to-indigo-400'
            }`} style={{animationDelay: '0.5s'}}></div>
          </div>
          
          {/* Empty state text */}
          <div className="mb-8">
            <h3 className={`text-2xl font-bold mb-3 bg-gradient-to-r bg-clip-text text-transparent ${
              lightMode 
                ? 'from-gray-700 to-gray-900' 
                : 'from-gray-200 to-gray-100'
            }`}>
              No News Available
            </h3>
            <p className={`text-sm leading-relaxed ${
              lightMode ? 'text-gray-500' : 'text-gray-400'
            }`}>
              We couldn't find any news articles at the moment. This might be due to network issues or the content is still being loaded.
            </p>
          </div>
          
          {/* Action suggestions */}
          <div className="space-y-4">
            <button className={`w-full py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
              lightMode 
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white' 
                : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white'
            }`}>
              🔄 Refresh News
            </button>
            
            <div className="flex space-x-3">
              <button className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                lightMode 
                  ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' 
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
              }`}>
                📰 Browse Categories
              </button>
              <button className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                lightMode 
                  ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' 
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
              }`}>
                🔍 Search News
              </button>
            </div>
          </div>
          
          {/* Decorative dots */}
          <div className="flex justify-center space-x-2 mt-8 opacity-50">
            <div className={`w-2 h-2 rounded-full ${
              lightMode ? 'bg-gray-300' : 'bg-gray-600'
            }`}></div>
            <div className={`w-2 h-2 rounded-full animate-pulse ${
              lightMode ? 'bg-indigo-300' : 'bg-indigo-500'
            }`}></div>
            <div className={`w-2 h-2 rounded-full ${
              lightMode ? 'bg-gray-300' : 'bg-gray-600'
            }`}></div>
          </div>
        </div>
        
        {/* Background pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className={`absolute top-1/4 left-1/4 w-32 h-32 rounded-full blur-3xl ${
            lightMode 
              ? 'bg-gradient-to-r from-indigo-200 to-purple-200' 
              : 'bg-gradient-to-r from-indigo-800 to-purple-800'
          }`}></div>
          <div className={`absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full blur-2xl ${
            lightMode 
              ? 'bg-gradient-to-r from-purple-200 to-indigo-200' 
              : 'bg-gradient-to-r from-purple-800 to-indigo-800'
          }`}></div>
        </div>
      </div>
    );
  }


  

  return (
    <div
  className={`w-full max-w-7xl top-[70px] left-1/2 transform -translate-x-1/2 fixed rounded-xl shadow-lg px-4 py-3 z-50 border ${
    lightMode
      ? "bg-gradient-to-r from-indigo-50 via-white to-indigo-50 border-gray-200"
      : "bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 border-gray-700"
  }`}
>
  {/* Header with navigation controls */}
  <div
    className={`flex items-center justify-between px-4 py-1 border-b ${
      lightMode ? "border-gray-200" : "border-gray-700"
    }`}
  >
    <div className="flex items-center space-x-4">
      <span
        className={`font-semibold ${
          lightMode ? "text-gray-700" : "text-gray-300"
        }`}
      >
        {startIndex + 1} —{" "}
        {(startIndex + visibleItems) % totalItems === 0
          ? `${totalItems}`
          : (startIndex + visibleItems) % totalItems}
      </span>
      <div className="flex items-center space-x-1">
        <button
          onClick={prevSlide}
          className={`p-2 rounded-full transition-all duration-300 ${
            lightMode
              ? "text-gray-600 hover:bg-gray-200 hover:text-indigo-600"
              : "text-gray-400 hover:bg-gray-700 hover:text-indigo-400"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className={`p-2 rounded-full transition-all duration-300 ${
            lightMode
              ? "text-gray-600 hover:bg-gray-200 hover:text-indigo-600"
              : "text-gray-400 hover:bg-gray-700 hover:text-indigo-400"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>

    <div className="flex items-center space-x-4">
      <button
        className={`font-medium text-sm transition-colors ${
          lightMode
            ? "text-indigo-600 hover:text-indigo-800"
            : "text-indigo-400 hover:text-indigo-300"
        }`}
      >
        See All →
      </button>
    </div>
  </div>

  {/* News items grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-3">
    {currentItems.map((item) => (
      <div
        key={item.id}
        className={`group cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 ${
          lightMode ? "bg-white" : "bg-gray-800"
        }`}
      >
        {/* Image container */}
        <div className="relative mb-4 rounded-t-xl overflow-hidden bg-gray-200 aspect-[4/3]">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute top-3 right-3"></div>
          <img src={item.image} alt="" className="object-cover w-full h-full" />
        </div>

        {/* Category tags */}
        <div className="flex items-center space-x-2 px-4 mt-1">
          <div className={`${getCategoryColor(item.topic)} flex items-center space-x-1`}>
            <span className="text-xs">{getCategoryIcon(item.topic)}</span>
            <span className={`text-xs font-bold`}>{item.topic}</span>
          </div>
        </div>

        {/* Title */}
        <h3
          onClick={() => navigate(`/articledetail/${item._id}`)}
          className={`font-bold text-sm leading-tight px-4 mb-2 mt-1 transition-colors hover:underline ${
            lightMode
              ? "text-gray-900 group-hover:text-indigo-600"
              : "text-gray-100 group-hover:text-indigo-400"
          }`}
        >
          {item.title}
        </h3>

        {/* Author and date */}
        <div
          className={`text-xs px-4 pb-4 space-y-1 ${
            lightMode ? "text-gray-500" : "text-gray-400"
          }`}
        >
          <div>
            BY{" "}
            <span className={`font-semibold ${lightMode ? "" : "text-gray-300"}`}>
              {item.source}
            </span>
          </div>
          <div>
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(new Date(item.createdAt))}
          </div>
        </div>
      </div>
    ))}

    {endIndex - startIndex < visibleItems &&
      remItems.map((item) => (
        <div
          key={item.id}
          className={`group cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 ${
            lightMode ? "bg-white" : "bg-gray-800"
          }`}
        >
          {/* Image container */}
          <div className="relative mb-4 rounded-t-xl overflow-hidden bg-gray-200 aspect-[4/3]">
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute top-3 right-3">
              <button
                className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                  lightMode
                    ? "bg-white/30 text-white hover:bg-white/40"
                    : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
              </button>
            </div>
            <img
              src={item.image}
              alt=""
              className="object-cover w-full h-full"
            />
          </div>

          {/* Category tags */}
          <div className="flex items-center space-x-2 px-4 mt-1">
            <div className="flex items-center space-x-1">
              <span className="text-xs">{getCategoryIcon(item.topic)}</span>
              <span
                className={`text-xs font-bold ${getCategoryColor(item.topic)}`}
              >
                {item.topic}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3
            className={`font-bold text-sm leading-tight px-4 mb-2 mt-1 transition-colors ${
              lightMode
                ? "text-gray-900 group-hover:text-indigo-600"
                : "text-gray-100 group-hover:text-indigo-400"
            }`}
          >
            {item.title}
          </h3>

          {/* Author and date */}
          <div
            className={`text-xs px-4 pb-4 space-y-1 ${
              lightMode ? "text-gray-500" : "text-gray-400"
            }`}
          >
            <div>
              BY{" "}
              <span
                className={`font-semibold ${lightMode ? "" : "text-gray-300"}`}
              >
                {item.source}
              </span>
            </div>
            <div>
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }).format(new Date(item.createdAt))}
            </div>
          </div>
        </div>
      ))}
  </div>
</div>
  );
}