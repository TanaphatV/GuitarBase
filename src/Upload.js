import React, { useState } from 'react';
import GuitarCard from './GuitarCard';
import Filter from './Filter';
import globalVars from './globalVar';

function Upload() {
  const [imageUrl, setImageUrl] = useState('');
  const [filterSelection, setFilter] = useState({});
  const [name, setName] = useState('');

  const HandleFilterChange = (value) => {
    setFilter(value);
  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const url = e.target.result; // Extract the data URL
        setImageUrl(url); // Store the URL
      };
      reader.readAsDataURL(file); // Read the file as data URL
    }
  };

  const UploadGuitar = async () => {
    try {
      const body = {
        name: name,
        brand: filterSelection.brand,
        body: filterSelection.body,
        pickup: filterSelection.pickup,
        imageUrl: imageUrl
      };
      console.log(imageUrl);
  
      const response = await fetch(globalVars.hostUrl + '/uploadGuitar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
  
      if (!response.ok) {
        throw new Error('Error posting data');
      }
  
      console.log('Data posted successfully');
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };
  
  

  return (
    <div>
      <h1>HERE YOU CAN UPLOAD YOUR GUITAR</h1>
      <GuitarCard
        id='imagePreview'
        name={name}
        body={filterSelection.body}
        brand={filterSelection.brand}
        pickup={filterSelection.pickup}
        imageUrl={imageUrl}
      />
      <form>
        <input type="file" id="imageInput" accept="image/jpeg, image/png" onChange={updateImage} required />
        <label htmlFor="imageInput">Guitar Name:</label>
        <input type="text" id="textIn" value={name} onChange={(e) => setName(e.target.value)} required />
        <Filter handleChange={HandleFilterChange} />
        <button type="button" onClick={UploadGuitar}>Upload</button>
      </form>
    </div>
  );
}

export default Upload;
