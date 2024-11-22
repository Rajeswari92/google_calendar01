import React, { useState, useEffect } from 'react';
import GoogleLogin from './components/GoogleLogin';
import EventForm from './components/EventForm';
import EventsTable from './components/EventsTable';

const App = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [events, setEvents] = useState([]);

  // Load events from localStorage if available
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events'));
    if (storedEvents) {
      setEvents(storedEvents);
    }
  }, []);

  const addEvent = (event) => {
    const updatedEvents = [...events, event];
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents)); // Store in localStorage
  };

  const handleLogout = () => {
    setAccessToken(null);
    localStorage.removeItem('events'); // Clear events data on logout
    alert('You have been logged out.');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Google Calendar Integration</h1>
      {!accessToken ? (
        <GoogleLogin setAccessToken={setAccessToken} />
      ) : (
        <>
          <EventForm accessToken={accessToken} addEvent={addEvent} />
          <button onClick={handleLogout} style={buttonStyle}>Logout</button>
          <EventsTable events={events} />
        </>
      )}
    </div>
  );
};

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  marginTop: '10px',
  backgroundColor: '#ff4d4d',
  color: 'white',
  border: 'none',
  cursor: 'pointer'
};

export default App;
