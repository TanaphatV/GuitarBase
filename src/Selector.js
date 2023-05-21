import React from "react";

export default function Selector({ value, options, onChange, id }) {
  const handleChange = (e) => {
    const selectedValue = e.target.value;
    onChange(id, selectedValue);
  };

  return (
    <div>
      <select value={value} onChange={handleChange}>
        <option value="none">None</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.value}
          </option>
        ))}
      </select>
    </div>
  );
}