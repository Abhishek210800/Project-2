import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SideNav from "../Components/SideNav";
import UpperNav from "../Components/UpperNav";
import Footer from "../Components/Footer";
import "./AddCompanies.css";

const AddCompanies = () => {
  const navigate = useNavigate();
  const tenant_id = 2;
  const [form, setForm] = useState({
    communityName: "",
    contactPerson: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    website: "",
    phone: "",
    email: "",
    title: "",
    description: "",
    category: [],
    companyLogo: "",
    companyLogoContents: "",
    companyfacebooklink: "",
    companylinkedinlink: "",
    companyinstagramlink: "",
    companytwitterlink: "",
    companyyoutubelink: "",
    companypinterestlink: ""
  });

  const categories = [
    "AI services",
    "Mobile App Development",
    "Phone and Utility Service",
    "Software Development",
    "Website design and maintenance"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setForm((prev) => {
      const newCategories = checked
        ? [...prev.category, value]
        : prev.category.filter((cat) => cat !== value);
      return { ...prev, category: newCategories };
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({
          ...prev,
          companyLogo: "",
          companyLogoContents: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      tenant_id: tenant_id,
      company_id: "",
      name: form.communityName,
      contactPerson: form.contactPerson,
      briefDescription: form.title,
      description: form.description,
      address:
        form.addressLine1 + (form.addressLine2 ? ", " + form.addressLine2 : ""),
      city: form.city,
      state: form.state,
      country: form.country,
      zipCode: form.zip,
      phone: form.phone,
      email: form.email,
      services: form.category.join(", "),
      website: form.website,
      companyLogo: "",
      companyLogoContents: form.companyLogoContents,
      facebookUrl: form.companyfacebooklink,
      instagramUrl: form.companyinstagramlink,
      twitterUrl: form.companytwitterlink,
      linkedInUrl: form.companylinkedinlink
    };

    try {
      const response = await axios.post("/api/addeditcompany", payload);
      if (
        response.data.details &&
        response.data.details[0] &&
        response.data.details[0].status === 1
      ) {
        alert("Company added successfully.");
        setForm({
          communityName: "",
          contactPerson: "",
          addressLine1: "",
          addressLine2: "",
          city: "",
          state: "",
          zip: "",
          country: "",
          website: "",
          phone: "",
          email: "",
          title: "",
          description: "",
          category: [],
          companyLogo: "",
          companyLogoContents: "",
          companyfacebooklink: "",
          companylinkedinlink: "",
          companyinstagramlink: "",
          companytwitterlink: "",
          companyyoutubelink: "",
          companypinterestlink: ""
        });
        navigate("/Dashcompanies");
      } else {
        alert("Failed to add company. Please try again.");
      }
    } catch (error) {
      console.error("Error adding company:", error.response ? error.response.data : error);
      alert("Error adding company. Please try again.");
    }
  };

  return (
    <div className="ac-appc">
      <SideNav />
      <div className="ac-main-content">
        <UpperNav />
        <h1 className="ac-form-title-top">Add Company</h1>
        <div className="ac-contbox">
          <form onSubmit={handleSubmit}>
            <div className="ac-row">
              <div className="ac-col-md-6">
                <label className="ac-labelStyle">
                  Community Name<span className="ac-asterisk">*</span>
                </label>
                <input type="text" name="communityName" value={form.communityName} onChange={handleChange} required />
              </div>
              <div className="ac-col-md-6">
                <label className="ac-labelStyle">
                  Contact Person<span className="ac-asterisk">*</span>
                </label>
                <input type="text" name="contactPerson" value={form.contactPerson} onChange={handleChange} required/>
              </div>
            </div>
            <div className="ac-row">
              <div className="ac-col-md-6">
                <label className="ac-labelStyle">
                  Address Line 1<span className="ac-asterisk">*</span>
                </label>
                <input type="text" name="addressLine1" value={form.addressLine1} onChange={handleChange} required />
              </div>
              <div className="ac-col-md-6">
                <label className="ac-labelStyle">Address Line 2</label>
                <input type="text" name="addressLine2" value={form.addressLine2} onChange={handleChange} />
              </div>
            </div>
            <div className="ac-row ac-row-small">
              <div className="ac-col-md-4">
                <label className="ac-labelStyle">
                  City<span className="ac-asterisk">*</span>
                </label>
                <input type="text" name="city" value={form.city} onChange={handleChange} required />
              </div>
              <div className="ac-col-md-4">
                <label className="ac-labelStyle">
                  State<span className="ac-asterisk">*</span>
                </label>
                <input type="text" name="state" value={form.state} onChange={handleChange} required />
              </div>
              <div className="ac-col-md-4 ac-zip">
                <label className="ac-labelStyle">
                  ZIP<span className="ac-asterisk">*</span>
                </label>
                <input type="text" name="zip" value={form.zip} onChange={handleChange} required />
              </div>
            </div>
            <div className="ac-row">
              <div className="ac-col-md-6">
                <label className="ac-labelStyle">Country</label>
                <input type="text" name="country" value={form.country} onChange={handleChange} />
              </div>
              <div className="ac-col-md-6">
                <label className="ac-labelStyle">
                  Website<span className="ac-asterisk">*</span>
                </label>
                <input type="text" name="website" value={form.website} onChange={handleChange} required />
              </div>
            </div>
            <div className="ac-row">
              <div className="ac-col-md-6">
                <label className="ac-labelStyle">
                  Phone<span className="ac-asterisk">*</span>
                </label>
                <input type="text" name="phone" value={form.phone} onChange={handleChange} required />
              </div>
              <div className="ac-col-md-6">
                <label className="ac-labelStyle">
                  Email<span className="ac-asterisk">*</span>
                </label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required />
              </div>
            </div>
            <div className="ac-row">
              <div className="ac-col-md-12">
                <label className="ac-labelStyle">
                  Title<span className="ac-asterisk">*</span>
                </label>
                <input type="text" name="title" value={form.title} onChange={handleChange} required />
              </div>
            </div>
            <div className="ac-row">
              <div className="ac-col-md-12">
                <label className="ac-labelStyle">
                  Company Description<span className="ac-asterisk">*</span>
                </label>
                <textarea name="description" value={form.description} onChange={handleChange} required></textarea>
              </div>
            </div>
            <div className="ac-row">
              <div className="ac-col-md-12">
                <label className="ac-labelStyle">
                  Select Category<span className="ac-asterisk">*</span>
                </label>
                <div className="ac-checkrk">
                  <div className="ac-cat-row">
                    {categories.slice(0, 3).map((cat, index) => (
                      <label className="ac-contnr" key={index}>
                        {cat}
                        <input type="checkbox" value={cat} onChange={handleCheckboxChange} checked={form.category.includes(cat)} />
                        <span className="ac-checkmk"></span>
                      </label>
                    ))}
                  </div>
                  <div className="ac-cat-row">
                    {categories.slice(3).map((cat, index) => (
                      <label className="ac-contnr" key={index}>
                        {cat}
                        <input type="checkbox" value={cat} onChange={handleCheckboxChange} checked={form.category.includes(cat)} />
                        <span className="ac-checkmk"></span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="ac-row">
              <div className="ac-col-md-12">
                <label className="ac-labelStyle">
                  Add Company Logo<span className="ac-asterisk">*</span>
                </label>
                <input type="file" className="form-control nopadfile" id="formFileReadonly" onChange={handleFileChange} required />
              </div>
            </div>
            <div className="ac-row">
              <div className="ac-col-md-6">
                <label className="ac-labelStyle">Company Facebook Link</label>
                <input type="text" name="companyfacebooklink" value={form.companyfacebooklink} onChange={handleChange} />
              </div>
              <div className="ac-col-md-6">
                <label className="ac-labelStyle">Company LinkedIn Link</label>
                <input type="text" name="companylinkedinlink" value={form.companylinkedinlink} onChange={handleChange} />
              </div>
            </div>
            <div className="ac-row">
              <div className="ac-col-md-6">
                <label className="ac-labelStyle">Company Instagram Link</label>
                <input type="text" name="companyinstagramlink" value={form.companyinstagramlink} onChange={handleChange} />
              </div>
              <div className="ac-col-md-6">
                <label className="ac-labelStyle">Company Twitter Link</label>
                <input type="text" name="companytwitterlink" value={form.companytwitterlink} onChange={handleChange} />
              </div>
            </div>
            <div className="ac-row">
              <div className="ac-col-md-12 ac-btn-row">
                <button className="ac-sbmt" type="submit">Add Company</button>
                <button type="button" className="ac-unique-back-btn" onClick={() => navigate("/DashCompanies")}>Back</button>
              </div>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AddCompanies;
