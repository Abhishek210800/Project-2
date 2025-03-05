// src/Views/Companies/DeleteCompany.js
import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SideNav from "../../Components/SideNav";
import UpperNav from "../../Components/UpperNav";
import Footer from "../../Components/Footer";
import { fetchCompanies } from "../../../../Redux/CompaniesSlice";
import axios from "axios";
import "./DeleteCompany.css";

const DeleteCompany = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // const tenant_id = 2;
  const dispatch = useDispatch();

  // Get companies data from Redux store.
  const { data: companies, loading, error } = useSelector(
    (state) => state.companies
  );

  // Dispatch fetchCompanies if companies list is empty.
  useEffect(() => {
    if (companies.length === 0) {
      dispatch(fetchCompanies());
    }
  }, [dispatch, companies.length]);

  // Find the company matching the given id.
  const company = companies.find(
    (item) => parseInt(item.company_id, 10) === parseInt(id, 10)
  );

  const handleDelete = async () => {
    try {
      const response = await axios.post("/api/deletecompany", {
        company_id: parseInt(id, 10),
      });
      const result = response.data;
      if (
        result.details &&
        result.details[0] &&
        result.details[0].status === 1
      ) {
        alert("Company deleted successfully.");
        navigate("/DashCompanies");
      } else {
        alert("Failed to delete company. Please try again.");
      }
    } catch (error) {
      console.error(
        "Error deleting company:",
        error.response ? error.response.data : error
      );
      alert("Error deleting company. Please try again.");
    }
  };

  return (
    <div className="dc-appk">
      <SideNav />
      <div className="dc-main-content">
        <UpperNav />
        <h2 className="dc-page-title">Delete Company</h2>
        {loading ? (
          <div className="dc-loading-wrapper">
            <div className="dc-loading-container">
              <div className="loading-spinner"></div>
              <p className="loading-text">Loading...</p>
            </div>
          </div>
        ) : error ? (
          <div style={{ padding: "10px", color: "red" }}>{error}</div>
        ) : (
          <div className="dc-delete-company-container">
            {company ? (
              <>
                <p>Are you sure you want to delete the following company?</p>
                <div className="dc-company-details">
                  <div className="dc-detail-row">
                    <span className="dc-detail-label">Company Name:</span>
                    <span className="dc-detail-value">{company.name}</span>
                  </div>
                  <div className="dc-detail-row">
                    <span className="dc-detail-label">Email:</span>
                    <span className="dc-detail-value">{company.email}</span>
                  </div>
                  <div className="dc-detail-row">
                    <span className="dc-detail-label">Phone:</span>
                    <span className="dc-detail-value">{company.phone}</span>
                  </div>
                  <div className="dc-detail-row">
                    <span className="dc-detail-label">Website:</span>
                    <span className="dc-detail-value">{company.website}</span>
                  </div>
                </div>
                <div className="dc-button-group">
                  <button onClick={handleDelete} className="dc-confirm-button">
                    Yes, Delete
                  </button>
                  <Link to="/DashCompanies" className="dc-cancel-button">
                    Cancel
                  </Link>
                </div>
              </>
            ) : (
              <div className="dc-notfound">Company not found.</div>
            )}
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
};

export default DeleteCompany;
