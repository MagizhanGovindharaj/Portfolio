import React from "react";
import { SKILLS_DATA } from "../UI_Constants";
import { GiCheckMark } from "react-icons/gi";
import "../Skills/Skills.scss";

function Skills({day_night}) {
  const { Header, Skills } = SKILLS_DATA;
  const { technicalSkills1, technicalSkills2, technicalSkills3, Tools } = Skills;
  return (
    <div className="skillscontainer" style={{ color: `${day_night ? "white" : "#222"}` }}>
      <div className="skillsheader">{Header}</div>
      <div className="skillsbody" >
        <section >
          {technicalSkills1.map((skill, index) => {
            return (
              <div className="techSkillsOne techSkills" key={index}>
                <GiCheckMark className="tickicon" />
                <p>{skill}</p>
              </div>
            );
          })}
        </section>
        <hr />
        <section>
        {technicalSkills2.map((skill, index) => {
          return (
            <div className="techSkillsTwo techSkills" key={index}>
              <GiCheckMark className="tickicon" />
              <p>{skill}</p>
            </div>
          );
        })}
        </section>
        <hr />
        <section>
        {technicalSkills3.map((skill, index) => {
          return (
            <div className="tools techSkills" key={index}>
              <GiCheckMark className="tickicon" />
              <p>{skill}</p>
            </div>
          );
        })}
        </section>
        <hr />
        <section>
        {Tools.map((skill, index) => {
          return (
            <div className="tools techSkills" key={index}>
              <GiCheckMark className="tickicon" />
              <p>{skill}</p>
            </div>
          );
        })}
        </section>
      </div>
    </div>
  );
}

export default Skills;
