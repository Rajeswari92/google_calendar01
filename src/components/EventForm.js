import React, { useState } from 'react';

const EventForm = ({ accessToken, addEvent }) => {
  const [eventData, setEventData] = useState({
    name: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, startDate, startTime, endDate, endTime } = eventData;

    // Prepare the event data for Google Calendar API
    const event = {
      summary: name,
      start: { dateTime: `${startDate}T${startTime}:00`, timeZone: 'UTC' },
      end: { dateTime: `${endDate}T${endTime}:00`, timeZone: 'UTC' },
    };

    try {
      const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Event created successfully!');
        addEvent({ name, startDate, startTime, endDate, endTime });
      } else {
        console.error('Error creating event:', data);
        alert('Failed to create event');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '20px 0' }}>
      <h3>Create Calendar Event</h3>
      <div>
        <label>
          Event Name:
          <input
            type="text"
            name="name"
            value={eventData.name}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Start Date:
          <input
            type="date"
            name="startDate"
            value={eventData.startDate}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Start Time:
          <input
            type="time"
            name="startTime"
            value={eventData.startTime}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          End Date:
          <input
            type="date"
            name="endDate"
            value={eventData.endDate}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          End Time:
          <input
            type="time"
            name="endTime"
            value={eventData.endTime}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <button type="submit">Create Event</button>
    </form>
  );
};

export default EventForm;
