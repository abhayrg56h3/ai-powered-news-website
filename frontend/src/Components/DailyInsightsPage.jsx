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
} from "lucide-react";

import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import BalanceIcon from '@mui/icons-material/Balance';
import PublicIcon from '@mui/icons-material/Public';
import PeopleIcon from '@mui/icons-material/People';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ScienceIcon from '@mui/icons-material/Science';
import ComputerIcon from '@mui/icons-material/Computer';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import SchoolIcon from '@mui/icons-material/School';
import ForestIcon from '@mui/icons-material/Forest';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GavelIcon from '@mui/icons-material/Gavel';
import GppBadIcon from '@mui/icons-material/GppBad';
import ChurchIcon from '@mui/icons-material/Church';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import PaletteIcon from '@mui/icons-material/Palette';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import SportsIcon from '@mui/icons-material/Sports';
import SpaIcon from '@mui/icons-material/Spa';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PsychologyIcon from '@mui/icons-material/Psychology';
import BrushIcon from '@mui/icons-material/Brush';
import PetsIcon from '@mui/icons-material/Pets';
import YardIcon from '@mui/icons-material/Yard';
import BoltIcon from '@mui/icons-material/Bolt';
import TrafficIcon from '@mui/icons-material/Traffic';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import WavesIcon from '@mui/icons-material/Waves';
import BusinessIcon from '@mui/icons-material/Business';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import LanguageIcon from '@mui/icons-material/Language';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import ForumIcon from '@mui/icons-material/Forum';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import SecurityIcon from '@mui/icons-material/Security';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import WorkIcon from '@mui/icons-material/Work';
import HouseIcon from '@mui/icons-material/House';
import SavingsIcon from '@mui/icons-material/Savings';
import MemoryIcon from '@mui/icons-material/Memory';
import EngineeringIcon from '@mui/icons-material/Engineering';
import FunctionsIcon from '@mui/icons-material/Functions';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import MuseumIcon from '@mui/icons-material/Museum';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import FilterVintageIcon from '@mui/icons-material/FilterVintage';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import WaterIcon from '@mui/icons-material/Water';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import TrainIcon from '@mui/icons-material/Train';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import RocketIcon from '@mui/icons-material/Rocket';
import PolicyIcon from '@mui/icons-material/Policy';
import ShieldIcon from '@mui/icons-material/Shield';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ScaleIcon from '@mui/icons-material/Scale';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import GroupIcon from '@mui/icons-material/Group';
import FlagIcon from '@mui/icons-material/Flag';
import TempleHinduIcon from '@mui/icons-material/TempleHindu';
import TranslateIcon from '@mui/icons-material/Translate';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CelebrationIcon from '@mui/icons-material/Celebration';
import TempleBuddhistIcon from '@mui/icons-material/TempleBuddhist';
import CampaignIcon from '@mui/icons-material/Campaign';
import LabelIcon from '@mui/icons-material/Label';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import LockIcon from '@mui/icons-material/Lock';
import axios from "axios";

const iconProps = { fontSize: 'small' };

const topics = [
  { name: 'News', icon: <NewspaperIcon {...iconProps} /> },
  { name: 'Politics', icon: <BalanceIcon {...iconProps} /> },
  { name: 'Government', icon: <PublicIcon {...iconProps} /> },
  { name: 'Society', icon: <PeopleIcon {...iconProps} /> },
  { name: 'Culture', icon: <LocalOfferIcon {...iconProps} /> },
  { name: 'Science', icon: <ScienceIcon {...iconProps} /> },
  { name: 'Technology', icon: <ComputerIcon {...iconProps} /> },
  { name: 'Health', icon: <HealthAndSafetyIcon {...iconProps} /> },
  { name: 'Education', icon: <SchoolIcon {...iconProps} /> },
  { name: 'Environment', icon: <ForestIcon {...iconProps} /> },
  { name: 'Economy', icon: <AccountBalanceIcon {...iconProps} /> },
  { name: 'Business', icon: <BusinessCenterIcon {...iconProps} /> },
  { name: 'Finance', icon: <AttachMoneyIcon {...iconProps} /> },
  { name: 'Law', icon: <GavelIcon {...iconProps} /> },
  { name: 'Crime', icon: <GppBadIcon {...iconProps} /> },
  { name: 'Religion', icon: <ChurchIcon {...iconProps} /> },
  { name: 'Philosophy', icon: <LightbulbIcon {...iconProps} /> },
  { name: 'History', icon: <HistoryEduIcon {...iconProps} /> },
  { name: 'Art', icon: <PaletteIcon {...iconProps} /> },
  { name: 'Media', icon: <OndemandVideoIcon {...iconProps} /> },
  { name: 'Entertainment', icon: <TheaterComedyIcon {...iconProps} /> },
  { name: 'Sports', icon: <SportsIcon {...iconProps} /> },
  { name: 'Lifestyle', icon: <SpaIcon {...iconProps} /> },
  { name: 'Travel', icon: <TravelExploreIcon {...iconProps} /> },
  { name: 'Food', icon: <RestaurantIcon {...iconProps} /> },
  { name: 'Fashion', icon: <CheckroomIcon {...iconProps} /> },
  { name: 'Beauty', icon: <FaceRetouchingNaturalIcon {...iconProps} /> },
  { name: 'Parenting', icon: <FamilyRestroomIcon {...iconProps} /> },
  { name: 'Relationships', icon: <FavoriteIcon {...iconProps} /> },
  { name: 'Psychology', icon: <PsychologyIcon {...iconProps} /> },
  { name: 'Self-Improvement', icon: <BrushIcon {...iconProps} /> },
  { name: 'Animals', icon: <PetsIcon {...iconProps} /> },
  { name: 'Agriculture', icon: <YardIcon {...iconProps} /> },
  { name: 'Energy', icon: <BoltIcon {...iconProps} /> },
  { name: 'Infrastructure', icon: <BusinessIcon {...iconProps} /> },
  { name: 'Transportation', icon: <TrafficIcon {...iconProps} /> },
  { name: 'Space', icon: <RocketLaunchIcon {...iconProps} /> },
  { name: 'Climate', icon: <WavesIcon {...iconProps} /> },
  { name: 'Startups', icon: <RocketLaunchIcon {...iconProps} /> },
  { name: 'War', icon: <MilitaryTechIcon {...iconProps} /> },
  { name: 'Peace', icon: <LabelIcon {...iconProps} /> },
  { name: 'Diplomacy', icon: <LanguageIcon {...iconProps} /> },
  { name: 'Gender', icon: <Diversity3Icon {...iconProps} /> },
  { name: 'LGBTQ+', icon: <ForumIcon {...iconProps} /> },
  { name: 'Race', icon: <GroupIcon {...iconProps} /> },
  { name: 'Immigration', icon: <LanguageIcon {...iconProps} /> },
  { name: 'Democracy', icon: <HowToVoteIcon {...iconProps} /> },
  { name: 'Human Rights', icon: <EmojiPeopleIcon {...iconProps} /> },
  { name: 'Activism', icon: <CampaignIcon {...iconProps} /> },
  { name: 'Censorship', icon: <VisibilityOffIcon {...iconProps} /> },
  { name: 'Digital Media', icon: <SentimentSatisfiedAltIcon {...iconProps} /> },
  { name: 'Internet', icon: <PhoneAndroidIcon {...iconProps} /> },
  { name: 'Cybersecurity', icon: <SecurityIcon {...iconProps} /> },
  { name: 'Social Media', icon: <ThumbUpIcon {...iconProps} /> },
  { name: 'Marketing', icon: <StorefrontIcon {...iconProps} /> },
  { name: 'Advertising', icon: <ReceiptLongIcon {...iconProps} /> },
  { name: 'Innovation', icon: <AnalyticsIcon {...iconProps} /> },
  { name: 'Careers', icon: <WorkIcon {...iconProps} /> },
  { name: 'Work', icon: <WorkIcon {...iconProps} /> },
  { name: 'Remote Work', icon: <ComputerIcon {...iconProps} /> },
  { name: 'Real Estate', icon: <HouseIcon {...iconProps} /> },
  { name: 'Stock Market', icon: <SavingsIcon {...iconProps} /> },
  { name: 'Cryptocurrency', icon: <MemoryIcon {...iconProps} /> },
  { name: 'Banking', icon: <AccountBalanceIcon {...iconProps} /> },
  { name: 'Taxes', icon: <ReceiptLongIcon {...iconProps} /> },
  { name: 'Consumerism', icon: <ShoppingBasketIcon {...iconProps} /> },
  { name: 'Big Tech', icon: <MemoryIcon {...iconProps} /> },
  { name: 'Data', icon: <DataUsageIcon {...iconProps} /> },
  { name: 'Privacy', icon: <LockIcon {...iconProps} /> },
  { name: 'Engineering', icon: <EngineeringIcon {...iconProps} /> },
  { name: 'Mathematics', icon: <FunctionsIcon {...iconProps} /> },
  { name: 'Physics', icon: <ScienceIcon {...iconProps} /> },
  { name: 'Chemistry', icon: <ScienceIcon {...iconProps} /> },
  { name: 'Biology', icon: <ScienceIcon {...iconProps} /> },
  { name: 'Astronomy', icon: <RocketIcon {...iconProps} /> },
  { name: 'Pharmaceuticals', icon: <HealthAndSafetyIcon {...iconProps} /> },
  { name: 'Mental Health', icon: <PsychologyIcon {...iconProps} /> },
  { name: 'Fitness', icon: <SpaIcon {...iconProps} /> },
  { name: 'Nutrition', icon: <RestaurantIcon {...iconProps} /> },
  { name: 'Diseases', icon: <GppBadIcon {...iconProps} /> },
  { name: 'Pandemics', icon: <GppBadIcon {...iconProps} /> },
  { name: 'Vaccines', icon: <HealthAndSafetyIcon {...iconProps} /> },
  { name: 'Wellness', icon: <SpaIcon {...iconProps} /> },
  { name: 'Spirituality', icon: <TempleHinduIcon {...iconProps} /> },
  { name: 'Justice', icon: <ScaleIcon {...iconProps} /> },
  { name: 'Freedom', icon: <FlagIcon {...iconProps} /> },
  { name: 'Equality', icon: <Diversity2Icon {...iconProps} /> },
  { name: 'Traditions', icon: <TempleBuddhistIcon {...iconProps} /> },
  { name: 'Languages', icon: <TranslateIcon {...iconProps} /> },
  { name: 'Literature', icon: <AutoStoriesIcon {...iconProps} /> },
  { name: 'Books', icon: <AutoStoriesIcon {...iconProps} /> },
  { name: 'Film', icon: <MovieIcon {...iconProps} /> },
  { name: 'Television', icon: <TvIcon {...iconProps} /> },
  { name: 'Music', icon: <MusicNoteIcon {...iconProps} /> },
  { name: 'Dance', icon: <TheaterComedyIcon {...iconProps} /> },
  { name: 'Theatre', icon: <TheaterComedyIcon {...iconProps} /> },
  { name: 'Museums', icon: <MuseumIcon {...iconProps} /> },
  { name: 'Photography', icon: <CameraAltIcon {...iconProps} /> },
  { name: 'Architecture', icon: <ArchitectureIcon {...iconProps} /> },
  { name: 'Design', icon: <FilterVintageIcon {...iconProps} /> },
  { name: 'Sustainability', icon: <ForestIcon {...iconProps} /> },
  { name: 'Pollution', icon: <DeleteSweepIcon {...iconProps} /> },
  { name: 'Natural Disasters', icon: <WavesIcon {...iconProps} /> },
  { name: 'Forests', icon: <ForestIcon {...iconProps} /> },
  { name: 'Oceans', icon: <WavesIcon {...iconProps} /> },
  { name: 'Wildlife', icon: <PetsIcon {...iconProps} /> },
  { name: 'Recycling', icon: <DeleteSweepIcon {...iconProps} /> },
  { name: 'Water', icon: <WaterIcon {...iconProps} /> },
  { name: 'Electricity', icon: <ElectricBoltIcon {...iconProps} /> },
  { name: 'Aviation', icon: <AirplanemodeActiveIcon {...iconProps} /> },
  { name: 'Railways', icon: <TrainIcon {...iconProps} /> },
  { name: 'Shipping', icon: <DirectionsBoatIcon {...iconProps} /> },
  { name: 'Space Exploration', icon: <RocketIcon {...iconProps} /> },
  { name: 'International Relations', icon: <LanguageIcon {...iconProps} /> },
  { name: 'Global Organizations', icon: <LabelIcon {...iconProps} /> },
  { name: 'Public Policy', icon: <PolicyIcon {...iconProps} /> },
  { name: 'Security', icon: <ShieldIcon {...iconProps} /> },
  { name: 'Law Enforcement', icon: <GavelIcon {...iconProps} /> },
  { name: 'Judiciary', icon: <ScaleIcon {...iconProps} /> },
  { name: 'Constitution', icon: <MenuBookIcon {...iconProps} /> },
  { name: 'Freedom of Speech', icon: <ForumIcon {...iconProps} /> },
  { name: 'Nationalism', icon: <FlagIcon {...iconProps} /> },
  { name: 'Secularism', icon: <TempleHinduIcon {...iconProps} /> },
  { name: 'Genetics', icon: <ScienceIcon {...iconProps} /> },
  { name: 'Bioethics', icon: <LightbulbIcon {...iconProps} /> },
  { name: 'Online Education', icon: <SchoolIcon {...iconProps} /> },
  { name: 'Research', icon: <AnalyticsIcon {...iconProps} /> },
  { name: 'Universities', icon: <LocalLibraryIcon {...iconProps} /> },
  { name: 'Schools', icon: <SchoolIcon {...iconProps} /> },
  { name: 'Aging', icon: <AccountCircleIcon {...iconProps} /> },
  { name: 'Inclusion', icon: <GroupIcon {...iconProps} /> },
  { name: 'Home & Living', icon: <HouseIcon {...iconProps} /> },
  { name: 'Minimalism', icon: <FilterVintageIcon {...iconProps} /> },
  { name: 'Hobbies', icon: <BrushIcon {...iconProps} /> },
  { name: 'Festivals', icon: <CelebrationIcon {...iconProps} /> },
  { name: 'Holidays', icon: <CelebrationIcon {...iconProps} /> },
  { name: 'Mythology', icon: <TempleBuddhistIcon {...iconProps} /> },
  { name: 'Local News', icon: <NewspaperIcon {...iconProps} /> },
  { name: 'Regional News', icon: <NewspaperIcon {...iconProps} /> },
  { name: 'Global News', icon: <NewspaperIcon {...iconProps} /> },
  { name: 'Opinion', icon: <ForumIcon {...iconProps} /> },
  { name: 'Investigative Journalism', icon: <GppBadIcon {...iconProps} /> },
];


import { myContext } from "./Context.jsx";
import { useNavigate, useParams } from "react-router-dom";

import { Telescope } from "lucide-react";
export default function DailyInsightsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [email, setEmail] = useState("");
     const [currentPage, setCurrentPage] = useState(1);
  


  // Avoid dividing by 0 or undefined
  const [totalPages,setTotalPages]=useState(null);

  
 



  const [isHover, setIsHover] = useState(-1);

  const [trendingCategories, setTrendingCategories] = useState(null);
  useEffect(() => {
    async function fetchTopics() {
      try {
        const response = await axios.get('/api/article/fetchTopicsList');
        const arr = response.data.slice(0, 10).sort((a, b) => b.articleCount - a.articleCount);
        if (response.status === 200) {
          setTrendingCategories(arr);
        }




      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    }
    fetchTopics();
  }, []);


  const {
    dailyArticles,
    setDailyArticles,
    currUser
  } = useContext(myContext);
 

  useEffect(() => {
    if (!currUser) {
      return;
    }
   
    async function fetchArticles() {
      try {
        const response = await axios.get('/api/article/todaysTopArticles', {
          params: {
            userId: currUser?._id,
            limit:8,
            page:currentPage
          }
        });

              console.log("Daily articles fetched:", response.data.dailyArticles);
        setDailyArticles(response.data.dailyArticles);
        setTotalPages(response.data.pagination.totalPages);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, [currUser,currentPage]); // 🔁 re-run when these change


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
  const topicMap = Object.fromEntries(topics.map((t) => [t.name, { ...t }]));
  const recentPosts = [
    {
      id: 1,
      title: "Mental Health Awareness: Why It Matters...",
      category: "Health",
      date: "AUG 18, 2024",
      image: "/api/placeholder/120/80",
      categoryColor: "text-green-600 bg-green-100",
    },
    {
      id: 2,
      title: "Major Sporting Events and International Competitions",
      category: "News",
      date: "AUG 13, 2024",
      image: "/api/placeholder/120/80",
      categoryColor: "text-red-600 bg-red-100",
    },
    {
      id: 3,
      title: "How 5G Technology Is Changing the...",
      category: "Science",
      date: "AUG 7, 2024",
      image: "/api/placeholder/120/80",
      categoryColor: "text-blue-600 bg-blue-100",
    },
  ];


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
  const iconColors = [
    "text-orange-700 bg-orange-100",
    "text-blue-700 bg-blue-100",
    "text-green-700 bg-green-100",
    "text-purple-700 bg-purple-100",
    "text-pink-700 bg-pink-100",
    "text-red-700 bg-red-100",
    "text-teal-700 bg-teal-100",
    "text-yellow-700 bg-yellow-100",
  ];

  const { savedList, setSavedList, lightMode, setLightMode } = useContext(myContext);
  async function handleAddBookmark(article) {

    try {

      const response = await axios.get('/api/article/savefavourite', {
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










  if (dailyArticles === null  || savedList === null || totalPages === null || trendingCategories === null) {
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

  if(dailyArticles.length === 0){
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
                    <span className="bg-gradient-to-r from-gray-500 to-gray-400 bg-clip-text text-transparent">Daily</span>{' '}
                    <span className="relative">
                      Articles
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
                        No Daily Articles Yet
                      </h2>
                      
                      <p className={`text-lg leading-relaxed ${lightMode ? 'text-gray-600' : 'text-gray-400'}`}>
                        Your  list is empty. Start exploring articles that catch your interest to build your personal library.
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
                   Latest News
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
                      {dailyArticles?.length} results found
                    </div>
                  </div>
    
                  {/* Enhanced Articles Grid */}
                  <div className="space-y-8">
                    {dailyArticles.map((article, index) => (
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
