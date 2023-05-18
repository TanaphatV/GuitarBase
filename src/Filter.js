import React, { useState, useEffect } from "react";
import ParentComponent from "./ParentComponent";
import globalVars from './globalVar'

export default function Filter({handleChange}) {
  const [selectedValues, setSelectedValues] = useState([]);

  const handleSelectorChange = (parentComponentId, value) => {

    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [parentComponentId]: value,
    }));
    handleChange(value);
  };

  const [option, setOption] = useState([]);

  useEffect(() => {
    fetch('https://dt468-guitarbase-webservice.onrender.com/Brand')
      .then(response => { return response.json() })
      .then(data => {
        console.log(data);
        setOption([...data]);
      });
  }, []);
  //-------------------------TODO: Add none value as element 0 of the column

  return (
    <div>
      <p>Brand</p>
      <ParentComponent
        pid="Brand"
        options={option}
        onChange={handleSelectorChange}
      />
      <ParentComponent
        pid="parentComponent2"
        options={option}
        onChange={handleSelectorChange}
      />
      <p>Selected value from Brand: {selectedValues["Brand"]}</p>
      <p>Selected value from ParentComponent2: {selectedValues["parentComponent2"]}</p>
    </div>
  );
}