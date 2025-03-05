import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import SideNav from "../Components/SideNav";
import UpperNav from "../Components/UpperNav";
import Footer from "../Components/Footer";
import { fetchCompanies } from "../../../Redux/CompaniesSlice.js";
import "./DashCompanies.css";

const DashCompanies = () => {
  const dispatch = useDispatch();
  const { data: companies, loading, error } = useSelector(
    (state) => state.companies
  );

  const [showEntries, setShowEntries] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (companies.length === 0) {
      dispatch(fetchCompanies());
    }
  }, [dispatch, companies.length]);

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredCompanies.length / showEntries);
  const startIndex = (currentPage - 1) * showEntries;
  const endIndex = startIndex + showEntries;
  const displayedCompanies = filteredCompanies.slice(startIndex, endIndex);

  const handleShowEntries = (event) => {
    setShowEntries(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="dc-appk">
      <SideNav />
      <div className="dc-main-content">
        <UpperNav />
        <div className="dc-companies-header">
          <h3 className="dc-companies-text-header">
            Tenant &rarr; Companies
          </h3>
          <Link to="/AddCompany" className="dc-add-new-button">
            + Add New
          </Link>
        </div>
        <div className="dc-add-companies-container">
          <div className="dc-add-companies-header">
            <div className="dc-search-and-entries">
              <div className="dc-show-entries">
                <label htmlFor="dc-show-entries">Show</label>
                <select
                  id="dc-show-entries"
                  value={showEntries}
                  onChange={handleShowEntries}
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                <span>entries</span>
              </div>
              <div className="dc-search">
                <label htmlFor="dc-search-input">Search:</label>
                <input
                  id="dc-search-input"
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
          </div>
          <div className="dc-table-responsive">
            <table className="dc-add-companies-table">
              <thead>
                <tr className="dc-table-header-row">
                  <th className="dc-column-logo">Logo</th>
                  <th className="dc-column-details">Company Details</th>
                  <th className="dc-column-contact">Contact Person</th>
                  <th className="dc-column-services">Services</th>
                  <th className="dc-column-actions">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="loading-cell">
                      Loading...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="5" className="loading-cell">
                      Error loading companies.
                    </td>
                  </tr>
                ) : displayedCompanies.length > 0 ? (
                  displayedCompanies.map((company) => (
                    <tr key={company.company_id}>
                      <td className="dc-column-logo" data-label="Logo">
                        {company.companyLogo ? (
                          <img
                            src={`https://app.aktivedirectory.com/assets/images/${company.companyLogo}`}
                            alt={company.name}
                            className="imgbox"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://app.aktivedirectory.com/assets/images/default-logo.png";
                              e.target.style.objectFit = "scale-down";
                            }}
                          />
                        ) : (
                          <img
                            src="assets/images/panalink.jpg"
                            alt="Default Logo"
                            className="imgbox"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://app.aktivedirectory.com/assets/images/default-logo.png";
                              e.target.style.objectFit = "scale-down";
                            }}
                          />
                        )}
                      </td>
                      <td className="dc-column-details" data-label="Company Details">
                        <h3 className="dc-company-name">{company.name}</h3>
                        <div className="dc-company-info">
                          <p className="dc-company-email">{company.email}</p>
                          <p className="dc-company-phone">{company.phone}</p>
                          <p className="dc-company-website">{company.website}</p>
                        </div>
                      </td>
                      <td className="dc-column-contact" data-label="Contact Person">
                        <div className="dc-contact-info-wrapper">
                          <p className="dc-contact-person">{company.contactPerson}</p>
                          <p className="dc-designation">
                            {company.designation || "President"}
                          </p>
                        </div>
                      </td>
                      <td className="dc-column-services" data-label="Services">
                        <p className="dc-services">{company.services}</p>
                      </td>
                      <td className="dc-column-actions" data-label="Action">
                        <div className="dc-action-icons">
                          <Link to={`/edit-company/${company.company_id}`}>
                            <button className="dc-edit-icon" title="Edit">
                              <i className="fa fa-pencil"></i>
                            </button>
                          </Link>
                          <Link to={`/view-company/${company.company_id}`}>
                            <button className="dc-view-icon" title="View">
                              <i className="fa fa-eye"></i>
                            </button>
                          </Link>
                          <Link to={`/delete-company/${company.company_id}`}>
                            <button className="dc-delete-icon" title="Delete">
                              <i className="fa fa-trash"></i>
                            </button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="no-data-cell">
                      No companies found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="dc-pagination-container">
            <button
              className="dc-pagination-button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`dc-pagination-button ${
                  currentPage === index + 1 ? "dc-active" : ""
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="dc-pagination-button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default DashCompanies;
