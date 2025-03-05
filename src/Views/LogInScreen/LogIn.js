import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Redux/AuthSlice";
import "./SignIn.css";
import loginImage from "./Images/3.jpg";
import logoImage from "./Images/logo2.png";

const LogIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/dashboard");
      });
    }
  }, [user, navigate]);

  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 20000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="login-container">
      <div className="login-image-container">
        <img src={loginImage} alt="Login" className="login-image" />
      </div>
      <div className="right-container">
        <div className="content-wrapper">
          <div className="image-section">
            <img src={logoImage} alt="Header" className="header-image" />
          </div>
          <div className="form-card">
            {showError && error && (
              <div className="alert-container">
                <p>{error}</p>
              </div>
            )}
            <div className="card-header">
              <h1 className="card-title">Sign in to directory admin</h1>
              <p className="card-subtitle">
                Enter your email &amp; password to login
              </p>
            </div>
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter a valid email address"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <div className="password-input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    className="form-input password-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <div className="remember-forgot">
                <div className="remember-me">
                  <input type="checkbox" id="remember" className="checkbox" />
                  <label htmlFor="remember">Remember password</label>
                </div>
                <button type="button" className="forgot-link">
                  Forgot password?
                </button>
              </div>
              <button type="submit" className="submit-button">
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
