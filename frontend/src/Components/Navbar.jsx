// Navbar.js
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Search,
  Bookmark,
  Menu,
  Sun,
  Moon as MoonIcon, // Renamed import to avoid conflict
  ChevronRight,
  Archive,
  FileText,
  ShoppingBag,
  User,
  LogIn,
  Star,
  List,
  Mail,
  MessageSquare,
  Vote,
  Cpu,
  Briefcase,
  Mic,
  Volume2,
  Bell,
  Heart,
  Layers,
  MessageCircle,
  Target,
  Lock,
  AlertCircle,
  Crown,
  Cross,
  X,
  History,
  BarChart4,
  BarChart3,
  SlidersHorizontal,
  Home, // Added from Code 2
  Settings, // Added from Code 2 (though not used in Code 1's logic)
} from "lucide-react";
// Removed AccountBoxOutlinedIcon import as it's not used in Code 1's logic
import { myContext } from "./Context";
import axios from "axios";
import NavbarDropDown from "./NavbarDropDown";
import { useNavigate } from "react-router-dom";

export default function Navbar({
  setNavbarDropdown,
  dropdownContent,
  setDropdownContent,
  navbarDropdown,
}) { 
  const [politicsList, setPoliticsList] = useState(null);
  const [technologyList, setTechnologyList] = useState(null);
  const [businessList, setBusinessList] = useState(null);
  const { lightMode, setLightMode, savedList,setSearchResults } = useContext(myContext);
  const [pageDropDown, setPageDropDown] = useState(false);
  const [featureDropDown, setFeatureDropDown] = useState(false);
  const [bookmarkDropdown, setBookmarkDropdown] = useState(false);
  const [isSearchbar, setIsSearchbar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();   

  // State for mobile menu (from Code 2)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCategoryExpanded, setMobileCategoryExpanded] = useState(false);
  const [mobileFeaturesExpanded, setMobileFeaturesExpanded] = useState(false);
  const [mobilePagesExpanded, setMobilePagesExpanded] = useState(false);

  // Dropdown features with icons (same as Code 1)
  const dropdownFeatures = [
    { name: "AI Chatbot", icon: MessageSquare, color: "bg-gradient-to-r from-purple-500 to-purple-700" },
    { name: "Search News", icon: Mic, color: "bg-gradient-to-r from-blue-500 to-blue-700" },
    { name: "Article Summary", icon: Volume2, color: "bg-gradient-to-r from-green-500 to-green-700" },
    { name: "Real-Time Alerts", icon: Bell, color: "bg-gradient-to-r from-red-500 to-red-700" },
    { name: "Personalized Feed", icon: Heart, color: "bg-gradient-to-r from-pink-500 to-pink-700" },
    { name: "Topic Clustering", icon: Layers, color: "bg-gradient-to-r from-yellow-500 to-yellow-700" },
  ];

  // Page items for mobile menu (from Code 2)
  const pageItems = [
    { label: "Home", icon: <Home size={16} />, bg: "bg-gradient-to-r from-orange-500 to-orange-600", navigate: '/' },
    
    {
      label: "My Bookmarks",
      icon: <Bookmark size={16} />,
      bg: "bg-gradient-to-r from-green-500 to-green-600",
      navigate: '/bookmarked'
    },
    {
      label: "Categories List",
      icon: <List size={16} />,
      bg: "bg-gradient-to-r from-indigo-500 to-indigo-600",
      navigate: '/categorylist'
    },
    {
      label: "Source List",
      icon: <List size={16} />,
      bg: "bg-gradient-to-r from-blue-500 to-blue-600",
      navigate: '/sourcelist'
    },
    {
      label: "Regions List",
      icon: <List size={16} />,
      bg: "bg-gradient-to-r from-teal-500 to-teal-600",
      navigate: '/regionlist'
    },
    {
      label: "Profile",
      icon: <User size={16} />,
      bg: "bg-gradient-to-r from-purple-500 to-purple-600",
      navigate: '/profile'
    },
    {
      label: "Preferences",
      icon: <SlidersHorizontal size={16} />,
      bg: "bg-gradient-to-r from-cyan-500 to-cyan-600",
      navigate: '/preferences'
    },
    {
      label: "Analytics",
      icon: <BarChart3 size={16} />,
      bg: "bg-gradient-to-r from-emerald-500 to-emerald-600",
      navigate: '/analytics'
    },
    {
      label: "History",
      icon: <History size={16} />,
      bg: "bg-gradient-to-r from-amber-500 to-amber-600",
      navigate: '/history'
    }
  ];

  // Categories for mobile menu (from Code 2)
  const categories = [
    { name: "Politics", icon: Vote, color: "from-red-500 to-red-600", hoverColor: "hover:bg-red-50 hover:text-red-600", darkHover: "hover:bg-red-900/20 hover:text-red-400", list: politicsList },
    { name: "Technology", icon: Cpu, color: "from-purple-500 to-purple-600", hoverColor: "hover:bg-purple-50 hover:text-purple-600", darkHover: "hover:bg-purple-900/20 hover:text-purple-400", list: technologyList },
    { name: "Business", icon: Briefcase, color: "from-teal-500 to-teal-600", hoverColor: "hover:bg-teal-50 hover:text-teal-600", darkHover: "hover:bg-teal-900/20 hover:text-teal-400", list: businessList }
  ];

  useEffect(() => {
    async function fetchList() {
      try {
        const politics = await axios.post(`${import.meta.env.VITE_API_URL}/api/article/fetchbytopic`, {
          topic: "Politics",
          page:1
        });
        setPoliticsList(politics.data.articles);
        const tech = await axios.post(`${import.meta.env.VITE_API_URL}/api/article/fetchbytopic`, {
          topic: "Technology",
        });
        setTechnologyList(tech.data.articles);
        const business = await axios.post(`${import.meta.env.VITE_API_URL}/api/article/fetchbytopic`, {
          topic: "Business",
        });
        setBusinessList(business.data.articles);
      } catch (err) {
        console.log(err);
      }
    }
    fetchList();
  }, []);

  const pageTimeoutRef = useRef(null);
  const featureTimeoutRef = useRef(null);
  const dropdownTimeout = useRef(null);
  const bookmarkTimeout = useRef(null);

  // Close mobile menu when clicking outside (from Code 2)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest('.mobile-menu') && !event.target.closest('.mobile-menu-button')) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileMenuOpen]);

  return (
 <>
  <nav
    className={`${
      lightMode
        ? "bg-white/95 backdrop-blur-md border border-gray-200/50 shadow-lg shadow-gray-200/20"
        : "bg-gray-900/95 backdrop-blur-md border border-gray-700/50 shadow-lg shadow-black/20"
    } w-[95%] sm:w-[90%] lg:w-[85%] top-2 sm:top-4 left-1/2 transform -translate-x-1/2 fixed rounded-xl sm:rounded-2xl px-3 sm:px-6 py-2 sm:py-4 z-50 transition-all duration-300`}
  >
    {isSearchbar == false ? (
      <div className="max-w-7xl mx-auto flex p-2 items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => navigate('/')}
          className="flex cursor-pointer items-center group transition-all duration-300 hover:scale-105 flex-shrink-0"
        >
          <div className="text-lg sm:text-xl lg:text-2xl font-bold">
            <span className="text-orange-600 text-xl sm:text-2xl lg:text-3xl group-hover:text-orange-500 transition-colors duration-300">∴</span>
            <span className="ml-1 sm:ml-2 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent font-extrabold tracking-tight">
              newshub
            </span>
          </div>
        </div>
        {/* Main Navigation - Hidden on mobile/tablet */}
        <div className="hidden lg:flex items-center space-x-4 xl:space-x-6 2xl:space-x-8">
          {/* Pages Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => {
              clearTimeout(pageTimeoutRef.current);
              setPageDropDown(true);
            }}
            onMouseLeave={() => {
              pageTimeoutRef.current = setTimeout(() => {
                setPageDropDown(false);
              }, 200);
            }}
          >
            <button className={`flex items-center space-x-1 px-2 xl:px-3 py-2 rounded-xl font-medium transition-all duration-300 hover:bg-orange-50 hover:text-orange-600 text-sm xl:text-base ${lightMode ? 'text-gray-700' : 'text-gray-300 hover:bg-gray-800'}`}>
              <span className="cursor-pointer">Pages</span>
              <ChevronDown size={14} className="xl:w-4 xl:h-4 transition-transform duration-300 group-hover:rotate-180" />
            </button>
            {pageDropDown && (
              <div className={`absolute top-full left-0 mt-3 w-64 ${lightMode ? 'bg-white' : 'bg-gray-800'} rounded-xl shadow-2xl border ${lightMode ? 'border-gray-200' : 'border-gray-700'} py-3 z-50 animate-in slide-in-from-top-2 duration-200`}>
                {pageItems.map((item, index) => (
                  <a
                    onClick={() => {
                      navigate(item.navigate);
                      setMobileMenuOpen(false);
                    }}
                    key={index}
                    className={`flex cursor-pointer items-center space-x-3 mx-3 mb-1 px-3 py-2.5 rounded-lg transition-all duration-200 hover:scale-[1.02] ${lightMode ? 'hover:bg-orange-50 text-gray-700' : 'hover:bg-gray-700 text-gray-300'} group`}
                  >
                    <div className={`${item.bg} text-white p-2 rounded-lg shadow-sm group-hover:shadow-md transition-all duration-200`}>
                      {item.icon}
                    </div>
                    <span className="text-sm font-medium">{item.label}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
          {/* Features Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => {
              clearTimeout(featureTimeoutRef.current);
              setFeatureDropDown(true);
            }}
            onMouseLeave={() => {
              featureTimeoutRef.current = setTimeout(() => {
                setFeatureDropDown(false);
              }, 200);
            }}
          >
            <button className={`flex items-center space-x-1 px-2 xl:px-3 py-2 rounded-xl font-medium transition-all duration-300 hover:bg-orange-50 hover:text-orange-600 text-sm xl:text-base ${lightMode ? 'text-gray-700' : 'text-gray-300 hover:bg-gray-800'}`}>
              <span>Features</span>
              <ChevronDown size={14} className="xl:w-4 xl:h-4 transition-transform duration-300 group-hover:rotate-180" />
            </button>
            {featureDropDown && (
              <div className={`absolute top-full left-0 mt-3 w-64 ${lightMode ? 'bg-white' : 'bg-gray-800'} rounded-xl shadow-2xl border ${lightMode ? 'border-gray-200' : 'border-gray-700'} py-3 z-50 animate-in slide-in-from-top-2 duration-200`}>
                {dropdownFeatures.map((item, index) => (
                  <a
                    key={index}
                    href="#"
                    className={`flex items-center space-x-3 mx-3 mb-1 px-3 py-2.5 rounded-lg transition-all duration-200 hover:scale-[1.02] ${lightMode ? 'hover:bg-orange-50 text-gray-700' : 'hover:bg-gray-700 text-gray-300'} group`}
                  >
                    <div className={`${item.color} text-white p-2 rounded-lg shadow-sm group-hover:shadow-md transition-all duration-200`}>
                      <item.icon size={16} />
                    </div>
                    <span className="text-sm font-medium">{item.name}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
          {/* Category Pills */}
          <div
            onMouseEnter={() => {
              clearTimeout(dropdownTimeout.current);
            }}
            onMouseLeave={() => {
              dropdownTimeout.current = setTimeout(() => {
                setNavbarDropdown(false);
              }, 200);
            }}
            className="flex items-center space-x-3 xl:space-x-4 2xl:space-x-6"
          >
            {/* Politics */}
            <div
              onMouseEnter={() => {
                clearTimeout(dropdownTimeout.current);
                setNavbarDropdown(true);
                setDropdownContent(politicsList);
              }}
              className={`flex items-center space-x-1 xl:space-x-2 px-2 xl:px-3 2xl:px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 cursor-pointer group ${lightMode ? 'hover:bg-red-50' : 'hover:bg-red-900/20'}`}
            >
              <div className="p-1.5 xl:p-2 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md group-hover:shadow-lg transition-all duration-300">
                <Vote className="w-3 h-3 xl:w-4 xl:h-4" />
              </div>
              <span className={`font-semibold text-xs xl:text-sm ${lightMode ? 'text-gray-700 group-hover:text-red-600' : 'text-gray-300 group-hover:text-red-400'} transition-colors duration-300`}>
                Politics
              </span>
            </div>
            {/* Technology */}
            <div
              onMouseEnter={() => {
                clearTimeout(dropdownTimeout.current);
                setNavbarDropdown(true);
                setDropdownContent(technologyList);
              }}
              className={`flex items-center space-x-1 xl:space-x-2 px-2 xl:px-3 2xl:px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 cursor-pointer group ${lightMode ? 'hover:bg-purple-50' : 'hover:bg-purple-900/20'}`}
            >
              <div className="p-1.5 xl:p-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md group-hover:shadow-lg transition-all duration-300">
                <Cpu className="w-3 h-3 xl:w-4 xl:h-4" />
              </div>
              <span className={`font-semibold text-xs xl:text-sm ${lightMode ? 'text-gray-700 group-hover:text-purple-600' : 'text-gray-300 group-hover:text-purple-400'} transition-colors duration-300`}>
                Technology
              </span>
            </div>
            {/* Business */}
            <div
              onMouseEnter={() => {
                clearTimeout(dropdownTimeout.current);
                setNavbarDropdown(true);
                setDropdownContent(businessList);
              }}
              className={`flex items-center space-x-1 xl:space-x-2 px-2 xl:px-3 2xl:px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 cursor-pointer group ${lightMode ? 'hover:bg-teal-50' : 'hover:bg-teal-900/20'}`}
            >
              <div className="p-1.5 xl:p-2 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-md group-hover:shadow-lg transition-all duration-300">
                <Briefcase className="w-3 h-3 xl:w-4 xl:h-4" />
              </div>
              <span className={`font-semibold text-xs xl:text-sm ${lightMode ? 'text-gray-700 group-hover:text-teal-600' : 'text-gray-300 group-hover:text-teal-400'} transition-colors duration-300`}>
                Business
              </span>
            </div>
            {navbarDropdown && (
              <NavbarDropDown
                onMouseEnter={() => {
                  clearTimeout(dropdownTimeout.current);
                  setNavbarDropdown(true);
                }}
                content={dropdownContent}
              />
            )}
          </div>
        </div>
        {/* Right Side Icons */}
        <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
          {/* Bookmark Button - Hidden on small screens */}
          <div
            className="relative hidden sm:block"
            onMouseEnter={() => {
              clearTimeout(bookmarkTimeout.current);
              setBookmarkDropdown(true);
            }}
            onMouseLeave={() => {
              bookmarkTimeout.current = setTimeout(() => {
                setBookmarkDropdown(false);
              }, 200);
            }}
          >
            <button className={`p-2 lg:p-3 rounded-xl transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-md ${lightMode ? 'hover:bg-orange-50 text-gray-600 hover:text-orange-600' : 'hover:bg-gray-800 text-gray-400 hover:text-orange-400'}`}>
              <Bookmark size={16} className="lg:w-[18px] lg:h-[18px]" />
            </button>
            {bookmarkDropdown && (
              <div className={`absolute left-1/2 -translate-x-1/2 top-16 w-80 ${lightMode ? 'bg-white' : 'bg-gray-800'} border ${lightMode ? 'border-gray-200' : 'border-gray-700'} rounded-xl shadow-2xl px-6 py-6 z-50 text-center animate-in slide-in-from-top-2 duration-200`}>
                <div className="flex justify-center items-center mb-4">
                  <div className="p-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                    <Bookmark size={24} />
                  </div>
                </div>
                <p className={`font-semibold text-sm leading-6 ${lightMode ? 'text-gray-800' : 'text-gray-200'}`}>
                  {savedList?.length > 0
                    ? `You have ${savedList.length} bookmarked ${savedList.length === 1 ? 'article' : 'articles'}`
                    : "No bookmarks yet. Start saving articles you love!"
                  }
                </p>
              </div>
            )}
          </div>
          {/* Search Button */}
          <button
            onClick={() => setIsSearchbar(true)}
            className={`p-2 lg:p-3 rounded-xl transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-md ${lightMode ? 'hover:bg-orange-50 text-gray-600 hover:text-orange-600' : 'hover:bg-gray-800 text-gray-400 hover:text-orange-400'}`}
          >
            <Search size={16} className="lg:w-[18px] lg:h-[18px]" />
          </button>
          {/* Theme Toggle */}
          <button
            onClick={() => setLightMode((prev) => !prev)}
            className="p-2 lg:p-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg"
          >
            {lightMode ? <MoonIcon size={16} className="lg:w-[18px] lg:h-[18px]" /> : <Sun size={16} className="lg:w-[18px] lg:h-[18px]" />}
          </button>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden mobile-menu-button p-2 sm:p-3 rounded-xl transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-md ${lightMode ? 'hover:bg-orange-50 text-gray-600 hover:text-orange-600' : 'hover:bg-gray-800 text-gray-400 hover:text-orange-400'}`}
          >
            <Menu size={18} className="sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    ) : (
      /* Search Bar */
      <div className={`relative flex items-center rounded-xl p-2 sm:p-3 ${lightMode ? 'bg-gray-50' : 'bg-gray-800'} transition-all duration-300`}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter some keywords..."
          className={`w-full outline-none px-3 sm:px-4 py-2 sm:py-3 ${lightMode ? 'text-gray-700 bg-transparent' : 'text-gray-300 bg-transparent'} placeholder-gray-400 focus:ring-0 text-base sm:text-lg`}
        />
        <div className="absolute right-2 sm:right-3 flex items-center space-x-1 sm:space-x-2">
          <button
            onClick={() => {
              setSearchResults(null);
              navigate(`/search?q=${searchQuery}`);
              setIsSearchbar(false);
            }}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg p-2 sm:p-2.5 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
          >
            <Search size={14} className="sm:w-4 sm:h-4" />
          </button>
          <button
            onClick={() => setIsSearchbar(false)}
            className={`rounded-lg p-2 sm:p-2.5 transition-all duration-300 hover:scale-105 ${lightMode ? 'bg-gray-300 hover:bg-gray-400 text-gray-700' : 'bg-gray-600 hover:bg-gray-500 text-gray-300'}`}
          >
            <X size={14} className="sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    )}
  </nav>
  {/* Mobile Menu Overlay */}
  {mobileMenuOpen && (
    <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
  )}
  {/* Mobile Menu */}
  <div className={`lg:hidden mobile-menu fixed top-16 sm:top-20 right-2 sm:right-4 lg:right-8 w-80 max-w-[calc(100vw-2rem)] ${lightMode ? 'bg-white' : 'bg-gray-900'} border ${lightMode ? 'border-gray-200' : 'border-gray-700'} rounded-xl shadow-2xl z-50 transform transition-all duration-300 ${mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'} max-h-[calc(100vh-6rem)] overflow-y-auto`}>
    <div className="p-4 space-y-4">
      {/* Pages Section */}
      <div>
        <button
          onClick={() => setMobilePagesExpanded(!mobilePagesExpanded)}
          className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors duration-200 ${lightMode ? 'hover:bg-gray-50' : 'hover:bg-gray-800'}`}
        >
          <span className={`font-semibold text-base ${lightMode ? 'text-gray-800' : 'text-gray-200'}`}>Pages</span>
          <ChevronDown size={20} className={`transition-transform duration-200 ${mobilePagesExpanded ? 'rotate-180' : ''}`} />
        </button>
        {mobilePagesExpanded && (
          <div className="mt-2 space-y-1 pl-2">
            {pageItems.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  navigate(item.navigate);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${lightMode ? 'hover:bg-gray-50' : 'hover:bg-gray-800'}`}
              >
                <div className={`${item.bg} text-white p-2 rounded-lg shadow-sm`}>
                  {item.icon}
                </div>
                <span className={`text-sm font-medium ${lightMode ? 'text-gray-700' : 'text-gray-300'}`}>{item.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <hr className={`${lightMode ? 'border-gray-200' : 'border-gray-700'}`} />
      {/* Features Section */}
      <div>
        <button
          onClick={() => setMobileFeaturesExpanded(!mobileFeaturesExpanded)}
          className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors duration-200 ${lightMode ? 'hover:bg-gray-50' : 'hover:bg-gray-800'}`}
        >
          <span className={`font-semibold text-base ${lightMode ? 'text-gray-800' : 'text-gray-200'}`}>Features</span>
          <ChevronDown size={20} className={`transition-transform duration-200 ${mobileFeaturesExpanded ? 'rotate-180' : ''}`} />
        </button>
        {mobileFeaturesExpanded && (
          <div className="mt-2 space-y-1 pl-2">
            {dropdownFeatures.map((item, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${lightMode ? 'hover:bg-gray-50' : 'hover:bg-gray-800'}`}
              >
                <div className={`${item.color} text-white p-2 rounded-lg shadow-sm`}>
                  <item.icon size={16} />
                </div>
                <span className={`text-sm font-medium ${lightMode ? 'text-gray-700' : 'text-gray-300'}`}>{item.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <hr className={`${lightMode ? 'border-gray-200' : 'border-gray-700'}`} />
      {/* Mobile Bookmark Info */}
      <div className={`p-4 rounded-lg ${lightMode ? 'bg-orange-50' : 'bg-orange-900/20'} text-center`}>
        <div className="flex justify-center items-center mb-3">
          <div className="p-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <Bookmark size={20} />
          </div>
        </div>
        <p className={`text-sm font-medium ${lightMode ? 'text-gray-800' : 'text-gray-200'}`}>
          {savedList?.length > 0
            ? `You have ${savedList.length} bookmarked ${savedList.length === 1 ? 'article' : 'articles'}`
            : "No bookmarks yet. Start saving articles you love!"
          }
        </p>
      </div>
    </div>
  </div>
</>
  );
}

