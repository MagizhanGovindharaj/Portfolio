import "../CSS/Navbar.scss"
import { IoHomeOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { GrDocumentText } from "react-icons/gr";
import { NavLink } from "react-router-dom";
import { BsImages } from "react-icons/bs";
import { BsHddStack } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { MdOutlineFacebook } from "react-icons/md";
import { IoLogoInstagram } from "react-icons/io5";
import { PiSkypeLogoFill } from "react-icons/pi";
import { GrLinkedin } from "react-icons/gr";
import { useEffect, useState } from "react";
import { IoIosMail } from "react-icons/io";



function Navbar(){
    let [state,setstate]=useState(false)

    let activecolor=()=>{
        // setstate(true)
        active ? setstate(true) : setstate(false)
        console.log(active);
    }
    // console.log(state);

    let active = document.getElementsByClassName("active")
    

    useEffect(()=>{
        activecolor()
    },[state])
    // // console.log(anchor);

    // anchor.forEach(anchor => {
    //     console.log(anchor)
    // });

    // if(anchor)
    return(
        <div className="navbar">
            <section id="section1">
                <div id="profileimg">
                </div>
                <h1 id="name">
                    Magizhan Govindharaji
                </h1>
                <div id="socialmedia">
                    <div className="icons">
                        <FaXTwitter/>
                    </div>
                    <div className="icons">
                        <MdOutlineFacebook />
                    </div>
                    <div className="icons">
                        <IoLogoInstagram />
                    </div>
                    <div className="icons">
                        <PiSkypeLogoFill />
                    </div>
                    <div className="icons">
                        <GrLinkedin />
                    </div>
                </div>
            </section>
            <section id="section2">
                <aside>
                    <IoHomeOutline id="ico" />
                    <NavLink to="/">Home</NavLink>
                </aside>
                <aside>
                    <FaRegUser id="ico" />
                    <NavLink to="about">About</NavLink>
                </aside>
                <aside>
                    <GrDocumentText id="ico" />
                    <NavLink to="resume">Resume</NavLink>
                </aside>
                <aside>
                    <BsImages id="ico" />
                    <NavLink to="portfolio">Portfolio</NavLink>
                </aside>
                <aside>
                    <BsHddStack id="ico" />
                    <NavLink to="service">Service</NavLink>
                </aside>
                <aside>
                    <IoIosMail id="ico" />
                    <NavLink to="contact">Contact</NavLink>
                </aside>
            </section>
      </div>
    )
}
export default Navbar

