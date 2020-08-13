import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import Image from 'react-bootstrap/Image';
import slime from '../../../static/slime.png'
import me from '../../../static/me.jpg';
import './index.css';

const FlipPortrait = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  const ImageText = ({ img, text }) => (
    <div style={{display: 'flex', justifyContent: 'center'}}>
        <Image src={img} roundedCircle={true} fluid style={{height: 350, width: 350}} onClick={handleClick}/>
        {/* <div>{text}</div> */}
    </div>
  );

  return (
    <div style={{height: 350, width: 350, borderRadius: 175}}>
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
            <ImageText img={slime} text={"\"You can't talk, you're negative\" - Anonymous, CoD: Modern Warfare, 2020"}></ImageText>
            <Image src={me} roundedCircle={true} style={{height: 350, width: 350, borderRadius: 175}} onClick={handleClick}/>
        </ReactCardFlip>
    </div>
  );
};

export default FlipPortrait;