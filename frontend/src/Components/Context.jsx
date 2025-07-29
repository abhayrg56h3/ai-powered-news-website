import React, { useEffect, useState } from 'react'
import { createContext } from 'react';
import axios from "axios";
export const myContext = createContext();
export default function Context({ children }) {
  const [lightMode, setLightMode] = useState(true);
  const [breaking, setBreaking] = useState(null);
  const [currUser, setCurrUser] = useState(null);
  const [currentArticles, setCurrentArticles] = useState([]);
  const [currentArticle, setCurrentArticle] = useState([]);
  const [dailyArticles, setDailyArticles] = useState(null);
  const [recommendedArticles, setRecommendedArticles] = useState([]);
  const [hotTopics, setHotTopics] = useState(null);
  const [popularReads, setPopularReads] = useState(null);
  const [weeklyArticles, setWeeklyArticles] = useState(null);
  const [mustReadArticles, setMustReadArticles] = useState(null);
  const [isBreakingDetail, setIsBreakingDetail] = useState(false);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
   const [searchResults, setSearchResults] = useState(null);
  const [savedList, setSavedList] = useState(null);
  useEffect(() => {
    async function fetchCurrUser() {
      try {
        const user = await axios.get(
  `${import.meta.env.VITE_API_URL}/api/user/curruser`,
  { withCredentials: true }   // 🔥 SUPER IMPORTANT
);

        console.log(user.data);
        setCurrUser(user.data);
      }
      catch (err) {
        console.log(err);
      }

      finally {
        setIsLoading(false);
      }

    };
    fetchCurrUser();
  }, []);

  return (
    <div>
      <myContext.Provider value={{ breaking, setBreaking,  recommendedArticles, setRecommendedArticles, dailyArticles, setDailyArticles, currentArticle, setCurrentArticle, lightMode, setLightMode, currUser,setCurrUser, currentArticles, setCurrentArticles, popularReads, setPopularReads, hotTopics, setHotTopics, weeklyArticles, setWeeklyArticles, mustReadArticles, setMustReadArticles, isBreakingDetail, setIsBreakingDetail, search, setSearch, searchResults, setSearchResults, savedList, setSavedList, isLoading, setIsLoading }}>
        {children}
      </myContext.Provider>
    </div>
  )
}
