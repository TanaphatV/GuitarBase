import React, { useState } from "react";
import Selector from "./Selector";

export default function ParentComponent({ pid,options, onChange }) {
  const [selectedValue, setSelectedValue] = useState({});
  const handleChange = (id, value) => {
    setSelectedValue(value);
    onChange(pid,value);
  };

  return (
    <div>
      <Selector
        id="selector1"
        value={selectedValue}
        options={options}
        onChange={handleChange}
      />
    </div>
  );
}
