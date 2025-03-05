import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardFooter from "./Components/Footer";
import DashboardSidebar from "./Components/SideNav";
import DashboardNav from "./Components/UpperNav";
import { fetchCompanies } from "../../Redux/CompaniesSlice";
import { fetchCategories } from "../../Redux/CategoriesSlice";
import "./Dashboard.css";
import categorycom from "./Images/category-com.jpg";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { data: companies } = useSelector((state) => state.companies);
  const { data: categories } = useSelector((state) => state.categories);

  useEffect(() => {
    if (companies.length === 0) {
      dispatch(fetchCompanies());
    }
  }, [dispatch, companies.length]);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  return (
    <div className="app">
      <DashboardSidebar />
      <div className="main-content">
        <DashboardNav />
        <div style={{ paddingTop: "80px" }}>
          <div className="companies-text-header">Dashboard</div>
          <div className="dashboard-row">
            {/* Companies Card */}
            <div className="dashboard-card companies-card">
              <div className="companies-text">Companies•</div>
              <div className="total-companies-text">
                Total Companies: {companies ? companies.length : 0}
              </div>
              <div className="progress-circle-container">
                <svg
                  width="321"
                  height="321"
                  viewBox="0 0 321 321"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="160.5"
                    cy="160.5"
                    r="117.63"
                    stroke="white"
                    strokeWidth="16"
                    fill="transparent"
                  />
                  <circle
                    cx="160.5"
                    cy="160.5"
                    r="117.63"
                    stroke="#5c61f2"
                    strokeWidth="16"
                    strokeDasharray="740"
                    strokeDashoffset="185"
                    strokeLinecap="round"
                    fill="transparent"
                    transform="rotate(-225 160.5 160.5)"
                  />
                  <circle
                    cx="160.5"
                    cy="160.5"
                    r="117.63"
                    stroke="rgba(195, 179, 226, 0.3)"
                    strokeWidth="50"
                    fill="transparent"
                    className="waves"
                  />
                </svg>
                <span className="percentage">75%</span>
              </div>
            </div>
            {/* Events Card */}
            <div className="dashboard-card card o-hidden product-widget">
              <div className="card-header pb-0">
                <div className="flex justify-between">
                  <div className="flex-grow">
                    <div className="events-text">Events•</div>
                    <h4 style={{ marginBottom: "10px" }}>Events Details</h4>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="activity-timeline">
                  {/* Event 1 */}
                  <div className="d-flex items-start">
                    <div className="activity-line"></div>
                    <div className="activity-dot-secondary"></div>
                    <div className="flex-grow">
                      <p className="mt-0 todo-font">
                        <span className="text-blue-600">20-04-2022</span> Today
                      </p>
                      <span className="font-bold">Agriculture</span>
                      <p className="event-content">
                        Seminar on sustainable agriculture to discuss high yield
                        farming methods
                      </p>
                    </div>
                  </div>
                  {/* Event 2 */}
                  {/* <div className="d-flex items-start">
                    <div className="activity-dot-primary"></div>
                    <div className="flex-grow">
                      <p className="mt-0 todo-font">
                        <span className="font-primary">20-04-2022</span> Today
                        <span className="badge badge-primary ms-2">New</span>
                      </p>
                      <span className="font-bold">Trading</span>
                      <p className="event-content">
                        Best Trading Practices where experts interact with each
                        other and provide insight into this topic
                      </p>
                      <ul className="img-wrapper space-x-2">
                        <li>
                          <img className="w-16 h-16" src="" alt="" />
                        </li>
                        <li>
                          <img className="w-16 h-16" src="" alt="" />
                        </li>
                      </ul>
                    </div>
                  </div> */}
                  {/* Event 3 */}
                  {/* <div className="d-flex items-start">
                    <div className="activity-dot-secondary"></div>
                    <div className="flex-grow">
                      <p className="mt-0 todo-font">
                        <span className="font-primary">20-04-2022</span> Today
                      </p>
                      <span className="font-bold">Entertainment</span>
                      <p className="event-content">
                        Release of coffee table book
                      </p>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
            {/* Categories Card */}
            <div
              className="dashboard-card card o-hidden user-widget"
              style={{ backgroundColor: "white" }}
            >
              <div
                className="card-header pb-0"
                style={{
                  backgroundColor: "white",
                  paddingTop: "0",
                  marginTop: "0",
                }}
              >
                <div
                  className="d-flex justify-content-between"
                  style={{
                    backgroundColor: "white",
                    paddingTop: "0",
                    marginTop: "0",
                  }}
                >
                  <div className="flex-grow">
                    <div className="categories-text">Categories•</div>
                    <h4 style={{ margin: "0", padding: "0 0 15px 0" }}>
                      Category Details
                    </h4>
                  </div>
                </div>
              </div>
              <div
                className="card-footer categories-footer"
                
                style={{
                  backgroundColor: "white",
                  marginTop: "0",
                  paddingTop: "10px",
                }}
              >
                <img
                      src={categorycom}
                      width="100%"
                      style={{ marginTop: "30px", marginBottom: "30px" }}
                      alt="Category"
                    />
                <ul
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "10px",
                    margin: 0,
                    padding: 0,
                    justifyItems: "start",
                  }}
                >
                  {categories && categories.length > 0 ? (
                    categories.map((category, index) => (
                      <li key={index}>
                        {typeof category === "object"
                          ? category.catName || "Unnamed category"
                          : category || "Unnamed category"}
                      </li>
                    ))
                  ) : (
                    <li>No categories available</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <DashboardFooter />
      </div>
    </div>
  );
};

export default Dashboard;
