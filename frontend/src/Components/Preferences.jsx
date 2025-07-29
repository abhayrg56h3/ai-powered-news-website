import React, { useContext, useEffect, useState } from "react";
import {
  Settings,
  Heart,
  Globe,
  BookOpen,
  Save,
  Check,
  AlertTriangle,
  Newspaper,
  Scale,
  Users,
  Tag,
  Atom,
  Monitor,
  Shield as HealthIcon,
  GraduationCap,
  Trees,
  Building2,
  Briefcase,
  DollarSign,
  Gavel,
  Shield,
  Church,
  Lightbulb,
  BookOpenCheck,
  Palette,
  Video,
  Gamepad2,
  Dumbbell,
  MapPin,
  UtensilsCrossed,
  Shirt,
  Sparkles,
  Baby,
  HeartHandshake,
  Brain,
  Brush,
  Cat,
  Wheat,
  Zap,
  Car,
  Rocket,
  Waves,
  Building,
  Sword,
  Handshake,
  Languages,
  UserCheck,
  MessageSquare,
  UserX,
  Smartphone,
  Lock,
  ThumbsUp,
  Store,
  Receipt,
  TrendingUp,
  Home,
  PiggyBank,
  Cpu,
  Wrench,
  Calculator,
  Book,
  Film,
  Tv,
  Music,
  Mic,
  Camera,
  Compass,
  Trash2,
  Droplets,
  Plane,
  Train,
  Ship,
  Flag,
  Eye,
  Smile,
  Trophy,
  PartyPopper,
  Target,
  ShoppingCart,
  BarChart3,
} from "lucide-react";
import { myContext } from "./Context.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const topics = [
  { name: 'News', icon: <Newspaper className="w-4 h-4" /> },
  { name: 'Politics', icon: <Scale className="w-4 h-4" /> },
  { name: 'Government', icon: <Building className="w-4 h-4" /> },
  { name: 'Society', icon: <Users className="w-4 h-4" /> },
  { name: 'Culture', icon: <Tag className="w-4 h-4" /> },
  { name: 'Science', icon: <Atom className="w-4 h-4" /> },
  { name: 'Technology', icon: <Monitor className="w-4 h-4" /> },
  { name: 'Health', icon: <HealthIcon className="w-4 h-4" /> },
  { name: 'Education', icon: <GraduationCap className="w-4 h-4" /> },
  { name: 'Environment', icon: <Trees className="w-4 h-4" /> },
  { name: 'Economy', icon: <Building2 className="w-4 h-4" /> },
  { name: 'Business', icon: <Briefcase className="w-4 h-4" /> },
  { name: 'Finance', icon: <DollarSign className="w-4 h-4" /> },
  { name: 'Law', icon: <Gavel className="w-4 h-4" /> },
  { name: 'Crime', icon: <Shield className="w-4 h-4" /> },
  { name: 'Religion', icon: <Church className="w-4 h-4" /> },
  { name: 'Philosophy', icon: <Lightbulb className="w-4 h-4" /> },
  { name: 'History', icon: <BookOpenCheck className="w-4 h-4" /> },
  { name: 'Art', icon: <Palette className="w-4 h-4" /> },
  { name: 'Media', icon: <Video className="w-4 h-4" /> },
  { name: 'Entertainment', icon: <Gamepad2 className="w-4 h-4" /> },
  { name: 'Sports', icon: <Dumbbell className="w-4 h-4" /> },
  { name: 'Lifestyle', icon: <Sparkles className="w-4 h-4" /> },
  { name: 'Travel', icon: <MapPin className="w-4 h-4" /> },
  { name: 'Food', icon: <UtensilsCrossed className="w-4 h-4" /> },
  { name: 'Fashion', icon: <Shirt className="w-4 h-4" /> },
  { name: 'Beauty', icon: <Sparkles className="w-4 h-4" /> },
  { name: 'Parenting', icon: <Baby className="w-4 h-4" /> },
  { name: 'Relationships', icon: <HeartHandshake className="w-4 h-4" /> },
  { name: 'Psychology', icon: <Brain className="w-4 h-4" /> },
  { name: 'Self-Improvement', icon: <Brush className="w-4 h-4" /> },
  { name: 'Animals', icon: <Cat className="w-4 h-4" /> },
  { name: 'Agriculture', icon: <Wheat className="w-4 h-4" /> },
  { name: 'Energy', icon: <Zap className="w-4 h-4" /> },
  { name: 'Infrastructure', icon: <Building className="w-4 h-4" /> },
  { name: 'Transportation', icon: <Car className="w-4 h-4" /> },
  { name: 'Space', icon: <Rocket className="w-4 h-4" /> },
  { name: 'Climate', icon: <Waves className="w-4 h-4" /> },
  { name: 'Startups', icon: <Rocket className="w-4 h-4" /> },
  { name: 'War', icon: <Sword className="w-4 h-4" /> },
  { name: 'Peace', icon: <Handshake className="w-4 h-4" /> },
  { name: 'Diplomacy', icon: <Languages className="w-4 h-4" /> },
  { name: 'Gender', icon: <UserCheck className="w-4 h-4" /> },
  { name: 'LGBTQ+', icon: <MessageSquare className="w-4 h-4" /> },
  { name: 'Race', icon: <Users className="w-4 h-4" /> },
  { name: 'Immigration', icon: <Languages className="w-4 h-4" /> },
  { name: 'Democracy', icon: <Flag className="w-4 h-4" /> },
  { name: 'Human Rights', icon: <UserCheck className="w-4 h-4" /> },
  { name: 'Activism', icon: <MessageSquare className="w-4 h-4" /> },
  { name: 'Censorship', icon: <UserX className="w-4 h-4" /> },
  { name: 'Digital Media', icon: <Smartphone className="w-4 h-4" /> },
  { name: 'Internet', icon: <Smartphone className="w-4 h-4" /> },
  { name: 'Cybersecurity', icon: <Lock className="w-4 h-4" /> },
  { name: 'Social Media', icon: <ThumbsUp className="w-4 h-4" /> },
  { name: 'Marketing', icon: <Store className="w-4 h-4" /> },
  { name: 'Advertising', icon: <Receipt className="w-4 h-4" /> },
  { name: 'Innovation', icon: <TrendingUp className="w-4 h-4" /> },
  { name: 'Careers', icon: <Briefcase className="w-4 h-4" /> },
  { name: 'Work', icon: <Briefcase className="w-4 h-4" /> },
  { name: 'Remote Work', icon: <Monitor className="w-4 h-4" /> },
  { name: 'Real Estate', icon: <Home className="w-4 h-4" /> },
  { name: 'Stock Market', icon: <PiggyBank className="w-4 h-4" /> },
  { name: 'Cryptocurrency', icon: <Cpu className="w-4 h-4" /> },
  { name: 'Banking', icon: <Building2 className="w-4 h-4" /> },
  { name: 'Taxes', icon: <Receipt className="w-4 h-4" /> },
  { name: 'Consumerism', icon: <ShoppingCart className="w-4 h-4" /> },
  { name: 'Big Tech', icon: <Cpu className="w-4 h-4" /> },
  { name: 'Data', icon: <BarChart3 className="w-4 h-4" /> },
  { name: 'Privacy', icon: <Lock className="w-4 h-4" /> },
  { name: 'Engineering', icon: <Wrench className="w-4 h-4" /> },
  { name: 'Mathematics', icon: <Calculator className="w-4 h-4" /> },
  { name: 'Physics', icon: <Atom className="w-4 h-4" /> },
  { name: 'Chemistry', icon: <Atom className="w-4 h-4" /> },
  { name: 'Biology', icon: <Atom className="w-4 h-4" /> },
  { name: 'Astronomy', icon: <Rocket className="w-4 h-4" /> },
  { name: 'Pharmaceuticals', icon: <HealthIcon className="w-4 h-4" /> },
  { name: 'Mental Health', icon: <Brain className="w-4 h-4" /> },
  { name: 'Fitness', icon: <Dumbbell className="w-4 h-4" /> },
  { name: 'Nutrition', icon: <UtensilsCrossed className="w-4 h-4" /> },
  { name: 'Diseases', icon: <Shield className="w-4 h-4" /> },
  { name: 'Pandemics', icon: <Shield className="w-4 h-4" /> },
  { name: 'Vaccines', icon: <HealthIcon className="w-4 h-4" /> },
  { name: 'Wellness', icon: <Sparkles className="w-4 h-4" /> },
  { name: 'Spirituality', icon: <Church className="w-4 h-4" /> },
  { name: 'Justice', icon: <Scale className="w-4 h-4" /> },
  { name: 'Freedom', icon: <Flag className="w-4 h-4" /> },
  { name: 'Equality', icon: <Users className="w-4 h-4" /> },
  { name: 'Traditions', icon: <Church className="w-4 h-4" /> },
  { name: 'Languages', icon: <Languages className="w-4 h-4" /> },
  { name: 'Literature', icon: <Book className="w-4 h-4" /> },
  { name: 'Books', icon: <Book className="w-4 h-4" /> },
  { name: 'Film', icon: <Film className="w-4 h-4" /> },
  { name: 'Television', icon: <Tv className="w-4 h-4" /> },
  { name: 'Music', icon: <Music className="w-4 h-4" /> },
  { name: 'Dance', icon: <Gamepad2 className="w-4 h-4" /> },
  { name: 'Theatre', icon: <Gamepad2 className="w-4 h-4" /> },
  { name: 'Museums', icon: <Building className="w-4 h-4" /> },
  { name: 'Photography', icon: <Camera className="w-4 h-4" /> },
  { name: 'Architecture', icon: <Building className="w-4 h-4" /> },
  { name: 'Design', icon: <Palette className="w-4 h-4" /> },
  { name: 'Sustainability', icon: <Trees className="w-4 h-4" /> },
  { name: 'Pollution', icon: <Trash2 className="w-4 h-4" /> },
  { name: 'Natural Disasters', icon: <Waves className="w-4 h-4" /> },
  { name: 'Forests', icon: <Trees className="w-4 h-4" /> },
  { name: 'Oceans', icon: <Waves className="w-4 h-4" /> },
  { name: 'Wildlife', icon: <Cat className="w-4 h-4" /> },
  { name: 'Recycling', icon: <Trash2 className="w-4 h-4" /> },
  { name: 'Water', icon: <Droplets className="w-4 h-4" /> },
  { name: 'Electricity', icon: <Zap className="w-4 h-4" /> },
  { name: 'Aviation', icon: <Plane className="w-4 h-4" /> },
  { name: 'Railways', icon: <Train className="w-4 h-4" /> },
  { name: 'Shipping', icon: <Ship className="w-4 h-4" /> },
  { name: 'Space Exploration', icon: <Rocket className="w-4 h-4" /> },
];
const topicMap = Object.fromEntries(topics.map((t, i) => [t.name, { ...t }]));
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

export default function PreferencesPage() {
  const [showSuccessMessage, setShowSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState("");
  const { currUser, setCurrUser, lightMode } = useContext(myContext);
  const isAlphaOnly = (str) => /^[A-Za-z\s]+$/.test(str);
  const [favoriteTopics, setFavoriteTopics] = useState([]);
  const [regions, setRegions] = useState([]);
  
  useEffect(() => {
    async function fetchRegionsList() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/article/fetchRegionsList`);
        let arr = [];
        res.data.map(function (item) {
          arr.push(item.name);
        });
        setRegions(arr);
      } catch (err) {
        console.log(err);
      }
    }
    fetchRegionsList();
  }, []);

  useEffect(() => {
    async function fetchTopicsList() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/article/fetchTopicsList`);
        let arr = [];
        res.data.map(function (item) {
          arr.push(item.name);
        });
        setFavoriteTopics(arr);
      } catch (err) {
        console.log(err);
      }
    }
    fetchTopicsList();
  }, []);

  const newsSources = sourceLogos.map(source => source.name);
  const [selectedTopics, setSelectedTopics] = useState([]);
  useEffect(() => {
    if (!currUser) return;
    let arr = [];
    currUser.preferences.topics.map(function (item) {
      arr.push(item);
    });
    setSelectedTopics(arr);
  }, [currUser]);

  const [selectedSources, setSelectedSources] = useState([]);
  useEffect(() => {
    if (!currUser) return;
    let arr = [];
    currUser.preferences.sources.map(function (item) {
      arr.push(item);
    });
    setSelectedSources(arr);
  }, [currUser]);

  const [selectedRegions, setSelectedRegions] = useState([]);
  useEffect(() => {
    if (!currUser) return;
    let arr = [];
    currUser?.preferences?.regions?.map(function (item) {
      arr.push(item);
    });
    setSelectedRegions(arr);
  }, [currUser]);

  const handleTopicToggle = (topic) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const handleRegionToggle = (region) => {
    setSelectedRegions((prev) =>
      prev.includes(region)
        ? prev.filter((s) => s !== region)
        : [...prev, region]
    );
  };

  const handleSourceToggle = (source) => {
    setSelectedSources((prev) =>
      prev.includes(source)
        ? prev.filter((s) => s !== source)
        : [...prev, source]
    );
  };

  const showSuccess = (message) => {
    setShowSuccessMessage(message);
    setShowErrorMessage("");
    setTimeout(() => setShowSuccessMessage(""), 3000);
  };

  const showError = (message) => {
    setShowErrorMessage(message);
    setShowSuccessMessage("");
    setTimeout(() => setShowErrorMessage(""), 3000);
  };

  async function handleSave() {
    if (selectedSources.length === 0 || selectedRegions.length === 0 || selectedTopics.length === 0) {
      showError("Please select at least one source, region and topic.");
      return;
    }
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/user/updatepreferences`, {
        sources: selectedSources,
        regions: selectedRegions,
        topics: selectedTopics,
        user: currUser
      });
      const updatedUser = {
        ...currUser,
        preferences: {
          ...currUser.preferences,
          sources: selectedSources,
          regions: selectedRegions,
          topics: selectedTopics
        }
      };
      setCurrUser(updatedUser);
      showSuccess("Preferences updated successfully!");
    } catch (err) {
      console.error(err);
      showError("Failed to update preferences. Please try again later.");
    }
  }

  return (
    <div className={`min-h-screen ${lightMode ? 'bg-gray-50 text-gray-800' : 'bg-gray-900 text-gray-100'} px-4 py-6 transition-colors duration-200`}>
      {/* Toast Notifications */}
      {showSuccessMessage && (
        <div className="fixed top-6 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2">
          <Check className="w-5 h-5" />
          <span className="font-medium">{showSuccessMessage}</span>
        </div>
      )}
      {showErrorMessage && (
        <div className="fixed top-6 right-6 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          <span className="font-medium">{showErrorMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className={`text-3xl font-bold mt-28 mb-2 flex items-center gap-3 ${lightMode ? 'text-gray-800' : 'text-white'}`}>
          <Settings className={lightMode ? "text-orange-500" : "text-orange-400"} />
          Reading Preferences
        </h1>
        <p className={lightMode ? "text-gray-600" : "text-gray-300"}>
          Customize your news reading experience
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`${lightMode ? 'bg-orange-500' : 'bg-orange-600'} rounded-xl p-6 text-white relative overflow-hidden`}>
            <div className="absolute top-4 right-4 text-white/20">
              <Heart className="w-8 h-8" />
            </div>
            <div className="text-4xl font-bold mb-2">{selectedTopics.length}</div>
            <div className="text-orange-100 font-medium">Topics Selected</div>
          </div>
          <div className={`${lightMode ? 'bg-blue-500' : 'bg-blue-600'} rounded-xl p-6 text-white relative overflow-hidden`}>
            <div className="absolute top-4 right-4 text-white/20">
              <Globe className="w-8 h-8" />
            </div>
            <div className="text-4xl font-bold mb-2">{selectedRegions.length}</div>
            <div className="text-blue-100 font-medium">Regions Covered</div>
          </div>
          <div className={`${lightMode ? 'bg-green-500' : 'bg-green-600'} rounded-xl p-6 text-white relative overflow-hidden`}>
            <div className="absolute top-4 right-4 text-white/20">
              <BookOpen className="w-8 h-8" />
            </div>
            <div className="text-4xl font-bold mb-2">{selectedSources.length}</div>
            <div className="text-green-100 font-medium">Sources Read</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Topics Section */}
          <div className={`${lightMode ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'} rounded-xl border overflow-hidden`}>
            <div className={`${lightMode ? 'border-gray-100 bg-white' : 'border-gray-700 bg-gray-800'} p-6 border-b`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${lightMode ? 'bg-orange-100' : 'bg-orange-900/30'} rounded-lg flex items-center justify-center`}>
                    <Heart className={lightMode ? "w-5 h-5 text-orange-500" : "w-5 h-5 text-orange-400"} />
                  </div>
                  <div>
                    <h3 className={`font-bold ${lightMode ? 'text-gray-800' : 'text-white'}`}>Category Preferences</h3>
                    <p className={`text-sm ${lightMode ? 'text-gray-500' : 'text-gray-400'}`}>{favoriteTopics.length} items</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${lightMode ? 'bg-orange-100 text-orange-600' : 'bg-orange-900/30 text-orange-300'}`}>
                  {selectedTopics.length}
                </span>
              </div>
            </div>
            <div className={`p-6 max-h-96 overflow-y-auto ${lightMode ? 'bg-white' : 'bg-gray-800'}`}>
              <div className="space-y-3">
                {favoriteTopics.filter(isAlphaOnly).map((topic) => (
                  <label key={topic} className={`flex items-center gap-3 cursor-pointer group hover:bg-opacity-10 hover:bg-orange-500 p-3 rounded-lg transition-colors ${!lightMode && selectedTopics.includes(topic) ? 'bg-orange-900/20' : ''}`}>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={selectedTopics.includes(topic)}
                        onChange={() => handleTopicToggle(topic)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                        selectedTopics.includes(topic)
                          ? (lightMode ? "bg-orange-500 border-orange-500" : "bg-orange-600 border-orange-600")
                          : (lightMode ? "border-gray-300 hover:border-gray-400" : "border-gray-500 hover:border-gray-400")
                      }`}>
                        {selectedTopics.includes(topic) && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={lightMode ? "text-orange-500" : "text-orange-400"}>
                        {topicMap[topic]?.icon || <Newspaper className="w-4 h-4" />}
                      </span>
                      <span className={`text-sm font-medium ${
                        selectedTopics.includes(topic)
                          ? (lightMode ? "text-orange-600" : "text-orange-300")
                          : (lightMode ? "text-gray-700" : "text-gray-300")
                      }`}>
                        {topic}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Regions Section */}
          <div className={`${lightMode ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'} rounded-xl border overflow-hidden`}>
            <div className={`${lightMode ? 'border-gray-100 bg-white' : 'border-gray-700 bg-gray-800'} p-6 border-b`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${lightMode ? 'bg-blue-100' : 'bg-blue-900/30'} rounded-lg flex items-center justify-center`}>
                    <Globe className={lightMode ? "w-5 h-5 text-blue-500" : "w-5 h-5 text-blue-400"} />
                  </div>
                  <div>
                    <h3 className={`font-bold ${lightMode ? 'text-gray-800' : 'text-white'}`}>Region Preferences</h3>
                    <p className={`text-sm ${lightMode ? 'text-gray-500' : 'text-gray-400'}`}>{regions.length} items</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${lightMode ? 'bg-blue-100 text-blue-600' : 'bg-blue-900/30 text-blue-300'}`}>
                  {selectedRegions.length}
                </span>
              </div>
            </div>
            <div className={`p-6 max-h-96 overflow-y-auto ${lightMode ? 'bg-white' : 'bg-gray-800'}`}>
              <div className="space-y-3">
                {regions.filter(item => isAlphaOnly(item) && item.toLowerCase() !== "null").map((region) => (
                  <label key={region} className={`flex items-center gap-3 cursor-pointer group hover:bg-opacity-10 hover:bg-blue-500 p-3 rounded-lg transition-colors ${!lightMode && selectedRegions.includes(region) ? 'bg-blue-900/20' : ''}`}>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={selectedRegions.includes(region)}
                        onChange={() => handleRegionToggle(region)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                        selectedRegions.includes(region)
                          ? (lightMode ? "bg-blue-500 border-blue-500" : "bg-blue-600 border-blue-600")
                          : (lightMode ? "border-gray-300 hover:border-gray-400" : "border-gray-500 hover:border-gray-400")
                      }`}>
                        {selectedRegions.includes(region) && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                    </div>
                    <span className={`text-sm font-medium ${
                      selectedRegions.includes(region)
                        ? (lightMode ? "text-blue-600" : "text-blue-300")
                        : (lightMode ? "text-gray-700" : "text-gray-300")
                    }`}>
                      {region}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Sources Section */}
          <div className={`${lightMode ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'} rounded-xl border overflow-hidden`}>
            <div className={`${lightMode ? 'border-gray-100 bg-white' : 'border-gray-700 bg-gray-800'} p-6 border-b`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${lightMode ? 'bg-green-100' : 'bg-green-900/30'} rounded-lg flex items-center justify-center`}>
                    <BookOpen className={lightMode ? "w-5 h-5 text-green-500" : "w-5 h-5 text-green-400"} />
                  </div>
                  <div>
                    <h3 className={`font-bold ${lightMode ? 'text-gray-800' : 'text-white'}`}>Source Preferences</h3>
                    <p className={`text-sm ${lightMode ? 'text-gray-500' : 'text-gray-400'}`}>{newsSources.length} items</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${lightMode ? 'bg-green-100 text-green-600' : 'bg-green-900/30 text-green-300'}`}>
                  {selectedSources.length}
                </span>
              </div>
            </div>
            <div className={`p-6 max-h-96 overflow-y-auto ${lightMode ? 'bg-white' : 'bg-gray-800'}`}>
              <div className="space-y-3">
                {newsSources.filter(isAlphaOnly).map((source) => (
                  <label key={source} className={`flex items-center gap-3 cursor-pointer group hover:bg-opacity-10 hover:bg-green-500 p-3 rounded-lg transition-colors ${!lightMode && selectedSources.includes(source) ? 'bg-green-900/20' : ''}`}>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={selectedSources.includes(source)}
                        onChange={() => handleSourceToggle(source)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                        selectedSources.includes(source)
                          ? (lightMode ? "bg-green-500 border-green-500" : "bg-green-600 border-green-600")
                          : (lightMode ? "border-gray-300 hover:border-gray-400" : "border-gray-500 hover:border-gray-400")
                      }`}>
                        {selectedSources.includes(source) && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                    </div>
                    <span className={`text-sm font-medium ${
                      selectedSources.includes(source)
                        ? (lightMode ? "text-green-600" : "text-green-300")
                        : (lightMode ? "text-gray-700" : "text-gray-300")
                    }`}>
                      {source}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleSave}
            className={`${
              lightMode
                ? 'bg-orange-500 hover:bg-orange-600 text-white'
                : 'bg-orange-600 hover:bg-orange-700 text-white'
            } px-8 py-4 rounded-xl font-bold text-lg transition-colors flex items-center gap-3 shadow-lg hover:shadow-xl`}
          >
            <Save className="w-6 h-6" />
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}