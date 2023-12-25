import React, { useState } from "react";
import { uploadImage, processImage } from "./api";
import EditForm from "./Components/EditForm";
import axios from "axios";
import FilterData from "./Components/FilterData";
import './App.css'

function App() {
  const [image, setImage] = useState(null);
  const [ocrResult, setOcrResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isEditMode, setEditMode] = useState(false);

  const handleUpload = (e) =>
    uploadImage(e, setImage, setOcrResult, setErrorMessage);
  const handleProcess = () =>
    processImage(image, setOcrResult, setErrorMessage);
  const handleEditForm = () => {
    if (!ocrResult) setErrorMessage("No ID Extracted Yet!");
    else setEditMode(true);
  };
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      // Assuming you have the updatedData object with the edited properties
      const updatedData = {
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        dob: new Date(e.target.dob.value),
        doi: new Date(e.target.doi.value),
        doe: new Date(e.target.doe.value),
      };

      // Make the PUT request to update the data
      const response = await axios.put(
        `http://localhost:5000/api/idCard/${ocrResult.identificationNo}`,
        updatedData
      );

      console.log("Edit successful:", response.data);
    } catch (error) {
      // Handle errors if the PUT request fails
      setErrorMessage("Error updating data!");
      console.error("Error updating data:", error);
    }
    setEditMode(false);
  };

  return (
    <div className="app-container">
      <h1>Thai ID Card OCR</h1>
      <input
        type="file"
        accept="image/jpeg, image/png"
        onChange={handleUpload}
      />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {image && (
        <img
          src={URL.createObjectURL(image)}
          alt="Uploaded"
          style={{ maxWidth: "300px" }}
        />
      )}
      <button onClick={handleProcess}>Process Image</button>
      <button onClick={handleEditForm}>Edit Details</button>
      {isEditMode && <EditForm data={ocrResult} onSubmit={handleEditSubmit} />}

      {ocrResult && (
        <div className="ocr-result">
          <h2>Extracted Data</h2>
          <ul>
            <li>
              Identification Number: {ocrResult.identificationNo || "N/A"}
            </li>
            <li>First Name: {ocrResult.firstName || "N/A"}</li>
            <li>last Name: {ocrResult.lastName || "N/A"}</li>
            <li>
              Date of Birth:{" "}
              {ocrResult.dateOfBirth
                ? ocrResult.dateOfBirth.toLocaleDateString()
                : "N/A"}
            </li>
            <li>
              Expiry Date:{" "}
              {ocrResult.dateOfBirth
                ? ocrResult.expiryDate.toLocaleDateString()
                : "N/A"}
            </li>
            <li>
              Date of Issue:{" "}
              {ocrResult.issueDate
                ? ocrResult.dateOfBirth.toLocaleDateString()
                : "N/A"}
            </li>
          </ul>
        </div>
      )}
      <FilterData />
    </div>
  );
}

export default App;
