import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OCRList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/ocr');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-5">
      <h2>OCR Data</h2>
      <ul className="list-group mt-4">
        {data.map((item) => (
          <li key={item.id} className="list-group-item">
            {item.name} {item.last_name} - {item.identification_number}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OCRList;
