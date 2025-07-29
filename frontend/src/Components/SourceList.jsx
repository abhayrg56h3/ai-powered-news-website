import React, { useContext, useEffect, useState } from 'react'
import { myContext } from './Context';
import axios from 'axios';
import ListLayout2 from './ListLayout2';

export default function SourceList() {

     const [sourcesList,setSourcesList]=useState([]);
                const {currUser}=useContext(myContext);
                 useEffect(()=>{
                   async function fetchSourcesList(){
                      try{
                         const response=await axios.get(`${import.meta.env.VITE_API_URL}/api/article/fetchSourcesList`);
                         setSourcesList(response.data);
                         console.log("response",response.data);
                      }
                      catch(err){
                          console.log("Error",err);
                      } 
                   };
                   fetchSourcesList();
            },[]);
 

  return (
    <div>
        <ListLayout2 type={"sources"}  list={sourcesList}/>
    </div>
  )
}
