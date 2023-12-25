import React from "react";
import'./Edit.css';
const EditForm = ({ data, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="edit-form-container">
      <div className="form-group">
        <label>First Name:</label>
        <input type="text" name="firstName" defaultValue={data.firstName} />
      </div>
      <div className="form-group">
        <label>Last Name:</label>
        <input type="text" name="lastName" defaultValue={data.lastName} />
      </div>
      <div className="form-group">
        <label>Date of Birth:</label>
        <input
          type="text"
          name="dob"
          defaultValue={new Date(data.dateOfBirth).toLocaleDateString()}
        />
      </div>
      <div className="form-group">
        <label>Date of Issue:</label>
        <input
          type="text"
          name="doi"
          defaultValue={new Date(data.issueDate).toLocaleDateString()}
        />
      </div>
      <div className="form-group">
        <label>Date of Expiry:</label>
        <input
          type="text"
          name="doe"
          defaultValue={new Date(data.expiryDate).toLocaleDateString()}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default EditForm;
