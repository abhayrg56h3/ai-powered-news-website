import React from 'react'
import { useState } from 'react';
export default function Filters() {

    const [howMany, setHowMany] = useState('All');  
    const [source,setSource]=useState(null);
    const [date,setDate]=useState(null);
  return (
    <div>
      <h1>
        Match <span>{howMany}</span>
        of the following filters:
      </h1>
      <ul>
        <li>
            <span>Source</span>
               {source==null? <span>is not</span>:<span>is</span> }
               <span>{source}</span>
            
        </li>
        <li>
            <span>Date</span>
               {date==null? <span>is not</span>:<span>is</span> }
               <input type="date" />
                <span>onwards</span>
        </li>
      </ul>
    </div>
  )
}
