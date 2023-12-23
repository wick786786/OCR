// src/App.js

import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [image, setImage] = useState(null);
  const [ocrResult, setOcrResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const uploadImage = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setImage(selectedFile);
    setErrorMessage('');
  };

  const processImage = async () => {
    if (!image) {
      setErrorMessage('Please upload an image first.');
      return;
    }

    const base64Image = await convertImageToBase64(image);
    try {
      const { data } = await axios.post('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBGxOf7sgo5ZPoPp4EAP-pic-6x0Nh92gQ', { image: base64Image });
      setOcrResult(data);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Error processing image.');
    }
  };

  const convertImageToBase64 = (imageFile) => {
    return new Promise((resolve, reject) => {
      if (!imageFile) {
        reject(new Error('No image file provided'));
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result.split(',')[1]);
        } else {
          reject(new Error('Invalid result from FileReader'));
        }
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(imageFile);
    });
  };

  return (
    <div className="app-container">
      <h1>Thai ID Card OCR</h1>

      <input type="file" accept="image/jpeg, image/png" onChange={uploadImage} />
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {image && <img src={URL.createObjectURL(image)} alt="Uploaded" style={{ maxWidth: '300px' }} />}

      <button onClick={processImage}>Process Image</button>

      {ocrResult && (
        <div className="ocr-result">
          <h2>OCR Result</h2>
          <ul>
            <li>Identification Number: {ocrResult.identification_number || 'N/A'}</li>
            <li>Name: {ocrResult.name || 'N/A'}</li>
            <li>Last Name: {ocrResult.last_name || 'N/A'}</li>
            <li>Date of Birth: {ocrResult['date-of-birth'] || 'N/A'}</li>
            <li>Date of Issue: {ocrResult['date-of-issue'] || 'N/A'}</li>
            <li>Date of Expiry: {ocrResult['date-of-expiry'] || 'N/A'}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
