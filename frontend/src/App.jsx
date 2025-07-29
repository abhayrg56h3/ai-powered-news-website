import { useContext, useEffect,useRef, useState } from "react";
import axios from "axios";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/Home";
import { myContext } from "./Components/Context";
import Navbar from "./Components/Navbar.jsx";
import { Router } from "react-router-dom";
import FloralLoginPage from "./Components/Login.jsx";
import HotTopics from "./Components/HotTopics.jsx";
import MultiComponent from "./Components/MultiComponent.jsx";
import Footer from "./Components/Footer.jsx";
import ArticleDetail from "./Components/ArticleDetail.jsx";
import SearchResults from "./Components/SearchResults.jsx";
import NewsLoginPage from "./Components/Login.jsx";
import ProfilePage from "./Components/Profile.jsx";
import BookMarked from "./Components/BookMarked.jsx";
import CategoryList from "./Components/CategoryList.jsx";
import SourceList from "./Components/SourceList.jsx";
import RegionList from "./Components/RegionList.jsx";
import ListLayout1 from "./Components/ListLayout1.jsx";
import DailyInsightsPage from "./Components/DailyInsightsPage.jsx";
import History from "./Components/History.jsx";
import SearchPage from "./Components/Search.jsx";
import PreferencesPage from "./Components/Preferences.jsx";
import AnalyticsPage from "./Components/Analytics.jsx";
import Reset from "./Components/Reset.jsx";
import ForgotPassword from "./Components/ForgotPassword.jsx";
import LoadingComponent from "./Components/Loading.jsx";
function App() {
  const { currUser , isLoading,setIsLoading } = useContext(myContext);
  const [navbarDropdown,setNavbarDropdown]=useState(false);
  const [dropdownContent,setDropdownContent]=useState([]);
    
   const {savedList, setSavedList} = useContext(myContext);
   useEffect(()=>{

     console.log("currUser in App.jsx", currUser);
       if(!currUser) return;
            async function populateSavedList(){
                     const response=await Promise.all(currUser.favorites.map(async function(id){
                          const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/article/fetchbyid/${id}`);
                          return res.data;
                     }));
                      setSavedList(response);
            };
            populateSavedList();
   },[currUser]);

   if(isLoading) {
    return <LoadingComponent />;
  }



console.log("currUser in App.jsx", currUser);
   if(currUser ){
 const { topics, sources, regions } = currUser.preferences || {};

  // 4️⃣ If any of those arrays is empty (length === 0), go to prefs page
  if (
    !Array.isArray(topics) || topics.length === 0 ||
    !Array.isArray(sources) || sources.length === 0 ||
    !Array.isArray(regions) || regions.length === 0
  ) {
    return <PreferencesPage />;
  }
}



  return (
    <div className="App"> 
    {
      currUser && <Navbar navbarDropdown={navbarDropdown}  setNavbarDropdown={setNavbarDropdown} setDropdownContent={setDropdownContent} dropdownContent={dropdownContent} />
    }
  
      
   
      
      <Routes>
        <Route path="/" element={currUser ? <Home/> : <Navigate to="/login" />}/>
        <Route path="/login" element={<NewsLoginPage/>} />
        <Route path="/bookmarked" element={currUser ? <BookMarked/> : <Navigate to="/login" />} />
        <Route path="/categorylist" element={currUser ? <CategoryList/> : <Navigate to="/login" />} />
        <Route path="/sourcelist" element={currUser ? <SourceList/> : <Navigate to="/login" />} />
         <Route path="/regionlist" element={currUser ? <RegionList/> : <Navigate to="/login" />} />
         <Route path="/categorylist/:topic" element={currUser ? <ListLayout1/> : <Navigate to="/login" />} />
         <Route path="/sourcelist/:source" element={currUser ? <ListLayout1/> : <Navigate to="/login" />} />
         <Route path="/regionlist/:region" element={currUser ? <ListLayout1/> : <Navigate to="/login" />} />
        <Route path="/articledetail/:id" element={currUser ? <ArticleDetail/> : <Navigate to="/login" />} />
        <Route path="/daily/:daily" element={currUser ? <DailyInsightsPage/> : <Navigate to="/login" />} />
        <Route path="/history" element={currUser ? <History/> : <Navigate to="/login" />} />
        <Route path="/search" element={currUser ? <SearchPage/> : <Navigate to="/login" />} />
        <Route path="/profile" element={currUser ? <ProfilePage/> : <Navigate to="/login" />} />
        <Route path="/preferences" element={currUser ? <PreferencesPage/> : <Navigate to="/login" />} />
        <Route path="/analytics" element={currUser ? <AnalyticsPage/> : <Navigate to="/login" />} />
          <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset/:token" element={<Reset />} />

      </Routes>
   
       <Footer/> 
      
    </div>
  );
}

export default App;



