import React, { useState } from 'react';
import axios from 'axios';

function App() {

  const [image, setImage] = useState(null);
  const [ocrResult, setOcrResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

 
// ... rest of your App.js code


  const uploadImage = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setImage(selectedFile);
    setOcrResult(null);
    setErrorMessage('');
  };

  const processImage = async () => {
    if (!image) {
      setErrorMessage('Please upload an image first.');
      return;
    }

    const base64Image = await convertImageToBase64(image);
    try {
      const requestData = {
        requests: [
          {
            image: {
              content: base64Image
            },
            features: [
              {
                type: "DOCUMENT_TEXT_DETECTION"
              }
            ]
          }
        ]
      };

      const { data } = await axios.post('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBGxOf7sgo5ZPoPp4EAP-pic-6x0Nh92gQ', requestData);
      
      const extractedData = extractThaiIDCardData(data.responses[0].fullTextAnnotation.text);
      setOcrResult(extractedData);
      setErrorMessage('');
    } catch (error) {
      console.error(error);
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

  const extractThaiIDCardData = (fullText) => {
    const lines = fullText.split('\n');
    
    let identification_number = '';
    let first_name = '';
    let last_name = '';
    let date_of_birth = '';
    let date_of_issue='';
    let date_of_expiry='';
  
    // Extract Identification Number (from the second line)
    if (lines.length > 1) {
      const secondLine = lines[1].trim();
      const idParts = secondLine.split(' ').filter(part => part); // Remove empty parts
      if (idParts.length === 5 && idParts.every(part => !isNaN(part))) {
        identification_number = idParts.join(' ');
      }
    }
  
    // Extract Name (from the line starting with "ชื่อตัวและชื่อสกุล")
    
      // Extract Name (from the line starting with "ชื่อตัวและชื่อสกุล")
      const nameLineIndex = lines.findIndex(line => line.startsWith("Name"));
if (nameLineIndex !== -1 && lines.length > nameLineIndex) {
    console.log("Name Line:", lines[nameLineIndex]);  // Temporary log
    const nameParts = lines[nameLineIndex].split(' ').filter(part => part); // Split the line by spaces and remove empty parts
    console.log("Name Parts:", nameParts);  // Temporary log
    //if (nameParts.length >= 4) { // Adjusted the check to 4 based on the expected structure
        first_name = nameParts[2]; // First name is after "น.ส."
        console.log(`${first_name} yours natarika`);
        
    //}
    
}
const nameLineIndex2 = lines.findIndex(line => line.startsWith("Last"));
if (nameLineIndex2 !== -1 && lines.length > nameLineIndex2) {
    console.log("Name Line:", lines[nameLineIndex2]);  // Temporary log
    const nameParts = lines[nameLineIndex2].split(' ').filter(part => part); // Split the line by spaces and remove empty parts
    console.log("Name Parts:", nameParts);  // Temporary log
    //if (nameParts.length >= 4) { // Adjusted the check to 4 based on the expected structure
        last_name = nameParts[2]; // First name is after "น.ส."
        console.log(`${first_name} yours natarika`);


console.log("aapka last naaaaaam:", last_name);

}

  
    // Extract Date of Birth (from the line starting with "เกิดวันที่")
    const dobLineIndex = lines.findIndex(line => line.startsWith("เกิดวันที่"));
if (dobLineIndex !== -1 && lines.length > dobLineIndex + 1) {
    const dobLine = lines[dobLineIndex + 1].trim();
    const match = dobLine.match(/\d{1,2}\s\w{3}\.\s\d{4}/); // Match the date pattern
    date_of_birth = match ? match[0] : "N/A"; // Use the matched date or set to "N/A" if no match found
}

     // Extract Date of Expiry (from the line starting with "วันบัตรหมดอายุ")
     const expiryLineIndex = lines.findIndex((line) =>
     line.startsWith("วันบัตรหมดอายุ")
   );
   if (expiryLineIndex !== -1 && lines.length > expiryLineIndex + 1) {
     date_of_expiry = new Date(lines[expiryLineIndex + 1].trim());
   }

   // Extract Date of Issue (from the line starting with "วันออกบัตร")
   const issueLineIndex = lines.findIndex((line) =>
     line.startsWith("วันออกบัตร")
   );
   if (issueLineIndex !== -1 && lines.length > issueLineIndex + 1) {
     date_of_issue = new Date(lines[issueLineIndex + 1].trim());
   }
     // Convert Date objects to strings
date_of_expiry = date_of_expiry ? date_of_expiry.toLocaleDateString('en-GB') : "N/A";
date_of_issue = date_of_issue ? date_of_issue.toLocaleDateString('en-GB') : "N/A";

    return {
      identification_number,
      first_name,
      last_name,
      date_of_birth,
      date_of_expiry,
      date_of_issue
    };
  };
  
  // Usage
  const rawData = `...`;  // Your OCR raw text
  const extractedData = extractThaiIDCardData(rawData);
  console.log(extractedData);
  
  
  return (
    <div className="app-container">
      <h1>Thai ID Card OCR</h1>

      <input type="file" accept="image/jpeg, image/png" onChange={uploadImage} />
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {image && <img src={URL.createObjectURL(image)} alt="Uploaded" style={{ maxWidth: '300px' }} />}

      <button onClick={processImage}>Process Image</button>

      {ocrResult && (
        <div className="ocr-result">
          <h2>Extracted Data</h2>
          <ul>
            <li>Identification Number: {ocrResult.identification_number || 'N/A'}</li>
            <li>First Name: {ocrResult.first_name || 'N/A'}</li>
            <li>last Name:{ocrResult.last_name ||'N/A'}</li>
            <li>{ocrResult.date_of_birth||'N/A'}</li>
            <li>Expiry Date:{ocrResult.date_of_expiry||'N/A'}</li>
            <li>date_of_issue{ocrResult.date_of_issue||'N/A'}</li>

            {/* Add more fields as needed */}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
