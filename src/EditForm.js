// EditForm.js

import React from 'react';

const EditForm = ({ data, onSubmit }) => {
  return (
    <form className="form-container"  onSubmit={onSubmit}>
      <label>
        First Name:
        <input type="text" name="firstName" defaultValue={data.first_name} />
      </label>
      <label>
        Last Name:
        <input type="text" name="lastName" defaultValue={data.last_name} />
      </label>
      <label>
        Date of Birth:
        <input type="text" name="dob" defaultValue={data.date_of_birth} />
      </label>
      <label>
        Date of Issue:
        <input type="text" name="doi" defaultValue={data.date_of_issue} />
      </label>
      <label>
        Date of Expiry:
        <input type="text" name="doe" defaultValue={data.date_of_expiry} />
      </label>
      <button type="submit">Save</button>
    </form>
  );
};

export default EditForm;
