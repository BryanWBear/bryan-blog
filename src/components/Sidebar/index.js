import React from 'react';
// import { Link, StaticQuery, graphql } from 'gatsby';
// import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faGithub, faLinkedin, faBattleNet } from '@fortawesome/free-brands-svg-icons'
import FlipPortrait from '../FlipPortrait/index.js'
import Flex from '../Flex/index.js'

// import { config } from '../../../data';

// import './index.scss';

// const {
//   wordings = [],
//   githubUsername,
//   zhihuUsername,
//   email,
//   iconUrl,
//   about,
//   facebook,
// } = config;

const Icon = ({ href, icon }) => (
  <a
    target="_blank"
    href={href}
    rel="external nofollow noopener noreferrer"
    className="custom-icon"
  >
    <span className="fa-layers fa-fw fa-2x">
      <FontAwesomeIcon icon={icon} />
    </span>
  </a>
);

const Sidebar = () => (
  <header style={{width: '30%', display: 'flex', justifyContent: 'center'}}>
    <div className="about-me">
      {/* <Link to={about} href={about} className="name">
        <img className="avatar" src={iconUrl} alt="Calpa" />
        <h4>Calpa</h4>
      </Link> */}
        <FlipPortrait></FlipPortrait>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: 40}}>
          <h2 style={{fontFamily: "Computer Modern Serif"}}>Bryan Wang</h2>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: 10}}>
            <Icon
                href={`https://github.com/bryanwbear`}
                icon={faGithub}
            />
            <Icon href={`https://www.linkedin.com/in/bryan-wang-564447169/`} icon={faLinkedin} />
            <Icon href={`https://cod.tracker.gg/modern-warfare/profile/battlenet/Syllabear%231400/mp`} icon={faBattleNet} />
        </div>
    </div>
  </header>
);

export default Sidebar;