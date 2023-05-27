import React, { useState } from 'react';
import GuitarCard from './GuitarCard';
import Filter from './Filter';
import globalVars from './globalVar';

function Upload() {
  const [imageUrl, setImageUrl] = useState('');
  const [filterSelection, setFilter] = useState({});
  const [name, setName] = useState('');
  const [successPopup, setSuccessPopup] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);

  const handleFilterChange = (value) => {
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

  const uploadGuitar = async () => {
    try {
      const body = {
        name: name,
        brand: filterSelection.brand,
        body: filterSelection.body,
        pickup: filterSelection.pickup,
        imageUrl: imageUrl
      };

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

      setSuccessPopup(true); // Show success popup

      console.log('Data posted successfully');
    } catch (error) {
      setErrorPopup(true); // Show error popup
      console.error('Error posting data:', error);
    }
  };

  const handlePopupClose = () => {
    setSuccessPopup(false);
    setErrorPopup(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Upload Your Guitar</h1>
  
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <div >
          <form style={{ marginBottom: '20px' }}>
            <label htmlFor="imageInput">Select an Image:</label>
            <input type="file" id="imageInput" accept="image/jpeg, image/png" onChange={updateImage} required />
            <p></p>
            <label htmlFor="textIn">Guitar Name:</label>
            <input type="text" id="textIn" value={name} onChange={(e) => setName(e.target.value)} required />
            <Filter handleChange={handleFilterChange} />
            <button type="button" onClick={uploadGuitar}>Upload</button>
          </form>
  
          {successPopup && (
            <div className="overlay">
              <div className="popup success-popup">
                <p>Upload successful!</p>
                <button onClick={handlePopupClose}>Close</button>
              </div>
            </div>
          )}
  
          {errorPopup && (
            <div className="overlay">
              <div className="popup error-popup">
                <p>Error uploading guitar.</p>
                <button onClick={handlePopupClose}>Close</button>
              </div>
            </div>
          )}
        </div>
  
        <div >
          <GuitarCard
            id='imagePreview'
            name={name}
            body={filterSelection.body}
            brand={filterSelection.brand}
            pickup={filterSelection.pickup}
            imageUrl={imageUrl}
          />
        </div>
      </div>
    </div>
  );
  
}

export default Upload;
