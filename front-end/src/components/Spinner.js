import React from 'react';
// Loader
import { ClimbingBoxLoader } from "react-spinners"; 
export default function Spinner(){
    return(
        <div className="spinner"> 
            <ClimbingBoxLoader  size={28} loading/>
            <h1>Scraping ...</h1>
        </div>

    )
}