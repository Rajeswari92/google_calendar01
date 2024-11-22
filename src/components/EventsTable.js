import React from 'react';

const EventsTable = ({ events }) => {
  return (
    <div>
      <h3>Event List</h3>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Start Date</th>
            <th>Start Time</th>
            <th>End Date</th>
            <th>End Time</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={index}>
              <td>{event.name}</td>
              <td>{event.startDate}</td>
              <td>{event.startTime}</td>
              <td>{event.endDate}</td>
              <td>{event.endTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventsTable;
