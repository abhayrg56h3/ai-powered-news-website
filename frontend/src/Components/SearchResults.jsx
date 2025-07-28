import React from "react";
import ListLayout from "./ListLayout1";
import { Telescope } from "lucide-react";
export default function SearchResults() {
  return (
    <div>
      <div className="relative h-[45vh] flex items-end justify-start ml-32 mb-10 w-full overflow-hidden">
      
     
        
    

          
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 mb-4 leading-tight">
               Searh for "Health"
            </h1>

       
        </div>
   
      <div className="h-[1px] w-full bg-gray-300"></div>
      <ListLayout />
    </div>
  );
}
