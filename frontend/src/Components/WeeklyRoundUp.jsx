import { ArrowRight, DiamondPlusIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { myContext } from "./Context";
import { useNavigate } from "react-router-dom";
import {

  BookmarkPlus,
  ChevronRight,
  ChevronLeft,

} from "lucide-react";

import BookmarkIcon from '@mui/icons-material/Bookmark';

// Tag Colors
const tagsbgcolor = [
  "bg-red-600", "bg-rose-600",
  "bg-sky-600", "bg-indigo-600",
  "bg-emerald-600", "bg-teal-600",
  "bg-amber-500", "bg-yellow-500",
  "bg-purple-600", "bg-fuchsia-600",
  "bg-orange-500", "bg-orange-600",
  "bg-lime-600", "bg-green-700",
  "bg-sky-700", "bg-teal-700",
];

// Source Map
const sourceMap = Object.fromEntries(
  [
    { name: "AlJazeera", logo: "/aljazeera.png" },
    { name: "BBC", logo: "/bbc.png" },
    { name: "CNBC", logo: "/cnbc.png" },
    { name: "NDTV", logo: "/ndtv.png" },
    { name: "Reuters", logo: "/reuters.png" },
    { name: "TechCrunch", logo: "/techchrunch.png" },
    { name: "The Guardian", logo: "/theguardian.png" },
    { name: "The Hindu", logo: "/thehindu.png" },
    { name: "Times of India", logo: "/toi.png" },
  ].map((s) => [s.name, s])
);

// Article Card Component
const ArticleCard = ({ article, index, lightMode, currUser }) => {
  const navigate = useNavigate();

  




  const { savedList, setSavedList } = useContext(myContext);
  async function handleAddBookmark(article) {

    try {

      const response = await axios.get('/api/article/savefavourite', {
        params: { id: article._id, userId: currUser._id }
      });

      if (savedList.some(item => item.url === article.url)) {
        setSavedList(savedList.filter(item => item.url !== article.url));
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
    <div className={`group relative overflow-hidden rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ${lightMode
        ? 'bg-white border border-gray-100 hover:border-gray-200 hover:shadow-gray-200/50'
        : 'bg-gray-900 border border-gray-700 hover:border-gray-600 hover:shadow-xl'
      } w-full max-w-sm mx-auto h-auto backdrop-blur-sm`}>

      {/* Image */}
      {article.image && (
        <div className="relative overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-32 sm:h-36 object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-all duration-500"></div>
          <div className="absolute top-2 left-2 flex gap-1">
            {article.isNew && (
              <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold shadow-md animate-pulse">✨ NEW</span>
            )}
            {article.isTrending && (
              <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold shadow-md">🔥 TRENDING</span>
            )}
          </div>
        </div>
      )}

      <div className="p-3 sm:p-4">
        {/* Bookmark */}
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

        {/* Tags */}
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

        {/* Title (No clamp) */}
        <h3
          onClick={() => navigate(`/articledetail/${article._id}`)}
          className={`text-sm sm:text-base font-bold cursor-pointer mb-2 leading-snug ${lightMode
              ? 'text-gray-900 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-orange-600 hover:to-red-600'
              : 'text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-orange-400 hover:to-red-400'
            }`}
        >
          {article.title}
        </h3>

        {/* Description */}
        {article.description && (
          <p className={`text-xs mb-3 line-clamp-2 ${lightMode ? 'text-gray-600' : 'text-gray-300'
            }`}>{article.description}</p>
        )}

        {/* Stats */}
        <div className="flex flex-wrap items-center text-[11px] gap-2 mb-3">
          <div className={`flex items-center gap-1 px-2 py-0.5 rounded-md ${lightMode ? 'bg-gray-50' : 'bg-gray-800'
            }`}>
            <svg className={`w-3.5 h-3.5 ${lightMode ? 'text-blue-500' : 'text-blue-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span className={lightMode ? 'text-gray-700' : 'text-gray-300'}>{article.views}</span>
          </div>

          <div className={`flex items-center gap-1 px-2 py-0.5 rounded-md ${lightMode ? 'bg-gray-50' : 'bg-gray-800'
            }`}>
            <svg className={`w-3.5 h-3.5 ${lightMode ? 'text-red-500' : 'text-red-400'}`} fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className={lightMode ? 'text-gray-700' : 'text-gray-300'}>{article.likes?.length || 0}</span>
          </div>

          {article.rating && (
            <div className="flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-0.5 rounded-md text-[10px] font-bold">
              <span>⭐</span>
              <span>{article.rating}</span>
            </div>
          )}

          {article.content && (
            <div className={`flex items-center gap-1 px-2 py-0.5 rounded-md ${lightMode ? 'bg-indigo-50 text-indigo-600' : 'bg-indigo-900/40 text-indigo-400'
              }`}>
              <span>⏱️</span>
              <span className="text-[10px] font-medium">
                {Math.ceil(article.content.split(' ').length / 200)} min read
              </span>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className={`h-px w-full mb-3 bg-gradient-to-r ${lightMode ? 'via-gray-200' : 'via-gray-600'
          }`}></div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center min-w-0 flex-1">
            <div className="relative">
              <img
                onClick={() => navigate(`/sourcelist/${article.source}`)}
                src={sourceMap[article.source]?.logo || "/fallback.png"}
                alt={article.source}
                className={`w-8 h-8 cursor-pointer rounded-full object-cover hover:scale-110 hover:rotate-3 shadow-md ring-2 ${lightMode ? 'ring-white' : 'ring-gray-700'
                  }`}
              />
              <div className={`absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full border ${lightMode ? 'bg-green-500 border-white' : 'bg-green-400 border-gray-800'
                }`}></div>
            </div>
            <div className="ml-2 min-w-0">
              <div className={`text-[10px] font-medium ${lightMode ? 'text-gray-500' : 'text-gray-400'}`}>PUBLISHED BY</div>
              <span
                onClick={() => navigate(`/sourcelist/${article.source}`)}
                className={`text-xs font-bold cursor-pointer ${lightMode
                    ? 'text-gray-900 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-orange-600 hover:to-red-600'
                    : 'text-white hover:text-transparent hover:bg-clip-text hover:from-orange-400 hover:to-red-400'
                  }`}
              >
                {article.source}
              </span>
            </div>
          </div>
          <div className={`text-[10px] font-medium ml-2 ${lightMode ? 'text-gray-500' : 'text-gray-400'
            }`}>
            {new Date(article.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>
        </div>
      </div>

      {/* Hover Glow */}
      <div className={`absolute inset-0 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${lightMode ? 'shadow-lg shadow-orange-200/20' : 'shadow-xl shadow-orange-500/10'
        }`}></div>
    </div>

  );
};


// Main Weekly Roundup Component
const WeeklyRoundup = () => {
  const { lightMode } = useContext(myContext); // Optional
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const { currUser, weeklyArticles, savedList, setWeeklyArticles } = useContext(myContext);
  useEffect(() => {

    if (!currUser) {

      return; // Stop further execution if any array is empty
    }

    async function fetchArticles() {
      try {

        const response = await axios.get("/api/article/getweeklyarticles", {
          params: {
            userId: currUser?._id,
            page,
            limit: 15
          }
        });

        setTotalPages(response.data.pagination.totalPages);
        console.log(response.data);

        setWeeklyArticles(response.data.weeklyArticles);

      } catch (error) {
        console.error("Error fetching weekly articles:", error);
      }
    }
    fetchArticles();
  }, [currUser, page]);



 


  if (weeklyArticles === null || savedList === null) {
    return (// Loading Component
      <div className={`max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 min-h-screen transition-colors duration-300 ${lightMode
          ? 'bg-gradient-to-br from-gray-50 to-white'
          : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
        }`}>
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center mb-3 sm:mb-4">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg transition-all duration-300 ${lightMode
                    ? 'bg-gradient-to-r from-emerald-500 to-green-500'
                    : 'bg-gradient-to-r from-emerald-400 to-green-400'
                  }`}>
                  <DiamondPlusIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className={`font-semibold text-xs sm:text-sm tracking-wider uppercase ${lightMode ? 'text-emerald-600' : 'text-emerald-400'
                    }`}>
                    FRESH UPDATES
                  </span>
                  <div className={`w-12 h-0.5 mt-1 rounded-full ${lightMode ? 'bg-emerald-500' : 'bg-emerald-400'
                    }`}></div>
                </div>
              </div>
              <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight transition-colors duration-300 ${lightMode ? 'text-gray-900' : 'text-white'
                }`}>
                Weekly Roundup
              </h1>
              <p className={`mt-2 text-sm sm:text-base max-w-2xl transition-colors duration-300 ${lightMode ? 'text-gray-600' : 'text-gray-300'
                }`}>
                Discover the latest insights and stories curated just for you
              </p>
            </div>
          </div>
        </div>

        {/* Loading Content */}
        <div className="flex flex-col items-center justify-center py-16 sm:py-24 lg:py-32">
          <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mb-6 sm:mb-8 shadow-lg ${lightMode
              ? 'bg-gradient-to-r from-blue-500 to-purple-500'
              : 'bg-gradient-to-r from-blue-400 to-purple-400'
            }`}>
            <div className="animate-spin">
              <div className="w-8 h-8 sm:w-10 sm:h-10 border-3 border-white border-t-transparent rounded-full"></div>
            </div>
          </div>
          <h2 className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 transition-colors duration-300 ${lightMode ? 'text-gray-900' : 'text-white'
            }`}>
            Loading Articles
          </h2>
          <p className={`text-sm sm:text-base text-center max-w-md transition-colors duration-300 ${lightMode ? 'text-gray-600' : 'text-gray-300'
            }`}>
            We're gathering the latest stories for you. This won't take long.
          </p>

          {/* Loading skeleton cards */}
          <div className="w-full mt-12 sm:mt-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className={`animate-pulse rounded-2xl sm:rounded-3xl shadow-lg transition-colors duration-300 ${lightMode
                      ? 'bg-white border border-gray-100'
                      : 'bg-gray-800 border border-gray-700'
                    }`}
                >
                  <div className="p-4 sm:p-6">
                    <div className={`h-4 sm:h-5 rounded mb-3 sm:mb-4 ${lightMode ? 'bg-gray-200' : 'bg-gray-700'
                      }`}></div>
                    <div className={`h-3 sm:h-4 rounded mb-2 w-3/4 ${lightMode ? 'bg-gray-200' : 'bg-gray-700'
                      }`}></div>
                    <div className={`h-3 sm:h-4 rounded mb-4 sm:mb-6 w-1/2 ${lightMode ? 'bg-gray-200' : 'bg-gray-700'
                      }`}></div>
                    <div className={`h-20 sm:h-24 rounded-xl ${lightMode ? 'bg-gray-200' : 'bg-gray-700'
                      }`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>)
  }
  if (weeklyArticles.length === 0) {
    return (// No Results Component
      <div className={`max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 min-h-screen transition-colors duration-300 ${lightMode
          ? 'bg-gradient-to-br from-gray-50 to-white'
          : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
        }`}>
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center mb-3 sm:mb-4">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg transition-all duration-300 ${lightMode
                    ? 'bg-gradient-to-r from-emerald-500 to-green-500'
                    : 'bg-gradient-to-r from-emerald-400 to-green-400'
                  }`}>
                  <DiamondPlusIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className={`font-semibold text-xs sm:text-sm tracking-wider uppercase ${lightMode ? 'text-emerald-600' : 'text-emerald-400'
                    }`}>
                    FRESH UPDATES
                  </span>
                  <div className={`w-12 h-0.5 mt-1 rounded-full ${lightMode ? 'bg-emerald-500' : 'bg-emerald-400'
                    }`}></div>
                </div>
              </div>
              <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight transition-colors duration-300 ${lightMode ? 'text-gray-900' : 'text-white'
                }`}>
                Weekly Roundup
              </h1>
              <p className={`mt-2 text-sm sm:text-base max-w-2xl transition-colors duration-300 ${lightMode ? 'text-gray-600' : 'text-gray-300'
                }`}>
                Discover the latest insights and stories curated just for you
              </p>
            </div>
          </div>
        </div>

        {/* No Results Content */}
        <div className="flex flex-col items-center justify-center py-16 sm:py-24 lg:py-32">
          <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mb-6 sm:mb-8 shadow-lg ${lightMode
              ? 'bg-gradient-to-r from-orange-500 to-red-500'
              : 'bg-gradient-to-r from-orange-400 to-red-400'
            }`}>
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0012 15c-2.34 0-4.291-1.002-5.824-2.651M15 17H9v-2.5A3.5 3.5 0 0112.5 11h0a3.5 3.5 0 013.5 3.5V17z" />
            </svg>
          </div>
          <h2 className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 transition-colors duration-300 ${lightMode ? 'text-gray-900' : 'text-white'
            }`}>
            No Articles Found
          </h2>
          <p className={`text-sm sm:text-base text-center max-w-md mb-8 sm:mb-10 transition-colors duration-300 ${lightMode ? 'text-gray-600' : 'text-gray-300'
            }`}>
            We couldn't find any articles for this week. Check back later for fresh content or try adjusting your filters.
          </p>



          {/* Decorative elements */}
          <div className="mt-16 sm:mt-20 w-full max-w-4xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              {[
                { icon: "📚", title: "Rich Content", desc: "Curated articles from trusted sources" },
                { icon: "⚡", title: "Fresh Updates", desc: "New stories added weekly" },
                { icon: "🎯", title: "Personalized", desc: "Content tailored to your interests" }
              ].map((item, index) => (
                <div key={index} className={`text-center p-4 sm:p-6 rounded-xl transition-colors duration-300 ${lightMode ? 'bg-white border border-gray-100' : 'bg-gray-800 border border-gray-700'
                  }`}>
                  <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">{item.icon}</div>
                  <h3 className={`font-semibold mb-2 transition-colors duration-300 ${lightMode ? 'text-gray-900' : 'text-white'
                    }`}>
                    {item.title}
                  </h3>
                  <p className={`text-xs sm:text-sm transition-colors duration-300 ${lightMode ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>)
  }
  return (
    <div className={`max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 min-h-screen transition-colors duration-300 ${lightMode
        ? 'bg-gradient-to-br from-gray-50 to-white'
        : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
      }`}>
      {/* Header */}
      <div className="mb-8 sm:mb-12">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Left */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center mb-3 sm:mb-4">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg transition-all duration-300 ${lightMode
                  ? 'bg-gradient-to-r from-emerald-500 to-green-500'
                  : 'bg-gradient-to-r from-emerald-400 to-green-400'
                }`}>
                <DiamondPlusIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className={`font-semibold text-xs sm:text-sm tracking-wider uppercase ${lightMode ? 'text-emerald-600' : 'text-emerald-400'
                  }`}>
                  FRESH UPDATES
                </span>
                <div className={`w-12 h-0.5 mt-1 rounded-full ${lightMode ? 'bg-emerald-500' : 'bg-emerald-400'
                  }`}></div>
              </div>
            </div>
            <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight transition-colors duration-300 ${lightMode ? 'text-gray-900' : 'text-white'
              }`}>
              Weekly Roundup
            </h1>
            <p className={`mt-2 text-sm sm:text-base max-w-2xl transition-colors duration-300 ${lightMode ? 'text-gray-600' : 'text-gray-300'
              }`}>
              Discover the latest insights and stories curated just for you
            </p>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12">
        {weeklyArticles.map((article, index) => (
          <div
            key={article._id}
            className="bg-transparent"
          >
            <ArticleCard
              index={index}
              article={article}
              currUser={currUser}
              lightMode={lightMode}
            />
          </div>
        ))}
      </div>


      {/* Enhanced Pagination */}
      <div className="flex justify-center items-center mt-12 sm:mt-16">
        <div className={`flex items-center space-x-1 sm:space-x-2 p-2 sm:p-3 rounded-2xl shadow-lg transition-colors duration-300 ${lightMode
            ? 'bg-white border border-gray-200'
            : 'bg-gray-800 border border-gray-700'
          }`}>
          <button
            onClick={() => setPage(Math.max(page - 1, 1))}
            disabled={page === 1}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${page === 1
                ? `opacity-40 cursor-not-allowed ${lightMode ? 'bg-gray-100 text-gray-400' : 'bg-gray-700 text-gray-500'}`
                : `hover:scale-105 active:scale-95 ${lightMode
                  ? 'bg-gray-100 text-gray-600 hover:bg-orange-500 hover:text-white hover:shadow-md'
                  : 'bg-gray-700 text-gray-300 hover:bg-orange-500 hover:text-white hover:shadow-md'
                }`
              }`}
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {(() => {
            const pages = [];

            // First page
            pages.push(
              <button
                key={1}
                onClick={() => setPage(1)}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl font-semibold transition-all duration-200 hover:scale-105 active:scale-95 text-sm sm:text-base ${page === 1
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/25'
                    : `${lightMode
                      ? 'bg-gray-100 text-gray-700 hover:bg-orange-500 hover:text-white hover:shadow-md'
                      : 'bg-gray-700 text-gray-300 hover:bg-orange-500 hover:text-white hover:shadow-md'
                    }`
                  }`}
              >
                1
              </button>
            );

            // Left ellipsis
            if (page > 3) {
              pages.push(
                <span
                  key="left-ellipsis"
                  className={`px-2 sm:px-3 select-none transition-colors duration-300 ${lightMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                >
                  ...
                </span>
              );
            }

            // Middle pages
            const start = Math.max(2, page - 1);
            const end = Math.min(totalPages - 1, page + 1);

            for (let i = start; i <= end; i++) {
              pages.push(
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl font-semibold transition-all duration-200 hover:scale-105 active:scale-95 text-sm sm:text-base ${page === i
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/25'
                      : `${lightMode
                        ? 'bg-gray-100 text-gray-700 hover:bg-orange-500 hover:text-white hover:shadow-md'
                        : 'bg-gray-700 text-gray-300 hover:bg-orange-500 hover:text-white hover:shadow-md'
                      }`
                    }`}
                >
                  {i}
                </button>
              );
            }

            // Right ellipsis
            if (page < totalPages - 2) {
              pages.push(
                <span
                  key="right-ellipsis"
                  className={`px-2 sm:px-3 select-none transition-colors duration-300 ${lightMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                >
                  ...
                </span>
              );
            }

            // Last page
            if (totalPages > 1) {
              pages.push(
                <button
                  key={totalPages}
                  onClick={() => setPage(totalPages)}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl font-semibold transition-all duration-200 hover:scale-105 active:scale-95 text-sm sm:text-base ${page === totalPages
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/25'
                      : `${lightMode
                        ? 'bg-gray-100 text-gray-700 hover:bg-orange-500 hover:text-white hover:shadow-md'
                        : 'bg-gray-700 text-gray-300 hover:bg-orange-500 hover:text-white hover:shadow-md'
                      }`
                    }`}
                >
                  {totalPages}
                </button>
              );
            }

            return pages;
          })()}

          <button
            onClick={() => setPage(Math.min(page + 1, totalPages))}
            disabled={page === totalPages}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${page === totalPages
                ? `opacity-40 cursor-not-allowed ${lightMode ? 'bg-gray-100 text-gray-400' : 'bg-gray-700 text-gray-500'}`
                : `hover:scale-105 active:scale-95 ${lightMode
                  ? 'bg-gray-100 text-gray-600 hover:bg-orange-500 hover:text-white hover:shadow-md'
                  : 'bg-gray-700 text-gray-300 hover:bg-orange-500 hover:text-white hover:shadow-md'
                }`
              }`}
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>


    </div>
  );
};

export default WeeklyRoundup;
