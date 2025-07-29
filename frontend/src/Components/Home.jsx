import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { myContext } from "./Context";
import relativeTime from "dayjs/plugin/relativeTime";
import DailyInsightsSlider from "./DailyInsightsSlider.jsx";
import HotTopics from "./HotTopics.jsx";
import MultiComponent from "./MultiComponent.jsx";
import SearchResults from "./SearchResults.jsx";
import WeeklyRoundup from './WeeklyRoundUp'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import {
  Search,
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
  Instagram,
  Heart,
  Users,
  Building,
  Atom,
  FileText,
  Trophy,
  BookmarkPlus,
  ChevronRight,
  ChevronLeft,
  AlarmClock,
  ChevronDown,
  ChevronUp,
  Sparkles,
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

const iconProps = { fontSize: 'small' };

const topicsList = [
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

const topicMap = Object.fromEntries(
  topicsList.map((t) => [t.name, { ...t }])
);

import Breaking from "./Breaking";

dayjs.extend(relativeTime);

function Home() {
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const { lightMode } = useContext(myContext);
  
  useEffect(() => {
    async function fetchTopics() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/article/fetchTopicsList`);
        if (response.status === 200) {
          setTopics(response.data);
        }
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    }
    fetchTopics();
  }, []);

  const gradientColors = [
    "from-red-500 to-pink-600",
    "from-blue-500 to-cyan-600", 
    "from-emerald-500 to-teal-600",
    "from-amber-500 to-orange-600",
    "from-purple-500 to-violet-600",
    "from-orange-500 to-red-600",
    "from-lime-500 to-green-600",
    "from-indigo-500 to-blue-600",
  ];

  const backgroundClass = lightMode 
    ? "bg-gradient-to-br from-gray-50 to-white" 
    : "bg-gradient-to-br from-gray-900 to-gray-800";
    
  const cardClass = lightMode
    ? "bg-white/70 backdrop-blur-sm border border-gray-200/50 hover:bg-white/90"
    : "bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-800/80";
    
  const textPrimaryClass = lightMode ? "text-gray-900" : "text-gray-100";
  const textSecondaryClass = lightMode ? "text-gray-600" : "text-gray-400";
  const textTertiaryClass = lightMode ? "text-gray-500" : "text-gray-500";

  return (
    <div className={`min-h-screen ${backgroundClass} transition-colors duration-300`}>
      <Breaking />
      <DailyInsightsSlider />
      <MultiComponent />

      {/* Topic Highlights Section */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mb-8 lg:mb-12">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl shadow-lg">
                <div className="w-6 h-6 bg-white/90 rounded-md flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-0.5">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-sm"></div>
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-sm"></div>
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-sm"></div>
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-sm"></div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <span className={`text-xs font-semibold ${textTertiaryClass} uppercase tracking-wider`}>
                FAVORITE THEMES
              </span>
              <div className={`text-lg font-bold ${textPrimaryClass}`}>Trending Topics</div>
            </div>
          </div>
          
          <button
            className={`group flex items-center space-x-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg ${
              lightMode 
                ? "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600" 
                : "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600"
            }`}
            onClick={() => navigate('/categorylist')}
          >
            <span className="group-hover:animate-pulse">See All Topics</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>

        {/* Main Title */}
        <div className="text-center mb-10 lg:mb-16">
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${textPrimaryClass} mb-4`}>
            Topic <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Highlights</span>
          </h2>
          <p className={`text-base sm:text-lg ${textSecondaryClass} max-w-2xl mx-auto`}>
            Discover the most engaging topics and dive into stories that matter to you
          </p>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {topics.sort((a, b) => b.articleCount - a.articleCount).slice(0, 8).map((topic, index) => (
            <div
              onClick={() => navigate(`/categorylist/${topic.name}`)}
              key={topic.name}
              className={`group relative overflow-hidden rounded-2xl p-6 cursor-pointer transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 ${cardClass} shadow-lg hover:shadow-xl`}
            >
              {/* Background Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${gradientColors[index % gradientColors.length]} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${gradientColors[index % gradientColors.length]} text-white rounded-xl flex items-center justify-center text-lg shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {topicMap[topic.name]?.icon || <NewspaperIcon />}
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    lightMode 
                      ? "bg-blue-100 text-blue-700" 
                      : "bg-blue-900/50 text-blue-300"
                  }`}>
                    {topic.articleCount}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className={`font-bold text-lg ${textPrimaryClass} group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:${gradientColors[index % gradientColors.length]} group-hover:bg-clip-text transition-all duration-300`}>
                    {topic.name}
                  </h3>
                  <p className={`text-sm ${textSecondaryClass}`}>
                    {topic.articleCount} {topic.articleCount === 1 ? 'Article' : 'Articles'}
                  </p>
                </div>
                
                {/* Animated Line */}
                <div className="mt-4 overflow-hidden">
                  <div className={`h-0.5 bg-gradient-to-r ${gradientColors[index % gradientColors.length]} transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500`}></div>
                </div>
              </div>
              
              {/* Hover Effect Particles */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 lg:mt-16 text-center">
          <p className={`text-sm ${textSecondaryClass} mb-4`}>
            Looking for something specific?
          </p>
          <button
            onClick={() => navigate('/categorylist')}
            className={`inline-flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
              lightMode
                ? "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600"
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Explore All Categories</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;