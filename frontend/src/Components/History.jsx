import React, { useContext, useState, useEffect } from "react";
import {
  Search,
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
  Instagram,
  ArrowRight,
  Heart,
  Users,
  Building,
  Atom,
  FileText,
  Trophy,
  Bookmark,
  ChevronRight,
  ChevronLeft,
  AlarmClock,
  BookmarkPlus,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Github,
} from "lucide-react";
import BookmarkIcon from '@mui/icons-material/Bookmark';
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
// import EcoIcon from '@mui/icons-material/Eco';
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
import axios from "axios";
import { myContext } from "./Context.jsx";
import { useNavigate, useParams } from "react-router-dom";

const iconProps = { fontSize: "small" }; // or "inherit" for even smaller

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
  // { name: "Environment", icon: <EcoIcon {...iconProps} /> }, ← comment or remove if EcoIcon is causing issues
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
import { Telescope } from "lucide-react";
export default function History() {
  const [searchTerm, setSearchTerm] = useState("");
  const [email, setEmail] = useState("");
   const [currentPage,setCurrentPage]=useState(1);
   const [totalPages,setTotalPages]=useState(null);

  const [isHover, setIsHover] = useState(-1);


  const {
    currUser,lightMode
  } = useContext(myContext);
  const [recentArticles, setRecentArticles] = useState(null);







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

  function toggleSummary(index) {
    if (summaryIndex == -1) {
      setSummaryIndex(index);
    } else {
      setSummaryIndex(-1);
    }
  }
  const sourceMap = Object.fromEntries(
    sourceLogos.map((s) => [s.name, { ...s }])
  );
  const topicMap = Object.fromEntries(topics.map((t) => [t.name, { ...t }]));

 const [trendingCategories, setTrendingCategories] = useState([]);
    useEffect(() => {
      async function fetchTopics() {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/article/fetchTopicsList`);
          const arr=response.data.sort((a, b) => b.articleCount - a.articleCount).filter(item=>topicMap[item.name]);
          
          if (response.status === 200) {
            setTrendingCategories(arr.slice(0,5));
          }
  
  
         
  
        } catch (error) {
          console.error("Error fetching topics:", error);
        }
      }
      fetchTopics();
    }, []);
  const navigate = useNavigate();

  function handleClick(id) {
    navigate(`/articledetail/${id}`);
  }
  const textColors = [
    "text-red-500",     // #E63946 🔥 Fiery Red
    "text-yellow-300",  // #F1FA3C 🌟 Neon Yellow
    "text-blue-600",    // #4361EE ⚡ Electric Blue
    "text-teal-300",    // #4ECDC4 🏝️ Tropical Teal
    "text-rose-400",    // #FF6B6B 🧡 Coral Pink
    "text-emerald-400", // #06D6A0 🌱 Mint Green
    "text-amber-300",   // #FFD166 🌼 Mustard Yellow
    "text-sky-600",     // #118AB2 ☁️ Deep Sky Blue
    "text-pink-500",    // #EF476F 💖 Hot Pink
    "text-lime-400",    // #8AC926 🍋 Lime Green
    "text-blue-700",    // #1982C4 🌊 Ocean Blue
    "text-orange-400",  // #FF9F1C 🍊 Vibrant Orange
    "text-cyan-400",    // #2EC4B6 💧 Aquamarine
    "text-fuchsia-600", // #BC5090 💜 Magenta
    "text-teal-900",    // #073B4C 🖤 Dark Teal
  ];
   const iconColors = [
    "text-orange-500",
    "text-blue-500",
    "text-green-500",
    "text-purple-500",
    "text-pink-500",
    "text-red-500",
    "text-teal-500",
    "text-yellow-500",
  ];
  const articleColors = [
    "bg-red-400",
    "bg-blue-500",
    "bg-red-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-yellow-600",
    "bg-indigo-500",
    "bg-pink-500",
    "bg-orange-500",
    "bg-teal-500",
    "bg-rose-500",
    "bg-lime-500",
    "bg-cyan-500",
    "bg-amber-500",
    "bg-fuchsia-500",
    "bg-emerald-500",
    "bg-sky-500",
    "bg-violet-500",
    "bg-orange-400",
    "bg-green-600",
  ];
  const [articles, setArticles] = useState(null);
  
        useEffect(() => {
          async function fetchRecentArticles() {
            try {
              const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/article/recentarticles`);
              setRecentArticles(response.data);

            } catch (error) {
              console.error("Error fetching recent articles:", error);
            }
          }
          fetchRecentArticles();
        }, []);

  useEffect(() => {
    if (!currUser) return;
     setTotalPages(Math.ceil(currUser.viewedArticles.length/8));
     
    async function fetchArticles() {
      console.log(currUser);
      try {
        const skip=(currentPage-1)*8;
        const paginatedArticles = currUser.viewedArticles.slice(skip, skip + 8);
        const results = await Promise.allSettled(
          paginatedArticles.map(async (article) => {
            try {
              const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/article/fetchbyid/${article.articleId}`);
              return res.data;
            } catch (err) {
              console.warn("❌ Error fetching article with ID:", article.articleId);
              return null;
            }
          })
        );
           console.log(results);


        // Filter only fulfilled results with non-null data
        const successfulArticles = results
          .filter((result) => result.status === "fulfilled" && result.value)
          .map((result) => result.value);

        setArticles(successfulArticles);
      } catch (error) {
        console.error("🔥 Error fetching history articles:", error);
      }
    }

    fetchArticles();
  }, [currUser,currentPage]);




  const { savedList, setSavedList } = useContext(myContext);
  async function handleAddBookmark(article) {

    try {

      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/article/savefavourite`, {
        params: { id: article._id, userId: currUser._id }
      });

      if (savedList.some(item => item._id === article._id)) {
        setSavedList(savedList.filter(item => item._id !== article._id));
      }
      else {
        setSavedList([...savedList, article]);
      }
    } catch (error) {
      console.error("Error bookmarking article:", error);
      alert("An error occurred while bookmarking the article.");
    }
  };
    if (articles === null || savedList === null || trendingCategories === null || recentArticles === null) {
        return (
    <div className={lightMode ? 'bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen' : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen'}>
      {/* Hero Section Skeleton */}
      <div className="relative h-[45vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t"
          style={{
            backgroundImage: lightMode
              ? "linear-gradient(to top, rgb(249,250,251), rgba(249,250,251,0.9), rgba(249,250,251,0.3), rgba(249,250,251,0))"
              : "linear-gradient(to top, rgb(17,24,39), rgba(17,24,39,0.9), rgba(17,24,39,0.3), rgba(17,24,39,0))",
          }}
        ></div>
        
        <div className="relative z-10 flex items-end h-full px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 lg:pb-16">
          <div className="w-full max-w-7xl mx-auto">
            <div className="transform transition-all duration-1000">
              {/* Title Skeleton */}
              <div className="space-y-4 mb-4">
                <div className={`h-8 sm:h-10 md:h-12 lg:h-16 rounded-lg animate-pulse ${lightMode ? 'bg-gray-300' : 'bg-gray-700'} w-3/4`}></div>
                <div className={`h-6 sm:h-8 rounded-lg animate-pulse ${lightMode ? 'bg-gray-300' : 'bg-gray-700'} w-1/2`}></div>
              </div>
              <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className={`min-h-screen ${lightMode ? 'bg-gradient-to-br from-gray-50 via-white to-gray-100' : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'}`}>
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">

            {/* Sidebar Skeleton */}
            <div className="xl:w-80 xl:sticky xl:top-28 xl:self-start order-2 xl:order-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-6 lg:gap-8">
                
                {/* Trending Categories Skeleton */}
                <div className={`
                  rounded-2xl p-6 backdrop-blur-sm border shadow-2xl
                  ${lightMode
                    ? 'bg-white/80 border-gray-200/50'
                    : 'bg-gray-800/80 border-gray-700/50'
                  }
                `}>
                  {/* Header Skeleton */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-2 h-8 bg-gradient-to-b from-orange-500 to-pink-500 rounded-full animate-pulse"></div>
                    <div className={`h-6 w-48 rounded animate-pulse ${lightMode ? 'bg-gray-300' : 'bg-gray-600'}`}></div>
                  </div>

                  {/* Category Items Skeleton */}
                  <div className="space-y-2">
                    {[...Array(5)].map((_, index) => (
                      <div
                        key={index}
                        className={`
                          flex items-center gap-4 p-4 rounded-xl
                          backdrop-blur-sm border
                          ${lightMode
                            ? 'bg-white/80 border-gray-200/50'
                            : 'bg-gray-700/50 border-gray-600/50'
                          }
                        `}
                      >
                        {/* Icon Skeleton */}
                        <div className={`w-10 h-10 rounded-lg animate-pulse ${lightMode ? 'bg-gray-300' : 'bg-gray-600'}`}></div>
                        
                        {/* Text Skeleton */}
                        <div className="flex-1 min-w-0">
                          <div className={`h-4 w-24 rounded animate-pulse ${lightMode ? 'bg-gray-300' : 'bg-gray-600'}`}></div>
                        </div>

                        {/* Count Skeleton */}
                        <div className="w-8 h-6 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Main Content Skeleton */}
            <div className="flex-1 order-1 xl:order-2">
              {/* Results Count Skeleton */}
              <div className="mb-8">
                <div className={`
                  inline-flex items-center gap-2 px-4 py-2 rounded-full
                  backdrop-blur-sm border
                  ${lightMode 
                    ? 'bg-white/80 border-gray-200/50' 
                    : 'bg-gray-800/80 border-gray-700/50'
                  }
                `}>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <div className={`h-4 w-20 rounded animate-pulse ${lightMode ? 'bg-gray-300' : 'bg-gray-600'}`}></div>
                </div>
              </div>

              {/* Articles Grid Skeleton */}
              <div className="space-y-8">
                {[...Array(3)].map((_, index) => (
                  <div
                    key={index}
                    className={`
                      relative rounded-2xl shadow-xl border backdrop-blur-sm
                      ${lightMode
                        ? 'bg-white/90 border-gray-200/50'
                        : 'bg-gray-800/90 border-gray-700/50'
                      }
                    `}
                  >
                    <div className="flex flex-col sm:flex-row items-stretch">

                      {/* Image Skeleton */}
                      <div className="w-full sm:w-72 h-48 sm:h-auto relative overflow-hidden sm:rounded-l-2xl">
                        <div className={`w-full h-full animate-pulse ${lightMode ? 'bg-gray-300' : 'bg-gray-700'}`}>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                        </div>
                        {/* Remove button skeleton */}
                        <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 animate-pulse"></div>
                      </div>

                      {/* Content Skeleton */}
                      <div className={`flex-1 p-6 flex flex-col justify-between relative overflow-hidden ${lightMode
                        ? 'bg-gradient-to-br from-white/95 via-gray-50/80 to-white/95'
                        : 'bg-gradient-to-br from-gray-800/95 via-gray-750/80 to-gray-800/95'
                        } sm:rounded-r-2xl`}>
                        
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
                        
                        <div className="relative z-10">
                          {/* Topic Badge Skeleton */}
                          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 bg-gradient-to-r from-orange-500 to-pink-500 animate-pulse">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            <div className="w-16 h-3 bg-white/50 rounded"></div>
                          </div>
                          
                          {/* Title Skeleton */}
                          <div className="space-y-2 mb-4">
                            <div className={`h-6 w-full rounded animate-pulse ${lightMode ? 'bg-gray-300' : 'bg-gray-600'}`}></div>
                            <div className={`h-6 w-3/4 rounded animate-pulse ${lightMode ? 'bg-gray-300' : 'bg-gray-600'}`}></div>
                          </div>
                          
                          {/* Content Skeleton */}
                          <div className="space-y-2">
                            <div className={`h-4 w-full rounded animate-pulse ${lightMode ? 'bg-gray-200' : 'bg-gray-700'}`}></div>
                            <div className={`h-4 w-full rounded animate-pulse ${lightMode ? 'bg-gray-200' : 'bg-gray-700'}`}></div>
                            <div className={`h-4 w-2/3 rounded animate-pulse ${lightMode ? 'bg-gray-200' : 'bg-gray-700'}`}></div>
                          </div>
                        </div>

                        {/* Footer Skeleton */}
                        <div className="flex items-center gap-4 mt-6 relative z-10">
                          {/* Avatar Skeleton */}
                          <div className={`w-12 h-12 rounded-full border-2 shadow-lg animate-pulse ${lightMode ? 'bg-gray-300 border-gray-200' : 'bg-gray-600 border-gray-600'}`}>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                          </div>
                          
                          {/* Date Skeleton */}
                          <div className="flex flex-col gap-1">
                            <div className={`h-3 w-16 rounded animate-pulse ${lightMode ? 'bg-gray-200' : 'bg-gray-700'}`}></div>
                            <div className={`h-4 w-20 rounded animate-pulse ${lightMode ? 'bg-gray-300' : 'bg-gray-600'}`}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Skeleton */}
              <div className="flex justify-center items-center mt-16 space-x-3 px-4">
                {[...Array(7)].map((_, index) => (
                  <div
                    key={index}
                    className={`w-12 h-12 rounded-xl shadow-lg backdrop-blur-sm border animate-pulse
                      ${lightMode
                        ? 'bg-white/80 border-gray-200/50'
                        : 'bg-gray-800/80 border-gray-700/50'
                      }`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Shimmer Animation Styles */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
  }




   if(articles.length===0){
      return (
        <div className={lightMode ? 'bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen' : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen'}>
          {/* Hero Section */}
          <div className="relative h-[45vh] w-full overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80')",
                filter: 'grayscale(40%) brightness(0.7)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
              <div
                className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t"
                style={{
                  backgroundImage: lightMode
                    ? "linear-gradient(to top, rgb(249,250,251), rgba(249,250,251,0.9), rgba(249,250,251,0.3), rgba(249,250,251,0))"
                    : "linear-gradient(to top, rgb(17,24,39), rgba(17,24,39,0.9), rgba(17,24,39,0.3), rgba(17,24,39,0))",
                }}
              ></div>
              {/* Decorative Elements */}
              <div className="absolute top-10 right-10 w-32 h-32 bg-gray-500/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-20 left-20 w-24 h-24 bg-gray-500/10 rounded-full blur-2xl animate-pulse"></div>
            </div>
    
            <div className="relative z-10 flex items-end h-full px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 lg:pb-16">
              <div className="w-full max-w-7xl mx-auto">
                <div className="transform transition-all duration-1000">
                  <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black ${lightMode ? 'text-gray-900' : 'text-white'} mb-4 leading-tight tracking-tight`}>
                    <span className="bg-gradient-to-r from-gray-500 to-gray-400 bg-clip-text text-transparent">History</span>{' '}
                    <span className="relative">
                      
                      <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-gray-500 to-gray-400 rounded-full opacity-50"></div>
                    </span>
                  </h1>
                  <div className="w-20 h-1 bg-gradient-to-r from-gray-500 to-gray-400 rounded-full opacity-50"></div>
                </div>
              </div>
            </div>
          </div>
    
          {/* Main Content */}
          <div className={`min-h-screen ${lightMode ? 'bg-gradient-to-br from-gray-50 via-white to-gray-100' : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'}`}>
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
              <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">
    
                {/* Sidebar */}
                <div className="xl:w-80 xl:sticky xl:top-28 xl:self-start order-2 xl:order-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-6 lg:gap-8">
    
                    {/* Trending Categories */}
                    <div className={`
                      rounded-2xl p-6 transition-all duration-300
                      backdrop-blur-sm border shadow-2xl opacity-50
                      ${lightMode
                        ? 'bg-white/80 border-gray-200/50 shadow-gray-200/50'
                        : 'bg-gray-800/80 border-gray-700/50 shadow-black/20'
                      }
                    `}>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-2 h-8 bg-gradient-to-b from-gray-500 to-gray-400 rounded-full"></div>
                        <h3 className={`
                          text-lg font-bold tracking-tight
                          ${lightMode ? 'text-gray-600' : 'text-gray-400'}
                        `}>
                          TRENDING CATEGORIES
                        </h3>
                      </div>
    
                      <div className="space-y-2">
                        {trendingCategories?.map((category, index) => {
                          return (
                            <div
                              key={category.id}
                              className={`
                                flex items-center gap-4 p-4 rounded-xl cursor-not-allowed
                                backdrop-blur-sm border opacity-50
                                ${lightMode
                                  ? 'bg-white/80 border-gray-200/50'
                                  : 'bg-gray-700/50 border-gray-600/50'
                                }
                              `}
                            >
                              <div className={`
                                ${textColors[index % textColors.length]} 
                                p-2 rounded-lg bg-gradient-to-br from-white/10 to-transparent
                                opacity-50
                              `}>
                                {topicMap[category.name]?.icon || <Telescope className="w-6 h-6 text-gray-500" />}
                              </div>
    
                              <div className="flex-1 min-w-0">
                                <h4 className={`
                                  font-semibold text-base truncate
                                  ${lightMode ? 'text-gray-500' : 'text-gray-500'}
                                `}>
                                  {category.name}
                                </h4>
                              </div>
    
                              <div className="px-3 py-1.5 rounded-full text-sm font-semibold bg-gray-400 text-white opacity-50">
                                {category.articleCount}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
    
                  </div>
                </div>
    
                {/* Main Content - Empty State */}
                <div className="flex-1 order-1 xl:order-2">
                  <div className="mb-8">
                    <div className={`
                      inline-flex items-center gap-2 px-4 py-2 rounded-full
                      backdrop-blur-sm border font-medium opacity-70
                      ${lightMode 
                        ? 'bg-white/80 border-gray-200/50 text-gray-600' 
                        : 'bg-gray-800/80 border-gray-700/50 text-gray-400'
                      }
                    `}>
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                      0 results found
                    </div>
                  </div>
    
                  {/* Empty State Content */}
                  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                    {/* Empty State Illustration */}
                    <div className="relative mb-8">
                      <div className={`w-48 h-48 rounded-full border-4 border-dashed flex items-center justify-center mb-6 ${lightMode ? 'border-gray-300' : 'border-gray-600'}`}>
                        <div className={`w-32 h-32 rounded-full flex items-center justify-center ${lightMode ? 'bg-gray-100' : 'bg-gray-800'}`}>
                          <div className={`text-6xl ${lightMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            📚
                          </div>
                        </div>
                      </div>
                      {/* Floating Elements */}
                      <div className="absolute -top-4 -right-4 w-8 h-8 bg-orange-400/20 rounded-full animate-bounce"></div>
                      <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-pink-400/20 rounded-full animate-pulse"></div>
                      <div className="absolute top-1/2 -left-8 w-4 h-4 bg-blue-400/20 rounded-full animate-ping"></div>
                    </div>
    
                    {/* Empty State Text */}
                    <div className="max-w-md space-y-6">
                      <h2 className={`text-3xl font-black ${lightMode ? 'text-gray-800' : 'text-white'}`}>
                        No Seen Articles Yet
                      </h2>
                      
                      <p className={`text-lg leading-relaxed ${lightMode ? 'text-gray-600' : 'text-gray-400'}`}>
                        Your reading list is empty. Start exploring  articles that catch your interest to build your personal library.
                      </p>
    
                      {/* Action Suggestions */}
                      <div className="space-y-4 pt-4">
                        <div className={`
                          p-4 rounded-xl backdrop-blur-sm border
                          ${lightMode 
                            ? 'bg-white/60 border-gray-200/50' 
                            : 'bg-gray-800/60 border-gray-700/50'
                          }
                        `}>
                          <h3 className={`font-semibold mb-2 ${lightMode ? 'text-gray-800' : 'text-white'}`}>
                            💡 Quick Tips
                          </h3>
                          <ul className={`text-sm space-y-1 ${lightMode ? 'text-gray-600' : 'text-gray-400'}`}>
                            <li>• Browse trending categories to discover content</li>
                            <li>• Use the bookmark icon to save interesting articles</li>
                            <li>• Build your personal reading collection</li>
                          </ul>
                        </div>
    
                        {/* Call to Action Button */}
                        <button 
                          onClick={() => window.history.back()}
                          className={`
                            inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold
                            bg-gradient-to-r from-orange-500 to-pink-500 text-white
                            shadow-lg hover:shadow-xl transform hover:scale-105
                            transition-all duration-300 backdrop-blur-sm
                            border border-white/20
                          `}
                        >
                          <span>🔍</span>
                          Start Exploring Articles
                        </button>
                      </div>
                    </div>
    
                    {/* Background Decorations */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-orange-400/30 rounded-full animate-ping"></div>
                      <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-pink-400/30 rounded-full animate-pulse"></div>
                      <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-blue-400/30 rounded-full animate-bounce"></div>
                    </div>
                  </div>
    
                  {/* Disabled Pagination */}
                  <div className="flex justify-center items-center mt-16 space-x-3 px-4 opacity-30">
                    <button
                      disabled
                      className={`w-12 h-12 rounded-xl flex items-center justify-center cursor-not-allowed
                        backdrop-blur-sm border shadow-lg
                        ${lightMode
                          ? 'bg-white/80 border-gray-200/50 text-gray-400'
                          : 'bg-gray-800/80 border-gray-700/50 text-gray-500'
                        }`}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
    
                    <button
                      disabled
                      className={`w-12 h-12 rounded-xl font-bold cursor-not-allowed
                        backdrop-blur-sm border shadow-lg
                        ${lightMode
                          ? 'bg-white/80 border-gray-200/50 text-gray-400'
                          : 'bg-gray-800/80 border-gray-700/50 text-gray-500'
                        }`}
                    >
                      1
                    </button>
    
                    <button
                      disabled
                      className={`w-12 h-12 rounded-xl flex items-center justify-center cursor-not-allowed
                        backdrop-blur-sm border shadow-lg
                        ${lightMode
                          ? 'bg-white/80 border-gray-200/50 text-gray-400'
                          : 'bg-gray-800/80 border-gray-700/50 text-gray-500'
                        }`}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
   }




  return (
    <div className={`min-h-screen transition-colors duration-300 ${lightMode ? 'bg-gray-50' : 'bg-gray-900'}`}>
          <div className="relative h-[30vh] sm:h-[35vh] md:h-[40vh] lg:h-[45vh] w-full overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80')",
              }}
            >
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              {/* Gradient Overlay at Bottom */}
              <div
                className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t"
                style={{
                  backgroundImage: lightMode
                    ? "linear-gradient(to top, rgb(249,250,251), rgba(249,250,251,0.5), rgba(249,250,251,0))"
                    : "linear-gradient(to top, rgb(17,24,39), rgba(17,24,39,0.5), rgba(17,24,39,0))",
                }}
              ></div>
            </div>
    
            <div className="relative z-10 flex items-end h-full px-4 sm:px-6 pb-8 sm:pb-12 md:pb-16">
              <div className="w-full max-w-7xl mx-auto">
                {/* Main Title */}
                <h1 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight transition-colors duration-300 ${
                  lightMode ? 'text-gray-900' : 'text-white'
                }`}>
                History
                </h1>

              </div>
            </div>
          </div>
          
          <div className={`h-[1px] w-full transition-colors duration-300 ${lightMode ? 'bg-gray-300' : 'bg-gray-700'}`}></div>
    
          <div className="min-h-screen">
            <div className="max-w-7xl mx-auto p-4 sm:p-6">
              <div className="flex flex-col xl:flex-row gap-6 lg:gap-8 relative">
                
                {/* Sidebar - Shows on left for large screens, sticky positioned */}
                <div className="xl:w-80 space-y-6 sm:space-y-8 order-2 xl:order-1 xl:sticky xl:top-28 xl:self-start">
                  {/* Recent Posts */}
                  <div className="space-y-4 sm:space-y-6">
                    <h3 className={`text-lg font-bold transition-colors duration-300 ${
                      lightMode ? 'text-gray-800' : 'text-gray-200'
                    }`}>Recent Posts</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4">
                      {recentArticles?.map((post, index) => (
                        <div key={post.id} className="flex gap-3 sm:gap-4 group cursor-pointer">
                          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex-shrink-0 overflow-hidden shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105 relative">
                            <img src={post.image} alt="" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 sm:mb-2">
                              <span className={`text-xs px-2 sm:px-3 py-1 rounded-full font-medium shadow-sm ${iconColors[index % iconColors.length]}`}>
                                {post.topic}
                              </span>
                            </div>
                            <h4
                              onClick={() => navigate(`/articledetail/${post._id}`)}
                              className={`text-sm font-semibold leading-tight mb-1 sm:mb-2 cursor-pointer line-clamp-2 transition-all duration-300 group-hover:scale-[1.02] ${
                                lightMode
                                  ? 'text-gray-900 hover:text-orange-600'
                                  : 'text-white hover:text-orange-300'
                              }`}
                            >
                              {post.title}
                            </h4>
                            <p className={`text-xs font-medium transition-colors duration-300 ${
                              lightMode ? 'text-gray-500' : 'text-gray-400'
                            }`}>
                              {new Date(post.createdAt).toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
    
                  {/* Trending Categories */}
                  <div className={`
                                  rounded-2xl p-6 transition-all duration-300
                                  backdrop-blur-sm border shadow-2xl
                                  ${lightMode
                                    ? 'bg-white/80 border-gray-200/50 shadow-gray-200/50'
                                    : 'bg-gray-800/80 border-gray-700/50 shadow-black/20'
                                  }
                                `}>
                                  <div className="flex items-center gap-3 mb-6">
                                    <div className="w-2 h-8 bg-gradient-to-b from-orange-500 to-pink-500 rounded-full"></div>
                                    <h3 className={`
                                      text-lg font-bold tracking-tight
                                      ${lightMode ? 'text-gray-900' : 'text-white'}
                                    `}>
                                      TRENDING CATEGORIES
                                    </h3>
                                  </div>
                  
                                  <div className="space-y-2">
                                    {trendingCategories.map((category, index) => {
                                      return (
                                        <div
                                          onClick={() => navigate(`/categorylist/${category.name}`)}
                                          key={category.id}
                                          className={`
                                            group flex items-center gap-4 p-4 rounded-xl cursor-pointer 
                                            transition-all duration-300 hover:scale-105 transform
                                            backdrop-blur-sm border hover:shadow-lg
                                            ${lightMode
                                              ? 'hover:bg-white/80 border-transparent hover:border-gray-200/50 hover:shadow-gray-200/50'
                                              : 'hover:bg-gray-700/50 border-transparent hover:border-gray-600/50 hover:shadow-black/20'
                                            }
                                          `}
                                        >
                                          <div className={`
                                            ${textColors[index % textColors.length]} 
                                            p-2 rounded-lg bg-gradient-to-br from-white/10 to-transparent
                                            group-hover:scale-110 transition-transform duration-300
                                          `}>
                                            {topicMap[category.name]?.icon || <Telescope className="w-6 h-6 text-gray-500" />}
                                          </div>
                  
                                          <div className="flex-1 min-w-0">
                                            <h4 className={`
                                              font-semibold text-base truncate
                                              ${lightMode ? 'text-gray-900' : 'text-white'}
                                              group-hover:text-orange-500 transition-colors duration-300
                                            `}>
                                              {category.name}
                                            </h4>
                                          </div>
                  
                                          <div className={`
                                            px-3 py-1.5 rounded-full text-sm font-semibold
                                            bg-gradient-to-r from-orange-500 to-pink-500 text-white
                                            shadow-lg group-hover:shadow-xl transform group-hover:scale-110
                                            transition-all duration-300
                                          `}>
                                            {category.articleCount}
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                </div>
    
                {/* Main Content - Shows first on mobile, second on large screens */}
                <div className="flex-1 order-1 xl:order-2">
                  <div className="mb-8">
                    <div className={`
                      inline-flex items-center gap-2 px-4 py-2 rounded-full
                      backdrop-blur-sm border font-medium
                      ${lightMode 
                        ? 'bg-white/80 border-gray-200/50 text-gray-700' 
                        : 'bg-gray-800/80 border-gray-700/50 text-gray-300'
                      }
                    `}>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      {articles?.length} results found
                    </div>
                  </div>
    
                  {/* Enhanced Articles Grid */}
                  <div className="space-y-8">
                    {articles.map((article, index) => (
                      <div
                        key={article.id}
                        onMouseEnter={() => setIsHover(index)}
                        onMouseLeave={() => setIsHover(-1)}
                        className={`
                          relative rounded-2xl shadow-xl border hover:shadow-2xl 
                          transition-all duration-500 overflow-hidden
                          backdrop-blur-sm group
                          ${lightMode
                            ? 'bg-white/90 border-gray-200/50 hover:border-orange-300/50'
                            : 'bg-gray-800/90 border-gray-700/50 hover:border-orange-500/30'
                          }
                        `}
                      >
                        {/* Animated Border */}
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-pink-500/20 to-orange-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                        
                        <div className="relative flex flex-col sm:flex-row items-stretch">
    
                          {/* Enhanced IMAGE */}
                          <div className="w-full sm:w-72 h-48 sm:h-auto relative group/image overflow-hidden sm:rounded-l-2xl">
                            <img
                              src={article.image || "/img1.png"}
                              alt={article.title}
                              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                            
                            {/* Enhanced Remove Button */}
                           <div className="absolute top-2 right-2 z-20">
                                     <div className={`p-1.5 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 hover:rotate-12 ${lightMode
                                         ? 'bg-white/90 hover:bg-white shadow-md border border-gray-100'
                                         : 'bg-gray-800/90 hover:bg-gray-700 shadow-lg border border-gray-600'
                                       }`}>
                                       {savedList.some(item => item.url === article.url) ? (
                                         <BookmarkIcon
                                           onClick={() => handleAddBookmark(article)}
                                           className={`w-4 h-4 cursor-pointer ${lightMode ? 'text-orange-500' : 'text-orange-400'}`}
                                         />
                                       ) : (
                                         <BookmarkPlus
                                           onClick={() => handleAddBookmark(article)}
                                           className={`w-4 h-4 cursor-pointer ${lightMode ? 'text-gray-600' : 'text-gray-400'}`}
                                         />
                                       )}
                                     </div>
                                   </div>
                            
                            <div
                              className={`absolute left-0 right-0 bottom-0 top-3/4 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 ${isHover === index ? "opacity-100" : ""
                                } transition-all duration-500 pointer-events-none`}
                            />
                            
                            {/* Enhanced Stats Overlay */}
                            <div
                              className={`absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-xl text-sm font-semibold transform transition-all duration-700 border border-white/20 ${isHover === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                }`}
                            >
                              <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1">
                                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                  {article.views} views
                                </span>
                                <span className="flex items-center gap-1">
                                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                                  {article.likes?.length} likes
                                </span>
                              </div>
                            </div>
                          </div>
    
                          {/* Enhanced CONTENT */}
                          <div className={`flex-1 p-6 flex flex-col justify-between relative overflow-hidden ${lightMode
                            ? 'bg-gradient-to-br from-white/95 via-gray-50/80 to-white/95'
                            : 'bg-gradient-to-br from-gray-800/95 via-gray-750/80 to-gray-800/95'
                            } sm:rounded-r-2xl`}>
                            
                            {/* Background Decoration */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
                            
                            <div className="relative z-10">
                              <div className="mb-2">
                <div className="flex flex-wrap gap-1.5">
                  {article.tags?.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className={`px-2 py-0.5 text-[10px] font-semibold rounded-full transition-all duration-300 hover:scale-105 cursor-pointer ${lightMode
                          ? 'bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border border-emerald-200'
                          : 'bg-gradient-to-r from-emerald-900/40 to-teal-900/40 text-emerald-300 border border-emerald-700/50'
                        }`}
                    >
                      #{tag}
                    </span>
                  ))}
                  {article.tags?.length > 3 && (
                    <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${lightMode ? 'bg-gray-100 text-gray-600 border border-gray-200' : 'bg-gray-700 text-gray-400 border border-gray-600'
                      }`}>+{article.tags.length - 3} more</span>
                  )}
                </div>
              </div>
                              
                              <h2
                                onClick={() => handleClick(article._id)}
                                className={`text-xl font-black hover:underline cursor-pointer mb-4 line-clamp-2 
                                  transition-all duration-300 hover:scale-105 transform-gpu
                                  ${lightMode ? 'text-gray-900 hover:text-orange-600' : 'text-white hover:text-orange-400'
                                  }`}
                              >
                                {article.title}
                              </h2>
                              
                              <p className={`text-sm line-clamp-3 leading-relaxed ${lightMode ? 'text-gray-700' : 'text-gray-300'
                                }`}>
                                {article.summary?.slice(0, 150) + " . . . . ."}
                              </p>
                            </div>
    
                            <div className="flex items-center gap-4 mt-6 relative z-10">
                              {sourceMap[article.source] ? (
                                <div className="relative">
                                  <img
                                    src={sourceMap[article.source]?.logo}
                                    alt="source logo"
                                    className={`w-12 h-12 object-contain rounded-full border-2 shadow-lg transition-transform duration-300 hover:scale-110 ${lightMode ? 'bg-white border-gray-200' : 'bg-gray-700 border-gray-600'
                                      }`}
                                  />
                                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                                </div>
                              ) : (
                                <div className={`text-sm font-semibold px-3 py-1 rounded-full ${lightMode ? 'text-gray-600 bg-gray-100' : 'text-gray-400 bg-gray-700'
                                  }`}>
                                  {article.source}
                                </div>
                              )}
                              
                              <div className="flex flex-col">
                                <span className={`text-xs font-medium ${lightMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                  Published
                                </span>
                                <span className={`text-sm font-semibold ${lightMode ? 'text-gray-700' : 'text-gray-300'}`}>
                                  {new Date(article.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
    
                  {/* Enhanced Pagination */}
                  <div className="flex justify-center items-center mt-16 space-x-3 px-4">
                    <button
                      onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                      disabled={currentPage === 1}
                      className={`w-12 h-12 rounded-xl transition-all duration-300 flex items-center justify-center 
                        disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-110 shadow-lg
                        backdrop-blur-sm border
                        ${lightMode
                          ? 'bg-white/80 border-gray-200/50 text-black hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500 hover:text-white hover:border-transparent'
                          : 'bg-gray-800/80 border-gray-700/50 text-white hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500 hover:border-transparent'
                        }`}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
    
                    {(() => {
                      const pages = [];
                      pages.push(
                        <button
                          key={1}
                          onClick={() => setCurrentPage(1)}
                          className={`w-12 h-12 text-base rounded-xl font-bold transition-all duration-300 transform hover:scale-110 shadow-lg backdrop-blur-sm border ${currentPage === 1
                            ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white border-transparent shadow-orange-500/25"
                            : lightMode
                              ? "bg-white/80 border-gray-200/50 text-black hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500 hover:text-white hover:border-transparent"
                              : "bg-gray-800/80 border-gray-700/50 text-white hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500 hover:border-transparent"
                            }`}
                        >
                          1
                        </button>
                      );
    
                      if (currentPage > 3) {
                        pages.push(
                          <span
                            key="left-ellipsis"
                            className={`px-2 select-none font-bold ${lightMode ? 'text-gray-400' : 'text-gray-500'}`}
                          >
                            ...
                          </span>
                        );
                      }
    
                      const start = Math.max(2, currentPage - 1);
                      const end = Math.min(totalPages - 1, currentPage + 1);
    
                      for (let i = start; i <= end; i++) {
                        pages.push(
                          <button
                            key={i}
                            onClick={() => setCurrentPage(i)}
                            className={`w-12 h-12 text-base rounded-xl font-bold transition-all duration-300 transform hover:scale-110 shadow-lg backdrop-blur-sm border ${currentPage === i
                              ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white border-transparent shadow-orange-500/25"
                              : lightMode
                                ? "bg-white/80 border-gray-200/50 text-black hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500 hover:text-white hover:border-transparent"
                                : "bg-gray-800/80 border-gray-700/50 text-white hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500 hover:border-transparent"
                              }`}
                          >
                            {i}
                          </button>
                        );
                      }
    
                      if (currentPage < totalPages - 2) {
                        pages.push(
                          <span
                            key="right-ellipsis"
                            className={`px-2 select-none font-bold ${lightMode ? 'text-gray-400' : 'text-gray-500'}`}
                          >
                            ...
                          </span>
                        );
                      }
    
                      if (totalPages > 1) {
                        pages.push(
                          <button
                            key={totalPages}
                            onClick={() => setCurrentPage(totalPages)}
                            className={`w-12 h-12 text-base rounded-xl font-bold transition-all duration-300 transform hover:scale-110 shadow-lg backdrop-blur-sm border ${currentPage === totalPages
                              ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white border-transparent shadow-orange-500/25"
                              : lightMode
                                ? "bg-white/80 border-gray-200/50 hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500 hover:text-white hover:border-transparent"
                                : "bg-gray-800/80 border-gray-700/50 text-white hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500 hover:border-transparent"
                              }`}
                            >
                              {totalPages}
                            </button>
                        );
                      }
    
                      return pages;
                    })()}
    
                    <button
                      onClick={() =>
                        setCurrentPage(Math.min(currentPage + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className={`w-12 h-12 rounded-xl transition-all duration-300 flex items-center justify-center 
                        disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-110 shadow-lg
                        backdrop-blur-sm border
                        ${lightMode
                          ? 'bg-white/80 border-gray-200/50 hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500 hover:text-white hover:border-transparent'
                          : 'bg-gray-800/80 border-gray-700/50 text-white hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500 hover:border-transparent'
                        }`}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
}
