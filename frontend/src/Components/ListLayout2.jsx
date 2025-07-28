import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { myContext } from "./Context";
import Flag from 'react-world-flags';
import { countryToISO } from "../utils/usable";
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
} from "lucide-react";
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


const RegionFlag = ({ regionName }) => {
  const isoCode = countryToISO[regionName];

  if (isoCode) {
    return (
      <Flag
        code={isoCode}
        style={{ width: 28, height: 20, borderRadius: "2px", objectFit: "cover" }}
        title={regionName}
      />
    );
  }  else {
    return (
      <span role="img" aria-label="World" title={regionName}>🌍</span>
    );
  }
};

const topicMap = Object.fromEntries(topics.map((t, i) => [t.name, { ...t }]));

const ListLayout2 = ({ type, list }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [email, setEmail] = useState("");
  const [isHover, setIsHover] = useState(-1);
  const [articles, setArticles] = useState([]);
  const { currentArticles, setCurrentArticles } = useContext(myContext);
  const navigate = useNavigate();
  const [recentArticles, setRecentArticles] = useState(null);

  // Fixed handleClick function - added arrow function syntax
  const handleClick = async (val) => {
    if (type == "sources") {
      navigate(`/sourceList/${val}`);
    }
    else if (type == "regions") {
      navigate(`/regionList/${val}`);
    }
    else if (type == "topics") {
      navigate(`/categoryList/${val}`);
    }
  };


  useEffect(() => {
    async function fetchRecentArticles() {
      try {
        const response = await axios.get('/api/article/recentarticles');
        setRecentArticles(response.data);

      } catch (error) {
        console.error("Error fetching recent articles:", error);
      }
    }
    fetchRecentArticles();
  }, []);


 

 
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
      logo: '/techchrunch.png',
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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = Math.min(15, list?.length || 0);
  const totalPages = Math.ceil((list?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentList = list?.slice(startIndex, startIndex + itemsPerPage) || [];
  const {lightMode,setLightMode} = useContext(myContext);
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

  const getCategoryStyle = (category) => {
    const styles = {
      Science: "bg-blue-100 text-blue-600",
      Technology: "bg-purple-100 text-purple-600",
      Health: "bg-green-100 text-green-600",
      News: "bg-red-100 text-red-600",
    };
    return styles[category] || "bg-gray-100 text-gray-600";
  };
 if (list === null || recentArticles === null) {
  return (
    <div className={`flex items-center justify-center min-h-screen ${lightMode ? 'bg-gradient-to-br from-gray-50 via-orange-50 to-gray-100' : 'bg-gradient-to-br from-gray-900 via-gray-800 to-black'}`}>
      <div className="flex flex-col items-center space-y-8 p-8">

        {/* Animated Loading Rings */}
        <div className="relative">
          {/* Outer ring */}
          <div className={`w-24 h-24 rounded-full border-4 border-transparent animate-spin ${lightMode ? 'border-t-orange-500 border-r-orange-300' : 'border-t-orange-400 border-r-orange-600'
            }`} style={{ animationDuration: '1.5s' }}></div>

          {/* Middle ring */}
          <div className={`absolute top-2 left-2 w-20 h-20 rounded-full border-4 border-transparent animate-spin ${lightMode ? 'border-t-blue-500 border-l-blue-300' : 'border-t-blue-400 border-l-blue-600'
            }`} style={{ animationDuration: '2s', animationDirection: 'reverse' }}></div>

          {/* Inner ring */}
          <div className={`absolute top-4 left-4 w-16 h-16 rounded-full border-4 border-transparent animate-spin ${lightMode ? 'border-t-purple-500 border-b-purple-300' : 'border-t-purple-400 border-b-purple-600'
            }`} style={{ animationDuration: '1s' }}></div>

          {/* Center dot */}
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full animate-pulse ${lightMode ? 'bg-gradient-to-r from-orange-400 to-pink-500' : 'bg-gradient-to-r from-orange-300 to-pink-400'
            }`}></div>
        </div>

        {/* Animated Text */}
        <div className="text-center space-y-4">
          <h2 className={`text-2xl font-bold animate-pulse ${lightMode ? 'text-gray-800' : 'text-white'
            }`}>
            Loading Your List
          </h2>

          {/* Progress dots */}
          <div className="flex items-center justify-center space-x-2">
            <div className={`w-2 h-2 rounded-full animate-bounce ${lightMode ? 'bg-orange-500' : 'bg-orange-400'
              }`} style={{ animationDelay: '0ms' }}></div>
            <div className={`w-2 h-2 rounded-full animate-bounce ${lightMode ? 'bg-orange-500' : 'bg-orange-400'
              }`} style={{ animationDelay: '150ms' }}></div>
            <div className={`w-2 h-2 rounded-full animate-bounce ${lightMode ? 'bg-orange-500' : 'bg-orange-400'
              }`} style={{ animationDelay: '300ms' }}></div>
          </div>

          <p className={`text-base font-medium animate-fade-in ${lightMode ? 'text-gray-600' : 'text-gray-300'
            }`}>
            Preparing your personalized content...
          </p>
        </div>

        {/* Animated Cards Preview */}
        <div className="flex space-x-4 mt-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-16 h-20 rounded-lg animate-pulse ${lightMode ? 'bg-gradient-to-b from-gray-200 to-gray-300' : 'bg-gradient-to-b from-gray-700 to-gray-800'
                }`}
              style={{
                animationDelay: `${i * 200}ms`,
                animationDuration: '2s'
              }}
            >
              <div className={`w-full h-8 rounded-t-lg ${lightMode ? 'bg-gradient-to-r from-orange-200 to-pink-200' : 'bg-gradient-to-r from-orange-800 to-pink-800'
                }`}></div>
              <div className="p-2 space-y-1">
                <div className={`h-1 rounded ${lightMode ? 'bg-gray-400' : 'bg-gray-600'
                  }`}></div>
                <div className={`h-1 w-3/4 rounded ${lightMode ? 'bg-gray-400' : 'bg-gray-600'
                  }`}></div>
                <div className={`h-1 w-1/2 rounded ${lightMode ? 'bg-gray-400' : 'bg-gray-600'
                  }`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 rounded-full animate-float ${lightMode ? 'bg-orange-300' : 'bg-orange-600'
                }`}
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: '3s',
                opacity: 0.6
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Custom animations styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 2s ease-in-out infinite alternate;
        }
      `}</style>
    </div>
  );
}
     
  return (
  <div>
  <div className="relative h-[30vh] sm:h-[35vh] md:h-[40vh] w-full overflow-hidden">
    <div className={`${!lightMode && 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'} relative z-10 flex items-end h-full px-4 sm:px-6 pb-8 sm:pb-12 md:pb-16`}>
      <div className="w-full sm:w-[90%] md:w-[80%] mx-auto">
        {/* Main Title */}
        <h1 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight tracking-tight ${
          lightMode 
            ? 'text-gray-900 bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent' 
            : 'text-white drop-shadow-lg'
        }`}>
          {type === "bookmarked" ? "Bookmarked Articles" : type === "topics" ? "Topics" : type === "sources" ? "Sources" : "Regions"}
        </h1>
      </div>
    </div>
  </div>
  
  <div className={`h-[2px] w-full ${lightMode ? 'bg-gradient-to-r from-orange-200 via-orange-400 to-orange-200' : 'bg-gradient-to-r from-orange-800 via-orange-600 to-orange-800'}`}></div>
  
  <div className={`min-h-screen ${lightMode ? 'bg-gradient-to-br from-gray-50 via-white to-gray-100' : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'}`}>
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 relative">
        
        {/* Sidebar - Hidden on mobile */}
        <div className="hidden lg:block lg:w-80 space-y-8 lg:sticky lg:top-28 lg:self-start">
          {/* Recent News Articles */}
          <div className={`rounded-2xl p-6 backdrop-blur-sm border transition-all duration-300 hover:shadow-xl ${
            lightMode 
              ? 'bg-white/90 border-gray-200 shadow-lg hover:shadow-orange-200/50' 
              : 'bg-gray-800/90 border-gray-700 shadow-xl hover:shadow-orange-900/30'
          }`}>
            <h3 className={`text-lg font-bold mb-6 tracking-wide ${
              lightMode 
                ? 'text-gray-900 bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent' 
                : 'text-white'
            }`}>
              RECENT NEWS ARTICLES
            </h3>
            <div className="space-y-6">
              {recentArticles?.map((post, index) => (
                <div key={post.id} className="flex gap-4 group cursor-pointer">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex-shrink-0 overflow-hidden shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105 relative">
                    <img src={post.image} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs px-3 py-1 rounded-full font-medium shadow-sm ${iconColors[index % iconColors.length]}`}>
                        {post.topic}
                      </span>
                    </div>
                    <h4 
                      onClick={() => navigate(`/articledetail/${post._id}`)}
                      className={`text-sm font-semibold leading-tight mb-2 cursor-pointer line-clamp-2 transition-all duration-300 group-hover:scale-[1.02] ${
                        lightMode 
                          ? 'text-gray-900 hover:text-orange-600' 
                          : 'text-white hover:text-orange-300'
                      }`}
                    >
                      {post.title}
                    </h4>
                    <p className={`text-xs font-medium ${
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
        </div>

        <span className={`hidden lg:block w-[2px] rounded-full ${lightMode ? 'bg-gradient-to-b from-gray-200 via-orange-300 to-gray-200' : 'bg-gradient-to-b from-gray-700 via-orange-600 to-gray-700'}`}></span>

        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-4 sm:mb-6">
            <p className={`text-sm sm:text-base font-medium ${
              lightMode ? 'text-gray-600' : 'text-gray-400'
            }`}>
              <span className="text-orange-500 font-bold">{list?.length || 0}</span> results found
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {Array.isArray(currentList) && 
                currentList
                  .filter(item => (!(item.name.includes(',') || item.name.includes('('))))
                  .map((category, idx) => {
                    const IconComponent = topicMap[category.name]?.icon || (<NewspaperIcon />);
                    const colorClass = iconColors[idx % iconColors.length];
                    
                    return (
                      <div
                        key={category.id}
                        className={`group cursor-pointer border rounded-2xl transition-all duration-500 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 backdrop-blur-sm ${
                          lightMode
                            ? 'border-gray-200 hover:border-orange-300 bg-white/95 hover:bg-gradient-to-r hover:from-orange-50/80 hover:to-white hover:shadow-orange-200/60'
                            : 'border-gray-700 hover:border-orange-500 bg-gray-800/95 hover:bg-gradient-to-r hover:from-orange-900/30 hover:to-gray-800 hover:shadow-orange-900/40'
                        }`}
                      >
                        <div className="flex items-center justify-between p-5 sm:p-7 relative overflow-hidden">
                          {/* Enhanced gradient accent */}
                          <div className="absolute left-0 top-0 w-2 h-full bg-gradient-to-b from-orange-400 via-orange-500 to-orange-600 group-hover:w-3 transition-all duration-500 rounded-r-full shadow-lg"></div>
                          
                          {/* Subtle background pattern */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500">
                            <div className="w-full h-full bg-gradient-to-r from-orange-500/10 to-transparent"></div>
                          </div>

                          {/* Left Section */}
                          <div className="flex items-center gap-4 sm:gap-6 flex-1 min-w-0 relative z-10">
                            {/* Icon or Logo */}
                            {type === "topics" ? (
                              <div className={`text-2xl sm:text-3xl ${colorClass} group-hover:scale-125 transition-all duration-500 flex-shrink-0 drop-shadow-sm`}>
                                {IconComponent}
                              </div>
                            ) : type=="sources" ?(
                              <div className="w-12 h-12 sm:w-14 sm:h-14 group-hover:scale-110 transition-all duration-500 flex-shrink-0">
                                <img 
                                  src={sourceMap[category?.name]?.logo} 
                                  alt={category.name} 
                                  className="w-full h-full object-contain rounded-xl shadow-lg" 
                                />
                              </div>
                            ) : (
                              <div>
                                 <RegionFlag regionName={category?.name || ''} />
                              </div>
                            )}

                            {/* Name and Count */}
                            <div className="space-y-2 min-w-0 flex-1">
                              <h2 className={`text-lg sm:text-xl font-bold transition-all duration-300 truncate tracking-tight ${
                                lightMode
                                  ? 'text-gray-900 group-hover:text-orange-700'
                                  : 'text-white group-hover:text-orange-200'
                              }`}>
                                {category.name}
                              </h2>
                              <p className={`text-sm font-semibold transition-all duration-300 ${
                                lightMode
                                  ? 'text-gray-600 group-hover:text-orange-600'
                                  : 'text-gray-300 group-hover:text-orange-300'
                              }`}>
                                <span className="text-orange-500 font-bold">{category.articleCount}</span>{" "}
                                {category.articleCount === 1 ? "article" : "articles"}
                              </p>
                            </div>
                          </div>

                          {/* Right: Enhanced "See All" Button */}
                          <button
                            onClick={() => handleClick(category.name)}
                            className="flex items-center gap-3 px-4 sm:px-6 py-3 sm:py-3.5 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:from-orange-600 hover:via-orange-700 hover:to-orange-800 text-white text-sm font-bold rounded-xl transition-all duration-500 group/btn shadow-lg hover:shadow-xl flex-shrink-0 transform hover:scale-105 relative overflow-hidden"
                          >
                            {/* Animated background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
                            
                            <span className="hidden sm:inline relative z-10">See All</span>
                            <span className="sm:hidden relative z-10">View</span>
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-all duration-500 relative z-10" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>

          {/* Enhanced Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-10 sm:mt-14 space-x-2 sm:space-x-3 px-4">
              <button
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:scale-105 ${
                  lightMode
                    ? 'bg-white border border-gray-200 text-gray-700 hover:bg-orange-500 hover:text-white hover:border-orange-500'
                    : 'bg-gray-800 border border-gray-600 text-white hover:bg-orange-500 hover:border-orange-500'
                }`}
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {(() => {
                const pages = [];
                
                pages.push(
                  <button
                    key={1}
                    onClick={() => setCurrentPage(1)}
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl font-bold transition-all duration-300 text-sm border shadow-md hover:shadow-lg transform hover:scale-105 ${
                      currentPage === 1
                        ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white border-orange-500 shadow-orange-300/50"
                        : lightMode
                        ? "bg-white border-gray-200 text-gray-700 hover:bg-orange-500 hover:text-white hover:border-orange-500"
                        : "bg-gray-800 border-gray-600 text-white hover:bg-orange-500 hover:border-orange-500"
                    }`}
                  >
                    1
                  </button>
                );

                if (currentPage > 3) {
                  pages.push(
                    <span
                      key="left-ellipsis"
                      className={`px-2 text-sm font-bold select-none ${
                        lightMode ? 'text-gray-400' : 'text-gray-500'
                      }`}
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
                      className={`w-8 h-8 sm:w-10 sm:h-10 text-sm rounded-xl font-bold transition-all duration-300 border shadow-md hover:shadow-lg transform hover:scale-105 ${
                        currentPage === i
                          ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white border-orange-500 shadow-orange-300/50"
                          : lightMode
                          ? "bg-white border-gray-200 text-gray-700 hover:bg-orange-500 hover:text-white hover:border-orange-500"
                          : "bg-gray-800 border-gray-600 text-white hover:bg-orange-500 hover:border-orange-500"
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
                      className={`px-2 text-sm font-bold select-none ${
                        lightMode ? 'text-gray-400' : 'text-gray-500'
                      }`}
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
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl text-sm font-bold transition-all duration-300 border shadow-md hover:shadow-lg transform hover:scale-105 ${
                        currentPage === totalPages
                          ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white border-orange-500 shadow-orange-300/50"
                          : lightMode
                          ? "bg-white border-gray-200 text-gray-700 hover:bg-orange-500 hover:text-white hover:border-orange-500"
                          : "bg-gray-800 border-gray-600 text-white hover:bg-orange-500 hover:border-orange-500"
                      }`}
                    >
                      {totalPages}
                    </button>
                  );
                }

                return pages;
              })()}

              <button
                onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:scale-105 ${
                  lightMode
                    ? 'bg-white border border-gray-200 text-gray-700 hover:bg-orange-500 hover:text-white hover:border-orange-500'
                    : 'bg-gray-800 border border-gray-600 text-white hover:bg-orange-500 hover:border-orange-500'
                }`}
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Mobile Recent News Articles - Enhanced */}
        <div className={`lg:hidden mt-10 rounded-2xl p-5 backdrop-blur-sm border shadow-xl ${
          lightMode
            ? 'bg-white/95 border-gray-200'
            : 'bg-gray-800/95 border-gray-700'
        }`}>
          <h3 className={`text-lg font-bold mb-5 tracking-wide ${
            lightMode
              ? 'text-gray-900 bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent'
              : 'text-white'
          }`}>
            RECENT NEWS ARTICLES
          </h3>
          <div className="space-y-5">
            {recentArticles?.map((post) => (
              <div key={post.id} className="flex gap-4 group cursor-pointer">
                <div className="w-14 h-14 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex-shrink-0 overflow-hidden shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                  <img src={post.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs px-3 py-1 rounded-full font-medium shadow-sm ${post.categoryColor}`}>
                      {post.topic}
                    </span>
                  </div>
                  <h4
                    onClick={() => navigate(`/articledetail/${post._id}`)}
                    className={`text-sm font-semibold leading-tight mb-2 cursor-pointer line-clamp-2 transition-all duration-300 ${
                      lightMode
                        ? 'text-gray-900 hover:text-orange-600'
                        : 'text-white hover:text-orange-300'
                    }`}
                  >
                    {post.title}
                  </h4>
                  <p className={`text-xs font-medium ${
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
      </div>
    </div>
  </div>
</div>
  );
};

export default ListLayout2;