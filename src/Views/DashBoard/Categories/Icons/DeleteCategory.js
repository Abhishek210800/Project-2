// src/Views/Companies/DeleteCategory.js
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SideNav from "../../Components/SideNav";
import UpperNav from "../../Components/UpperNav";
import Footer from "../../Components/Footer";
import { fetchCategories } from "../../../../Redux/CategoriesSlice";
import axios from "axios";
import "./DeleteCategory.css";

const DeleteCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get categories state from Redux.
  const { data: categories, loading, error } = useSelector(
    (state) => state.categories
  );

  // Local state for delete-specific error messages.
  const [deleteError, setDeleteError] = useState("");

  // Dispatch fetchCategories if not already loaded.
  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  // Find the category with the matching id.
  const category = categories.find(
    (cat) => Number(cat.cat_id) === Number(id)
  );

  const handleDelete = async () => {
    try {
      const response = await axios.post(
        "/api/deletecategory",
        { category_id: id },
        { headers: { "Content-Type": "application/json" } }
      );
      const result = response.data;
      if (
        result.details &&
        Array.isArray(result.details) &&
        Number(result.details[0].status) === 1
      ) {
        alert("Category deleted successfully.");
        navigate("/DashCategories");
      } else {
        setDeleteError("Failed to delete category. Please try again.");
      }
    } catch (err) {
      setDeleteError(
        "Error deleting category: " +
          (err.response?.data?.message || err.message)
      );
    }
  };

  if (loading) {
    return (
      <div className="delcat-app">
        <SideNav />
        <div className="delcat-main-content">
          <UpperNav />
          <div className="delcat-loading-container">
            <p>Loading...</p>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  // If there's an error from Redux or no matching category is found.
  if (error || !category) {
    return (
      <div className="delcat-app">
        <SideNav />
        <div className="delcat-main-content">
          <UpperNav />
          <div className="delcat-error-container">
            <div className="delcat-error-text">
              {error || "Category not found."}
            </div>
            <div className="delcat-button-row">
              <Link to="/DashCategories" className="delcat-back-button">
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
    <div className="delcat-app">
      <SideNav />
      <div className="delcat-main-content">
        <UpperNav />
        <div className="delcat-content-container">
          <div className="delcat-header">
            <h2>Delete Category</h2>
          </div>
          <div className="delcat-container">
            <p>Are you sure you want to delete the following category?</p>
            <div className="delcat-details">
              <div className="delcat-detail-row">
                <span className="delcat-detail-label">Category Name:</span>
                <span className="delcat-detail-value">{category.catName}</span>
              </div>
              <div className="delcat-detail-row">
                <span className="delcat-detail-label">Description:</span>
                <span className="delcat-detail-value">{category.descriptions}</span>
              </div>
            </div>
            {deleteError && (
              <div className="delcat-error-text" style={{ color: "red", margin: "10px 0" }}>
                {deleteError}
              </div>
            )}
            <div className="delcat-button-group">
              <button onClick={handleDelete} className="delcat-confirm-button">
                Yes, Delete
              </button>
              <Link to="/DashCategories" className="delcat-cancel-button">
                Cancel
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default DeleteCategory;
