import React, { useState } from 'react';
import { uploadImage, processImage } from './api';
import { extractThaiIDCardData } from './ocrUtils';

function App() {
  const [image, setImage] = useState(null);
  const [ocrResult, setOcrResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleUpload = (e) => uploadImage(e, setImage, setOcrResult, setErrorMessage);
  const handleProcess = () => processImage(image, setOcrResult, setErrorMessage);

  return (
    <div className="app-container">
      <h1>Thai ID Card OCR</h1>

      <input type="file" accept="image/jpeg, image/png" onChange={handleUpload} />
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {image && <img src={URL.createObjectURL(image)} alt="Uploaded" style={{ maxWidth: '300px' }} />}

      <button onClick={handleProcess}>Process Image</button>

      {ocrResult && (
        <div className="ocr-result">
          <h2>Extracted Data</h2>
          <ul>
            <li>Identification Number: {ocrResult.identification_number || 'N/A'}</li>
            <li>First Name: {ocrResult.first_name || 'N/A'}</li>
            <li>last Name: {ocrResult.last_name || 'N/A'}</li>
            <li>Date of Birth: {ocrResult.date_of_birth || 'N/A'}</li>
            <li>Expiry Date: {ocrResult.date_of_expiry || 'N/A'}</li>
            <li>Date of Issue: {ocrResult.date_of_issue || 'N/A'}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
