import React from 'react';

export default function BasicField({
  name,
  type,
  id,
  label,
  handleChange,
  placeholder,
}) {
  return (
    <div className="mb-3 w-100">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        onChange={handleChange}
        className="form-control"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
