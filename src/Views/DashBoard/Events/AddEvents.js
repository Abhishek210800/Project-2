import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SideNav from "../Components/SideNav";
import UpperNav from "../Components/UpperNav";
import Footer from "../Components/Footer";
import "./AddEvents.css";

const AddEvents = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    imageName: "",
    imageNameContents: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, imageName: file.name }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({
          ...prev,
          imageNameContents: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const payload = {
      tenant_id: 1,
      event_id: "",
      title: form.title,
      description: form.description,
      imageName: form.imageName,
      imageNameContents: form.imageNameContents
    };
  
    console.log("Submitting Event Payload:", JSON.stringify(payload, null, 2));
  
    try {
      const response = await axios.post("/api/addeditevent", payload, {
        headers: { "Content-Type": "application/json" }
      });
  
      console.log("Full API Response:", response.data);
  
      if (
        response.data && 
        response.data.details && 
        Array.isArray(response.data.details) && 
        response.data.details[0].status === 1
      ) {
        alert("Event added successfully.");
        setForm({
          title: "",
          description: "",
          imageName: "",
          imageNameContents: ""
        });
        navigate("/DashEvents");
      } else {
        console.error("API Error: Response Data:", response.data);
        alert("Failed to add event. Please check logs.");
      }
    } catch (error) {
      console.error("Axios Error:", error.response ? error.response.data : error.message);
      alert("Error adding event. Please check logs.");
    }
  };
  

  return (
    <div className="ae-app">
      <SideNav />
      <div className="ae-main-content">
        <UpperNav />
        <h1 className="ae-form-title-top">Add Event</h1>
        <div className="ae-contbox">
          <form onSubmit={handleSubmit}>
            <div className="ae-row">
              <div className="ae-col-md-12">
                <label className="ae-labelStyle">
                  Event Name<span className="ae-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="ae-row">
              <div className="ae-col-md-12">
                <label className="ae-labelStyle">
                  Event Description<span className="ae-asterisk">*</span>
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
            </div>
            <div className="ae-row">
              <div className="ae-col-md-12">
                <label className="ae-labelStyle">
                  Add Event Image<span className="ae-asterisk">*</span>
                </label>
                <input
                  type="file"
                  name="image"
                  className="form-control"
                  onChange={handleFileChange}
                  required
                />
              </div>
            </div>
            <div className="ae-row ae-btn-row">
              <button className="ae-sbmt" type="submit">
                Add Event
              </button>
              <button
                type="button"
                className="ae-back-btn"
                onClick={() => navigate("/DashEvents")}
              >
                Back
              </button>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AddEvents;
