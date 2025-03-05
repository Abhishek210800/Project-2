// src/Views/Companies/EditCompany.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SideNav from "../../Components/SideNav";
import UpperNav from "../../Components/UpperNav";
import Footer from "../../Components/Footer";
import { fetchCompanies } from "../../../../Redux/CompaniesSlice";
import axios from "axios";
import "./EditCompany.css";

const EditCompany = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const tenant_id = 2;
  const dispatch = useDispatch();

  const { data: companies, loading, error } = useSelector(
    (state) => state.companies
  );

  const [originalEmail, setOriginalEmail] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    contactPerson: "",
    briefDescription: "",
    description: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    phone: "",
    email: "",
    services: "",
    website: "",
    companyLogo: "",
    companyLogoContents: "",
    facebookUrl: "",
    instagramUrl: "",
    twitterUrl: "",
    linkedInUrl: ""
  });

  // Fetch companies via Redux if not already loaded.
  useEffect(() => {
    if (companies.length === 0) {
      dispatch(fetchCompanies());
    }
  }, [dispatch, companies.length]);

  // Once companies data is available, find the company to edit.
  useEffect(() => {
    if (!loading && companies.length > 0) {
      const company = companies.find(
        (item) => String(item.company_id) === String(id)
      );
      if (company) {
        setFormData({
          name: company.name || "",
          contactPerson: company.contactPerson || "",
          briefDescription: company.briefDescription || "",
          description: company.description || "",
          address: company.address || "",
          city: company.city || "",
          state: company.state || "",
          country: company.country || "",
          zipCode: company.zipCode || "",
          phone: company.phone || "",
          email: company.email || "",
          services: company.services || "",
          website: company.website || "",
          companyLogo: company.companyLogo || "",
          companyLogoContents: company.companyLogoContents || "",
          facebookUrl: company.facebookUrl || "",
          instagramUrl: company.instagramUrl || "",
          twitterUrl: company.twitterUrl || "",
          linkedInUrl: company.linkedInUrl || ""
        });
        setOriginalEmail(company.email || "");
      }
    }
  }, [loading, companies, id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          companyLogoContents: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let payload = { tenant_id, company_id: id, ...formData };
      // To force update if email hasn't changed.
      if (formData.email === originalEmail) {
        payload.email = originalEmail + "\u200B";
      }
      const response = await axios.post("/api/addeditcompany", payload, {
        headers: { "Content-Type": "application/json" }
      });
      const result = response.data;
      if (
        result.details &&
        Array.isArray(result.details) &&
        Number(result.details[0].status) === 1
      ) {
        alert("Company updated successfully.");
        navigate("/DashCompanies");
      } else {
        alert("Update failed. Please try again.");
      }
    } catch (error) {
      console.error(
        "Error updating company:",
        error.response ? error.response.data : error
      );
      alert("Error updating company. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="dc-appk">
        <SideNav />
        <div className="dc-main-content">
          <UpperNav />
          <div className="dc-loading-container">Loading...</div>
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
        <div className="dc-edit-company-header">
          <h2>Edit Company Details</h2>
        </div>
        <div className="dc-edit-company-container">
          <form onSubmit={handleSubmit}>
            <div className="dc-form-row">
              <div className="dc-form-group">
                <label htmlFor="name">Company Name*</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="dc-form-group">
                <label htmlFor="contactPerson">Contact Person*</label>
                <input
                  id="contactPerson"
                  name="contactPerson"
                  type="text"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="dc-form-row">
              <div className="dc-form-group">
                <label htmlFor="briefDescription">Brief Description</label>
                <input
                  id="briefDescription"
                  name="briefDescription"
                  type="text"
                  value={formData.briefDescription}
                  onChange={handleChange}
                />
              </div>
              <div className="dc-form-group">
                <label htmlFor="description">Full Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
            <div className="dc-form-row">
              <div className="dc-form-group">
                <label htmlFor="address">Address</label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div className="dc-form-group">
                <label htmlFor="city">City*</label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="dc-form-group">
                <label htmlFor="state">State*</label>
                <input
                  id="state"
                  name="state"
                  type="text"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="dc-form-row">
              <div className="dc-form-group">
                <label htmlFor="country">Country</label>
                <input
                  id="country"
                  name="country"
                  type="text"
                  value={formData.country}
                  onChange={handleChange}
                />
              </div>
              <div className="dc-form-group">
                <label htmlFor="zipCode">Zip Code</label>
                <input
                  id="zipCode"
                  name="zipCode"
                  type="text"
                  value={formData.zipCode}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="dc-form-row">
              <div className="dc-form-group">
                <label htmlFor="phone">Phone*</label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="dc-form-group">
                <label htmlFor="email">Email*</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="dc-form-row">
              <div className="dc-form-group">
                <label htmlFor="services">Services</label>
                <input
                  id="services"
                  name="services"
                  type="text"
                  value={formData.services}
                  onChange={handleChange}
                />
              </div>
              <div className="dc-form-group">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  value={formData.website}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="dc-form-row">
              <div className="dc-form-group">
                <label>
                  Add Company Logo<span className="text-black-500">*</span>
                </label>
                <input
                  className="form-control nopadfile"
                  type="file"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div className="dc-form-row">
              <div className="dc-form-group">
                <label htmlFor="facebookUrl">Facebook URL</label>
                <input
                  id="facebookUrl"
                  name="facebookUrl"
                  type="text"
                  value={formData.facebookUrl}
                  onChange={handleChange}
                />
              </div>
              <div className="dc-form-group">
                <label htmlFor="instagramUrl">Instagram URL</label>
                <input
                  id="instagramUrl"
                  name="instagramUrl"
                  type="text"
                  value={formData.instagramUrl}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="dc-form-row">
              <div className="dc-form-group">
                <label htmlFor="twitterUrl">Twitter URL</label>
                <input
                  id="twitterUrl"
                  name="twitterUrl"
                  type="text"
                  value={formData.twitterUrl}
                  onChange={handleChange}
                />
              </div>
              <div className="dc-form-group">
                <label htmlFor="linkedInUrl">LinkedIn URL</label>
                <input
                  id="linkedInUrl"
                  name="linkedInUrl"
                  type="text"
                  value={formData.linkedInUrl}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="dc-button-row">
              <button type="submit" className="dc-edit-button">
                Edit Company
              </button>
              <Link to="/DashCompanies" className="dc-back-button">
                Back
              </Link>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default EditCompany;
