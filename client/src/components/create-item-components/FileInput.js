import React from 'react';

export default function FileInput({ handleSelectFile }) {
  return (
    <div className="mb-3 w-100">
      <label htmlFor="formFile" className="form-label">
        choose file item
      </label>
      <input
        className="form-control"
        type="file"
        name="fileItem"
        id="formFile"
        onChange={handleSelectFile}
      />
    </div>
  );
}
