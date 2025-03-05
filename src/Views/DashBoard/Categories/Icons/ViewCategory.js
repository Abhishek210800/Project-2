// src/Views/Companies/ViewCategory.js
import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SideNav from "../../Components/SideNav";
import UpperNav from "../../Components/UpperNav";
import Footer from "../../Components/Footer";
import { fetchCategories } from "../../../../Redux/CategoriesSlice";
import "./ViewCategory.css";

const ViewCategory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  // Retrieve categories state from Redux
  const { data: categories, loading, error } = useSelector(
    (state) => state.categories
  );

  // Dispatch fetchCategories if the list is empty.
  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  // Find the category with the matching id
  const category = categories.find(
    (cat) => Number(cat.cat_id) === Number(id)
  );

  if (loading) {
    return (
      <div className="appy">
        <SideNav />
        <div className="main-content">
          <UpperNav />
          <div className="loading-container">
            <div style={{ padding: "20px" }}>Loading...</div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="appy">
        <SideNav />
        <div className="main-content">
          <UpperNav />
          <div className="error-container">
            <div style={{ padding: "20px", color: "red" }}>{error}</div>
            <div className="button-row">
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

  if (!category) {
    return (
      <div className="appy">
        <SideNav />
        <div className="main-content">
          <UpperNav />
          <div className="error-container">
            <div style={{ padding: "20px", color: "red" }}>
              Category not found.
            </div>
            <div className="button-row">
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
          <h3>View Category Details</h3>
        </div>
        <div className="view-category-container">
          <div className="form-row">
            <div className="form-group">
              <label>Category Name</label>
              <div className="display-field">{category.catName}</div>
            </div>
            <div className="form-group">
              <label>Descriptions</label>
              <div className="display-field">{category.descriptions}</div>
            </div>
          </div>
          <div className="button-row">
            <Link to="/DashCategories" className="back-button">
              Back
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ViewCategory;
