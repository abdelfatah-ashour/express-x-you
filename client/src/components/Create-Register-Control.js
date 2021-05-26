import React from 'react';

export default function CreateRegisterControl(props) {
  const { type, name, id, label, handleChange, placeholder } = props;
  return (
    <div className="w-100 mb-2">
      <label htmlFor={id} className="form-label w-100">
        {label}
      </label>
      <input
        type={type}
        name={name}
        className="form-control p-2 w-100"
        id={id}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
}
