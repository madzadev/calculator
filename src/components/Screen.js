import React, { useRef, useEffect } from "react";
import "./Screen.css";

const Screen = ({ value }) => {
  const textRef = useRef(null);

  useEffect(() => {
    const adjustFontSize = () => {
      const element = textRef.current;
      let fontSize = 70;

      element.style.fontSize = `${fontSize}px`;

      while (element.scrollWidth > element.clientWidth && fontSize > 1) {
        fontSize--;
        element.style.fontSize = `${fontSize}px`;
      }
    };

    adjustFontSize();
  }, [value]);

  return (
    <div className="screen">
      <p className="responsive-text" ref={textRef}>
        {value}
      </p>
    </div>
  );
};

export default Screen;
