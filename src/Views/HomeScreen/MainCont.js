import React from "react";
import CategoryContainer from "./CategoryCont";
import CompanyContainer from "./CompanyCont";
import "./Styles/MainCont.css";

function MainCont() {
  return (
    <div className="main-cont-container">
      <div className="main-cont-category">
        <CategoryContainer />
      </div>
      <div className="main-cont-company">
        <CompanyContainer />
      </div>
    </div>
  );
}

export default MainCont;
