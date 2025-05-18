import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { myContext } from './Context';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useNavigate } from 'react-router-dom';
import NewsFilters from './Filters';
import { motion } from "framer-motion";
dayjs.extend(relativeTime);

function Home() {
  const [articles, setArticles] = useState([]);
  const [filter,setFilter] = useState(false);
  const navigate = useNavigate();
  const {currArticle,setCurrArticle}=useContext(myContext);
  const [pageSize,setPageSize]=useState(10);
  const [pageNumber,setPageNumber]=useState(0);
  const [isPageSelect ,setIsPageSelect]=useState(false);


  function handleArticleClick(article) {
      setCurrArticle(article);
      console.log('Clicked article:', article);
    navigate(`/article/${article._id}`);
  }

   function  reducePageNumber(){
      if(pageNumber>0){
        setPageNumber(pageNumber-1);
      }
   }
   function increasePageNumber(){
    if(pageNumber<articles.length/pageSize-1)
    setPageNumber(pageNumber+1);
   }
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get('/api/articles');
        setArticles(res.data);
      } catch (err) {
        console.error('Error fetching articles:', err);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-orange-100 py-12 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.isArray(articles) &&
        Array.from({ length: pageSize }).map((_, index) => {
          const i = pageNumber * pageSize + index;
          const article = articles[i];
          if (!article) return null;
          
          return (
            <motion.article 
              key={article._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-out group isolate
              hover:-translate-y-2 border border-white/50 hover:border-orange-100/80"
            >
              {article.image && (
                <div className="relative h-48 overflow-hidden rounded-t-xl">
                  {/* <img 
                    src={article.image} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  /> */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 to-transparent" />
                </div>
              )}
              
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2 leading-tight transition-colors duration-300 
                  group-hover:text-orange-600 line-clamp-2">
                  {article.title}
                </h2>
                
                <p className="text-xs text-gray-500 mb-3 font-medium uppercase tracking-wide">
                  Source: {article.source}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <button className="px-4 py-2 bg-gradient-to-r from-pink-100 to-orange-100 text-orange-700 rounded-lg 
                    text-sm font-semibold hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
                    Show Summary
                  </button>
                  
                  <button 
                    onClick={() => handleArticleClick(article)}
                    className="px-4 py-2 bg-gradient-to-r from-orange-100 to-pink-100 text-pink-700 rounded-lg 
                    text-sm font-semibold hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
                  >
                    Read Full Article
                  </button>
                </div>
                
                <div className="flex items-center justify-center gap-1.5 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full 
                  text-xs font-medium text-gray-600 border border-gray-100 shadow-inner">
                  <svg 
                    className="h-3.5 w-3.5 text-orange-500" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  {dayjs(article.createdAt).fromNow()}
                </div>
              </div>
            </motion.article>
          );
        })}
    </div>

    <div className="mt-8 flex items-center justify-center gap-4">
      <motion.button 
        whileHover={{ scale: pageNumber > 0 ? 1.05 : 1 }}
        whileTap={{ scale: 0.95 }}
        disabled={pageNumber === 0}
        onClick={() => reducePageNumber()}
        className={`px-4 py-2 rounded-lg font-medium ${
          pageNumber === 0 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
        }`}
      >
        Previous
      </motion.button>
      
      <span className="px-3 py-1 bg-white rounded-lg shadow-sm text-gray-700 font-medium">
        Page {pageNumber + 1}
      </span>
      
      <motion.button 
        whileHover={{ scale: pageNumber < articles.length/pageSize-1 ? 1.05 : 1 }}
        whileTap={{ scale: 0.95 }}
        disabled={pageNumber >= articles.length/pageSize-1}
        onClick={() => increasePageNumber()}
        className={`px-4 py-2 rounded-lg font-medium ${
          pageNumber >= articles.length/pageSize-1 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
        }`}
      >
        Next
      </motion.button>
      
      <div className="relative ml-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => setIsPageSelect(!isPageSelect)}
          className="px-4 py-2 bg-white rounded-lg shadow-sm text-gray-700 font-medium hover:bg-gray-50"
        >
          {pageSize}/page
        </motion.button>
        
        {isPageSelect && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg overflow-hidden w-32"
          >
            {[10, 20, 50, 100].map((size) => (
              <li
                key={size}
                onClick={() => { 
                  setPageSize(size);
                  setPageNumber(Math.floor((pageNumber * pageSize) / size));
                  setIsPageSelect(false);
                }}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 cursor-pointer transition-colors"
              >
                {size}/page
              </li>
            ))}
          </motion.ul>
        )}
      </div>
    </div>
  </div>
</div>
  );
}

export default Home;