import { useEffect, useState } from 'react';
import axios from 'axios';
import {Routes, Route} from'react-router-dom';
import Home from './Components/Home';
import ArticleDetail from './Components/ArticleDetail.jsx';
import { myContext } from './Components/Context';
import Navbar from './Components/Navbar.jsx';
function App() {


  return (
    <div className="App">
      
      {/* <Navbar/> */}
        <Routes>
          <Route path="/" element={<Home />}/>
           <Route path="article/:id" element={<ArticleDetail />} />
          
      </Routes>

        
   
    </div>
  );
}

export default App;