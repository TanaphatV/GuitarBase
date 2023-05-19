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

    handleChange({
      brand:selectedValues["Brand"],
      body:selectedValues["BodyShape"],
      pickup:selectedValues["PickUp"]
    });

  };

  const [brandOption, setBrandOption] = useState([]);
  const [bodyOption, setBodyOption] = useState([]);
  const [pickOption, setPickOption] = useState([]);

  useEffect(() => {
    fetch('https://dt468-guitarbase-webservice.onrender.com/Brand')
      .then(response => { return response.json() })
      .then(data => {
        console.log(data);
        setBrandOption([...data]);
      });
  }, []);
  useEffect(() => {
    fetch('https://dt468-guitarbase-webservice.onrender.com/BodyShape')
      .then(response => { return response.json() })
      .then(data => {
        console.log(data);
        setBodyOption([...data]);
      });
  }, []);
  useEffect(() => {
    fetch('https://dt468-guitarbase-webservice.onrender.com/PickUp')
      .then(response => { return response.json() })
      .then(data => {
        console.log(data);
        setPickOption([...data]);
      });
  }, []);
  //-------------------------TODO: Add none value as element 0 of the column 
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
