import React, { useState } from 'react';
import axios from 'axios';

function OCRForm({ onUpload }) {
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:5000/ocr', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onUpload(response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Upload Thai ID Card Image</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <input type="file" className="form-control" onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Upload</button>
      </form>
    </div>
  );
}

export default OCRForm;
