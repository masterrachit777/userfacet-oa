import React from "react";
import { FooterWrapper } from "./style";
import { MdOutlineReplay } from "react-icons/md";
// import {FcIdea} from 'react-icons/fc';
import { HiLightBulb } from 'react-icons/hi';
import { TfiTimer } from "react-icons/tfi";
import { useStopwatch } from "../../hooks/useStopwatch";
import {BiSolidLeftArrow} from "react-icons/bi";
import {BiSolidRightArrow} from "react-icons/bi";
import {BiSolidDownArrow} from "react-icons/bi";

export const Footer = ({startGame, openHint, moveRight, moveLeft, moveDown}) => {
  const [minutes, seconds] = useStopwatch();
  return (
    <FooterWrapper>
      {/* replay button */}
      <div className="footer_left_content">
        <div onClick={startGame}><MdOutlineReplay /></div>
        <div className="md_left_content" onClick={openHint}> <HiLightBulb /></div>
      </div>


      {/* play buttons */}
      <div className="play_buttons">
        <div onClick={moveLeft}><BiSolidLeftArrow /></div>
        <div onClick={moveDown}><BiSolidDownArrow /></div>
        <div onClick={moveRight}><BiSolidRightArrow /></div>

      </div>

      {/* Timer and Hint */}
      <div className="footer_right_content hidden_md">
        <div className="hint_class" onClick={openHint}>
          <HiLightBulb /> <span>Hint</span>
        </div>
        <div className="timer_class">
          <TfiTimer />
          {`${minutes}`.padStart(2, 0)} : {`${seconds}`.padStart(2, 0)}
        </div>
      </div>
    </FooterWrapper>
  );
};
