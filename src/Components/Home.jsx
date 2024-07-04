import "../CSS/Home.scss"
import React from "react";
import { Typewriter, Cursor } from "react-simple-typewriter";
import Navbar from "./Navbar";


function Home(){
    return(
            <div className="homediv">
                <Navbar/>
                <div>Magizhan Govindharaji</div>
            </div>
    )
}
export default Home