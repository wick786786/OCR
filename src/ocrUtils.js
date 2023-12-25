export const extractThaiIDCardData = (fullText) => {
    const lines = fullText.split('\n');
    
    let identification_number = '';
    let first_name = '';
    let last_name = '';
    let date_of_birth = '';
    let date_of_issue = '';
    let date_of_expiry = '';
  
    // Extract Identification Number
    if (lines.length > 1) {
      const secondLine = lines[1].trim();
      const idParts = secondLine.split(' ').filter(part => part);
      if (idParts.length === 5 && idParts.every(part => !isNaN(part))) {
        identification_number = idParts.join(' ');
      }
    }
  
    // Extract First Name
    const firstNameIndex = lines.findIndex(line => line.startsWith("Name"));
    if (firstNameIndex !== -1 && lines.length > firstNameIndex) {
      const nameParts = lines[firstNameIndex].split(' ').filter(part => part);
      first_name = nameParts[2] || '';
    }
  
    // Extract Last Name
    const lastNameIndex = lines.findIndex(line => line.startsWith("Last"));
    if (lastNameIndex !== -1 && lines.length > lastNameIndex) {
      const nameParts = lines[lastNameIndex].split(' ').filter(part => part);
      last_name = nameParts[2] || '';
    }
  
    // Extract Date of Birth
    const dobLineIndex = lines.findIndex(line => line.startsWith("เกิดวันที่"));
    if (dobLineIndex !== -1 && lines.length > dobLineIndex + 1) {
      const dobLine = lines[dobLineIndex + 1].trim();
      const match = dobLine.match(/\d{1,2}\s\w{3}\.\s\d{4}/);
      date_of_birth = match ? match[0] : "N/A";
    }
  
    // Extract Date of Expiry
    const expiryLineIndex = lines.findIndex(line => line.startsWith("วันบัตรหมดอายุ"));
    if (expiryLineIndex !== -1 && lines.length > expiryLineIndex + 1) {
      date_of_expiry = lines[expiryLineIndex + 1].trim();
    }
  
    // Extract Date of Issue
    const issueLineIndex = lines.findIndex(line => line.startsWith("วันออกบัตร"));
    if (issueLineIndex !== -1 && lines.length > issueLineIndex + 1) {
      date_of_issue = lines[issueLineIndex + 1].trim();
    }
  
    return {
      identification_number,
      first_name,
      last_name,
      date_of_birth,
      date_of_issue,
      date_of_expiry
    };
  };
  