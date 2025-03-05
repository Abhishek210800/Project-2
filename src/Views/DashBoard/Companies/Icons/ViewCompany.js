// src/Views/Companies/ViewCompany.js
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SideNav from "../../Components/SideNav";
import UpperNav from "../../Components/UpperNav";
import Footer from "../../Components/Footer";
import { fetchCompanies } from "../../../../Redux/CompaniesSlice";
import "./ViewCompany.css";

const ViewCompany = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: companies, loading, error } = useSelector(
    (state) => state.companies
  );

  // Dispatch the fetchCompanies thunk if companies haven't been loaded yet.
  useEffect(() => {
    if (companies.length === 0) {
      dispatch(fetchCompanies());
    }
  }, [dispatch, companies.length]);

  // Find the company by id
  let company = companies.find(
    (comp) => Number(comp.company_id) === Number(id)
  );
  let localError = "";
  if (!company && companies.length > 0) {
    company = companies[0];
    localError = `Company with id ${id} not found. Defaulted to company id ${company.company_id}.`;
  }

  if (loading) {
    return (
      <div className="dc-appk">
        <SideNav />
        <div className="dc-main-content">
          <UpperNav />
          <div className="dc-loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Loading...</p>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dc-appk">
        <SideNav />
        <div className="dc-main-content">
          <UpperNav />
          <div style={{ padding: "10px", color: "red" }}>{error}</div>
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="dc-appk">
      <SideNav />
      <div className="dc-main-content">
        <UpperNav />
        <div className="dc-view-company-header">
          <h2>View Company Details</h2>
        </div>
        {localError && (
          <div style={{ padding: "10px", color: "orange" }}>{localError}</div>
        )}
        <div className="dc-view-company-container">
          <div className="dc-company-grid">
            <div className="dc-form-group">
              <label>Company Logo</label>
              <div className="dc-logo-container">
                {company.companyLogo && company.companyLogo !== "nologo.jpg" ? (
                  <img
                    src={`https://app.aktivedirectory.com/assets/images/${company.companyLogo}`}
                    alt="Company Logo"
                    className="dc-company-logo"
                  />
                ) : (
                  "No Logo Available"
                )}
              </div>
            </div>
            <div className="dc-form-group">
              <label>Company Name</label>
              <div className="dc-display-field">{company.name || "N/A"}</div>
            </div>
            <div className="dc-form-group">
              <label>Email</label>
              <div className="dc-display-field">{company.email || "N/A"}</div>
            </div>
            <div className="dc-form-group">
              <label>Phone</label>
              <div className="dc-display-field">{company.phone || "N/A"}</div>
            </div>
            <div className="dc-form-group">
              <label>Website</label>
              <div className="dc-display-field">
                {company.website ? (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {company.website}
                  </a>
                ) : (
                  "N/A"
                )}
              </div>
            </div>
            <div className="dc-form-group">
              <label>Contact Person</label>
              <div className="dc-display-field">
                {company.contactPerson || "N/A"}
              </div>
            </div>
            <div className="dc-form-group">
              <label>Brief Description</label>
              <div className="dc-display-field">
                {company.briefDescription || "N/A"}
              </div>
            </div>
            <div className="dc-form-group">
              <label>Description</label>
              <div className="dc-display-field">
                {company.description || "N/A"}
              </div>
            </div>
            <div className="dc-form-group">
              <label>Address</label>
              <div className="dc-display-field">
                {company.address || "N/A"}
              </div>
            </div>
            <div className="dc-form-group">
              <label>City</label>
              <div className="dc-display-field">{company.city || "N/A"}</div>
            </div>
            <div className="dc-form-group">
              <label>State</label>
              <div className="dc-display-field">{company.state || "N/A"}</div>
            </div>
            <div className="dc-form-group">
              <label>Country</label>
              <div className="dc-display-field">
                {company.country || "N/A"}
              </div>
            </div>
            <div className="dc-form-group">
              <label>Services</label>
              <div className="dc-display-field">
                {company.services || "N/A"}
              </div>
            </div>
            <div className="dc-form-group">
              <label>Facebook URL</label>
              <div className="dc-display-field">
                {company.facebookUrl ? (
                  <a
                    href={company.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {company.facebookUrl}
                  </a>
                ) : (
                  "N/A"
                )}
              </div>
            </div>
            <div className="dc-form-group">
              <label>Instagram URL</label>
              <div className="dc-display-field">
                {company.instagramUrl ? (
                  <a
                    href={company.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {company.instagramUrl}
                  </a>
                ) : (
                  "N/A"
                )}
              </div>
            </div>
            <div className="dc-form-group">
              <label>Twitter URL</label>
              <div className="dc-display-field">
                {company.twitterUrl ? (
                  <a
                    href={company.twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {company.twitterUrl}
                  </a>
                ) : (
                  "N/A"
                )}
              </div>
            </div>
            <div className="dc-form-group">
              <label>LinkedIn URL</label>
              <div className="dc-display-field">
                {company.linkedInUrl ? (
                  <a
                    href={company.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {company.linkedInUrl}
                  </a>
                ) : (
                  "N/A"
                )}
              </div>
            </div>
          </div>
          <div className="dc-button-row">
            <Link to="/DashCompanies" className="dc-back-button">
              Back
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ViewCompany;
