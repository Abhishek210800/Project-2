import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SideNav from "../../Components/SideNav";
import UpperNav from "../../Components/UpperNav";
import Footer from "../../Components/Footer";
import { fetchEvents } from "../../../../Redux/EventsSlice";
import axios from "axios";
import "./DeleteEvents.css";

const DeleteEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: events, loading, error } = useSelector((state) => state.events);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    if (events.length === 0) {
      dispatch(fetchEvents());
    }
  }, [dispatch, events.length]);

  const event = events.find((ev) => Number(ev.event_id) === Number(id));

  const handleDelete = async () => {
    try {
      const response = await axios.post(
        "/api/deleteevent",
        { event_id: id },
        { headers: { "Content-Type": "application/json" } }
      );
      if (
        response.data &&
        response.data.details &&
        response.data.details[0]?.status === 1
      ) {
        alert("Event deleted successfully.");
        navigate("/DashEvents");
      } else {
        setDeleteError("Failed to delete event. Please try again.");
      }
    } catch (err) {
      setDeleteError(
        "Error deleting event: " +
          (err.response?.data?.message || err.message)
      );
    }
  };

  if (loading) {
    return <div className="de-loading">Loading...</div>;
  }

  if (error || !event) {
    return (
      <div className="de-app">
        <SideNav />
        <div className="de-main-content">
          <UpperNav />
          <div className="de-container">
            <p className="de-error">{error || "Event not found."}</p>
            <Link to="/DashEvents" className="de-back-button">
              Back
            </Link>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="de-app">
      <SideNav />
      <div className="de-main-content">
        <UpperNav />
        <div className="de-header">
          <h2>Delete Event</h2>
        </div>
        <div className="de-container">
        <p>
            Are you sure you want to delete the event "
            {event.title}"?
          </p>
          <p className="de-event-details">
            <strong>Event Name: </strong>
            {event.title}
          </p>
          <p className="de-event-details">
            <strong>Description: </strong>
            {event.descriptions}
          </p>
          
          {deleteError && <p className="de-error">{deleteError}</p>}
          <div className="de-button-row">
            <button onClick={handleDelete} className="de-confirm-button">
              Yes, Delete
            </button>
            <Link to="/DashEvents" className="de-cancel-button">
              Cancel
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default DeleteEvent;