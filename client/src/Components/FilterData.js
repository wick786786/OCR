import React, { useState } from "react";
import axios from "axios";

const FilterData = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleDateFilter = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/idCard/date/${selectedDate}`
      );
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error fetching data by date:", error);
    }
  };

  const handleStatusFilter = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/idCard/status/${selectedStatus}`
      );
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error fetching data by status:", error);
    }
  };

  return (
    <div>
      <label>
        Date:
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </label>
      <button onClick={handleDateFilter}>Filter by Date</button>

      <label>
        Status:
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="">Select Status</option>
          <option value="success">Success</option>
          <option value="failure">Failure</option>
        </select>
      </label>
      <button onClick={handleStatusFilter}>Filter by Status</button>

      <div>
        <h2>Filtered Data:</h2>
        <ul>
          {filteredData.map((item) => (
            <li key={item.identificationNo}>
              {item.firstName} {item.lastName} - {new Date(item.timestamp).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterData;
