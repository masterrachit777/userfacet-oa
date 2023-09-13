import React, { useContext, useEffect, useState } from "react";
import { HeaderWrapper } from "./style";
import UFLogo from "../../assets/images/uf_logo.svg";
import { GiGolfFlag } from "react-icons/gi";
import { PhoneView } from "../PhoneView";
import wordContext from "../../utils/context";

export const Header = ({score}) => {
  const [isMobile, setIsMobile] = useState(false);
  const {currentWord} = useContext(wordContext);

  useEffect(() => {
    if (window.innerWidth <= 768) setIsMobile(true);
    else setIsMobile(false);
  }, [window.innerWidth]);

  return (
    <>
      {!isMobile ? (
        <HeaderWrapper>
          {/* logo */}
          <div>
            <img src={UFLogo} alt="company-logo" />
          </div>

          {/* Next word  to drop*/}
          <div className="middle_content">
            Current word : <span>{currentWord}</span>
          </div>

          {/* Score */}
          <div className="right_content">
            <GiGolfFlag />
            <div>
              Score <span>{score}</span>
            </div>
          </div>
        </HeaderWrapper>
      ) : (
        <PhoneView sccore={score} word={currentWord}/>
      )}
    </>
  );
};
