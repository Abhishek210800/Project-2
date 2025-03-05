import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faLinkedinIn, faInstagram } from "@fortawesome/free-brands-svg-icons";
import "./Styles/Footer.css";

function Footer() {
  const { directoryDetails } = useSelector((state) => state.directory);
  // const companyEmail =
  //   directoryDetails.length > 0 ? directoryDetails[0].email : "contact@example.com";

  return (
    <footer className="footer-cont">
      <div className="footer-cont-container">
        <div className="footer-cont-row">
          <div className="footer-cont-col">
            <h3>Subscribe Newsletter</h3>
            <form>
              <input type="text" placeholder="Enter your email ID" />
              <button type="button">Submit</button>
            </form>
          </div>
          <div className="footer-cont-col">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <Link to="/Home">Home</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/events">Events</Link>
              </li>
              <li>
                <Link to="/signUp">Signup</Link>
              </li>
              <li>
                <Link to="/LogIn">SignIn</Link>
              </li>
            </ul>
          </div>
          <div className="footer-cont-col">
            <h3>Contact Us</h3>
            <p>
            <a href="/">info@communitydirectory.com</a>
            </p>
            <div className="footer-cont-social">
              <Link to="#">
                <FontAwesomeIcon icon={faFacebook} />
              </Link>
              <Link to="#">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </Link>
              <Link to="#">
                <FontAwesomeIcon icon={faInstagram} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-cont-bottom">
        <div className="footer-cont-row">
          <div className="footer-cont-col-full">
            <p>© 2024 Community Directory. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
