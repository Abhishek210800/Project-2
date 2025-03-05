import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SideNav from "../Components/SideNav";
import UpperNav from "../Components/UpperNav";
import Footer from "../Components/Footer";
import "./AddCategories.css";

const AddCategories = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    categoryName: "",
    description: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      tenant_id: 1,
      category_id: "",
      catName: form.categoryName,
      descriptions: form.description
    };
    console.log("Submitting payload:", payload);
    try {
      const response = await axios.post("/api/addeditcategory", payload, {
        headers: { "Content-Type": "application/json" }
      });
      console.log("Response from API:", response.data);
      if (
        response.data &&
        response.data.details &&
        Array.isArray(response.data.details) &&
        response.data.details[0].status === 1
      ) {
        alert("Category added successfully.");
        setForm({ categoryName: "", description: "" });
        navigate("/Dashcategories");
      } else {
        console.error("Failed to add category, response data:", response.data);
        alert("Failed to add category. Please try again.");
      }
    } catch (error) {
      console.error(
        "Error adding category:",
        error.response ? error.response.data : error.message
      );
      alert("Error adding category. Please try again.");
    }
  };

  return (
    <div className="ac-appc">
      <SideNav />
      <div className="ac-main-content">
        <UpperNav />
        <h3 className="ac-form-title">Add Category</h3>

        <div className="ac-contbox">
          <form onSubmit={handleSubmit}>
            <div className="ac-row">
              <div className="ac-col-md-6">
                <label className="ac-labelStyle">
                  Category Name <span className="ac-text-black-500">*</span>
                </label>
                <input
                  type="text"
                  name="categoryName"
                  value={form.categoryName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="ac-col-md-6">
                <label className="ac-labelStyle">
                  Description <span className="ac-text-black-500">*</span>
                </label>
                <input
                  type="text"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="ac-col-md-12 ac-btn-row">
                <button className="ac-sbmt" type="submit">
                  Add Category
                </button>
                <button
                  type="button"
                  className="ac-back-btn"
                  onClick={() => navigate("/DashCategories")}
                >
                  Back
                </button>
              </div>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AddCategories;
