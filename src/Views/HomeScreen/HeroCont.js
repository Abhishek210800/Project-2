// HeroCont.js
import React from "react";
import { useDirectory } from "./MainDirectory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./Styles/HeroCont.css";

function HeroCont() {
  const { heroSearchTerm, setHeroSearchTerm, directoryData } = useDirectory();

  let directoryShortCode = "ebn"; // default
  if (directoryData && directoryData.directoryDetails && directoryData.directoryDetails.length > 0) {
    directoryShortCode = directoryData.directoryDetails[0].directoryShortCode || directoryShortCode;
  }
  const formattedDirectory = directoryShortCode.charAt(0).toUpperCase() + directoryShortCode.slice(1);

  return (
    <div className="hero-cont-container">
      <div className="hero-cont-row">
        <div className="hero-cont-column">
          <h1>Explore Panalink Infotech Ltd.Directory</h1>
          <h2>Details of all the products and services offered by group members</h2>
          <div className="hero-cont-serchdsgn">
            <input
              type="text"
              className="hero-cont-input"
              value={heroSearchTerm}
              onChange={(e) => setHeroSearchTerm(e.target.value)}
              placeholder="Search for group members..."
            />
            <button type="button" className="hero-cont-btn">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroCont;
