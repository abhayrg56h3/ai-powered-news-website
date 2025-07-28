import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Bookmark, BookmarkPlus,Newspaper, Play, Eye, Heart, Calendar, Share2, TrendingUp, Clock, NewspaperIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { myContext } from './Context';

const Carousel = () => {
  const { breaking, setBreaking, currUser, savedList, setSavedList, isBreakingDetail, setIsBreakingDetail } = useContext(myContext);
  const [stop, setStop] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [summaryIndex, setSummaryIndex] = useState(-1);
  const navigate = useNavigate();

  // Fetch on mount
  useEffect(() => {
    async function fetchBreaking() {
      try {
        const response = await axios.get('/api/article/breakingarticles');
        console.log('Breaking articles fetched:', response.data);
        setBreaking(response.data);
      } catch (err) {
        console.error('Error fetching breaking articles:', err);
      }
    }
    fetchBreaking();
  }, [setBreaking]);

  // Loop slides
  useEffect(() => {
    if (isHovering || stop || summaryIndex !== -1) return;
    if (!breaking || breaking.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === breaking.length - 1 ? 0 : prev + 1));
    }, 10000);
    return () => clearInterval(interval);
  }, [breaking, isHovering, stop, summaryIndex]);

  // Reset index when data changes
  useEffect(() => {
    if (breaking && currentSlide >= breaking.length) {
      setCurrentSlide(0);
    }
  }, [breaking, currentSlide]);

  // Handlers
  const prevSlide = () => {
    setSummaryIndex(-1);
    setCurrentSlide((prev) => (prev === 0 ? breaking.length - 1 : prev - 1));
  };
  const nextSlide = () => {
    setSummaryIndex(-1);
    setCurrentSlide((prev) => (prev === breaking.length - 1 ? 0 : prev + 1));
  };
  const goToSlide = (idx) => {
    setSummaryIndex(-1);
    setCurrentSlide(idx);
  };
  const formatDate = (d) =>
    new Date(d).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  const handleAddBookmark = async (article) => {
    try {
      await axios.get('/api/article/savefavourite', {
        params: { id: article._id, userId: currUser._id },
      });
      if (savedList.some((a) => a._id === article._id)) {
        setSavedList(savedList.filter((a) => a._id !== article._id));
      } else {
        setSavedList([...savedList, article]);
      }
    } catch (err) {
      console.error('Error bookmarking article:', err);
      alert('😢 Could not bookmark. Try again later.');
    }
  };
  const handleDetail = (id) => {
    setIsBreakingDetail(true);
    navigate(`/articledetail/${id}`);
  };

  const formatViews = (views) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  return (
    <motion.div
      className="relative w-full h-screen mx-auto overflow-hidden bg-slate-950 flex items-center justify-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Breaking News Header - Mobile Optimized */}
      <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white py-2 sm:py-3 px-3 sm:px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full animate-pulse"></div>
              <span className="font-black text-xs sm:text-sm tracking-wider">BREAKING NEWS</span>
            </div>
            <div className="hidden sm:flex items-center space-x-2 text-xs sm:text-sm font-medium">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Live Coverage</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-xs sm:text-sm">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">{new Date().toLocaleTimeString()}</span>
            <span className="sm:hidden">{new Date().toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}</span>
          </div>
        </div>
      </div>

      {/* Loading State - Mobile Optimized */}
      {!breaking ? (
        <div className="text-center text-white space-y-4 sm:space-y-8 px-4">
          <div className="relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-white/20 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-16 h-16 sm:w-20 sm:h-20 border-4 border-transparent border-t-red-500 rounded-full animate-spin mx-auto" 
                 style={{ animationDirection: 'reverse', animationDelay: '0.3s' }}></div>
          </div>
          <div className="space-y-2 sm:space-y-4">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Loading Breaking News
            </h2>
            <p className="text-sm sm:text-lg text-white/80 font-light">Fetching the latest stories...</p>
            <div className="flex justify-center space-x-1 sm:space-x-2 mt-4 sm:mt-6">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>

      ) : breaking.length === 0 ? (
        <div className="text-center text-white space-y-4 sm:space-y-6 px-4">
          <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <Newspaper size={24} className="sm:w-10 sm:h-10" />
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white/90">No Breaking News Available</h2>
          <p className="text-sm sm:text-lg text-white/70 max-w-md mx-auto">We're currently working to bring you the latest updates. Please check back soon.</p>
        </div>

      ) : (
        <>
          <div className="relative h-full overflow-hidden" style={{ width: '100%' }}>
            <div
              className="flex h-full transition-transform duration-1000 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {breaking.map((slide, idx) => (
                <div
                  key={slide._id}
                  className="w-full flex-shrink-0 relative"
                  onMouseEnter={() => setStop(true)}
                  onMouseLeave={() => setStop(false)}
                >
                  {/* Background with Enhanced Overlay */}
                  <div className="absolute inset-0 overflow-hidden">
                    <img src={slide.image} alt={slide.title} className="object-cover w-full h-full scale-105 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/70"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/60"></div>
                  </div>

                  {/* Main Content - Mobile Optimized */}
                  <div className={`relative z-10 w-full h-full flex flex-col justify-center px-4 sm:px-6 lg:px-12 pt-16 sm:pt-20 pb-12 sm:pb-16 transition-all duration-700 ${summaryIndex === idx ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                    <div className="max-w-7xl mx-auto w-full">
                      <div className="grid lg:grid-cols-12 gap-4 sm:gap-8 items-center">

                        {/* Main Story Content */}
                        <div className="lg:col-span-8 space-y-4 sm:space-y-6 lg:space-y-8">
                          {/* Source Badge - Mobile Optimized */}
                          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                            <span className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs sm:text-sm font-bold rounded-full shadow-lg w-fit">
                              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full mr-1.5 sm:mr-2 animate-pulse"></div>
                              {slide.source}
                            </span>
                            <div className="flex items-center space-x-2 text-white/70 text-xs sm:text-sm">
                              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span>{formatDate(slide.createdAt)}</span>
                            </div>
                          </div>

                          {/* Headline - Mobile Optimized */}
                          <h1
                            onClick={() => handleDetail(slide._id)}
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-tight cursor-pointer group transition-all duration-300 hover:text-blue-200"
                          >
                            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text group-hover:from-blue-200 group-hover:via-white group-hover:to-blue-200 transition-all duration-500">
                              {slide.title}
                            </span>
                          </h1>

                          {/* Engagement Stats - Mobile Optimized */}
                          <div className="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-6">
                            <div className="flex items-center space-x-1.5 sm:space-x-2 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5 sm:px-4 sm:py-2 border border-white/10">
                              <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                              <span className="text-white font-bold text-sm sm:text-lg">{formatViews(slide.views || 0)}</span>
                              <span className="text-white/70 text-xs sm:text-sm">views</span>
                            </div>
                            <div className="flex items-center space-x-1.5 sm:space-x-2 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5 sm:px-4 sm:py-2 border border-white/10">
                              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                              <span className="text-white font-bold text-sm sm:text-lg">{slide.likes.length}</span>
                              <span className="text-white/70 text-xs sm:text-sm">likes</span>
                            </div>
                          </div>

                          {/* Action Buttons - Mobile Optimized */}
                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                            <button
                              onClick={() => setSummaryIndex(idx)}
                              className="flex items-center justify-center sm:justify-start space-x-2 sm:space-x-3 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 hover:from-blue-500 hover:via-blue-400 hover:to-blue-500 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-blue-500/30 group"
                            >
                              <Play className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                              <span className="text-sm sm:text-base">Read Full Story</span>
                            </button>

                            <button
                              onClick={() => handleAddBookmark(slide)}
                              className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white rounded-full transition-all duration-300 hover:scale-110 group border border-white/10 self-center sm:self-auto"
                            >
                              {savedList?.some((a) => a._id === slide._id) ? (
                                <Bookmark className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 fill-current group-hover:scale-110 transition-transform" />
                              ) : (
                                <BookmarkPlus className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
                              )}
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                  {/* Enhanced Summary Modal - Mobile Optimized */}
                  {summaryIndex === idx && (
                    <div className="absolute inset-0 z-20 bg-black/95 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4">
                      <div className="max-w-5xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
                        <motion.div
                          className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl border border-white/10 m-2 sm:m-0"
                          initial={{ opacity: 0, scale: 0.9, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="p-4 sm:p-6 md:p-8 lg:p-12">
                            {/* Modal Header - Mobile Optimized */}
                            <div className="text-center space-y-3 sm:space-y-4 lg:space-y-6 mb-4 sm:mb-6 lg:mb-8">
                              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3">
                                <span className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs sm:text-sm font-bold rounded-full">
                                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full mr-1.5 sm:mr-2"></div>
                                  {slide.source}
                                </span>
                                <div className="flex items-center space-x-2">
                                  <div className="w-1 h-1 bg-white/40 rounded-full hidden sm:block"></div>
                                  <span className="text-white/70 text-xs sm:text-sm">{formatDate(slide.createdAt)}</span>
                                </div>
                              </div>

                              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black text-white leading-tight px-2">
                                {slide.title}
                              </h2>

                              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:gap-8 text-white/80">
                                <div className="flex items-center space-x-1.5 sm:space-x-2">
                                  <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                                  <span className="font-semibold text-xs sm:text-sm">{formatViews(slide.views || 0)} views</span>
                                </div>
                                <div className="flex items-center space-x-1.5 sm:space-x-2">
                                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                                  <span className="font-semibold text-xs sm:text-sm">{slide.likes.length} likes</span>
                                </div>
                                <div className="flex items-center space-x-1.5 sm:space-x-2">
                                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                                  <span className="font-semibold text-xs sm:text-sm">3 min read</span>
                                </div>
                              </div>
                            </div>

                            {/* Story Content - Mobile Optimized */}
                            <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                              <div className="bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/10">
                                <div className="prose prose-sm sm:prose-lg prose-invert max-w-none">
                                  <p className="text-white/95 text-sm sm:text-base lg:text-lg leading-relaxed font-light">
                                    {slide.summary}
                                  </p>
                                </div>
                              </div>

                              {/* Modal Actions - Mobile Optimized */}
                              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-4 sm:pt-6">
                                <button
                                  onClick={() => setSummaryIndex(-1)}
                                  className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white rounded-full font-bold transition-all duration-300 hover:scale-105 shadow-lg text-sm sm:text-base"
                                >
                                  ← Back to Headlines
                                </button>
                                <button
                                  onClick={() => handleDetail(slide._id)}
                                  className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-full font-bold transition-all duration-300 hover:scale-105 shadow-lg text-sm sm:text-base"
                                >
                                  Read Full Article →
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Navigation Controls - Mobile Optimized */}
          {isHovering && (
            <>
              {/* Arrow Navigation - Hidden on Mobile, Shown on Tablet+ */}
              <button
                onClick={prevSlide}
                className="absolute left-2 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-black/50 backdrop-blur-md hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group border border-white/20 shadow-2xl hidden sm:flex"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-black/50 backdrop-blur-md hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group border border-white/20 shadow-2xl hidden sm:flex"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Enhanced Progress Indicators - Always Visible on Mobile */}
          <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 z-20">
            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 bg-black/50 backdrop-blur-md rounded-full px-3 py-2 sm:px-4 sm:py-3 lg:px-6 lg:py-4 border border-white/20 shadow-2xl">
              {breaking.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`relative transition-all duration-500 ${idx === currentSlide
                      ? 'w-8 h-3 sm:w-10 sm:h-3.5 lg:w-12 lg:h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg'
                      : 'w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 bg-white/30 rounded-full hover:bg-white/60 hover:scale-125'
                    }`}
                >
                  {idx === currentSlide && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse opacity-75"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Touch Navigation Hints for Mobile */}
          <div className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 z-20 sm:hidden">
            <div className="text-white/60 text-xs text-center">
              <div className="flex items-center space-x-2 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1.5">
                <span>Swipe left/right</span>
                <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                <span>Tap dots below</span>
              </div>
            </div>
          </div>

          {/* Auto-play Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 z-10 h-0.5 sm:h-1 bg-white/10">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-100 ease-linear shadow-lg"
              style={{
                width: summaryIndex === -1 ? `${((Date.now() % 10000) / 10000) * 100}%` : '0%'
              }}
            ></div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Carousel;