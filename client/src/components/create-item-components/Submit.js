import React from 'react';
export default function Submit({ handleSubmit }) {
  return (
    <div className="my-3 w-100">
      <button
        className="btn btn-primary w-100 h-100 py-2"
        onClick={handleSubmit}>
        submit
      </button>
    </div>
  );
}
