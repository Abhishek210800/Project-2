import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa"; 
import SideNav from "../Components/SideNav";
import UpperNav from "../Components/UpperNav";
import Footer from "../Components/Footer";
import { fetchCategories } from "../../../Redux/CategoriesSlice";
import "./DashCategories.css";

const DashCategories = () => {
  const dispatch = useDispatch();
  const { data: categories, loading, error } = useSelector(
    (state) => state.categories
  );

  const [showEntries, setShowEntries] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  const filteredCategories = categories.filter((category) =>
    category.catName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCategories.length / showEntries);
  const startIndex = (currentPage - 1) * showEntries;
  const endIndex = startIndex + showEntries;
  const displayedCategories = filteredCategories.slice(startIndex, endIndex);

  const handleShowEntries = (e) => {
    setShowEntries(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="appy">
      <SideNav />
      <div className="main-content">
        <UpperNav />
        <div className="categories-header">
          <h3 className="categories-text-header">
            Tenant &rarr; Categories
          </h3>
          <Link to="/AddCategory" className="add-new-button">
            + Add New
          </Link>
        </div>
        <div className="categories-container">
          <div className="categories-header-controls">
            <div className="search-and-entries">
              <div className="show-entries">
                <label htmlFor="show-entries">Show</label>
                <select
                  id="show-entries"
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
              <div className="dcat-search">
                <label htmlFor="dcat-search-input">Search:</label>
                <input
                  id="dcat-search-input"
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : displayedCategories.length === 0 ? (
            <p>No categories found</p>
          ) : (
            <>
              <div className="table-responsive">
                <table className="categories-table">
                  <thead>
                    <tr>
                      <th className="category-name-column">Category Name</th>
                      <th className="description-column">Description</th>
                      <th className="status-column">Status</th>
                      <th className="actions-column">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedCategories.map((category) => (
                      <tr key={category.cat_id}>
                        <td data-label="Category Name">{category.catName}</td>
                        <td data-label="Description">
                          {category.descriptions || "N/A"}
                        </td>
                        <td data-label="Status" className="status-column">
                          {category.status}
                        </td>
                        <td data-label="Action">
                          <div className="action-icons">
                            <Link to={`/edit-category/${category.cat_id}`}>
                              <FaEdit className="edit-icon" title="Edit" />
                            </Link>
                            <Link to={`/view-category/${category.cat_id}`}>
                              <FaEye className="view-icon" title="View" />
                            </Link>
                            <Link to={`/delete-category/${category.cat_id}`}>
                              <FaTrash className="delete-icon" title="Delete" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="pagination-container">
                <button
                  className="pagination-button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    className={`pagination-button ${
                      currentPage === i + 1 ? "active" : ""
                    }`}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  className="pagination-button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || totalPages === 0}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default DashCategories;
