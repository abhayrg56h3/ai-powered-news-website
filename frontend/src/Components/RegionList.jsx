import React, { useContext, useEffect, useState } from 'react'
import { myContext } from './Context';
import axios from 'axios';
import ListLayout2 from './ListLayout2';
const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
  "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain",
  "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
  "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso",
  "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic",
  "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Democratic Republic of the Congo",
  "Costa Rica", "Côte d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark",
  "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador",
  "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland",
  "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada",
  "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary",
  "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
  "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea North",
  "Korea South", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho",
  "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar",
  "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania",
  "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro",
  "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands",
  "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman",
  "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines",
  "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis",
  "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe",
  "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia",
  "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain",
  "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan",
  "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia",
  "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates",
  "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City",
  "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe", "Palestine", "Kosovo", "Abkhazia",
  "South Ossetia", "Artsakh", "Transnistria", "Northern Cyprus", "Western Sahara",
  "Somaliland", "Cook Islands", "Niue", "Åland Islands", "Faroe Islands", "Greenland",
  "Hong Kong", "Macau", "Kurdistan Region", "Bougainville", "Bangsamoro", "Azores",
  "Madeira", "Aceh", "Gagauzia", "Mount Athos", "Svalbard", "Jan Mayen", "Rotuma",
  "Puerto Rico", "Northern Mariana Islands", "Guam", "US Virgin Islands", "American Samoa",
  "French Polynesia", "New Caledonia", "Saint Martin", "Saint Barthélemy", "Wallis and Futuna",
  "Mayotte", "Martinique", "French Guiana", "Aruba", "Curacao", "Sint Maarten", "Gibraltar",
  "Bermuda", "Cayman Islands", "British Virgin Islands", "Montserrat", "Anguilla", "Nevis",
  "Rodrigues", "Embera-Wounaan", "Kuna Yala", "Ngöbe-Buglé", "Danu", "Kokang", "Naga",
  "Pa-Laung", "Pa-O", "Wa", "Vojvodina", "Kosovo and Metohija"
];

export default function RegionList() {

     const [regionList,setRegionList]=useState([]);
                const {currUser}=useContext(myContext);
                 useEffect(()=>{
                   async function fetchRegionList(){
                      try{
                         const response=await axios.get('/api/article/fetchRegionsList');
                     
                     setRegionList(response.data);
                   
                   }catch(err){
                       console.log("Error",err);
                      } 
                   };
                   fetchRegionList();
            },[]);
 

  return (
    <div>
        <ListLayout2 type={"regions"}  list={regionList}/>
    </div>
  )
}
