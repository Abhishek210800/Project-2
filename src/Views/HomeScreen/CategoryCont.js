import React from "react";
import { useDirectory } from "./MainDirectory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./Styles/CategoryCont.css";

function CategoryCont() {
  const {
    directoryData,
    categorySearchTerm,
    setCategorySearchTerm,
    selectedCategories,
    setSelectedCategories,
  } = useDirectory();

  // Ensure categories is always an array
  const categories = (directoryData && directoryData.directoryCategories) || [];

  const filteredCategories = categories.filter((category) =>
    category.catName.toLowerCase().includes(categorySearchTerm.toLowerCase())
  );

  const getCategoryCount = (categoryName) => {
    const companies = (directoryData && directoryData.directoryCompanies) || [];
    const count = companies.filter((item) =>
      item.services.includes(categoryName)
    ).length;
    return count;
  };

  const handleCheckboxChange = (categoryName) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryName)) {
        return prev.filter((cat) => cat !== categoryName);
      } else {
        return [...prev, categoryName];
      }
    });
  };

  return (
    <div className="category-cont-container">
      <div className="category-cont-fltrlbox">
        <h4 className="category-cont-header">By category:</h4>
        <div className="category-cont-shrbg">
          <FontAwesomeIcon icon={faSearch} className="category-cont-search-icon" />
          <input
            type="text"
            className="category-cont-snglbox"
            placeholder="Search categories..."
            value={categorySearchTerm}
            onChange={(e) => setCategorySearchTerm(e.target.value)}
          />
        </div>
        <div className="category-cont-bxdscrl">
          {filteredCategories.map((category, index) => (
            <label className="category-cont-contnr" key={index}>
              {category.catName}
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.catName)}
                onChange={() => handleCheckboxChange(category.catName)}
              />
              <span className="category-cont-checkmk"></span>
              <strong className="category-cont-postl">
                ({getCategoryCount(category.catName)})
              </strong>
            </label>
          ))}
        </div>
        <span className="category-cont-smlhdr">
          Showing {filteredCategories.length} Categories
        </span>
      </div>
    </div>
  );
}

export default CategoryCont;
