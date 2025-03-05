import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SideNav from "../../Components/SideNav";
import UpperNav from "../../Components/UpperNav";
import Footer from "../../Components/Footer";
import { fetchEvents } from "../../../../Redux/EventsSlice";
import axios from "axios";
import "./EditEvents.css";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: events, loading, error } = useSelector((state) => state.events);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageName, setImageName] = useState("");
  const [imageNameContents, setImageNameContents] = useState("");
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (events.length === 0) {
      dispatch(fetchEvents());
    }
  }, [dispatch, events.length]);

  useEffect(() => {
    if (!loading && events.length > 0) {
      const foundEvent = events.find((ev) => Number(ev.event_id) === Number(id));
      if (foundEvent) {
        setTitle(foundEvent.title || "");
        setDescription(foundEvent.descriptions || "");
        setImageName(foundEvent.image || "");
      } else {
        setLocalError("Event not found.");
      }
    }
  }, [loading, events, id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageNameContents(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tenant_id = localStorage.getItem("tenant_id") || "1";
    const payload = {
      tenant_id,
      event_id: id,
      title,
      description,
      imageName,
      imageNameContents,
    };

    try {
      const response = await axios.post("/api/addeditevent", payload, {
        headers: { "Content-Type": "application/json" },
      });
      if (
        response.data &&
        response.data.details &&
        response.data.details[0]?.mes?.toLowerCase().includes("edited successfully")
      ) {
        alert("Event edited successfully.");
        navigate("/DashEvents");
      } else {
        setLocalError("Failed to update event. Please try again.");
      }
    } catch (err) {
      setLocalError("Error updating event: " + (err.response?.data?.message || err.message));
    }
  };

  if (loading) {
    return <div className="ee-loading">Loading...</div>;
  }

  if (error || localError) {
    return (
      <div className="ee-app">
        <SideNav />
        <div className="ee-main-content">
          <UpperNav />
          <div className="ee-container">
            <p className="ee-error">{error || localError}</p>
            {/* <Link to="/DashEvents" className="ee-back-button">Back</Link> */}
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="ee-app">
      <SideNav />
      <div className="ee-main-content">
        <UpperNav />
        <div className="ee-header">
          <h2>Edit Event</h2>
        </div>
        <div className="ee-container">
          <form onSubmit={handleSubmit}>
            <div className="ee-form-row">
              <label>Event Name</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="ee-form-row">
              <label>Event Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="ee-form-row">
              <label>Event Image</label>
              <input type="file" onChange={handleFileChange} />
            </div>
            <div className="ee-button-row">
              <button type="submit" className="ee-submit-button">Edit Event</button>
              {/* <Link to="/DashEvents" className="ee-back-button">Back</Link> */}
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default EditEvent;