import React from "react";

const EditForm = ({ data, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <label>
        First Name:
        <input type="text" name="firstName" defaultValue={data.firstName} />
      </label>
      <label>
        Last Name:
        <input type="text" name="lastName" defaultValue={data.lastName} />
      </label>
      <label>
        Date of Birth:
        <input
          type="text"
          name="dob"
          defaultValue={new Date(data.dateOfBirth).toLocaleDateString()}
        />
      </label>
      <label>
        Date of Issue:
        <input
          type="text"
          name="doi"
          defaultValue={new Date(data.issueDate).toLocaleDateString()}
        />
      </label>
      <label>
        Date of Expiry:
        <input
          type="text"
          name="doe"
          defaultValue={new Date(data.expiryDate).toLocaleDateString()}
        />
      </label>
      <button type="submit">Save</button>
    </form>
  );
};

export default EditForm;
