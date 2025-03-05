import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SideNav from "../../Components/SideNav";
import UpperNav from "../../Components/UpperNav";
import Footer from "../../Components/Footer";
import { fetchEvents } from "../../../../Redux/EventsSlice";
import "./ViewEvents.css";

const ViewEvent = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: events, loading, error } = useSelector((state) => state.events);

  useEffect(() => {
    if (events.length === 0) {
      dispatch(fetchEvents());
    }
  }, [dispatch, events.length]);

  const event = events.find((ev) => Number(ev.event_id) === Number(id));

  if (loading) {
    return <div className="ve-loading">Loading...</div>;
  }

  if (error) {
    return (
      <div className="ve-app">
        <SideNav />
        <div className="ve-main-content">
          <UpperNav />
          <div className="ve-container">
            <p className="ve-error">Error: {error}</p>
            <Link to="/DashEvents" className="ve-back-button">Back</Link>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="ve-app">
        <SideNav />
        <div className="ve-main-content">
          <UpperNav />
          <div className="ve-container">
            <p className="ve-error">Event not found</p>
            <Link to="/DashEvents" className="ve-back-button">Back</Link>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="ve-app">
      <SideNav />
      <div className="ve-main-content">
        <UpperNav />
        <div className="ve-header">
          <h2>View Event Details</h2>
        </div>
        <div className="ve-container">
          <div className="ve-detail-row">
            <label>Event Name</label>
            <div className="ve-display-field">{event.title}</div>
          </div>
          <div className="ve-detail-row">
            <label>Event Description</label>
            <div className="ve-display-field">{event.descriptions}</div>
          </div>
          <div className="ve-detail-row">
            <label>Event Image</label>
            <div className="ve-display-field">
              {event.image ? (
                <img
                  src={`/assets/images/${event.image}`}
                  alt={event.title}
                  className="ve-event-image"
                  onError={(e) => (e.target.src = "/assets/images/default-event.png")}
                />
              ) : (
                "No image available"
              )}
            </div>
          </div>
          <div className="ve-button-row">
            <Link to="/DashEvents" className="ve-back-button">Back</Link>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ViewEvent;