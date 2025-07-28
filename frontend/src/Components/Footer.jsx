import React, { useState,useEffect, useContext } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaGithub,
  FaNewspaper,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt
} from "react-icons/fa";
import axios from "axios";
import { myContext } from "./Context";
const topicsList = ["News", "Politics", "Government", "Society", "Culture", "Science", "Technology", "Health", "Education", "Environment", "Economy", "Business", "Finance", "Law", "Crime", "Religion", "Philosophy", "History", "Art", "Media", "Entertainment", "Sports", "Lifestyle", "Travel", "Food", "Fashion", "Beauty", "Parenting", "Relationships", "Psychology", "Self-Improvement", "Animals", "Agriculture", "Energy", "Infrastructure", "Transportation", "Space", "Climate", "Startups", "War", "Peace", "Diplomacy", "Gender", "LGBTQ+", "Race", "Immigration", "Democracy", "Human Rights", "Activism", "Censorship", "Digital Media", "Internet", "Cybersecurity", "Social Media", "Marketing", "Advertising", "Innovation", "Careers", "Work", "Remote Work", "Real Estate", "Stock Market", "Cryptocurrency", "Banking", "Taxes", "Consumerism", "Big Tech", "Data", "Privacy", "Engineering", "Mathematics", "Physics", "Chemistry", "Biology", "Astronomy", "Pharmaceuticals", "Mental Health", "Fitness", "Nutrition", "Diseases", "Pandemics", "Vaccines", "Wellness", "Spirituality", "Justice", "Freedom", "Equality", "Traditions", "Languages", "Literature", "Books", "Film", "Television", "Music", "Dance", "Theatre", "Museums", "Photography", "Architecture", "Design", "Sustainability", "Pollution", "Natural Disasters", "Forests", "Oceans", "Wildlife", "Recycling", "Water", "Electricity", "Aviation", "Railways", "Shipping", "Space Exploration", "International Relations", "Global Organizations", "Public Policy", "Urban Development", "Rural Development", "Security", "Law Enforcement", "Judiciary", "Constitution", "Freedom of Speech", "Nationalism", "Secularism", "Genetics", "Bioethics", "Online Education", "Research", "Universities", "Schools", "Aging", "Inclusion", "Home & Living", "Minimalism", "Hobbies", "Festivals", "Holidays", "Mythology", "Local News", "Regional News", "Global News", "Opinion", "Investigative Journalism"];
const Footer = () => {
  const [email, setEmail] = useState("");
  const { lightMode } = useContext(myContext);
  
  const footerBg = lightMode ? "bg-gray-50" : "bg-gray-900";
  const textPrimary = lightMode ? "text-gray-900" : "text-white";
  const textSecondary = lightMode ? "text-gray-600" : "text-gray-300";
  const borderColor = lightMode ? "border-gray-300" : "border-gray-600";
 

  const images = [
    "/image1.png",
    "/image2.png",
    "/image3.png",
    "/image4.png",
    "/image5.png",
    "/image6.png",
    "/image7.png",
    "/image8.png"
  ];

  return (
    <div className={`${footerBg} transition-colors duration-300`}>
      {/* Image Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 sm:gap-3">
          {images.map((src, idx) => (
            <div key={idx} className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group">
              <img 
                src={src} 
                alt={`Gallery image ${idx + 1}`} 
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Border separator */}
      <div className={`border-t ${borderColor}`}></div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* NewsHub Brand & About */}
          <div className="space-y-4">
            <div className="flex text-orange-500 items-center space-x-2">
              {/* <FaNewspaper className={`${textPrimary} text-2xl`} /> */}<span className="text-orange-600 text-4xl">∴</span> 
              <h3 className={`text-xl text-orange-600 font-bold ${textPrimary}`}>newshub</h3>
            </div>
            <p className={`${textSecondary} text-sm leading-relaxed`}>
              Your trusted source for latest news, technology updates, and insightful articles. 
              Stay informed with NewsHub's comprehensive coverage of current events.
            </p>
            <div className="space-y-2">
              <div className={`flex items-center space-x-2 ${textSecondary} text-sm`}>
                <FaEnvelope className="text-orange-500" />
                <span>abhaydubey22112004@gmail.com</span>
              </div>
              <div className={`flex items-center space-x-2 ${textSecondary} text-sm`}>
                <FaPhone className="text-orange-500" />
                <span>+91 8630265332</span>
              </div>
              <div className={`flex items-center space-x-2 ${textSecondary} text-sm`}>
                <FaMapMarkerAlt className="text-orange-500" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className={`text-sm font-semibold ${textPrimary} mb-4 uppercase tracking-wide`}>
              Features
            </h3>
            
            <div className={`space-y-3 ${textSecondary}  text-sm`}>
              <li className="hover:text-orange-500 transition-colors">AI Summary</li>
              <li className="hover:text-orange-500 transition-colors">Chat Bot</li>
              <li className="hover:text-orange-500 transition-colors">Personalized Feed</li>
              <li className="hover:text-orange-500 transition-colors">Trusted Sources</li>
              <li className="hover:text-orange-500 transition-colors">Real Time Alerts</li>
              <li className="hover:text-orange-500 transition-colors">Latest News</li>
              <li className="hover:text-orange-500 transition-colors">World News</li>
            </div>
          </div>

        
          <div>
            <h3 className={`text-sm font-semibold ${textPrimary} mb-4 uppercase tracking-wide`}>
              Sources
            </h3>
            <ul className={`space-y-3 ${textSecondary} text-sm`}>
              <li className="hover:text-orange-500 transition-colors">The Hindu</li>
              <li className="hover:text-orange-500 transition-colors">BBC</li>
              <li className="hover:text-orange-500 transition-colors">CNN</li>
              <li className="hover:text-orange-500 transition-colors">Al Jazeera</li>
              <li className="hover:text-orange-500 transition-colors">Reuters</li>
              <li className="hover:text-orange-500 transition-colors">The Guardian</li>
              <li className="hover:text-orange-500 transition-colors">TechCrunch</li>
              <li className="hover:text-orange-500 transition-colors">Times of India</li>
              <li className="hover:text-orange-500 transition-colors">NDTV</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className={`text-sm font-semibold ${textPrimary} mb-4 uppercase tracking-wide`}>
              Connect With Us
            </h3>
            <p className={`${textSecondary} text-sm mb-6`}>
              Follow NewsHub on social media for real-time updates and breaking news.
            </p>

            {/* Social Media Icons */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              <a href="#" className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg">
                <FaFacebookF size={16} />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-400 hover:bg-blue-500 rounded-lg flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg">
                <FaTwitter size={16} />
              </a>
              <a href="https://www.linkedin.com/in/abhay-dubey-44367b273/" className="w-10 h-10 bg-blue-700 hover:bg-blue-800 rounded-lg flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg">
                <FaLinkedinIn size={16} />
              </a>
              <a href="#" className="w-10 h-10 bg-pink-600 hover:bg-pink-700 rounded-lg flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg">
                <FaInstagram size={16} />
              </a>
              
              <a href="https://github.com/abhayrg56h3" className="w-10 h-10 bg-gray-800 hover:bg-gray-900 rounded-lg flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg">
                <FaGithub size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={`border-t ${borderColor}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className={`${textSecondary} text-sm text-center md:text-left`}>
              © 2025 NewsHub. All rights reserved. | Designed for B.Tech Project
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;