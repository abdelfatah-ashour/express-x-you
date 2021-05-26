import React from 'react';

export default function FieldSelect({
  name,
  id,
  label,
  selectOptions,
  ariaLabel,
  handleChange,
}) {
  return (
    <>
      <div className="w-100 py-2 mb-1">
        <label htmlFor={id} className="ps-2 pb-2 text-uppercase">
          {label}
        </label>
        <select
          className="form-select"
          id={id}
          aria-label={ariaLabel}
          defaultValue="DEFAULT"
          name={name}
          onChange={handleChange}>
          <option value="DEFAULT" disabled>
            choose one {name} ...
          </option>

          {selectOptions.map((option, i) => {
            return (
              <option value={option} key={i}>
                {option}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
}
