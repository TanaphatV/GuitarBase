import React, { useState } from 'react';
import GuitarCard from './GuitarCard';
import Filter from './Filter';
import globalVars from './globalVar';

function Edit({ initialData}) {
  const [imageUrl, setImageUrl] = useState(initialData.imageUrl || '');
  const [filterSelection, setFilter] = useState(initialData.filterSelection || {});
  const [name, setName] = useState(initialData.name || '');
  const [id, setid] = useState(initialData.id || '');
  const [successPopup, setSuccessPopup] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);


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
        id:id,
        name: name,
        brand: filterSelection.brand,
        body: filterSelection.body,
        pickup: filterSelection.pickup,
        imageUrl: imageUrl
      };

      const response = await fetch(globalVars.hostUrl + '/editGuitar', {
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
    window.location.href = window.location.href;
    //window.location.reload();
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <h1>HERE YOU CAN UPLOAD YOUR GUITAR</h1>
        <form>
          <input type="file" id="imageInput" accept="image/jpeg, image/png" onChange={updateImage} required />
          <label htmlFor="imageInput"></label>
          <p>Guitar Name:</p>
          <input type="text" id="textIn" value={name} onChange={(e) => setName(e.target.value)} required/>
          <Filter handleChange={HandleFilterChange} />
          <button type="button" onClick={UploadGuitar}>Apply Changes</button>
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

      <div>
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
  );
}

export default Edit;

