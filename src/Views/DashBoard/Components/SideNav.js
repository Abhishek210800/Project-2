import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { Home, Building2, Calendar, Grid } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../Images/logo.png";
import "./SideNav.css";

const SidebarContent = () => {
  const { toggled, toggleSidebar } = useProSidebar();
  const location = useLocation();

  // Helper: returns true if current path starts with any of the provided prefixes.
  const isActiveForRoutes = (routes) => {
    const currentPath = location.pathname.toLowerCase();
    return routes.some((route) => currentPath.startsWith(route.toLowerCase()));
  };

  
  const IconWrapper = ({ children, isActive }) => (
    <div
      style={{
        padding: "6px",
        borderRadius: "4px",
        backgroundColor: isActive ? "rgb(62, 37, 240)" : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background-color 0.3s ease",
      }}
    >
      {children}
    </div>
  );

  // Custom styles for menu items.
  const menuItemStyles = {
    button: {
      backgroundColor: "#171829",
      color: "white",
      "&:hover": {
        backgroundColor: "#3B82F6 !important",
        color: "white",
      },
      transition: "all 0.3s ease",
      padding: "8px 16px",
      margin: "2px 8px",
      borderRadius: "4px",
    },
    icon: {
      backgroundColor: "transparent",
    },
  };

  return (
    <div style={{ position: "sticky", top: 0, height: "100vh", zIndex: 9999 }}>
      <Sidebar
        className={`app-sidebar ${toggled ? "sidebar-shown" : ""}`}
        style={{
          height: "100vh",
          border: "1px solid #1f2037",
          backgroundColor: "#171829",
          position: "relative",
        }}
        backgroundColor="#171829"
        width="260px"
        toggled={toggled}
        onBackdropClick={() => toggleSidebar(false)}
        breakPoint="lg"
      >
        {/* Sidebar Logo */}
        <div
          style={{
            height: "75px",
            padding: "16px",
            borderBottom: "1px solid #1f2037",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#171829",
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{
              height: "100%",
              width: "100%",
              objectFit: "contain",
            }}
          />
        </div>

        {/* Sidebar Menu */}
        <Menu menuItemStyles={menuItemStyles}>
          {/* Dashboard */}
          <MenuItem
            icon={
              <IconWrapper isActive={isActiveForRoutes(["/dashboard"])}>
                <Home size={20} color="white" />
              </IconWrapper>
            }
            component={<Link to="/dashboard" />}
            onClick={() => window.innerWidth <= 1190 && toggleSidebar(false)}
          >
            Dashboard
          </MenuItem>

          {/* Companies */}
          <MenuItem
            icon={
              <IconWrapper
                isActive={isActiveForRoutes([
                  "/dashcompanies",
                  "/addcompany",
                  "/view-company",
                  "/edit-company",
                  "/delete-company",
                ])}
              >
                <Building2 size={20} color="white" />
              </IconWrapper>
            }
            component={<Link to="/DashCompanies" />}
            onClick={() => window.innerWidth <= 1190 && toggleSidebar(false)}
          >
            Companies
          </MenuItem>

          {/* Events */}
          <MenuItem
            icon={
              <IconWrapper isActive={isActiveForRoutes(["/dashevents", "/addevents"])}>
                <Calendar size={20} color="white" />
              </IconWrapper>
            }
            component={<Link to="/DashEvents" />}
            onClick={() => window.innerWidth <= 1190 && toggleSidebar(false)}
          >
            Events
          </MenuItem>

          {/* Categories */}
          <MenuItem
            icon={
              <IconWrapper
                isActive={isActiveForRoutes([
                  "/dashcategories",
                  "/addcategory",
                  "/view-category",
                  "/edit-category",
                  "/delete-category",
                ])}
              >
                <Grid size={20} color="white" />
              </IconWrapper>
            }
            component={<Link to="/DashCategories" />}
            onClick={() => window.innerWidth <= 1190 && toggleSidebar(false)}
          >
            Categories
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SidebarContent;
