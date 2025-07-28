import React, { useContext, useEffect, useState } from 'react';
import { myContext } from './Context';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  BarChart3,

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
import ArticleIcon from '@mui/icons-material/Article';
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

const topicMap = Object.fromEntries(topics.map((t, i) => [t.name, { ...t }]));
const DailyInsightsCard = ({
  article,
  bgColor,
  index,
  currUser,
  isHovering,
  setIsHovering
  //   hasPlayButton = false
}) => {
  const navigate = useNavigate();
  const { lightMode, setLightMode } = useContext(myContext);



  const sourceLogos = [
    {
      name: "AlJazeera",
      logo: "https://imgs.search.brave.com/sOYPo3PGrP5Q74CbilIAEGISw6X_qP8kNO6eQvil-bM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9wbHVz/cG5nLmNvbS9pbWct/cG5nL2FsLWphemVl/cmEtbG9nby1wbmct/ZmlsZS1hbC1qYXpl/ZXJhLWxvZ28tanBn/LTI3MTcuanBn",
    },
    {
      name: "BBC",
      logo: "https://imgs.search.brave.com/H7VWtsIQaBsTP_fCN1IeKhXPW1tglPrOaLOpwqRKdKU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi80LzQxL0JC/Q19Mb2dvXzIwMjEu/c3ZnLzI1MHB4LUJC/Q19Mb2dvXzIwMjEu/c3ZnLnBuZw",
    },
    {
      name: "CNBC",
      logo: "https://cdn.iconscout.com/icon/free/png-256/free-cnbc-logo-icon-download-in-svg-png-gif-file-formats--company-brand-world-logos-vol-14-pack-icons-283625.png",
    },
    {
      name: "NDTV",
      logo: "https://cdn.brandfetch.io/ndtv.com/fallback/lettermark/theme/dark/h/256/w/256/icon?c=1bfwsmEH20zzEfSNTed",
    },
    {
      name: "Reuters",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmVz2KdZzI709FkaBNZBOISv3zdcxhOZeb7Q&s",
    },
    {
      name: "TechCrunch",
      logo: "https://1000logos.net/wp-content/uploads/2022/09/TechCrunch-Logo-2011.png",
    },
    {
      name: "The Guardian",
      logo: "https://images.seeklogo.com/logo-png/32/1/the-guardian-new-logo-png_seeklogo-326255.png",
    },
    {
      name: "The Hindu",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStrdy7MqfG-d4d9ANKY60PziuZxhkhae8DQA&s",
    },
    {
      name: "Times of India",
      logo: "https://images.seeklogo.com/logo-png/53/1/the-times-of-india-logo-png_seeklogo-537021.png",
    },
  ];
  const sourceMap = Object.fromEntries(sourceLogos.map((s) => [s.name, { ...s }]));
  const { savedList, setSavedList } = useContext(myContext);
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

  return (
    <div
      onMouseEnter={() => setIsHovering?.(true)}
      onMouseLeave={() => setIsHovering?.(false)}
      className={`group rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border ${lightMode
          ? 'bg-white hover:shadow-gray-300/50 border-gray-100'
          : 'bg-gradient-to-br from-gray-800 to-gray-900 hover:shadow-black/70 border-gray-700/50'
        }`}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <img
          src={article?.image ?? '/placeholder.png'}
          alt={article?.title ?? 'Article image'}
          className="w-full h-32 sm:h-40 md:h-48 object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

        <button className={`absolute top-3 right-3 sm:top-4 sm:right-4 backdrop-blur-md rounded-xl p-2.5 transition-all duration-300 transform hover:scale-110 shadow-lg ${lightMode
            ? 'bg-white/30 hover:bg-white/50 border border-white/20'
            : 'bg-black/30 hover:bg-black/50 border border-white/10'
          }`}>
          {savedList.some(item => item?._id === article?._id) ? (
            <BookmarkAddedIcon
              onClick={() => handleAddBookmark(article)}
              className="w-4 h-4 text-white hover:animate-bounce transition-all duration-300 cursor-pointer drop-shadow-sm"
            />
          ) : (
            <BookmarkAddIcon
              onClick={() => handleAddBookmark(article)}
              className="w-4 h-4 text-white hover:animate-bounce transition-all duration-300 cursor-pointer drop-shadow-sm"
            />
          )}
        </button>
      </div>

      {/* Content Section */}
      <div className="p-5 sm:p-6 md:p-7 space-y-4">

        {/* Topic Badge */}
        {article?.topic && (
          <div className="flex gap-2">
            <span className={`text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 rounded-sm ${bgColor} flex items-center shadow-md hover:shadow-lg transition-shadow duration-300 backdrop-blur-sm`}>
              <span className="mr-1.5 text-sm">
                {topicMap[article.topic]?.icon ?? <ArticleIcon />}
              </span>
              <span className="tracking-wide">{article.topic}</span>
            </span>
          </div>
        )}

        {/* Title */}
        <h3
          onClick={() => navigate(`/articledetail/${article?._id}`)}
          className={`text-sm  font-bold hover:underline cursor-pointer leading-tight line-clamp-2 sm:line-clamp-3 transition-all duration-300 ${lightMode
              ? 'text-gray-900 hover:text-blue-600'
              : 'text-white hover:text-blue-400'
            } hover:tracking-wide`}
        >
          {article?.title ?? 'Untitled'}
        </h3>

        {/* Author Info */}
        <div className={`flex items-center text-sm border-t pt-4 ${lightMode
            ? 'text-gray-600 border-gray-100'
            : 'text-gray-400 border-gray-700/50'
          }`}>
          <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-3 sm:mr-4 flex items-center justify-center overflow-hidden ring-2 transition-all duration-300 hover:ring-4 ${lightMode
              ? 'bg-gray-100 ring-gray-200 hover:ring-gray-300'
              : 'bg-gray-700 ring-gray-600 hover:ring-gray-500'
            }`}>
            <img
              src={sourceMap[article?.source]?.logo ?? '/logo-placeholder.png'}
              alt={article?.source}
              className="w-full h-full object-contain p-1"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
              <span className={`font-bold text-[10px] truncate tracking-widest ${lightMode ? 'text-gray-900' : 'text-gray-200'
                }`}>
                BY {article?.source?.toUpperCase() ?? 'UNKNOWN'}
              </span>
              <span className="hidden sm:inline mx-3 opacity-50">•</span>
              <span className={`text-xs sm:text-sm truncate font-medium ${lightMode ? 'text-gray-600' : 'text-gray-400'
                }`}>
                {new Date(article?.createdAt ?? Date.now()).toLocaleDateString(
                  'en-US',
                  { month: 'short', day: 'numeric', year: 'numeric' }
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function DailyInsightsSlider() {


  const { currUser, lightMode, setLightMode, dailyArticles, setDailyArticles } = useContext(myContext);


  const [markedIndex, setMarkedIndex] = useState([]);
  const navigate = useNavigate();



  useEffect(() => {
    if (!currUser) {
      return;
    }
    async function fetchArticles() {
      try {
        const response = await axios.get('/api/article/todaysTopArticlesSlider', {
          params: {
            userId: currUser?._id
          }
        });






        setDailyArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, [currUser]); // 🔁 re-run when these change





  const nextSlide = () => {
    setStartIndex((prev) => (prev + 1) % totalItems);
  };

  const prevSlide = () => {
    setStartIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  const { savedList, setSavedList } = useContext(myContext);
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

  const totalItems = Array.isArray(dailyArticles) ? dailyArticles.length : 0;
  const visibleItems = Math.min(4, totalItems);
  const [startIndex, setStartIndex] = useState(0);
  const endIndex = Math.min(startIndex + visibleItems, totalItems);

  const currentItems = Array.isArray(dailyArticles)
    ? dailyArticles.slice(startIndex, endIndex)
    : [];

  const remItems = Array.isArray(dailyArticles)
    ? dailyArticles.slice(0, (startIndex + visibleItems) % totalItems)
    : [];
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (isHovering == true) {
      return;
    }
    if (totalItems <= visibleItems) return;

    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % totalItems);
    }, 5000);

    return () => clearInterval(interval);
  }, [totalItems, visibleItems, isHovering]); // 🔁 re-run when these change

  const bgColors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-yellow-500",
    "bg-orange-500",
    "bg-red-500",
    "bg-gray-500",
    "bg-indigo-500",
    "bg-pink-500",
    "bg-teal-500",
    "bg-cyan-500",
    "bg-lime-500",
    "bg-amber-500",
    "bg-emerald-500",
    "bg-fuchsia-500",
    "bg-violet-500",
    "bg-rose-500",
    "bg-sky-500",
    "bg-blue-600",
    "bg-green-600",
    "bg-purple-600",
    "bg-yellow-600",
    "bg-orange-600",
    "bg-red-600",
    "bg-gray-600",
    "bg-indigo-600",
    "bg-pink-600",
    "bg-teal-600",
    "bg-cyan-600",
    "bg-lime-600"
  ];







  // Loading component
  if (dailyArticles === null || savedList === null) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${lightMode ? '' : 'bg-gradient-to-br from-gray-900 via-gray-800 to-black'}`}>
        <div className="flex flex-col items-center space-y-8 p-8">

          {/* Animated Loading Rings */}
          <div className="relative">
            {/* Outer ring */}
            <div className={`w-24 h-24 rounded-full border-4 border-transparent animate-spin ${lightMode ? 'border-t-blue-500 border-r-blue-300' : 'border-t-blue-400 border-r-blue-600'
              }`} style={{ animationDuration: '1.5s' }}></div>

            {/* Middle ring */}
            <div className={`absolute top-2 left-2 w-20 h-20 rounded-full border-4 border-transparent animate-spin ${lightMode ? 'border-t-indigo-500 border-l-indigo-300' : 'border-t-indigo-400 border-l-indigo-600'
              }`} style={{ animationDuration: '2s', animationDirection: 'reverse' }}></div>

            {/* Inner ring */}
            <div className={`absolute top-4 left-4 w-16 h-16 rounded-full border-4 border-transparent animate-spin ${lightMode ? 'border-t-purple-500 border-b-purple-300' : 'border-t-purple-400 border-b-purple-600'
              }`} style={{ animationDuration: '1s' }}></div>

            {/* Center dot */}
            <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full animate-pulse ${lightMode ? 'bg-gradient-to-r from-blue-400 to-purple-500' : 'bg-gradient-to-r from-blue-300 to-purple-400'
              }`}></div>
          </div>

          {/* Animated Text */}
          <div className="text-center space-y-4">
            <h2 className={`text-xl sm:text-2xl font-bold animate-pulse ${lightMode ? 'text-gray-800' : 'text-white'
              }`}>
              Loading Daily Insights
            </h2>

            {/* Progress dots */}
            <div className="flex items-center justify-center space-x-2">
              <div className={`w-2 h-2 rounded-full animate-bounce ${lightMode ? 'bg-blue-500' : 'bg-blue-400'
                }`} style={{ animationDelay: '0ms' }}></div>
              <div className={`w-2 h-2 rounded-full animate-bounce ${lightMode ? 'bg-blue-500' : 'bg-blue-400'
                }`} style={{ animationDelay: '150ms' }}></div>
              <div className={`w-2 h-2 rounded-full animate-bounce ${lightMode ? 'bg-blue-500' : 'bg-blue-400'
                }`} style={{ animationDelay: '300ms' }}></div>
            </div>

            <p className={`text-sm sm:text-base font-medium animate-fade-in ${lightMode ? 'text-gray-600' : 'text-gray-300'
              }`}>
              Fetching the latest buzz for you...
            </p>
          </div>

          {/* Animated Cards Preview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`w-12 sm:w-16 h-16 sm:h-20 rounded-lg animate-pulse ${lightMode ? 'bg-gradient-to-b from-gray-200 to-gray-300' : 'bg-gradient-to-b from-gray-700 to-gray-800'
                  }`}
                style={{
                  animationDelay: `${i * 200}ms`,
                  animationDuration: '2s'
                }}
              >
                <div className={`w-full h-6 sm:h-8 rounded-t-lg ${lightMode ? 'bg-gradient-to-r from-blue-200 to-purple-200' : 'bg-gradient-to-r from-blue-800 to-purple-800'
                  }`}></div>
                <div className="p-1 sm:p-2 space-y-1">
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
                className={`absolute w-2 h-2 rounded-full animate-float ${lightMode ? 'bg-blue-300' : 'bg-blue-600'
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
  if (dailyArticles.length === 0) {
    return (
      <div className={`min-h-screen ${lightMode ? 'bg-gray-50' : 'bg-gray-900'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className={`${lightMode ? 'bg-blue-600' : 'bg-blue-500'} rounded-lg p-2`}>
                  <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <span className={`${lightMode ? 'text-blue-600' : 'text-blue-400'} font-semibold text-xs sm:text-sm tracking-wide`}>
                  LATEST BUZZ
                </span>
              </div>
              <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-medium ${lightMode ? 'text-gray-900' : 'text-white'}`}>
                Daily Insights
              </h1>
            </div>
            <button
              onClick={() => navigate(`/daily/${new Date().toISOString().slice(0, 10)}`)}
              className={`${lightMode ? 'text-blue-600 hover:text-blue-700' : 'text-blue-400 hover:text-blue-300'} font-semibold transition-colors flex items-center gap-2 self-start sm:self-center`}
            >
              See All <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Empty State */}
          <div className={`flex flex-col items-center justify-center py-16 sm:py-24 ${lightMode ? 'bg-white' : 'bg-gray-800'} rounded-2xl border-2 border-dashed ${lightMode ? 'border-gray-200' : 'border-gray-600'}`}>
            <div className="text-center space-y-6 max-w-md mx-auto px-4">
              {/* Empty State Icon */}
              <div className={`w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full flex items-center justify-center ${lightMode ? 'bg-gray-100' : 'bg-gray-700'}`}>
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center ${lightMode ? 'bg-blue-100' : 'bg-blue-900'}`}>
                  <BarChart3 className={`w-6 h-6 sm:w-7 sm:h-7 ${lightMode ? 'text-blue-600' : 'text-blue-400'}`} />
                </div>
              </div>

              {/* Empty State Text */}
              <div className="space-y-3">
                <h3 className={`text-xl sm:text-2xl font-semibold ${lightMode ? 'text-gray-900' : 'text-white'}`}>
                  No Daily Insights Yet
                </h3>
                <p className={`text-sm sm:text-base ${lightMode ? 'text-gray-600' : 'text-gray-400'} leading-relaxed`}>
                  We're still gathering today's most interesting articles and insights. Check back in a little while for fresh content!
                </p>
              </div>

              {/* Action Buttons */}
              {/* Action Button - moved up */}
              <div className="flex justify-center pt-4">
                <button
                  onClick={() => window.location.reload()}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${lightMode
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                >
                  Refresh Page
                </button>
              </div>

              {/* Decorative Elements */}
              <div className="flex justify-center space-x-2 pt-6">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full animate-pulse ${lightMode ? 'bg-blue-300' : 'bg-blue-600'}`}
                    style={{ animationDelay: `${i * 0.3}s` }}
                  ></div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={`min-h-screen transition-colors duration-500 ${lightMode ? 'bg-gradient-to-br from-gray-50 via-white to-gray-100' : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 sm:mb-12 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className={`${lightMode ? 'bg-gradient-to-r from-blue-600 to-blue-700 shadow-blue-200' : 'bg-gradient-to-r from-blue-500 to-blue-600 shadow-blue-900/50'} rounded-2xl p-3 shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="space-y-1">
                <span className={`${lightMode ? 'text-blue-600' : 'text-blue-400'} font-bold text-sm sm:text-base tracking-widest uppercase`}>
                  Latest Buzz
                </span>
                <div className={`w-12 h-0.5 ${lightMode ? 'bg-blue-600' : 'bg-blue-400'} rounded-full`}></div>
              </div>
            </div>
            <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight ${lightMode ? 'text-gray-900' : 'text-white'} leading-tight`}>
              Daily Insights
            </h1>
            <p className={`text-lg ${lightMode ? 'text-gray-600' : 'text-gray-400'} max-w-2xl`}>
              Stay updated with the most trending stories and breaking news from around the world
            </p>
          </div>

          <button
            onClick={() => navigate(`/daily/${new Date().toISOString().slice(0, 10)}`)}
            className={`group ${lightMode ? 'bg-white hover:bg-blue-50 text-blue-600 border-blue-200 hover:border-blue-300 shadow-lg hover:shadow-xl' : 'bg-gray-800 hover:bg-gray-700 text-blue-400 border-gray-700 hover:border-gray-600 shadow-lg hover:shadow-2xl'} font-semibold transition-all duration-300 flex items-center gap-3 px-6 py-3 rounded-2xl border-2 self-start sm:self-center hover:scale-105 transform`}
          >
            <span>See All Articles</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>

        {/* Article Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {currentItems?.map((article, index) => (
            <div
              key={article.id || index}
              className="transform hover:scale-105 transition-transform duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <DailyInsightsCard
                index={index}
                article={article}
                bgColor={bgColors[index % bgColors.length]}
                currUser={currUser}
                isHovering={isHovering}
                setIsHovering={setIsHovering}
                lightMode={lightMode}
              />
            </div>
          ))}
          {endIndex - startIndex < visibleItems && remItems.map((article, index) => (
            <div
              key={article.id || `rem-${index}`}
              className="transform hover:scale-105 transition-transform duration-300"
              style={{ animationDelay: `${(currentItems?.length + index) * 100}ms` }}
            >
              <DailyInsightsCard
                index={index}
                article={article}
                bgColor={bgColors[index % bgColors.length]}
                currUser={currUser}
                isHovering={isHovering}
                setIsHovering={setIsHovering}
                lightMode={lightMode}
              />
            </div>
          ))}
        </div>

        {/* Enhanced Pagination */}
        <div className={`flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-3xl border backdrop-blur-sm ${lightMode
            ? 'bg-white/80 border-gray-200 shadow-lg'
            : 'bg-gray-800/80 border-gray-700 shadow-2xl'
          }`}>
          <div className="flex items-center gap-4 order-2 sm:order-1">
            <div className={`w-2 h-2 rounded-full ${lightMode ? 'bg-blue-600' : 'bg-blue-400'}`}></div>
            <span className={`${lightMode ? 'text-gray-700' : 'text-gray-300'} text-sm font-medium`}>
              Showing <span className="font-bold">{startIndex + 1}</span> — <span className="font-bold">{(startIndex + visibleItems) % totalItems === 0 ? `${totalItems}` : (startIndex + visibleItems) % totalItems}</span> of <span className="font-bold">{totalItems}</span> articles
            </span>
          </div>

          <div className="flex items-center gap-3 order-1 sm:order-2">
            <span className={`text-xs font-semibold tracking-wide uppercase ${lightMode ? 'text-gray-500' : 'text-gray-400'}`}>
              Navigate
            </span>
            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                disabled={startIndex === 0}
                className={`group p-3 rounded-xl border-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 transform ${lightMode
                    ? 'border-gray-300 hover:border-blue-400 hover:bg-blue-50 bg-white shadow-md hover:shadow-lg disabled:hover:bg-white disabled:hover:border-gray-300 disabled:hover:scale-100'
                    : 'border-gray-600 hover:border-blue-500 hover:bg-blue-900/20 bg-gray-700 shadow-lg hover:shadow-xl disabled:hover:bg-gray-700 disabled:hover:border-gray-600 disabled:hover:scale-100'
                  }`}
              >
                <ChevronLeft className={`w-5 h-5 transition-colors duration-300 ${lightMode
                    ? 'text-gray-600 group-hover:text-blue-600'
                    : 'text-gray-400 group-hover:text-blue-400'
                  }`} />
              </button>

              <button
                onClick={nextSlide}
                disabled={startIndex + visibleItems >= totalItems}
                className={`group p-3 rounded-xl border-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 transform ${lightMode
                    ? 'border-gray-300 hover:border-blue-400 hover:bg-blue-50 bg-white shadow-md hover:shadow-lg disabled:hover:bg-white disabled:hover:border-gray-300 disabled:hover:scale-100'
                    : 'border-gray-600 hover:border-blue-500 hover:bg-blue-900/20 bg-gray-700 shadow-lg hover:shadow-xl disabled:hover:bg-gray-700 disabled:hover:border-gray-600 disabled:hover:scale-100'
                  }`}
              >
                <ChevronRight className={`w-5 h-5 transition-colors duration-300 ${lightMode
                    ? 'text-gray-600 group-hover:text-blue-600'
                    : 'text-gray-400 group-hover:text-blue-400'
                  }`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
