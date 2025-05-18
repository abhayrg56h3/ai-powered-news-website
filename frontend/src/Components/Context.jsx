import React,{useState} from 'react'
import { createContext } from 'react';
export const myContext=createContext();
export default function Context({children}) {
    const [currArticle, setCurrArticle] = useState([])
  return (
    <div>
        <myContext.Provider value={{currArticle,setCurrArticle}}>
            {children}
        </myContext.Provider>
    </div>
  )
}
