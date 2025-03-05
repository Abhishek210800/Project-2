import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanyDetails } from "../../Redux/CompanyDetailsSlice";
import StickyNav from "./StickyNav";
import Footer from "./Footer";
import { ArrowLeft } from "lucide-react";
import { FaComment, FaTimes } from "react-icons/fa";
import "./Styles/companyDetailsPage.css";

function CompanyDetailsPage() {
  const { page_id } = useParams();
  const location = useLocation();
  const navigate = useNavigate(); // Added for back navigation
  const dispatch = useDispatch();
  const { companyDetails, status, error } = useSelector(
    (state) => state.company
  );
  const companyId = location.state?.company_id || "26";
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    if (
      !companyDetails ||
      !companyDetails.details ||
      String(companyDetails.details.company_id) !== String(companyId)
    ) {
      dispatch(fetchCompanyDetails(companyId));
    }
  }, [dispatch, companyDetails, companyId]);

  const company = companyDetails?.details;
  const pages = companyDetails?.pages || [];
  const page = pages.find((p) => String(p.page_id) === String(page_id));
  const briefWords =
    company && company.briefDescription
      ? company.briefDescription.split(" ")
      : [];
  const limitedBriefDescription =
    briefWords.length > 10
      ? briefWords.slice(0, 10).join(" ") + "..."
      : company && company.briefDescription;

  useEffect(() => {
    if (company && page) {
      document.title = `${company.name} - ${page.pageName}`;
    }
  }, [company, page]);

  if (status === "loading") return <div>Loading...</div>;

  if (status === "failed" || error) {
    const errorMessage =
      typeof error === "object" && error !== null
        ? error.message || JSON.stringify(error)
        : error;
    return (
      <div className="cdp-main-container">
        <StickyNav />
        <div className="cdp-content-container">
          <h2>Error: {errorMessage}</h2>
          <button
            onClick={() => navigate(-1)}
            className="cdp-back-link"
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          >
            <ArrowLeft size={20} />
            <span>Back to Company</span>
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  if (!company) {
    return (
      <div className="cdp-main-container">
        <StickyNav />
        <div className="cdp-content-container">
          <h2>No company details available.</h2>
          <button
            onClick={() => navigate(-1)}
            className="cdp-back-link"
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          >
            <ArrowLeft size={20} />
            <span>Back to Company</span>
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  if (!page) {
    return (
      <div className="cdp-main-container">
        <StickyNav />
        <div className="cdp-content-container">
          <h2>No page details available.</h2>
          <button
            onClick={() => navigate(-1)}
            className="cdp-back-link"
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          >
            <ArrowLeft size={20} />
            <span>Back to Company</span>
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="cdp-main-container">
      <StickyNav />
      <div className="cdp-content-container">
        {/* Row for Back to Company */}
        <div className="cdp-row" style={{ marginBottom: "8px" }}>
          <div className="cdp-col">
            <button
              onClick={() => navigate(-1)}
              className="cdp-back-link"
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
              }}
            >
              <ArrowLeft size={20} />
              <span>Back to Company</span>
            </button>
          </div>
        </div>
        <div className="cdp-row">
          <div className="cdp-col">
            <div className="cdp-coverbox cdp-boxwhitein">
              <div className="cdp-headbggrntop">
                <div className="cdp-topbd">
                  {company.companyLogoURL && company.companyLogo ? (
                    <img
                      src={`${company.companyLogoURL}${company.companyLogo}`}
                      alt={company.name}
                    />
                  ) : (
                    <div
                      style={{
                        width: "72px",
                        height: "72px",
                        borderRadius: "50%",
                        backgroundColor: "#eee",
                      }}
                    />
                  )}
                  <h4>
                    {company.name} - {page.pageName}
                  </h4>
                  <p className="cdp-smlfnt">
                    {company.address}, {company.city}, {company.state},{" "}
                    {company.country}
                  </p>
                  <p>{limitedBriefDescription}</p>
                  <div className="cdp-contact-info-row">
                    <span className="cdp-contact-info-item">
                      <i className="fa fa-phone"></i>{" "}
                      {company.phone || "No phone"}
                    </span>
                    <a
                      href={company.email ? `mailto:${company.email}` : "#"}
                      className="cdp-contact-info-item"
                    >
                      <i className="fa fa-envelope"></i>{" "}
                      {company.email || "No email"}
                    </a>
                    <a
                      href={
                        company.website
                          ? company.website.startsWith("http")
                            ? company.website
                            : "https://" + company.website
                          : "#"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cdp-contact-info-item"
                    >
                      <i className="fa fa-globe"></i>{" "}
                      {company.website || "No website"}
                    </a>
                  </div>
                </div>
              </div>
              <div className="cdp-contbox">
                <div className="cdp-lstbxcnt">
                  <h4>Overview</h4>
                  <p>
                    {company.description ||
                      company.briefDescription ||
                      "No overview available"}
                  </p>
                </div>
                {/* Separate container for Images */}
                {(page.img1 || page.img2) && (
                  <div className="cdp-lstbxcnt">
                    <div className="cdp-images-row">
                      {page.img1 && (
                        <img
                          src={`${page.imgurl}${page.img1}`}
                          alt={page.pageName}
                          className="cdp-page-image"
                        />
                      )}
                      {page.img2 && (
                        <img
                          src={`${page.imgurl}${page.img2}`}
                          alt={page.pageName}
                          className="cdp-page-image"
                        />
                      )}
                    </div>
                  </div>
                )}
                {/* Separate container for Video */}
                {page.videoLink && (
                  <div className="cdp-lstbxcnt">
                    <div className="cdp-video-row">
                      <iframe
                        width="100%"
                        height="315"
                        src={page.videoLink}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                )}
                <div className="cdp-lstbxcnt">
                  <h4>Contact</h4>
                  <p>
                    Let our Team handle all the Tech, So you can Execute the
                    Rest
                  </p>
                  <p>
                    <strong>Name of Person:</strong>{" "}
                    {company.contactPerson || "Not provided"}
                  </p>
                  <p>
                    <strong>Designation:</strong>{" "}
                    {company.designation || "Director"}
                  </p>
                  <div className="cdp-toprwto">
                    <Link
                      to={
                        company.website
                          ? company.website.startsWith("http")
                            ? company.website
                            : "https://" + company.website
                          : "#"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cdp-btnlkhd"
                    >
                      <i className="fa fa-globe"></i> Website
                    </Link>
                    <Link
                      to={`mailto:${company.email}`}
                      className="cdp-btnemail"
                    >
                      <i className="fa fa-envelope"></i> Email
                    </Link>
                    <Link to={`tel:${company.phone}`} className="cdp-btnemail">
                      <i className="fa fa-phone"></i> Phone
                    </Link>
                    <Link
                      to={
                        company.phone
                          ? `https://wa.me/${company.phone.replace(
                              /[^0-9]/g,
                              ""
                            )}`
                          : "#"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cdp-btnwhatp"
                    >
                      <i className="fab fa-whatsapp"></i> WhatsApp
                    </Link>
                    <Link to="#" className="cdp-btnshare">
                      <i className="fa fa-share"></i> Share
                    </Link>
                    <button
                      style={{
                        color: "#fff",
                        position: "relative",
                        background:
                          "linear-gradient(145deg, rgba(242, 160, 0, 1) 0%, rgba(214, 144, 7, 1) 100%)",
                        padding: "10px 20px",
                        borderRadius: "6px",
                        textDecoration: "none",
                        fontSize: "14px",
                        display: "inline-block",
                        border: "none",
                        textAlign: "left",
                      }}
                      onClick={() => setIsChatOpen(true)}
                    >
                      <FaComment /> Chat
                    </button>
                  </div>

                  {/* Chatbox */}
                  {isChatOpen && (
                    <div
                      className="wrapper"
                      style={{
                        position: "fixed",
                        right: "10px",
                        bottom: "0px",
                        width: "300px",
                        backgroundColor: "#fff",
                        borderRadius: "5px",
                        // boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.18)",
                        opacity: "1",
                        transition: "all 0.4s",
                      }}
                    >
                      <div
                        className="header"
                        style={{
                          padding: "16px 13px",
                          backgroundImage:
                            "linear-gradient(to right bottom, rgb(22, 163, 74), rgb(4, 120, 87))",
                          borderRadius: "5px 5px 0px 0px",
                          marginBottom: "10px",
                          color: "#fff",
                        }}
                      >
                        <h6
                          style={{
                            marginBottom: "0px",
                            fontWeight: "800",
                            fontSize: "20px",
                          }}
                        >
                          Let's Chat - Online
                          <FaTimes
                            className="close-icon"
                            onClick={() => setIsChatOpen(false)}
                          />
                        </h6>
                      </div>
                      <div className="text-left" style={{ textAlign: "left" }}>
                        <span
                          style={{
                            fontSize: "15px",
                            color: "#808080",
                            display: "block",
                            padding: "0px 15px",
                            fontStyle: "italic",
                            fontWeight: "600",
                          }}
                        >
                          Please fill out the form to start chat!
                        </span>
                      </div>
                      <div className="chat-form" style={{ padding: "15px" }}>
                        <input
                          type="text"
                          placeholder="Name"
                          style={{
                            display: "block",
                            marginBottom: "10px",
                            width: "100%",
                            padding: ".375rem .75rem",
                            fontSize: "1rem",
                            fontWeight: "400",
                            lineHeight: "1.5",
                            color: "var(--bs-body-color)",
                            appearance: "none",
                            backgroundColor: "var(--bs-body-bg)",
                            backgroundClip: "padding-box",
                            border:
                              "var(--bs-border-width) solid var(--bs-border-color)",
                            borderRadius: "var(--bs-border-radius)",
                            transition:
                              "border-color .15s ease-in-out, box-shadow .15s ease-in-out",
                          }}
                        />

                        <input
                          type="text"
                          placeholder="Email"
                          style={{
                            display: "block",
                            marginBottom: "10px",
                            width: "100%",
                            padding: ".375rem .75rem",
                            fontSize: "1rem",
                            fontWeight: "400",
                            lineHeight: "1.5",
                            color: "var(--bs-body-color)",
                            appearance: "none",
                            backgroundColor: "var(--bs-body-bg)",
                            backgroundClip: "padding-box",
                            border:
                              "var(--bs-border-width) solid var(--bs-border-color)",
                            borderRadius: "var(--bs-border-radius)",
                            transition:
                              "border-color .15s ease-in-out, box-shadow .15s ease-in-out",
                          }}
                        />

                        <textarea
                          placeholder="Your Text Message"
                          style={{
                            display: "block",
                            width: "100%",
                            padding: ".375rem .75rem",
                            fontSize: "1rem",
                            fontWeight: "400",
                            lineHeight: "1.5",
                            color: "var(--bs-body-color)",
                            appearance: "none",
                            backgroundColor: "var(--bs-body-bg)",
                            backgroundClip: "padding-box",
                            border:
                              "var(--bs-border-width) solid var(--bs-border-color)",
                            borderRadius: "var(--bs-border-radius)",
                            transition:
                              "border-color .15s ease-in-out, box-shadow .15s ease-in-out",
                          }}
                        ></textarea>

                        <button
                          style={{
                            background:
                              "linear-gradient(145deg, rgba(24, 139, 241, 1) 0%, rgba(12, 117, 210, 1) 100%)",
                            border: "none",
                            marginTop: "10px",
                            borderRadius: "5px",
                            padding: "5px",
                            color: "#ffff",
                          }}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CompanyDetailsPage;
