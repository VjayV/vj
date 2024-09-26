import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listEvents, createEvent } from "../api/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import "../AppComponent.css";
import "./EventList.css";

const EventList: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [eventName, setEventName] = useState<string>("");
  const [eventDates, setEventDates] = useState<Date[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [eventUrl, setEventUrl] = useState<string>("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const events = await listEvents();
        setEvents(events);
      } catch (error) {
        toast.error("Failed to fetch events.");
      }
    };
    fetchEvents();
  }, []);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const existingIndex = eventDates.findIndex(d => d.getTime() === date.getTime());

      if (existingIndex !== -1) {
        setEventDates(eventDates.filter((_, index) => index !== existingIndex));
      } else {
        if (eventDates.length < 4) {
          setEventDates([...eventDates, date]);
        } else {
          toast.error("You can only select up to 4 dates.");
        }
      }
      setSelectedDate(null);
    }
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    const dates = eventDates.map((date) => date.toISOString().split("T")[0]);
    if (dates.length > 0) {
      try {
        const newEvent = await createEvent(eventName, dates);
        const url = `${window.location.origin}/event/${newEvent.uniqueId}`;
        setEventUrl(url);
        setShowPopup(true);
        const events = await listEvents();
        setEvents(events);
        setEventName("");
        setEventDates([]);
        setShowModal(false);
      } catch (error) {
        toast.error("Failed to create event.");
      }
    } else {
      toast.error("Add at least 1 date.");
    }

  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="event-list-container">
      <h4>Please enter the event name and dates from the date picker to create a new event!</h4>
      <div className="add-event-button-container">
        <button onClick={() => setShowModal(true)}>Add New Event</button>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Create New Event</h2>
            <form onSubmit={handleCreateEvent}>
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="Event Name"
                required
              />
              <div className="date-picker-container">
                <DatePicker
                  className="custom-datepicker"
                  selected={selectedDate}
                  onChange={(date) => {
                    setSelectedDate(date);
                    handleDateChange(date);
                  }}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select Dates"
                  inline
                />
              </div>
              <ul className="selected-dates">
                Selected Dates: {eventDates.map((date) => (
                  <li key={date.toString()} className="date-item">
                    <button type="button" onClick={() => handleDateChange(date)} className="remove-date">x</button>
                    <span>{date.toISOString().split("T")[0]}</span>
                  </li>
                ))}
              </ul>
              <div className="button-container">
                <button type="submit">Add Event</button>
                <button type="button" onClick={() => setShowModal(false)}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Event Created!</h3>
            <p>Your event has been created successfully.</p>
            <p>Public URL: <a href={eventUrl} target="_blank" rel="noopener noreferrer">{eventUrl}</a></p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}

      <ol className="events">
        <h2>Created Events:</h2>
        {events.map((event) => (
          <li key={event._id}>
            <Link to={`/event/${event.uniqueId}`}>{event.name}</Link>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default EventList;
