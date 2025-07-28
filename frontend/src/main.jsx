import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App'
import Context from './Components/Context';
import ScrollToTop from './Components/ScrolltoTop';
import './index.css'
// import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <ScrollToTop/>
    <Context><App /></Context>
     
    </BrowserRouter>
  </React.StrictMode>
)