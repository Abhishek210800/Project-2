import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import StickyNav from "../HomeScreen/StickyNav";
import Footer from "../HomeScreen/Footer";
import "./SignUp.css";

const SignUp = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <StickyNav />
      <div className="signup-wrapper">
        <div className="continner">
          <div className="row">
            <div className="col-md-12">
              <Link to="/home" className="back-link">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m12 19-7-7 7-7"></path>
                  <path d="M19 12H5"></path>
                </svg>
                Back to Directory
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="coverbox boxwhitein">
                <div className="headbggrntop">
                  <div className="topbd">
                    <h4 className="text-center form-title">
                      Submit Directory or Framework
                    </h4>
                    <p className="text-center margtptty fntclrp form-subtitle">
                      Free submission! Review in approval within 24 hours.
                    </p>
                    <p className="text-center fntclrp form-subtitle">
                      Gain visibility, attract new users, and receive valuable
                      feedback by showcasing your Community.
                    </p>
                  </div>
                </div>
                <div className="sucontbox">
                  <div className="sprtpagecnt agentfrm">
                    <div className="row">
                      <div className="col-md-6">
                        <label className="custom-label">
                          Community Name<span className="text-red-500">*</span>
                        </label>
                        <input type="text" />
                      </div>
                      <div className="col-md-6">
                        <label className="custom-label">Contact Person</label>
                        <input type="text" />
                      </div>
                      <div className="col-md-6">
                        <label className="custom-label">
                          Address Line 1<span className="text-red-500">*</span>
                        </label>
                        <input type="text" />
                      </div>
                      <div className="col-md-6">
                        <label className="custom-label">Address Line 2</label>
                        <input type="text" />
                      </div>
                      <div className="col-md-4">
                        <label className="custom-label">
                          City<span className="text-red-500">*</span>
                        </label>
                        <input type="text" />
                      </div>
                      <div className="col-md-4">
                        <label className="custom-label">
                          State<span className="text-red-500">*</span>
                        </label>
                        <input type="text" />
                      </div>
                      <div className="col-md-4">
                        <label className="custom-label">
                          ZIP<span className="text-red-500">*</span>
                        </label>
                        <input type="text" />
                      </div>
                      <div className="col-md-6">
                        <label className="custom-label">Country</label>
                        <input type="text" />
                      </div>
                      <div className="col-md-6">
                        <label className="custom-label">
                          Website<span className="text-red-500">*</span>
                        </label>
                        <input type="text" />
                      </div>
                      <div className="col-md-6">
                        <label className="custom-label">
                          Phone<span className="text-red-500">*</span>
                        </label>
                        <input type="text" />
                      </div>
                      <div className="col-md-6">
                        <label className="custom-label">
                          Email<span className="text-red-500">*</span>
                        </label>
                        <input type="text" />
                      </div>
                      <div className="col-md-12">
                        <label className="custom-label">
                          Title<span className="text-red-500">*</span>
                        </label>
                        <input type="text" />
                      </div>
                      <div className="col-md-12">
                        <label className="custom-label">
                          Company Description
                          <span className="text-red-500">*</span>
                        </label>
                        <textarea></textarea>
                      </div>
                      <div className="col-md-12">
                        <label className="custom-label">
                          Select Category<span className="text-red-500">*</span>
                        </label>
                        <div className="checkrk">
                          {[
                            "Technology",
                            "Healthcare",
                            "Entertainment",
                            "Marketing",
                            "Travel & Hospitality",
                            "Real Estate",
                            "Computer & IT",
                            "Finance",
                            "Manufacturing",
                            "Others",
                          ].map((category, index) => (
                            <label className="contnr" key={index}>
                              {category}
                              <input type="checkbox" />
                              <span className="checkmk"></span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <label className="custom-label">
                          Add Company Logo<span className="text-red-500">*</span>
                        </label>
                        <input
                          className="form-control nopadfile"
                          type="file"
                          id="formFileReadonly"
                        />
                      </div>
                      {[
                        { label: "Company Facebook Link" },
                        { label: "Company LinkedIn Link" },
                        { label: "Company Instagram Link" },
                        { label: "Company Twitter Link" },
                        { label: "Company YouTube Link" },
                        { label: "Company Pinterest Link" },
                      ].map(({ label }, index) => (
                        <div className="col-md-6" key={index}>
                          <label className="custom-label">{label}</label>
                          <input type="text" />
                        </div>
                      ))}
                      <div className="col-md-12 margtptty margbtmtty">
                        <button className="sbmt">Submit</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
