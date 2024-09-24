import React from "react";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Profile from "./Components/Profile/Profile";
import Projects from "./Components/Projects/Projects";
import Skills from "./Components/Skills/Skills";
import ContactUs from "./Components/ContactUs/ContactUs";
import Rights from "./Components/Rights";

function App() {
  const [count, setCount] = useState(0);
  const [day,setDay] = useState(true)
  function setday() {
    setDay(!day)
  }
  return (
    <div className="maindiv" style={{background:`${day?'#222':'white'}`}}>
      <Profile setday={setday} day_night={day} />
      <Projects day_night={day} />
      <Skills day_night={day} />
      <ContactUs day_night={day}/>
      <Rights day_night={day}/>
    </div>
  );
}

export default App;
