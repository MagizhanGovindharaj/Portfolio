import React, { useState } from "react";
import { PROFILE_DATA } from "../UI_Constants";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import "../Profile/Profile.scss";
import { IoSunny } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
import Button from "../Button/Button";
import myresume from "../../../public/Magizhan.pdf"
import Typewriter from "typewriter-effect";
import profilepic from "../../../public/Profile/profile3.webp"

function Profile({ setday, day_night }) {
  const { name, profession, description, resume } = PROFILE_DATA;
  const dayornight = () => {
    setday();
  };
  return (
    <div className="profile">
      <section
        className="contentcard"
        style={{ color: `${day_night ? "white" : "#222"}` }}
      >
        <h1 className="name">{name}</h1>
        <h2 className="profession">
        <Typewriter
          onInit={(typewriter) => {
            typewriter
              .typeString(profession)
              .pauseFor(2500)
              .deleteAll()
              .typeString("PROBLEM SOLVING")
              .pauseFor(2500)
              .deleteAll()
              .typeString("COMMUNICATION")
              .pauseFor(2500)
              .deleteAll()
              .typeString("ADAPTABILITY")
              .pauseFor(2500)
              .deleteAll()
              .typeString("COLLABORATIVE")
              .start();
          }}
          options={{
            strings: "IM",
            loop: true,
          }}
        />
        </h2>
        <div className="icons">
          <FaSquareXTwitter />
          <FaGithub />
          <FaLinkedin />
        </div>
        <p className="description">{description}</p>
        <a href={myresume} download="My_Resume.pdf">
          <Button day_night={day_night} name="Resume" />
        </a>
      </section>
      <section className="imagecard">
        {day_night ? (
          <FaMoon
            rotate={180}
            color="white"
            onClick={dayornight}
            className="icon"
          />
        ) : (
          <IoSunny color="#222" onClick={dayornight} className="icon"/>
        )}
        <img
          src={profilepic}
          alt=""
        />
      </section>
    </div>
  );
}

export default Profile;
