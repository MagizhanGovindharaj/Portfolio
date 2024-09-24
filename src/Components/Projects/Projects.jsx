import React from "react";
import { PROJECT_DATA } from "../UI_Constants";
import friday from "../../../public/Projects/friday.jpg";
import movie from "../../../public/Projects/movie.png";
import myntra from "../../../public/Projects/myntra.webp";
import weather from "../../../public/Projects/weather.png";
import "../Projects/Projects.scss"

function Projects({setday,day_night}) {
  const { project1, project2, project3, project4 } = PROJECT_DATA;
  const projectData = Object.entries(PROJECT_DATA);
  // console.log(Object.entries(PROJECT_DATA));
  return (
    <div className="projmain" >
      <div className="heading" style={{ color: `${day_night ? "white" : "#222"}` }}>PROJECTS</div>
      <div className="projectsdiv" >
      {projectData.map((element) => {
        return (
          <a key={element[1].id} className="project" >
            <img
              src={
                element[1].id == 1
                  ? friday
                  : element[1].id == 2
                  ? movie
                  : element[1].id == 3
                  ? myntra
                  : weather
              }
              alt=""
              style={{objectFit:"cover"}}
            />
            <h2 style={{ color: `${day_night ? "white" : "#222"}` }}>{element[1].ProjectName}</h2>
            <p style={{ color: `${day_night ? "white" : "#222"}` }}>{element[1].ProjectDesc}</p>
          </a>
        );
      })}
      </div>
    </div>
  );
}

export default Projects;
