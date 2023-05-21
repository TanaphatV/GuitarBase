import React, { useState, useEffect } from "react";
import ParentComponent from "./ParentComponent";
import globalVars from './globalVar';

export default function Filter({ handleChange}) {
  const [selectedValues, setSelectedValues] = useState(["none","none","none"]);

  const handleSelectorChange = (parentComponentId, value) => {
    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [parentComponentId]: value === undefined ? "none" : value,
    }));
  };
  const [brandOption, setBrandOption] = useState([]);
  const [bodyOption, setBodyOption] = useState([]);
  const [pickOption, setPickOption] = useState([]);

  useEffect(() => {
    handleChange({
      brand: selectedValues["Brand"],
      body: selectedValues["BodyShape"],
      pickup: selectedValues["PickUp"]
    });
  }, [selectedValues]);

  useEffect(() => {
    fetch(globalVars.hostUrl + '/Brand')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setBrandOption([...data]);
      });
  }, []);

  useEffect(() => {
    fetch(globalVars.hostUrl + '/BodyShape')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setBodyOption([...data]);
      });
  }, []);

  useEffect(() => {
    fetch(globalVars.hostUrl + '/PickUp')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setPickOption([...data]);
      });
  }, []);

  return (
    <div>
      <p>
        Brand
        <ParentComponent
          pid="Brand"
          options={brandOption}
          onChange={handleSelectorChange}
        />

        Body Shape
        <ParentComponent
          pid="BodyShape"
          options={bodyOption}
          onChange={handleSelectorChange}
        />

        Pickup Configuration
        <ParentComponent
          pid="PickUp"
          options={pickOption}
          onChange={handleSelectorChange}
        />
      </p>

      <p>Selected values : {selectedValues["Brand"]} {selectedValues["BodyShape"]} {selectedValues["PickUp"]}</p>
    </div>
  );
}
