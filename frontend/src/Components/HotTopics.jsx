import React, { useContext, useEffect, useState } from 'react';
import { Bookmark, BookmarkPlus, Flame, Eye, Heart, Calendar, TrendingUp, Sparkles } from 'lucide-react';
import axios from 'axios';
import ComputerIcon from "@mui/icons-material/Computer";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import ScienceIcon from "@mui/icons-material/Science";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import WarningIcon from "@mui/icons-material/Warning";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import GavelIcon from "@mui/icons-material/Gavel";
import SecurityIcon from "@mui/icons-material/Security";
import PublicIcon from "@mui/icons-material/Public";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import SpaIcon from "@mui/icons-material/Spa";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import MovieIcon from "@mui/icons-material/Movie";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import FlightIcon from "@mui/icons-material/Flight";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import SchoolIcon from "@mui/icons-material/School";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CodeIcon from "@mui/icons-material/Code";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import DataObjectIcon from "@mui/icons-material/DataObject";
import SecurityUpdateGoodIcon from "@mui/icons-material/SecurityUpdateGood";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import StyleIcon from "@mui/icons-material/Style";
import BrushIcon from "@mui/icons-material/Brush";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import ArticleIcon from "@mui/icons-material/Article";
import { BookMarked } from "lucide-react";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useNavigate } from 'react-router-dom';
import { myContext } from './Context';

const iconProps = { fontSize: "small" };

const topics = [
  { name: "Technology", icon: <ComputerIcon {...iconProps} /> },
  { name: "Health", icon: <HealthAndSafetyIcon {...iconProps} /> },
  { name: "Science", icon: <ScienceIcon {...iconProps} /> },
  { name: "Business", icon: <BusinessCenterIcon {...iconProps} /> },
  { name: "Finance", icon: <AttachMoneyIcon {...iconProps} /> },
  { name: "Economy", icon: <TrendingUpIcon {...iconProps} /> },
  { name: "Disasters", icon: <WarningIcon {...iconProps} /> },
  { name: "War", icon: <MilitaryTechIcon {...iconProps} /> },
  { name: "Conflict", icon: <GavelIcon {...iconProps} /> },
  { name: "Terrorism", icon: <SecurityIcon {...iconProps} /> },
  { name: "Peace & Diplomacy", icon: <PublicIcon {...iconProps} /> },
  { name: "Politics", icon: <AccountBalanceIcon {...iconProps} /> },
  { name: "International Affairs", icon: <PublicIcon {...iconProps} /> },
  { name: "Social Issues", icon: <QuestionAnswerIcon {...iconProps} /> },
  { name: "Climate", icon: <SpaIcon {...iconProps} /> },
  { name: "Space", icon: <RocketLaunchIcon {...iconProps} /> },
  { name: "Sports", icon: <SportsSoccerIcon {...iconProps} /> },
  { name: "Entertainment", icon: <MovieIcon {...iconProps} /> },
  { name: "Movies", icon: <MovieIcon {...iconProps} /> },
  { name: "Music", icon: <MusicNoteIcon {...iconProps} /> },
  { name: "Gaming", icon: <SportsEsportsIcon {...iconProps} /> },
  { name: "Travel", icon: <FlightIcon {...iconProps} /> },
  { name: "Food", icon: <RestaurantIcon {...iconProps} /> },
  { name: "Education", icon: <SchoolIcon {...iconProps} /> },
  { name: "Career", icon: <WorkOutlineIcon {...iconProps} /> },
  { name: "Productivity", icon: <SelfImprovementIcon {...iconProps} /> },
  { name: "Startups", icon: <AutoAwesomeIcon {...iconProps} /> },
  { name: "Coding", icon: <CodeIcon {...iconProps} /> },
  { name: "Robotics", icon: <SmartToyIcon {...iconProps} /> },
  { name: "Biotech", icon: <DataObjectIcon {...iconProps} /> },
  { name: "Artificial Intelligence", icon: <SmartToyIcon {...iconProps} /> },
  { name: "Data Science", icon: <DataObjectIcon {...iconProps} /> },
  { name: "Cybersecurity", icon: <SecurityUpdateGoodIcon {...iconProps} /> },
  { name: "Cryptocurrency", icon: <MonetizationOnIcon {...iconProps} /> },
  { name: "Automobile", icon: <DriveEtaIcon {...iconProps} /> },
  { name: "Photography", icon: <PhotoCameraIcon {...iconProps} /> },
  { name: "Fashion", icon: <StyleIcon {...iconProps} /> },
  { name: "Art", icon: <BrushIcon {...iconProps} /> },
  { name: "Books", icon: <MenuBookIcon {...iconProps} /> },
  { name: "Astrology", icon: <SelfImprovementIcon {...iconProps} /> },
  { name: "Mental Health", icon: <SelfImprovementIcon {...iconProps} /> },
  { name: "Psychology", icon: <QuestionAnswerIcon {...iconProps} /> },
  { name: "Parenting", icon: <ChildCareIcon {...iconProps} /> },
  { name: "DIY", icon: <HomeRepairServiceIcon {...iconProps} /> },
  { name: "Fitness", icon: <FitnessCenterIcon {...iconProps} /> },
  { name: "Spirituality", icon: <SpaIcon {...iconProps} /> },
  { name: "Legal", icon: <GavelOutlinedIcon {...iconProps} /> },
  { name: "News Analysis", icon: <ArticleIcon {...iconProps} /> },
  { name: "Philosophy", icon: <QuestionAnswerIcon {...iconProps} /> },
  { name: "History", icon: <HistoryEduIcon {...iconProps} /> },
  { name: "Innovation", icon: <AutoAwesomeIcon {...iconProps} /> },
];

const sourceLogos = [
  {
    name: "AlJazeera",
    logo: "/aljazeera.png",
  },
  {
    name: "BBC",
    logo: "/bbc.png",
  },
  {
    name: "CNBC",
    logo: "/cnbc.png",
  },
  {
    name: "NDTV",
    logo: "/ndtv.png",
  },
  {
    name: "Reuters",
    logo: "/reuters.png",
  },
  {
    name: "TechCrunch",
    logo: "/techchrunch.png",
  },
  {
    name: "The Guardian",
    logo: "/theguardian.png",
  },
  {
    name: "The Hindu",
    logo: "/thehindu.png",
  },
  {
    name: "Times of India",
    logo: "/toi.png",
  },
];

const sourceMap = Object.fromEntries(
  sourceLogos.map((s) => [s.name, { ...s }])
);

const topicMap = Object.fromEntries(
  topics.map((t) => [t.name, { ...t }])
);

// Skeleton component for featured article
const FeaturedSkeleton = ({ lightMode }) => (
  <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl">
    <div className={`w-full h-64 sm:h-80 lg:h-96 xl:h-[500px] ${lightMode ? 'bg-gray-200' : 'bg-gray-700'} animate-pulse`}></div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
    
    {/* Floating Elements */}
    <div className="absolute top-6 right-6 flex items-center space-x-3">
      <div className={`px-3 py-1 rounded-full backdrop-blur-md ${lightMode ? "bg-white/20" : "bg-black/20"} animate-pulse`}>
        <div className="w-12 h-3 bg-white/30 rounded"></div>
      </div>
      <div className="p-3 bg-white/10 backdrop-blur-md rounded-full animate-pulse">
        <div className="w-5 h-5 bg-white/30 rounded"></div>
      </div>
    </div>

    {/* Content */}
    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10">
      {/* Tags */}
      <div className="mb-4 lg:mb-6 flex gap-2">
        <div className="px-3 py-1 rounded-full bg-white/20 animate-pulse">
          <div className="w-16 h-4 bg-white/30 rounded"></div>
        </div>
        <div className="px-3 py-1 rounded-full bg-white/20 animate-pulse">
          <div className="w-12 h-4 bg-white/30 rounded"></div>
        </div>
      </div>

      {/* Title */}
      <div className="mb-4 lg:mb-6 space-y-3">
        <div className="h-8 bg-white/20 rounded animate-pulse"></div>
        <div className="h-8 bg-white/20 rounded w-3/4 animate-pulse"></div>
        <div className="h-8 bg-white/20 rounded w-1/2 animate-pulse"></div>
      </div>

      {/* Stats */}
      <div className="flex items-center mb-4 lg:mb-6 space-x-6">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-white/30 rounded animate-pulse"></div>
          <div className="w-12 h-4 bg-white/30 rounded animate-pulse"></div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-white/30 rounded animate-pulse"></div>
          <div className="w-12 h-4 bg-white/30 rounded animate-pulse"></div>
        </div>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/50 to-transparent mb-4 lg:mb-6"></div>

      {/* Author Info */}
      <div className="flex items-center">
        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/20 animate-pulse mr-4"></div>
        <div className="space-y-2">
          <div className="w-24 h-4 bg-white/30 rounded animate-pulse"></div>
          <div className="w-20 h-3 bg-white/30 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  </div>
);

// Skeleton component for grid articles
const GridSkeleton = ({ lightMode }) => (
  <div className="rounded-2xl overflow-hidden shadow-xl">
    <div className={`w-full h-64 sm:h-80 ${lightMode ? 'bg-gray-200' : 'bg-gray-700'} animate-pulse`}></div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
    
    {/* Floating Bookmark */}
    <div className="absolute top-4 right-4 p-3 bg-white/10 backdrop-blur-md rounded-full animate-pulse">
      <div className="w-4 h-4 bg-white/30 rounded"></div>
    </div>

    {/* Content */}
    <div className="absolute bottom-0 left-0 right-0 p-6">
      {/* Tags */}
      <div className="mb-4 flex gap-2">
        <div className="px-3 py-1 rounded-full bg-white/20 animate-pulse">
          <div className="w-12 h-3 bg-white/30 rounded"></div>
        </div>
        <div className="px-3 py-1 rounded-full bg-white/20 animate-pulse">
          <div className="w-16 h-3 bg-white/30 rounded"></div>
        </div>
      </div>

      {/* Title */}
      <div className="mb-4 space-y-2">
        <div className="h-6 bg-white/20 rounded animate-pulse"></div>
        <div className="h-6 bg-white/20 rounded w-2/3 animate-pulse"></div>
      </div>

      {/* Stats */}
      <div className="flex items-center mb-4 text-sm space-x-4">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-white/30 rounded animate-pulse"></div>
          <div className="w-8 h-3 bg-white/30 rounded animate-pulse"></div>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-white/30 rounded animate-pulse"></div>
          <div className="w-8 h-3 bg-white/30 rounded animate-pulse"></div>
        </div>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent mb-4"></div>

      {/* Author Info */}
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full bg-white/20 animate-pulse mr-3"></div>
        <div className="space-y-1">
          <div className="w-16 h-3 bg-white/30 rounded animate-pulse"></div>
          <div className="w-12 h-2 bg-white/30 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  </div>
);

// Empty state component that maintains layout
const EmptyState = ({ lightMode, textSecondaryClass }) => (
  <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl group">
    <div className="w-full h-64 sm:h-80 lg:h-96 xl:h-[500px] bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
      <div className="text-center">
        <Flame className="w-16 h-16 text-gray-500 mx-auto mb-4" />
        <p className="text-gray-600 text-lg font-medium">No hot topics available</p>
        <p className="text-gray-500 text-sm mt-2">Check back later for trending stories</p>
      </div>
    </div>
    
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
    
    {/* Maintain same structure for consistency */}
    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 lg:mb-6 leading-tight">
          Stay tuned for hot topics!
        </h2>
        <p className="text-white/90 text-base lg:text-lg">
          We're working on bringing you the most engaging stories
        </p>
      </div>
    </div>
  </div>
);

const HotTopics = () => {
  const navigate = useNavigate();
  const { currUser, lightMode, savedList, setSavedList, hotTopics, setHotTopics, breaking } = useContext(myContext);
  const [articles, setArticles] = useState([]);

  useEffect(() => {

       
    async function fetchArticles() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/article/fetchhottopics`);
        setArticles(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching hot topics:', error);
      }
    };
    fetchArticles();
  }, []);

  useEffect(() => {
    if (!Array.isArray(articles) || !Array.isArray(breaking)) return;

    let cnt = 0;
    const updatedArticles = [];

    for (const article of articles) {
      const isBreaking = breaking.some(b => b.url === article.url);
      if (!isBreaking) {
        updatedArticles.push(article);
        cnt++;
      }
      if (cnt === 3) break;
    }
    
    console.log("Updated Articles:", updatedArticles, breaking);
    setHotTopics(updatedArticles);
  }, [breaking, articles]);

  const gridArticles = hotTopics?.slice(1);

  const tagGradients = [
    'from-pink-500 to-rose-500', 
    'from-indigo-500 to-purple-500',
    'from-emerald-500 to-teal-500',
    'from-amber-500 to-orange-500'
  ];
  
  const bgGradients = [
    'from-blue-500 to-cyan-500',
    'from-green-500 to-lime-500',
    'from-purple-500 to-violet-500',
    'from-orange-500 to-red-500'
  ];

  // Theme classes
  const backgroundClass = lightMode 
    ? "bg-gradient-to-br from-gray-50 to-white" 
    : "bg-gradient-to-br from-gray-900 to-gray-800";
    
  const textPrimaryClass = lightMode ? "text-gray-900" : "text-gray-100";
  const textSecondaryClass = lightMode ? "text-gray-600" : "text-gray-400";
  const textTertiaryClass = lightMode ? "text-gray-500" : "text-gray-500";

  const renderTags = (article) =>
    article?.tags?.length > 0 && (
      <div className="flex flex-wrap gap-2">
        {article.tags.slice(0, 2).map((tag, i) => (
          <span
            key={i}
            className={`flex items-center px-3 py-1 text-xs font-bold text-white rounded-sm bg-gradient-to-r ${tagGradients[i % tagGradients.length]} shadow-lg backdrop-blur-sm`}
          >
            {tag}
          </span>
        ))}
      </div>
    );

  async function handleAddBookmark(article) {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/article/savefavourite`, {
        params: { id: article._id, userId: currUser._id }
      });

      if (savedList.some(item => item._id === article._id)) {
        setSavedList(savedList.filter(item => item._id !== article._id));
      } else {
        setSavedList([...savedList, article]);
      }
    } catch (error) {
      console.error("Error bookmarking article:", error);
      alert("An error occurred while bookmarking the article.");
    }
  };

  return (
    <div className={`min-h-screen ${backgroundClass} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header */}
        <div className="mb-8 lg:mb-12">
          <div className="flex items-center mb-6">
            <div className="relative">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 rounded-xl shadow-lg">
                <Flame className="w-6 h-6" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
            <div className="ml-4">
              <span className={`text-xs font-semibold ${textTertiaryClass} uppercase tracking-wider`}>
                WHAT'S POPULAR
              </span>
              <div className="flex items-center gap-2 mt-1">
                <TrendingUp className="w-4 h-4 text-orange-500" />
                <span className={`text-sm ${textSecondaryClass}`}>Trending Now</span>
              </div>
            </div>
          </div>
          
          <div className="text-center lg:text-left">
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold ${textPrimaryClass} mb-4`}>
              Hot <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Topics</span>
            </h1>
            <p className={`text-lg ${textSecondaryClass} max-w-2xl ${lightMode ? 'lg:mx-0' : 'lg:mx-0'} mx-auto`}>
              Discover the most engaging stories that everyone's talking about
            </p>
          </div>
        </div>

        {/* Featured Article */}
        <div className="mb-8 lg:mb-12">
          {hotTopics === null || savedList === null ? (
            <FeaturedSkeleton lightMode={lightMode} />
          ) : hotTopics.length === 0 ? (
            <EmptyState lightMode={lightMode} textSecondaryClass={textSecondaryClass} />
          ) : (
            <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl group">
              {hotTopics[0]?.image ? (
                <img
                  src={hotTopics[0]?.image}
                  alt={hotTopics[0]?.title}
                  className="w-full h-64 sm:h-80 lg:h-96 xl:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-64 sm:h-80 lg:h-96 xl:h-[500px] bg-gradient-to-br from-red-400 via-pink-500 to-purple-600"></div>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

              {/* Floating Elements */}
              <div className="absolute top-6 right-6 flex items-center space-x-3">
                
                
                <button 
                  onClick={() => handleAddBookmark(hotTopics[0])}
                  className="group/btn p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
                >
                  {savedList?.some(item => item._id === hotTopics[0]?._id) ? (
                    <BookmarkAddedIcon className="w-5 h-5 text-yellow-400 group-hover/btn:animate-pulse" />
                  ) : (
                    <BookmarkAddIcon className="w-5 h-5 text-white group-hover/btn:text-yellow-400 transition-colors duration-300" />
                  )}
                </button>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10">
                {/* Tags */}
                <div className="mb-4 lg:mb-6">
                  {renderTags(hotTopics[0])}
                </div>

                {/* Title */}
                <h2 
                  onClick={() => navigate(`/articledetail/${hotTopics[0]?._id}`)}
                  className="text-[18px] sm:text-xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 lg:mb-6 leading-tight cursor-pointer hover:text-orange-300 transition-colors duration-300"
                >
                  {hotTopics[0]?.title.slice(0,100)+"..."}
                </h2>

                {/* Stats */}
                <div className="flex items-center text-white/90 mb-4 lg:mb-6 space-x-6">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span className="font-semibold">{hotTopics[0]?.views}</span>
                    <span className="text-sm">views</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4" />
                    <span className="font-semibold">{hotTopics[0]?.likes.length}</span>
                    <span className="text-sm">likes</span>
                  </div>
                </div>

                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/50 to-transparent mb-4 lg:mb-6"></div>

                {/* Author Info */}
                <div className="flex items-center text-white">
                  <img 
                    onClick={() => navigate(`/sourcelist/${hotTopics[0]?.source}`)}
                    src={sourceMap[hotTopics[0]?.source]?.logo}
                    alt={hotTopics[0]?.source}
                    className="w-10 h-10 lg:w-12 lg:h-12 cursor-pointer rounded-full mr-4 border-2 border-white/30 hover:border-white/60 transition-colors duration-300"
                  />
                  <div className="text-sm lg:text-base">
                    <span className="opacity-70">BY</span>
                    <span 
                      onClick={() => navigate(`/sourcelist/${hotTopics[0]?.source}`)} 
                      className="font-semibold cursor-pointer ml-2 hover:text-orange-300 transition-colors duration-300"
                    >
                      {hotTopics[0]?.source}
                    </span>
                    <div className="flex items-center mt-1 opacity-70">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span className="text-xs lg:text-sm">
                        {new Date(hotTopics[0]?.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Grid Articles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {hotTopics === null || savedList === null ? (
            // Loading skeletons
            Array.from({ length: 2 }, (_, index) => (
              <div key={index} className="relative">
                <GridSkeleton lightMode={lightMode} />
              </div>
            ))
          ) : hotTopics.length < 3 ? (
            // Empty state with consistent layout
            Array.from({ length: 2 }, (_, index) => (
              <div key={index} className="rounded-2xl overflow-hidden shadow-xl">
                <div className="w-full h-64 sm:h-80 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <div className="text-center">
                    <Sparkles className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">More stories coming soon</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white text-center text-sm opacity-80">
                    Check back for more trending content
                  </p>
                </div>
              </div>
            ))
          ) : (
            gridArticles.map((article, index) => (
              <div key={article._id} className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
                {/* Background */}
                {article.image ? (
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-64 sm:h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className={`w-full h-64 sm:h-80 bg-gradient-to-br ${bgGradients[index % bgGradients.length]}`}></div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Floating Bookmark */}
                <button 
                  onClick={() => handleAddBookmark(article)}
                  className="absolute top-4 right-4 z-20 p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
                >
                  {savedList.some(item => item.url === article.url) ? (
                    <BookmarkAddedIcon className="w-4 h-4 text-yellow-400" />
                  ) : (
                    <BookmarkAddIcon className="w-4 h-4 text-white hover:text-yellow-400 transition-colors duration-300" />
                  )}
                </button>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  {/* Tags */}
                  <div className="mb-4">
                    {renderTags(article)}
                  </div>

                  {/* Title */}
                  <h3 
                    onClick={() => navigate(`/articledetail/${article?._id}`)}
                    className="text-lg sm:text-xl font-semibold text-white mb-4 leading-tight cursor-pointer hover:text-orange-300 transition-colors duration-300 line-clamp-2"
                  >
                    {article.title}
                  </h3>

                  {/* Stats */}
                  <div className="flex items-center text-white/90 mb-4 text-sm space-x-4">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-3 h-3" />
                      <span className="font-semibold">{article.views}</span>
                      <span>views</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="w-3 h-3" />
                      <span className="font-semibold">{article.likes.length}</span>
                      <span>likes</span>
                    </div>
                  </div>

                  <div className="h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent mb-4"></div>

                  {/* Author Info */}
                  <div className="flex items-center text-white">
                    <img 
                      onClick={() => navigate(`/sourcelist/${article.source}`)}
                      src={sourceMap[article.source]?.logo}
                      alt={article.source}
                      className="w-8 h-8 cursor-pointer rounded-full mr-3 border border-white/30 hover:border-white/60 transition-colors duration-300"
                    />
                    <div className="text-sm">
                      <span className="opacity-70">BY</span>
                      <span 
                        onClick={() => navigate(`/sourcelist/${article.source}`)} 
                        className="font-semibold cursor-pointer ml-2 hover:text-orange-300 transition-colors duration-300"
                      >
                        {article.source}
                      </span>
                      <div className="flex items-center mt-1 opacity-70">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span className="text-xs">
                          {new Date(article.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Effects */}
                <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 lg:mt-16 text-center">
          <p className={`text-sm ${textSecondaryClass} mb-4`}>
            Stay updated with the latest trending stories
          </p>
          <div className="flex justify-center items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-orange-500" />
            <span className={`text-sm font-medium ${textSecondaryClass}`}>
              Updated every hour
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotTopics;