import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faGithub, faLinkedin, faBattleNet } from '@fortawesome/free-brands-svg-icons'
import FlipPortrait from '../FlipPortrait/index.js'


const Icon = ({ href, icon, onMouseEnter, onMouseLeave }) => (
  <a
    target="_blank"
    href={href}
    rel="external nofollow noopener noreferrer"
    className="custom-icon"
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <span className="fa-layers fa-fw fa-2x">
      <FontAwesomeIcon icon={icon} />
    </span>
  </a>
);

const Sidebar = () => {
  const [text, setText] = useState("");

  return (
  <header style={{width: '30%', display: 'flex', justifyContent: 'center'}}>
    <div className="about-me">
      {/* <Link to={about} href={about} className="name">
        <img className="avatar" src={iconUrl} alt="Calpa" />
        <h4>Calpa</h4>
      </Link> */}
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <FlipPortrait></FlipPortrait>
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
        {/* (王博远) */}
          <h2 style={{fontFamily: "Computer Modern Serif"}}>Bryan Wang</h2>
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <Icon
                href={`https://github.com/bryanwbear`}
                icon={faGithub}
                onMouseEnter={() => setText("\"We should forget about small efficiencies, say about 97% of the time: premature optimization is the root of all evil. Yet we should not pass up our opportunities in that critical 3%. A good programmer will not be lulled into complacency by such reasoning, he will be wise to look carefully at the critical code; but only after that code has been identified.\" - Donald Knuth")} 
            />
            <Icon 
                href={`https://www.linkedin.com/in/bryan-wang-564447169/`} 
                icon={faLinkedin} 
                onMouseEnter={() => setText("\"Algebra is the offer made by the devil to the mathematician... All you need to do, is give me your soul: give up geometry.\" - Michael Atiyah")} 
            />
            <Icon 
                href={`https://cod.tracker.gg/modern-warfare/profile/battlenet/Syllabear%231400/mp`} 
                icon={faBattleNet} 
                onMouseEnter={() => setText("\"You can't talk, you're negative.\" - Anonymous, CoD: Modern Warfare")}
            />
        </div>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '20%', marginLeft: '10%', marginRight: '10%', fontFamily: "Computer Modern Serif", fontStyle: "italic"}}>{text}</div>
    </div>
  </header>
  );
};

export default Sidebar;