import React, { useState, useContext, useEffect } from "react";
import {
  Clock,
  TrendingUp,
  Globe,
  FileText,
  BarChart3
} from "lucide-react";
import axios from "axios";
import { myContext } from "./Context";

export default function AnalyticsPage() {
  const topicsList = ["News", "Politics", "Government", "Society", "Culture", "Science", "Technology", "Health", "Education", "Environment", "Economy", "Business", "Finance", "Law", "Crime", "Religion", "Philosophy", "History", "Art", "Media", "Entertainment", "Sports", "Lifestyle", "Travel", "Food", "Fashion", "Beauty", "Parenting", "Relationships", "Psychology", "Self-Improvement", "Animals", "Agriculture", "Energy", "Infrastructure", "Transportation", "Space", "Climate", "Startups", "War", "Peace", "Diplomacy", "Gender", "LGBTQ+", "Race", "Immigration", "Democracy", "Human Rights", "Activism", "Censorship", "Digital Media", "Internet", "Cybersecurity", "Social Media", "Marketing", "Advertising", "Innovation", "Careers", "Work", "Remote Work", "Real Estate", "Stock Market", "Cryptocurrency", "Banking", "Taxes", "Consumerism", "Big Tech", "Data", "Privacy", "Engineering", "Mathematics", "Physics", "Chemistry", "Biology", "Astronomy", "Pharmaceuticals", "Mental Health", "Fitness", "Nutrition", "Diseases", "Pandemics", "Vaccines", "Wellness", "Spirituality", "Justice", "Freedom", "Equality", "Traditions", "Languages", "Literature", "Books", "Film", "Television", "Music", "Dance", "Theatre", "Museums", "Photography", "Architecture", "Design", "Sustainability", "Pollution", "Natural Disasters", "Forests", "Oceans", "Wildlife", "Recycling", "Water", "Electricity", "Aviation", "Railways", "Shipping", "Space Exploration", "International Relations", "Global Organizations", "Public Policy", "Urban Development", "Rural Development", "Security", "Law Enforcement", "Judiciary", "Constitution", "Freedom of Speech", "Nationalism", "Secularism", "Genetics", "Bioethics", "Online Education", "Research", "Universities", "Schools", "Aging", "Inclusion", "Home & Living", "Minimalism", "Hobbies", "Festivals", "Holidays", "Mythology", "Local News", "Regional News", "Global News", "Opinion", "Investigative Journalism"];
  
  const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
    "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain",
    "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
    "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso",
    "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic",
    "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Democratic Republic of the Congo",
    "Costa Rica", "Côte d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark",
    "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador",
    "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland",
    "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada",
    "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary",
    "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
    "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea North",
    "Korea South", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho",
    "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar",
    "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania",
    "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro",
    "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands",
    "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman",
    "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines",
    "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis",
    "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe",
    "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia",
    "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain",
    "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan",
    "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia",
    "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates",
    "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City",
    "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe", "Palestine", "Kosovo", "Abkhazia",
    "South Ossetia", "Artsakh", "Transnistria", "Northern Cyprus", "Western Sahara",
    "Somaliland", "Cook Islands", "Niue", "Åland Islands", "Faroe Islands", "Greenland",
    "Hong Kong", "Macau", "Kurdistan Region", "Bougainville", "Bangsamoro", "Azores",
    "Madeira", "Aceh", "Gagauzia", "Mount Athos", "Svalbard", "Jan Mayen", "Rotuma",
    "Puerto Rico", "Northern Mariana Islands", "Guam", "US Virgin Islands", "American Samoa",
    "French Polynesia", "New Caledonia", "Saint Martin", "Saint Barthélemy", "Wallis and Futuna",
    "Mayotte", "Martinique", "French Guiana", "Aruba", "Curacao", "Sint Maarten", "Gibraltar",
    "Bermuda", "Cayman Islands", "British Virgin Islands", "Montserrat", "Anguilla", "Nevis",
    "Rodrigues", "Embera-Wounaan", "Kuna Yala", "Ngöbe-Buglé", "Danu", "Kokang", "Naga",
    "Pa-Laung", "Pa-O", "Wa", "Vojvodina", "Kosovo and Metohija"
  ];

  const { currUser, lightMode } = useContext(myContext);
  const [loading, setLoading] = useState(true);
  const [topicFreq, setTopicFreq] = useState([]);
  const [sourceFreq, setSourceFreq] = useState([]);
  const [regionFreq, setRegionFreq] = useState([]);
  const [totalTopicCnt, setTotalTopicCnt] = useState(0);
  const [totalSourceCnt, setTotalSourceCnt] = useState(0);
  const [totalRegionCnt, setTotalRegionCnt] = useState(0);

  useEffect(() => {
    if (!currUser) return;
    
    async function fetchTopics() {
      try {
        const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const recentArticles = currUser.viewedArticles.filter(
          (article) => new Date(article.viewedAt) >= oneWeekAgo
        );
        
        const topicFreqMap = {};
        const sourceFreqMap = {};
        const regionFreqMap = {};
        
        await Promise.all(
          recentArticles.map(async (article) => {
            try {
              const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/article/getmetadatanamefromid/${article.articleId}`);
              const { topic, source, region } = res.data;
              topicFreqMap[topic] = (topicFreqMap[topic] || 0) + 1;
              sourceFreqMap[source] = (sourceFreqMap[source] || 0) + 1;
              regionFreqMap[region] = (regionFreqMap[region] || 0) + 1;
            } catch (err) {
              console.error(`❌ Error fetching topic for article ${article.articleId}`, err);
              return null;
            }
          })
        );

        const topicFreqArray = Object.entries(topicFreqMap).map(
          item => ({ topic: item[0], count: item[1] })
        );

        const sourceFreqArray = Object.entries(sourceFreqMap).map(
          item => ({ source: item[0], count: item[1] })
        );

        const regionFreqArray = Object.entries(regionFreqMap).map(
          item => ({ region: item[0], count: item[1] })
        );

        setTopicFreq(topicFreqArray.filter(item => topicsList.includes(item.topic)).sort((a, b) => b.count - a.count));
        setSourceFreq(sourceFreqArray.sort((a, b) => b.count - a.count).slice(0, 10));
        setRegionFreq(regionFreqArray.filter(item => countries.includes(item.region)).sort((a, b) => b.count - a.count));
        
        let totalCnt1 = 0;
        let totalCnt2 = 0;
        let totalCnt3 = 0;
        
        topicFreqArray.filter(item => topicsList.includes(item.topic)).sort((a, b) => b.count - a.count).map(function (item) {
          totalCnt1 += item.count;
        });
        sourceFreqArray.sort((a, b) => b.count - a.count).map(function (item) {
          totalCnt2 += item.count;
        });
        regionFreqArray.filter(item => countries.includes(item.region)).sort((a, b) => b.count - a.count).map(function (item) {
          totalCnt3 += item.count;
        });
        
        setTotalTopicCnt(totalCnt1);
        setTotalSourceCnt(totalCnt2);
        setTotalRegionCnt(totalCnt3);
      } catch (err) {
        console.error("❌ Error in fetchTopics:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTopics();
  }, [currUser]);




  if (loading) {
    return (
      <div className={`min-h-screen pt-20 sm:pt-32 transition-colors duration-300 ${
        !lightMode 
          ? "bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800" 
          : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          
          {/* Header Skeleton */}
          <div className="mb-8 sm:mb-12">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-orange-500 rounded animate-pulse"></div>
              <div className={`h-8 sm:h-10 lg:h-12 w-64 sm:w-80 lg:w-96 rounded animate-pulse ${
                !lightMode ? "bg-gray-700" : "bg-gray-300"
              }`}></div>
            </div>
            <div className={`h-4 sm:h-5 lg:h-6 w-48 sm:w-64 lg:w-80 rounded animate-pulse ${
              !lightMode ? "bg-gray-700" : "bg-gray-300"
            }`}></div>
          </div>

          {/* Stats Overview Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`rounded-xl p-4 sm:p-6 text-center shadow-lg border animate-pulse ${
                !lightMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
              }`}>
                <div className={`w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 rounded ${
                  !lightMode ? "bg-gray-600" : "bg-gray-300"
                }`}></div>
                <div className={`h-6 sm:h-8 lg:h-10 w-16 sm:w-20 mx-auto mb-2 rounded ${
                  !lightMode ? "bg-gray-600" : "bg-gray-300"
                }`}></div>
                <div className={`h-3 sm:h-4 w-20 sm:w-24 mx-auto rounded ${
                  !lightMode ? "bg-gray-600" : "bg-gray-300"
                }`}></div>
              </div>
            ))}
          </div>

          {/* Analytics Cards Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3].map((cardIndex) => (
              <div key={cardIndex} className={`${cardIndex === 3 ? 'lg:col-span-2 xl:col-span-1' : ''}`}>
                <div className={`rounded-xl shadow-lg border animate-pulse ${
                  !lightMode 
                    ? "bg-gray-800 border-gray-700" 
                    : "bg-white border-gray-200"
                }`}>
                  <div className="p-4 sm:p-6">
                    {/* Card Header Skeleton */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded ${
                          !lightMode ? "bg-gray-600" : "bg-gray-300"
                        }`}></div>
                        <div className={`h-5 sm:h-6 w-32 sm:w-40 rounded ${
                          !lightMode ? "bg-gray-600" : "bg-gray-300"
                        }`}></div>
                      </div>
                      <div className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full h-6 w-16 ${
                        !lightMode ? "bg-gray-600" : "bg-gray-300"
                      }`}></div>
                    </div>
                    
                    {/* Card Content Skeleton */}
                    <div className="space-y-3 sm:space-y-4">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((itemIndex) => (
                        <div key={itemIndex} className="animate-pulse" style={{ animationDelay: `${itemIndex * 100}ms` }}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2 sm:space-x-3 flex-1">
                              <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                                !lightMode ? "bg-gray-600" : "bg-gray-300"
                              }`}></div>
                              <div className={`h-3 sm:h-4 flex-1 max-w-32 sm:max-w-40 rounded ${
                                !lightMode ? "bg-gray-600" : "bg-gray-300"
                              }`}></div>
                            </div>
                            <div className={`h-3 sm:h-4 w-6 sm:w-8 rounded ${
                              !lightMode ? "bg-gray-600" : "bg-gray-300"
                            }`}></div>
                          </div>
                          
                          <div className="flex items-center space-x-2 sm:space-x-3">
                            <div className={`flex-1 h-2 rounded-full ${
                              !lightMode ? "bg-gray-700" : "bg-gray-200"
                            }`}>
                              <div
                                className={`h-2 rounded-full ${
                                  !lightMode ? "bg-gray-600" : "bg-gray-300"
                                }`}
                                style={{ width: `${Math.random() * 80 + 20}%` }}
                              ></div>
                            </div>
                            <div className={`h-3 w-8 sm:w-10 rounded ${
                              !lightMode ? "bg-gray-600" : "bg-gray-300"
                            }`}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-20 sm:pt-32 transition-colors duration-300 ${
      !lightMode 
        ? "bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800" 
        : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center space-x-3 mb-4">
            <BarChart3 className="w-8 h-8 text-orange-500" />
            <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${
              !lightMode ? "text-white" : "text-gray-900"
            }`}>
              Reading Analytics
            </h1>
          </div>
          <p className={`text-sm sm:text-base lg:text-lg ${
            !lightMode ? "text-gray-300" : "text-gray-600"
          }`}>
            Your reading patterns and interests from the past week
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className={`rounded-xl p-4 sm:p-6 text-center shadow-lg border transition-all duration-300 hover:shadow-xl ${
            !lightMode 
              ? "bg-gradient-to-r from-orange-600 to-orange-500 border-orange-500" 
              : "bg-gradient-to-r from-orange-500 to-orange-400 border-orange-300"
          }`}>
            <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-white" />
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{topicFreq.length}</p>
            <p className="text-xs sm:text-sm text-orange-100">Topics Explored</p>
          </div>
          <div className={`rounded-xl p-4 sm:p-6 text-center shadow-lg border transition-all duration-300 hover:shadow-xl ${
            !lightMode 
              ? "bg-gradient-to-r from-blue-600 to-blue-500 border-blue-500" 
              : "bg-gradient-to-r from-blue-500 to-blue-400 border-blue-300"
          }`}>
            <Globe className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-white" />
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{regionFreq.length}</p>
            <p className="text-xs sm:text-sm text-blue-100">Global Coverage</p>
          </div>
          <div className={`rounded-xl p-4 sm:p-6 text-center shadow-lg border transition-all duration-300 hover:shadow-xl ${
            !lightMode 
              ? "bg-gradient-to-r from-green-600 to-green-500 border-green-500" 
              : "bg-gradient-to-r from-green-500 to-green-400 border-green-300"
          }`}>
            <FileText className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-white" />
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{sourceFreq.length}</p>
            <p className="text-xs sm:text-sm text-green-100">Sources Read</p>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Category Statistics */}
          <div className={`rounded-xl shadow-lg border transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${
            !lightMode 
              ? "bg-gray-800 border-gray-700 hover:border-gray-600" 
              : "bg-white border-gray-200 hover:border-gray-300"
          }`}>
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-lg sm:text-xl font-bold flex items-center ${
                  !lightMode ? "text-white" : "text-gray-900"
                }`}>
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-orange-500" />
                  <span className="hidden sm:inline">Category Statistics</span>
                  <span className="sm:hidden">Categories</span>
                </h3>
                <div className="px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold bg-orange-100 text-orange-800">
                  {topicFreq.length} items
                </div>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                {topicFreq.map((stat, index) => (
                  <div key={stat.topic} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-orange-500 rounded-full"></div>
                        <span className={`text-xs sm:text-sm font-medium truncate flex-1 group-hover:text-opacity-80 transition-colors ${
                          !lightMode ? "text-gray-300" : "text-gray-700"
                        }`} title={stat.topic}>
                          {stat.topic}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
                        <span className="text-xs sm:text-sm font-semibold text-orange-500">
                          {stat.count}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className={`flex-1 h-2 rounded-full ${
                        !lightMode ? "bg-gray-700" : "bg-gray-200"
                      }`}>
                        <div
                          className="h-2 rounded-full transition-all duration-500 ease-out bg-gradient-to-r from-orange-500 to-orange-400"
                          style={{ 
                            width: `${(stat.count / totalTopicCnt) * 100}%`,
                            transitionDelay: `${index * 100}ms`
                          }}
                        ></div>
                      </div>
                      <span className={`text-xs font-medium w-8 sm:w-10 text-right ${
                        !lightMode ? "text-gray-400" : "text-gray-500"
                      }`}>
                        {((stat.count / totalTopicCnt) * 100).toFixed(2)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Region Statistics */}
          <div className={`rounded-xl shadow-lg border transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${
            !lightMode 
              ? "bg-gray-800 border-gray-700 hover:border-gray-600" 
              : "bg-white border-gray-200 hover:border-gray-300"
          }`}>
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-lg sm:text-xl font-bold flex items-center ${
                  !lightMode ? "text-white" : "text-gray-900"
                }`}>
                  <Globe className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-blue-500" />
                  <span className="hidden sm:inline">Region Statistics</span>
                  <span className="sm:hidden">Regions</span>
                </h3>
                <div className="px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold bg-blue-100 text-blue-800">
                  {regionFreq.length} items
                </div>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                {regionFreq.map((stat, index) => (
                  <div key={stat.region} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full"></div>
                        <span className={`text-xs sm:text-sm font-medium truncate flex-1 group-hover:text-opacity-80 transition-colors ${
                          !lightMode ? "text-gray-300" : "text-gray-700"
                        }`} title={stat.region}>
                          {stat.region}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
                        <span className="text-xs sm:text-sm font-semibold text-blue-500">
                          {stat.count}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className={`flex-1 h-2 rounded-full ${
                        !lightMode ? "bg-gray-700" : "bg-gray-200"
                      }`}>
                        <div
                          className="h-2 rounded-full transition-all duration-500 ease-out bg-gradient-to-r from-blue-500 to-blue-400"
                          style={{ 
                            width: `${(stat.count / totalRegionCnt) * 100}%`,
                            transitionDelay: `${index * 100}ms`
                          }}
                        ></div>
                      </div>
                      <span className={`text-xs font-medium w-8 sm:w-10 text-right ${
                        !lightMode ? "text-gray-400" : "text-gray-500"
                      }`}>
                        {((stat.count / totalRegionCnt) * 100).toFixed(2)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Source Statistics */}
          <div className="lg:col-span-2 xl:col-span-1">
            <div className={`rounded-xl shadow-lg border transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${
              !lightMode 
                ? "bg-gray-800 border-gray-700 hover:border-gray-600" 
                : "bg-white border-gray-200 hover:border-gray-300"
            }`}>
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`text-lg sm:text-xl font-bold flex items-center ${
                    !lightMode ? "text-white" : "text-gray-900"
                  }`}>
                    <FileText className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-green-500" />
                    <span className="hidden sm:inline">Source Statistics</span>
                    <span className="sm:hidden">Sources</span>
                  </h3>
                  <div className="px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold bg-green-100 text-green-800">
                    {sourceFreq.length} items
                  </div>
                </div>
                
                <div className="space-y-3 sm:space-y-4">
                  {sourceFreq.map((stat, index) => (
                    <div key={stat.source} className="group">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                          <span className={`text-xs sm:text-sm font-medium truncate flex-1 group-hover:text-opacity-80 transition-colors ${
                            !lightMode ? "text-gray-300" : "text-gray-700"
                          }`} title={stat.source}>
                            {stat.source}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
                          <span className="text-xs sm:text-sm font-semibold text-green-500">
                            {stat.count}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className={`flex-1 h-2 rounded-full ${
                          !lightMode ? "bg-gray-700" : "bg-gray-200"
                        }`}>
                          <div
                            className="h-2 rounded-full transition-all duration-500 ease-out bg-gradient-to-r from-green-500 to-green-400"
                            style={{ 
                              width: `${(stat.count / totalSourceCnt) * 100}%`,
                              transitionDelay: `${index * 100}ms`
                            }}
                          ></div>
                        </div>
                        <span className={`text-xs font-medium w-8 sm:w-10 text-right ${
                          !lightMode ? "text-gray-400" : "text-gray-500"
                        }`}>
                          {((stat.count / totalSourceCnt) * 100).toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}