import React, { useContext, useEffect, useRef, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import {
  Heart,
  MessageCircle,
  Share2,
  Twitter,
  Mail,
  Linkedin,
  Plus,
  Search,
  ArrowUp,
  Facebook,
  Youtube,
  Instagram,
  ArrowRight,
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
  Eye,
  ThumbsUp,
  InstagramIcon,
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
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
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
import { myContext } from "./Context";
import { useNavigate, useParams } from "react-router-dom";
// import { start } from "repl";

export default function HeroSection() {
 

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
  const { currUser,lightMode, setLightMode,savedList,setSavedList } = useContext(myContext);
  const topicMap = Object.fromEntries(topics.map((t) => [t.name, { ...t }]));
  const [comment, setComment] = useState('');
  const [article, setArticle] = useState(null);
  // console.log(currArticle);
  const [hideComments, setHideComments] = useState(true);

  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const hasAddedView = useRef(false);
  const [likes, setLikes] = useState(0);
  const [summary, setSummary] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setComment(e.target.value);
  };
 async function handleSubmit() {
  try {
    const data = {
      articleId: article._id,
      userId: currUser?._id,
      content: comment,
      userProfilePic: currUser?.profilePicture,
      userName: currUser?.name,
      createdAt: new Date().toISOString()
    };

    console.log("Sending data ➡️", data);

    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/comment/savecomment`, data);
    console.log("Response received ✅", response.data);

    // Add the returned _id to the data before setting state
    const commentWithId = {
      ...data,
      _id: response.data._id, // 🆔 Added here
    };

    setComments((prev) => [commentWithId, ...prev]);
    setComment("");
  } catch (err) {
    console.error("Error while saving comment ❌", err);
  }
};


   const handleAddBookmark = async (article) => {
      try {
        await axios.get(`${import.meta.env.VITE_API_URL}/api/article/savefavourite`, {
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



  async function handleDelete(commentId) {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/comment/deletecomment/${commentId}`);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (err) {
      console.log(err);
    }
  }

  async function handleLike() {

    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/api/article/likearticle`, {
        params: {
          id: article._id,
          userId: currUser._id,
        }
      });

      if (liked) {
        setLikes(likes - 1);
      }
      else {
        setLikes(likes + 1);
      }
      setLiked(prev => !prev);
    }
    catch (err) {
      console.log(err);
    }


  }


  useEffect(() => {
    if (!article) return;
    setLikes(article.likes.length);
    const likedIds = currUser?.likedArticles?.map((id) => id.toString());
    if (likedIds?.includes(article._id.toString())) {
      setLiked(true);
    }
  }, [article?._id]);


  useEffect(() => {
    if (!article) {
      return;
    };
    async function fetchComments() {
      try {
        const response = await Promise.all(article.comments?.map(async function (id) {
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/comment/getfullcomment/${id}`);
          return res.data;
        }));
        console.log("response", response);
        setComments(response);
      }
      catch (err) {
        console.log(err);
      }
    };
    fetchComments();
  }, [article]);
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
  ];

  const [scrollProgress, setScrollProgress] = useState(0);
  const mainContentRef = useRef(null);
  const [articles, setArticles] = useState([]);
  const activeTimeRef = useRef(0);
  const lastStartRef = useRef(null);
  const { id } = useParams();
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 👈 smooth scroll
    });
  };
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/article/fetchbyid/${id}`)
      .then((res) => {
        setArticle(res.data);
      })
      .catch((err) => {
        console.error("Error fetching article:", err);
      });
  }, [id]);


  function startTimer() {
    if (!lastStartRef.current) {
      lastStartRef.current = Date.now();
    }
  };

  function stopTimer() {
    if (lastStartRef.current) {
      activeTimeRef.current += Date.now() - lastStartRef.current;
      lastStartRef.current = null;
    }
  };
  function handleVisibilityChange() {
    if (document.visibilityState == "hidden") {
      stopTimer();
    }
    else {
      startTimer();
    }
  }
  async function handleBeforeUnload() {
    stopTimer();
    const timeSpentSeconds = Math.floor(activeTimeRef.current / 1000);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/article/addview`, {
        articleId: article?._id,
        timeSpent: timeSpentSeconds,
        userId: currUser?._id
      });


    } catch (error) {
      console.error("Failed to track view:", error);
    }
  };



  useEffect(() => {
    if (!article?._id) return;

    startTimer();
    document.addEventListener("visibilitychange", handleVisibilityChange);



    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("pagehide", handleBeforeUnload);


    return () => {
      handleBeforeUnload();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("pagehide", handleBeforeUnload);
    };
  }, [article?._id]);














  useEffect(() => {
    if (!article) {
      return;
    }
    async function fetchRelatedArticles() {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/article/recommendedarticles`, {
        embedding: article.embedding,
      });
      // console.log("Related Articles:", response.data);
      setArticles(response.data.slice(0,10));
    }
    fetchRelatedArticles();
  }, [id, article]);

  useEffect(() => {
    const handleScroll = () => {
      const content = mainContentRef.current;
      if (!content) return;

      const rect = content.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const contentTop = rect.top + window.scrollY;
      const contentHeight = content.offsetHeight;

      const scrolledPast = window.scrollY - contentTop;
      const visiblePart = Math.min(windowHeight, contentHeight - scrolledPast);

      const seen = Math.max(
        0,
        Math.min(scrolledPast + visiblePart, contentHeight)
      );
      const percentSeen = (seen / contentHeight) * 100;

      setScrollProgress(Math.round(percentSeen));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // trigger once at load

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

// Loading State
if (article == null || savedList === null) {
  return (
    <div className={`min-h-screen flex items-center justify-center ${lightMode ? 'bg-gray-50' : 'bg-slate-900'}`}>
      <div className="text-center space-y-8 p-8">
        {/* Animated Logo/Icon */}
        <div className={`relative w-24 h-24 mx-auto ${lightMode ? 'text-blue-600' : 'text-blue-400'}`}>
          <div className="absolute inset-0 border-4 border-current border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-4 border-current border-b-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDelay: '0.3s' }}></div>
          <div className="absolute inset-4 flex items-center justify-center">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-4">
          <h2 className={`text-2xl md:text-3xl font-bold ${lightMode ? 'text-gray-900' : 'text-white'}`}>
            Loading Article
          </h2>
          <p className={`text-lg ${lightMode ? 'text-gray-600' : 'text-gray-300'} max-w-md mx-auto`}>
            Please wait while we fetch the latest content for you...
          </p>
          
          {/* Loading Dots */}
          <div className="flex justify-center space-x-2 mt-6">
            <div className={`w-3 h-3 rounded-full animate-bounce ${lightMode ? 'bg-blue-500' : 'bg-blue-400'}`}></div>
            <div className={`w-3 h-3 rounded-full animate-bounce ${lightMode ? 'bg-purple-500' : 'bg-purple-400'}`} style={{ animationDelay: '0.1s' }}></div>
            <div className={`w-3 h-3 rounded-full animate-bounce ${lightMode ? 'bg-pink-500' : 'bg-pink-400'}`} style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>

        {/* Progress Skeleton */}
        <div className="w-full max-w-md mx-auto space-y-3">
          <div className={`h-2 rounded-full animate-pulse ${lightMode ? 'bg-gray-200' : 'bg-gray-700'}`}></div>
          <div className={`h-2 rounded-full animate-pulse ${lightMode ? 'bg-gray-200' : 'bg-gray-700'} w-3/4`}></div>
          <div className={`h-2 rounded-full animate-pulse ${lightMode ? 'bg-gray-200' : 'bg-gray-700'} w-1/2`}></div>
        </div>
      </div>
    </div>
  );
}

return (
  <div className={`w-full min-h-screen transition-colors duration-300 ${lightMode ? 'bg-gray-50' : 'bg-slate-900'}`}>
    
    {/* Hero Section */}
    <div className="relative h-[85vh] w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 hover:scale-105"
        style={{
          backgroundImage: `url(${article?.image})`,
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        {/* Gradient Overlay at Bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t"
          style={{
            backgroundImage: lightMode
              ? "linear-gradient(to top, rgb(249,250,251), rgba(249,250,251,0.8), rgba(249,250,251,0.3), rgba(249,250,251,0))"
              : "linear-gradient(to top, rgb(15,23,42), rgba(15,23,42,0.8), rgba(15,23,42,0.3), rgba(15,23,42,0))",
          }}
        ></div>
      </div>

      {/* Floating Bookmark Button - Top Right */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={() => handleAddBookmark(article)}
          className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white rounded-full transition-all duration-300 hover:scale-110 group border border-white/10 shadow-lg"
        >
          {savedList?.some((a) => a._id === article._id) ? (
            <Bookmark className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 fill-current group-hover:scale-110 transition-transform" />
          ) : (
            <BookmarkPlus className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-end justify-center h-full px-4 sm:px-6 lg:px-8 pb-16">
        <div className="text-center max-w-5xl mx-auto">
          {/* Topic Badge */}
          <div className="inline-block mb-6">
            <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-sm text-sm font-bold shadow-lg backdrop-blur-sm border border-white/20 hover:scale-105 transition-transform duration-200">
            {topicMap[article?.topic]?.icon || <HelpOutlineIcon/>}  {article?.topic}
            </span>
          </div>

          {/* Main Title */}
          <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-6 leading-tight ${lightMode ? 'text-gray-900' : 'text-white'} drop-shadow-lg`}>
            {article?.title}
          </h1>

          {/* Author and Date */}
          <div className={`flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 ${lightMode ? 'text-gray-700' : 'text-gray-200'}`}>
            {/* Source Logo */}
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-full ${lightMode ? 'bg-white/90' : 'bg-black/50'} backdrop-blur-sm shadow-lg`}>
                <img
                  src={sourceMap[article?.source]?.logo}
                  alt={article?.source}
                  className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-full border-2 border-white/20"
                />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold uppercase tracking-wider">
                  BY {article?.source}
                </div>
                <div className={`text-sm ${lightMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  {article?.createdAt
                    ? new Date(article.createdAt).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                    : ''}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Main Content Area */}
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Sidebar - Hidden on mobile, visible on large screens */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="sticky top-24 space-y-6">
               
              {/* Post Activity */}
              <div className="rounded-2xl p-4 transition-all duration-300">
                <h3 className={`text-xs font-bold uppercase tracking-wider mb-3 ${lightMode ? 'text-gray-900' : 'text-white'}`}>
                  Activity
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <ThumbsUp
                        onClick={handleLike}
                        className={`w-4 h-4 cursor-pointer transition-all duration-200 hover:scale-110 ${
                          liked 
                            ? `fill-current text-orange-500` 
                            : lightMode ? 'text-gray-600 hover:text-orange-500' : 'text-gray-400 hover:text-orange-400'
                        }`}
                      />
                      <span
                        onClick={handleLike}
                        className={`font-bold cursor-pointer transition-colors duration-200 text-sm ${
                          liked ? "text-orange-500" : lightMode ? "text-gray-700 hover:text-orange-500" : "text-gray-300 hover:text-orange-400"
                        }`}
                      >
                        {likes || 0}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Eye className={`w-4 h-4 ${lightMode ? 'text-blue-500' : 'text-blue-400'}`} />
                      <span className={`font-bold text-sm ${lightMode ? 'text-gray-700' : 'text-gray-300'}`}>{article?.views}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MessageCircle className={`w-4 h-4 ${lightMode ? 'text-green-500' : 'text-green-400'}`} />
                      <span className={`font-bold text-sm ${lightMode ? 'text-gray-700' : 'text-gray-300'}`}>{comments.length}</span>
                    </div>
                  </div>

                  {/* Mobile Bookmark Button - Shows only on sidebar for large screens */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleAddBookmark(article)}
                      className={`flex items-center space-x-2 w-full py-2 px-3 rounded-lg transition-all duration-200 hover:scale-105 ${
                        savedList?.some((a) => a._id === article._id)
                          ? lightMode 
                            ? 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100' 
                            : 'bg-yellow-900/20 text-yellow-400 hover:bg-yellow-900/30'
                          : lightMode 
                            ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' 
                            : 'bg-slate-700 text-gray-400 hover:bg-slate-600'
                      }`}
                    >
                      {savedList?.some((a) => a._id === article._id) ? (
                        <Bookmark className="w-4 h-4 fill-current" />
                      ) : (
                        <BookmarkPlus className="w-4 h-4" />
                      )}
                      <span className="text-xs font-medium">
                        {savedList?.some((a) => a._id === article._id) ? 'Saved' : 'Save'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Reading Progress */}
              <div className="rounded-2xl p-4 transition-all duration-300">
                <h3 className={`text-xs font-bold uppercase tracking-wider mb-3 ${lightMode ? 'text-gray-900' : 'text-white'}`}>
                  Progress
                </h3>
                <div className="space-y-3">
                  <div className={`text-xl font-bold ${lightMode ? 'text-gray-900' : 'text-white'}`}>
                    {Math.round(scrollProgress)}%
                  </div>
                  <div className={`w-full rounded-full h-2 ${lightMode ? 'bg-gray-200' : 'bg-slate-700'}`}>
                    <div
                      className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-300 ease-out shadow-lg"
                      style={{ width: `${scrollProgress}%` }}
                    ></div>
                  </div>
                  <button 
                    onClick={scrollToTop} 
                    className={`flex items-center justify-center space-x-1 text-xs font-medium w-full py-2 px-3 rounded-lg transition-all duration-200 hover:scale-105 ${
                      lightMode 
                        ? 'text-gray-600 hover:text-orange-500 bg-gray-100 hover:bg-orange-50' 
                        : 'text-gray-400 hover:text-orange-400 bg-slate-700 hover:bg-slate-600'
                    }`}
                  >
                    <ArrowUp className="w-3 h-3" />
                    <span>Top</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div ref={mainContentRef} className="lg:col-span-10">
            <div className="transition-all duration-300">
              <div className="p-6 sm:p-8 lg:p-12">
                
                {/* Mobile Bookmark Button - Shows only on mobile/tablet */}
                <div className="lg:hidden mb-6 flex justify-end">
                  <button
                    onClick={() => handleAddBookmark(article)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 shadow-lg ${
                      savedList?.some((a) => a._id === article._id)
                        ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white'
                        : lightMode
                          ? 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
                          : 'bg-slate-800 text-gray-300 border border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    {savedList?.some((a) => a._id === article._id) ? (
                      <Bookmark className="w-5 h-5 fill-current" />
                    ) : (
                      <BookmarkPlus className="w-5 h-5" />
                    )}
                    <span className="font-medium text-sm">
                      {savedList?.some((a) => a._id === article._id) ? 'Saved' : 'Save Article'}
                    </span>
                  </button>
                </div>

                {/* AI Summary Section */}
                <div className="mb-16 transition-all duration-300 ease-in-out">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <span className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                      AI Generated Summary
                    </span>
                    <button
                      onClick={() => setSummary(!summary)}
                      className={`mt-3 sm:mt-0 text-sm font-bold px-4 py-2 rounded-full transition-all duration-200 hover:scale-105 ${
                        summary 
                          ? lightMode ? 'text-red-600 bg-red-50 hover:bg-red-100 border border-red-200' : 'text-red-400 bg-red-900/20 hover:bg-red-900/30 border border-red-800'
                          : lightMode ? 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200' : 'text-emerald-400 bg-emerald-900/20 hover:bg-emerald-900/30 border border-emerald-800'
                      }`}
                    >
                      {summary ? "Hide Summary" : "Show Summary"}
                    </button>
                  </div>

                  {summary && (
                    <div className={`relative border-l-4 border-gradient-to-b from-violet-500 to-cyan-500 p-6 lg:p-8 rounded-r-2xl mt-6 mb-8 shadow-lg backdrop-blur-sm transition-all duration-500 transform ${
                      lightMode ? 'bg-gradient-to-br from-blue-50 to-purple-50 border-l-blue-500' : 'bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-l-blue-400'
                    }`}>
                      <div className="absolute top-4 right-4">
                        <div className={`w-3 h-3 rounded-full animate-pulse ${lightMode ? 'bg-blue-500' : 'bg-blue-400'}`}></div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-full ${lightMode ? 'bg-blue-100' : 'bg-blue-900/30'}`}>
                          <svg className={`w-5 h-5 ${lightMode ? 'text-blue-600' : 'text-blue-400'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className={`text-base lg:text-lg leading-relaxed ${lightMode ? 'text-gray-800' : 'text-gray-200'}`}>
                            <span className={`font-bold ${lightMode ? 'text-teal-700' : 'text-teal-400'}`}>Key Insights: </span>
                            <span className={lightMode ? 'text-slate-700' : 'text-slate-300'}>{article?.summary}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Article Content */}
                <div className="mb-12">
                  <div className={`prose prose-lg max-w-none ${lightMode ? 'prose-gray' : 'prose-invert'}`}>
                    <p className={`text-base lg:text-lg leading-relaxed mb-8 ${lightMode ? 'text-gray-700' : 'text-gray-300'}`}>
                      {article?.content}
                    </p>
                  </div>
                </div>

                {/* Related Articles */}
                <div className="mt-16 pt-8 border-t border-gray-200 dark:border-slate-700">
                  <h3 className={`text-xl lg:text-2xl font-bold mb-8 ${lightMode ? 'text-gray-900' : 'text-white'}`}>
                    Related Articles
                  </h3>

                  <div className="grid gap-2">
                    {articles
                      .filter(art => art.url !== article.url)
                      .slice(0, 7)
                      .map((art, index) => (
                        <div key={art._id} className={`group flex items-start gap-4 p-4 rounded-xl transition-all duration-200 hover:scale-[1.02] cursor-pointer ${
                          lightMode ? 'hover:bg-gray-50 hover:shadow-md' : 'hover:bg-slate-700/50 hover:shadow-lg'
                        }`}>
                          {/* Thumbnail */}
                          <div className="flex-shrink-0">
                            <img
                              src={art.image || "/img1.png"}
                              alt={art.title}
                              className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border-2 border-transparent group-hover:border-orange-200 transition-all duration-200"
                            />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            {/* Topic Badge */}
                            <span
                              className={`inline-block text-white text-xs font-bold px-3 py-1 rounded-sm mb-2 ${articleColors[index % articleColors.length]}`}
                            >
                              {art.topic}
                            </span>

                            {/* Title */}
                            <h4
                              onClick={() => navigate(`/articledetail/${art.id}`)}
                              className={`text-sm sm:text-base font-semibold leading-tight line-clamp-2 group-hover:text-orange-500 transition-colors duration-200 ${
                                lightMode ? 'text-gray-800' : 'text-gray-200'
                              }`}
                            >
                              {art.title}
                            </h4>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="max-w-4xl mx-auto mt-12">
          {/* Comments Toggle */}
          <div
            onClick={() => setHideComments((prev) => !prev)}
            className="rounded-2xl mb-8 p-6 cursor-pointer transition-all duration-300 hover:scale-[1.01]"
          >
            <div className="flex items-center justify-center space-x-3">
              <MessageCircle className={`w-5 h-5 ${lightMode ? 'text-gray-600' : 'text-gray-400'}`} />
              <span className={`font-bold text-lg ${lightMode ? 'text-gray-700' : 'text-gray-300'}`}>
                {hideComments ? "Show Comments" : "Hide Comments"} ({comments?.length})
              </span>
            </div>
          </div>

          {!hideComments && (
            <>
              {/* Comment Form */}
              <div className="rounded-2xl p-6 lg:p-8 mb-8 transition-all duration-300">
                <h2 className={`text-xl lg:text-2xl font-bold mb-6 ${lightMode ? 'text-gray-800' : 'text-white'}`}>
                  Leave a Comment
                </h2>

                <div className="space-y-6">
                  {/* Comment Textarea */}
                  <div>
                    <label className={`block font-medium mb-3 ${lightMode ? 'text-gray-700' : 'text-gray-300'}`}>
                      Your Comment <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="comment"
                      value={comment}
                      onChange={handleInputChange}
                      className={`w-full h-32 p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none transition-all duration-200 ${
                        lightMode 
                          ? 'border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-500' 
                          : 'border-slate-600 bg-slate-700 text-white placeholder-gray-400'
                      }`}
                      placeholder="Share your thoughts..."
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
                  >
                    Post Comment
                  </button>
                </div>
              </div>

              {/* Comments List */}
                <div className="space-y-4">
                {comments?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((comment) => (
                  <div key={comment.id} className={`rounded-xl p-4 border transition-all duration-300 hover:shadow-md ${lightMode ? 'bg-white/80 border-gray-200 hover:bg-white' : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800'}`}>
                    <div className="flex items-start space-x-3">
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        <div className={`w-10 h-10 rounded-full overflow-hidden border-2 ${lightMode ? 'border-gray-200' : 'border-slate-600'}`}>
                          <img 
                            src={comment.userProfilePic} 
                            className="w-full h-full object-cover" 
                            alt={comment.userName}
                          />
                        </div>
                      </div>

                      {/* Comment Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex flex-col">
                            <span className={`font-semibold text-base ${lightMode ? 'text-gray-900' : 'text-white'}`}>
                              {comment.userName}
                            </span>
                            <span className={`text-xs ${lightMode ? 'text-gray-500' : 'text-gray-400'}`}>
                              {formatDistanceToNow(new Date(comment?.createdAt), { addSuffix: true })}
                            </span>
                          </div>
                          
                          {/* Delete Button */}
                          <button onClick={() => handleDelete(comment._id)} className={`p-1 rounded-full transition-all duration-200 hover:scale-110 ${lightMode ? 'text-gray-400 hover:text-red-500 hover:bg-red-50' : 'text-gray-500 hover:text-red-400 hover:bg-red-900/20'}`}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>

                        <p className={`text-sm leading-relaxed ${lightMode ? 'text-gray-700' : 'text-gray-300'}`}>
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  </div>
);
}
