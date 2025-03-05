import React, { useState } from "react";
import { useDirectory } from "./MainDirectory";
import { Link } from "react-router-dom";
import { ThumbsUp } from "lucide-react";
import "./Styles/CompanyCont.css";

function CompanyCont() {
  const {
    directoryData,
    searchTerm,
    categorySearchTerm,
    selectedCategories,
    heroSearchTerm,
  } = useDirectory();
  const companies = directoryData?.directoryCompanies || [];

  const [visibleCompanies, setVisibleCompanies] = useState(4);
  const [likedCompanies, setLikedCompanies] = useState({});
  const [sortType, setSortType] = useState("name-asc");

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      searchTerm === "" ||
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (company.briefDescription &&
        company.briefDescription
          .toLowerCase()
          .includes(searchTerm.toLowerCase()));
    const matchesCategory =
      categorySearchTerm === "" ||
      company.services.toLowerCase().includes(categorySearchTerm.toLowerCase());
    const matchesHeroSearch =
      heroSearchTerm === "" ||
      company.name.toLowerCase().includes(heroSearchTerm.toLowerCase()) ||
      company.services.toLowerCase().includes(heroSearchTerm.toLowerCase()) ||
      (company.briefDescription &&
        company.briefDescription
          .toLowerCase()
          .includes(heroSearchTerm.toLowerCase()));
    const serviceList = (company.services || "")
      .split(",")
      .map((s) => s.trim().toLowerCase());
    const matchesSelectedCategories =
      selectedCategories.length === 0 ||
      selectedCategories.some((category) =>
        serviceList.includes(category.toLowerCase())
      );
    return (
      matchesSearch &&
      matchesCategory &&
      matchesSelectedCategories &&
      matchesHeroSearch
    );
  });

  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    switch (sortType) {
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "newest":
        return new Date(b.created_at) - new Date(a.created_at);
      case "popular":
        const likesA = likedCompanies[a.company_id]?.count || 2;
        const likesB = likedCompanies[b.company_id]?.count || 2;
        return likesB - likesA;
      default:
        return 0;
    }
  });

  const handleLoadMore = () => {
    setVisibleCompanies((prev) => Math.min(prev + 4, sortedCompanies.length));
  };

  const visibleFilteredCompanies = sortedCompanies.slice(0, visibleCompanies);

  return (
    <div className="company-cont-container">
      <div className="company-cont-filter-bar">
        <div className="company-cont-filter-bar-content">
          <div className="company-cont-info-text">
            Showing ({visibleFilteredCompanies.length})
          </div>
          <div className="company-cont-dropdown dropdown">
            <button
              className="btn dropdown-toggle company-cont-sort-btn"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {sortType === "name-asc"
                ? " A-Z"
                : sortType === "name-desc"
                ? " Z-A"
                : sortType === "newest"
                ? "Newest"
                : "Popular"}
            </button>
            <ul className="dropdown-menu">
              <li>
                <span
                  className="dropdown-item"
                  onClick={() => setSortType("popular")}
                >
                  Popular
                </span>
              </li>
              <li>
                <span
                  className="dropdown-item"
                  onClick={() => setSortType("newest")}
                >
                  Newest
                </span>
              </li>
              <li>
                <span
                  className="dropdown-item"
                  onClick={() => setSortType("name-asc")}
                >
                  A-Z
                </span>
              </li>
              <li>
                <span
                  className="dropdown-item"
                  onClick={() => setSortType("name-desc")}
                >
                  Z-A
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="company-cont-companies">
        {visibleFilteredCompanies.map((company, index) => {
          const servicesArray = (company.services || "")
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s !== "");
          return (
            <div className="company-cont-company-card" key={index}>
              <Link
                to={`/company/${
                  company.directoryShortCode || company.company_id
                }`}
                className="company-cont-link"
              >
                <div className="company-card-inner">
                  <div className="company-card-main">
                    <div className="company-card-logo">
                      <img
                        src={company.companyLogoURL + company.companyLogo}
                        alt={company.name}
                        className="company-card-logo-img"
                      />
                    </div>
                    <div className="company-card-info">
                      <h4>{company.name}</h4>
                      <p>
                        {company.briefDescription
                          ? company.briefDescription.length > 30
                            ? `${company.briefDescription.substring(0, 30)}...`
                            : company.briefDescription
                          : "Description"}
                      </p>
                      <div className="company-card-services-row">
                        <ul className="rolnum">
                          {servicesArray.length > 0 && (
                            <li>{servicesArray[0]}</li>
                          )}
                          {servicesArray.length > 1 && (
                            <li>+{servicesArray.length - 1} more</li>
                          )}
                        </ul>

                        <div
                          className={`company-card-like-button ${
                            likedCompanies[company.company_id]?.isAnimating
                              ? "scale-125 transition-transform"
                              : ""
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            setLikedCompanies((prev) => ({
                              ...prev,
                              [company.company_id]: {
                                count:
                                  (prev[company.company_id]?.count || 2) + 1,
                                isAnimating: true,
                              },
                            }));
                            setTimeout(() => {
                              setLikedCompanies((prev) => ({
                                ...prev,
                                [company.company_id]: {
                                  ...prev[company.company_id],
                                  isAnimating: false,
                                },
                              }));
                            }, 300);
                          }}
                        >
                          <ThumbsUp
                            size={16}
                            className={`inline ${
                              likedCompanies[company.company_id]?.count
                                ? "fill-yellow-500 text-yellow-500"
                                : "text-yellow-500"
                            }`}
                          />
                          <span className="company-cont-like-count">
                            {likedCompanies[company.company_id]?.count || 2}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {new Date(company.created_at) >=
                    new Date(new Date().setDate(new Date().getDate() - 7)) && (
                    <div className="company-cont-new-badge">NEW</div>
                  )}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      {visibleCompanies < sortedCompanies.length && (
        <div className="company-cont-load-more">
          <Link onClick={handleLoadMore} className="company-cont-load-more-btn">
            Load More
          </Link>
        </div>
      )}
    </div>
  );
}

export default CompanyCont;
