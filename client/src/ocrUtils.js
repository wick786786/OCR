// import axios from "axios";

export const extractThaiIDCardData = (fullText) => {
    const lines = fullText.split('\n');
    
    let identificationNo = '';
    let firstName = '';
    let lastName = '';
    let dateOfBirth = '';
    let issueDate = '';
    let expiryDate = '';
  
    // Extract Identification Number
    if (lines.length > 1) {
      const secondLine = lines[1].trim();
      const idParts = secondLine.split(' ').filter(part => part);
      if (idParts.length === 5 && idParts.every(part => !isNaN(part))) {
        identificationNo = idParts.join(' ');
      }
    }
  
    // Extract First Name
    const firstNameIndex = lines.findIndex(line => line.startsWith("Name"));
    if (firstNameIndex !== -1 && lines.length > firstNameIndex) {
      const nameParts = lines[firstNameIndex].split(' ').filter(part => part);
      firstName = nameParts[2] || '';
    }
  
    // Extract Last Name
    const lastNameIndex = lines.findIndex(line => line.startsWith("Last"));
    if (lastNameIndex !== -1 && lines.length > lastNameIndex) {
      const nameParts = lines[lastNameIndex].split(' ').filter(part => part);
      lastName = nameParts[2] || '';
    }
  
    // Extract Date of Birth
    const dobLineIndex = lines.findIndex(line => line.startsWith("เกิดวันที่"));
    if (dobLineIndex !== -1 && lines.length > dobLineIndex + 1) {
      const dobLine = lines[dobLineIndex + 1].trim();
      const match = dobLine.match(/\d{1,2}\s\w{3}\.\s\d{4}/);
      dateOfBirth = match ? new Date(match[0]) : "N/A";
    }
  
    // Extract Date of Expiry
    const expiryLineIndex = lines.findIndex(line => line.startsWith("วันบัตรหมดอายุ"));
    if (expiryLineIndex !== -1 && lines.length > expiryLineIndex + 1) {
      expiryDate = new Date(lines[expiryLineIndex + 1].trim());
    }
  
    // Extract Date of Issue
    const issueLineIndex = lines.findIndex(line => line.startsWith("วันออกบัตร"));
    if (issueLineIndex !== -1 && lines.length > issueLineIndex + 1) {
      issueDate = new Date(lines[issueLineIndex + 1].trim());
    }

    const data = {
      identificationNo,
      firstName,
      lastName,
      dateOfBirth,
      issueDate,
      expiryDate,
    };
    console.log(data);
  
    return data;
  };
  