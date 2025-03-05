import "./App.css";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { DirectoryProvider } from "./Views/HomeScreen/MainDirectory";
import { ProSidebarProvider } from "react-pro-sidebar";

// Public Pages
// import Welcome from "./Views/HomeScreen/Welcome";
import Home from "./Views/HomeScreen/Home";
import About from "./Views/About/About";
import CompanyDetail from "./Views/HomeScreen/CompanyDetails";
import CompanyDetailsPage from "./Views/HomeScreen/companyDetailsPage";
import SignUp from "./Views/SignUp/SignUp.js";
import Event from "./Views/Events/Events.js";
import LogIn from "./Views/LogInScreen/LogIn.js";

// Dashboard Pages (Protected)
import Dashboard from "./Views/DashBoard/Dashboard.js";

// Dashboard - Companies
import DashCompanies from "./Views/DashBoard/Companies/DashCompanies.js";
import AddCompany from "./Views/DashBoard/Companies/AddCompanies.js";
import ViewCompany from "./Views/DashBoard/Companies/Icons/ViewCompany.js";
import EditCompany from "./Views/DashBoard/Companies/Icons/EditCompany.js";
import DeleteCompany from "./Views/DashBoard/Companies/Icons/DeleteCompany.js";

// Dashboard - Categories
import DashCategories from "./Views/DashBoard/Categories/DashCategories.js";
import AddCategories from "./Views/DashBoard/Categories/AddCategories.js";
import ViewCategory from "./Views/DashBoard/Categories/Icons/ViewCategory.js";
import EditCategory from "./Views/DashBoard/Categories/Icons/EditCategory.js";
import DeleteCategory from "./Views/DashBoard/Categories/Icons/DeleteCategory.js";

// Dashboard - Events
import DashEvents from "./Views/DashBoard/Events/DashEvents.js";
import AddEvents from "./Views/DashBoard/Events/AddEvents.js";
import ViewEvents from "./Views/DashBoard/Events/Icons/ViewEvents.js";
import EditEvents from "./Views/DashBoard/Events/Icons/EditEvents.js";
import DeleteEvents from "./Views/DashBoard/Events/Icons/DeleteEvents.js";

// Route wrappers
import ProtectedRoute from "./Views/DashBoard/ProtectedRoute/protectedRoute.js";
import PublicRoute from "./Views/DashBoard/ProtectedRoute/publicRoute.js";

function App() {
  useEffect(() => {
    document.title = "Community Directory";
  }, []);

  return (
    <Router>
      <DirectoryProvider>
        <ProSidebarProvider>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/directory/:directoryCode" element={<Home />} />
              <Route
                path="/Home"
                element={<Navigate to="/directory/panalink" replace />}
              />
              <Route path="/about" element={<About />} />
              <Route path="/company/:company_id" element={<CompanyDetail />} />
              <Route path="/page/:page_id" element={<CompanyDetailsPage />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/events" element={<Event />} />
              <Route
                path="/LogIn"
                element={
                  <PublicRoute>
                    <LogIn />
                  </PublicRoute>
                }
              />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/Dashcompanies"
                element={
                  <ProtectedRoute>
                    <DashCompanies />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/AddCompany"
                element={
                  <ProtectedRoute>
                    <AddCompany />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/view-company/:id"
                element={
                  <ProtectedRoute>
                    <ViewCompany />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/edit-company/:id"
                element={
                  <ProtectedRoute>
                    <EditCompany />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/delete-company/:id"
                element={
                  <ProtectedRoute>
                    <DeleteCompany />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/Dashcategories"
                element={
                  <ProtectedRoute>
                    <DashCategories />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/AddCategory"
                element={
                  <ProtectedRoute>
                    <AddCategories />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/view-category/:id"
                element={
                  <ProtectedRoute>
                    <ViewCategory />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/edit-category/:id"
                element={
                  <ProtectedRoute>
                    <EditCategory />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/delete-category/:id"
                element={
                  <ProtectedRoute>
                    <DeleteCategory />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/Dashevents"
                element={
                  <ProtectedRoute>
                    <DashEvents />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/AddEvents"
                element={
                  <ProtectedRoute>
                    <AddEvents />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/view-events/:id"
                element={
                  <ProtectedRoute>
                    <ViewEvents />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/edit-events/:id"
                element={
                  <ProtectedRoute>
                    <EditEvents />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/delete-event/:id"
                element={
                  <ProtectedRoute>
                    <DeleteEvents />
                  </ProtectedRoute>
                }
              />

              {/* Wildcard Route */}
              <Route path="*" element={<div>ERROR 404 NOT FOUND</div>} />
            </Routes>
          </div>
        </ProSidebarProvider>
      </DirectoryProvider>
    </Router>
  );
}

export default App;
