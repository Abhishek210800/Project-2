import React from "react";
import icon from "./Images/icon.png";
import "./Styles/StickyNav.css";

function StickyNav() {
  return (
    <nav className="sticky-nav">
      <div className="sticky-nav-container">
        <a
          className="sticky-nav-brand"
          href="/"
        >
          <img className="sticky-nav-logo" src={icon} alt="logo" />
          <span>Community Directory</span>
        </a>
      </div>
    </nav>
  );
}

export default StickyNav;
