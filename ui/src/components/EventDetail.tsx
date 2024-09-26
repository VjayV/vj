import React, { useEffect, useState } from "react"; 
import { useParams, useNavigate } from "react-router-dom";
import { getEventById, addVotes } from "../api/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, startOfDay } from "date-fns";
import "./EventDetail.css";

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<any>(null);
  const [voteName, setVoteName] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [votes, setVotes] = useState<string[]>([]);
  const [nameError, setNameError] = useState<string>("");
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        if (id) {
          const eventData = await getEventById(id);
          if (!eventData) {
            throw new Error("Event not found");
          }
          setEvent(eventData);
        }
      } catch (error) {
        console.error("Error fetching event:", error);
        navigate("/404");
      }
    };
    fetchEvent();
  }, [id, navigate]);

  const handleAddVote = async (e: React.FormEvent) => {
    e.preventDefault();

    if (/\d/.test(voteName)) {
      setNameError("Name cannot contain numbers.");
      return;
    } else {
      setNameError("");
    }

    if (event && id && voteName && votes.length > 0) {
      await addVotes(id, voteName, votes);
      const updatedEvent = await getEventById(id);
      setEvent(updatedEvent);
      setVoteName("");
      setVotes([]);
      setSelectedDate(null);
      setShowDatePicker(false);
    }
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const formattedDate = format(startOfDay(date), "yyyy-MM-dd");
      const existingIndex = votes.findIndex(vote => vote === formattedDate);

      if (existingIndex !== -1) {
        setVotes(votes.filter((_, index) => index !== existingIndex));
      } else {
        if (votes.length < 4) {
          setVotes([...votes, formattedDate]);
        } else {
          alert("You can only select up to 4 dates.");
        }
      }
      setSelectedDate(null);
    }
  };

  return (
    <div className="container">
      {event ? (
        <>
          <h2 className="header">Event Name: <u>{event?.name}</u></h2>
          <h2 className="header">Available Dates:</h2>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {event?.dates.map((date: string) => (
              <li key={date} style={{ padding: "5px 0" }}>{date}</li>
            ))}
          </ul>
          <h2 className="header">Current Votes:</h2>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {event?.votes.map((vote: any) => (
              <li key={vote.date} style={{ padding: "5px 0" }}>
                {vote.date}: {vote.people.join(", ")}
              </li>
            ))}
          </ul>
          <form onSubmit={handleAddVote} style={{ marginBottom: "20px" }}>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="voteName" className="label">Your Name:</label>
              <input
                id="voteName"
                type="text"
                value={voteName}
                onChange={(e) => setVoteName(e.target.value)}
                placeholder="Enter your name"
                required
                className="input"
              />
              {nameError && (
                <p style={{ color: "red", marginTop: "5px" }}>{nameError}</p>
              )}
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="voteDate" className="label">Select Date(s):</label>
              <button
                type="button"
                onClick={() => setShowDatePicker(!showDatePicker)}
                className="button"
              >
                {showDatePicker ? "Hide Date Picker" : "Show Date Picker"}
              </button>
              {showDatePicker && (
                <div className="date-picker">
                  <DatePicker
                    id="voteDate"
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select a date"
                    inline
                  />
                </div>
              )}
            </div>
            <button type="submit" className="button">Add Vote</button>
          </form>
          <h3 className="header">Selected Dates:</h3>
          <ul className="selected-dates">
            {votes.map((vote, index) => (
              <li key={index} className="selected-date">{vote}</li>
            ))}
          </ul>
          <button
            onClick={() => navigate(-1)}
            className="back-button"
          >
            Back
          </button>
        </>
      ) : (
        <p>Loading event...</p>
      )}
    </div>
  );
};

export default EventDetail;
