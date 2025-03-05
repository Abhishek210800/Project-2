// src/Views/Companies/EditCategory.js
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SideNav from "../../Components/SideNav";
import UpperNav from "../../Components/UpperNav";
import Footer from "../../Components/Footer";
import { fetchCategories } from "../../../../Redux/CategoriesSlice";
import axios from "axios";
import "./EditCategory.css";

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state for categories
  const { data: categories, loading, error } = useSelector(
    (state) => state.categories
  );

  // Local state for form fields and errors
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [localError, setLocalError] = useState("");

  // Fetch categories if not already loaded
  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  // Once categories are loaded, find the category to edit and populate fields
  useEffect(() => {
    if (!loading && categories.length > 0) {
      const foundCategory = categories.find(
        (cat) => Number(cat.cat_id) === Number(id)
      );
      if (foundCategory) {
        setName(foundCategory.catName || "");
        setDescription(foundCategory.descriptions || "");
      } else {
        setLocalError("Category not found.");
      }
    }
  }, [loading, categories, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const tenantId = localStorage.getItem("tenant_id") || "1";
    const payload = {
      tenant_id: tenantId,
      category_id: id,
      catName: name,
      descriptions: description,
    };
    axios
      .post("/api/addeditcategory", payload, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        if (
          response.data &&
          response.data.details &&
          Array.isArray(response.data.details) &&
          response.data.details[0].mes &&
          response.data.details[0].mes
            .toLowerCase()
            .includes("edited successfully")
        ) {
          alert("Category is edited successfully.");
          setLocalError("");
          navigate("/DashCategories");
        } else {
          setLocalError("Failed to update category. Please try again.");
        }
      })
      .catch((err) => {
        setLocalError(
          "Error updating category: " +
            (err.response?.data?.message || err.message)
        );
      });
  };

  if (loading) {
    return (
      <div className="appy">
        <SideNav />
        <div className="main-content">
          <UpperNav />
          <div className="loading-container">
            <p>Loading...</p>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  // If there's an error and the name is not set (i.e. category not loaded)
  if ((error || localError) && !name) {
    return (
      <div className="appy">
        <SideNav />
        <div className="main-content">
          <UpperNav />
          <div className="error-container">
            <div style={{ padding: "20px", color: "red" }}>
              {error || localError}
            </div>
            <div className="button-row error-row">
              <Link to="/DashCategories" className="back-button">
                Back
              </Link>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="appy">
      <SideNav />
      <div className="main-content">
        <UpperNav />
        <div className="view-category-header">
          <h3>Edit Category</h3>
        </div>
        {localError && (
          <div style={{ padding: "10px", color: "orange" }}>{localError}</div>
        )}
        <div className="view-category-container">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="categoryName">
                  Category Name<span className="ac-text-black-500">*</span>
                </label>
                <input
                  id="categoryName"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="categoryDescription">Descriptions</label>
                <input
                  id="categoryDescription"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="button-row">
              <button type="submit" className="edit-button">
                Edit Category
              </button>
              <Link to="/DashCategories" className="back-button">
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

export default EditCategory;
