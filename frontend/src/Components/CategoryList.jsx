import React, { useContext, useEffect, useState } from 'react'
import ListLayout2 from './ListLayout2';
import axios from 'axios';
import { myContext } from './Context';
import {
  Search,
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
  Instagram,
  ArrowRight,
  Heart,
  Users,
  Building,
  Atom, 
  FileText,
  Trophy,
  Bookmark,
  ChevronRight,
  ChevronLeft,
  AlarmClock,
  BookmarkPlus,
} from "lucide-react";

const topicsList = ["News", "Politics", "Government", "Society", "Culture", "Science", "Technology", "Health", "Education", "Environment", "Economy", "Business", "Finance", "Law", "Crime", "Religion", "Philosophy", "History", "Art", "Media", "Entertainment", "Sports", "Lifestyle", "Travel", "Food", "Fashion", "Beauty", "Parenting", "Relationships", "Psychology", "Self-Improvement", "Animals", "Agriculture", "Energy", "Infrastructure", "Transportation", "Space", "Climate", "Startups", "War", "Peace", "Diplomacy", "Gender", "LGBTQ+", "Race", "Immigration", "Democracy", "Human Rights", "Activism", "Censorship", "Digital Media", "Internet", "Cybersecurity", "Social Media", "Marketing", "Advertising", "Innovation", "Careers", "Work", "Remote Work", "Real Estate", "Stock Market", "Cryptocurrency", "Banking", "Taxes", "Consumerism", "Big Tech", "Data", "Privacy", "Engineering", "Mathematics", "Physics", "Chemistry", "Biology", "Astronomy", "Pharmaceuticals", "Mental Health", "Fitness", "Nutrition", "Diseases", "Pandemics", "Vaccines", "Wellness", "Spirituality", "Justice", "Freedom", "Equality", "Traditions", "Languages", "Literature", "Books", "Film", "Television", "Music", "Dance", "Theatre", "Museums", "Photography", "Architecture", "Design", "Sustainability", "Pollution", "Natural Disasters", "Forests", "Oceans", "Wildlife", "Recycling", "Water", "Electricity", "Aviation", "Railways", "Shipping", "Space Exploration", "International Relations", "Global Organizations", "Public Policy", "Urban Development", "Rural Development", "Security", "Law Enforcement", "Judiciary", "Constitution", "Freedom of Speech", "Nationalism", "Secularism", "Genetics", "Bioethics", "Online Education", "Research", "Universities", "Schools", "Aging", "Inclusion", "Home & Living", "Minimalism", "Hobbies", "Festivals", "Holidays", "Mythology", "Local News", "Regional News", "Global News", "Opinion", "Investigative Journalism"];

export default function CategoryList() {
     const [topics,setTopics]=useState(null);
            const {currUser}=useContext(myContext);
             useEffect(()=>{
               async function fetchTopicsList(){
                  try{
                     const response=await axios.get(`${import.meta.env.VITE_API_URL}/api/article/fetchTopicsList`);
                     let arr=[];
                     response.data.map(function (item){
                
              
                     arr.push(item); 
                   
                 }); 
               
                 setTopics(arr);

                  }
                  catch(err){
                      console.log("Error",err);
                  } 
               };
               fetchTopicsList();
        },[]);
  return (
    <div>
        <ListLayout2 type={"topics"}  list={topics}/>
    </div>
  )
}
