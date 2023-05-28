import React, { useState } from 'react';
import GuitarCard from './GuitarCard';
import Filter from './Filter';
import globalVars from './globalVar';
const exitButtonStyle = {
  position: 'absolute',
  top: '-20px',
  position:'relative',
  left: '350px',
  fontSize: '20px',
  color: 'black',
  cursor: 'pointer',
};
function Edit({ initialData, handleCloseOverlay}) {
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
      <div style={{ backgroundColor: '#ffffff', padding: '30px', paddingRight: '50px', paddingLeft: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0px 0px 10px 2px rgba(0, 0, 0, 0.1)' }}>
      <span style={exitButtonStyle} onClick={handleCloseOverlay}>X</span>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Edit Your Guitar</h1>
  
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <div >
          <form style={{ marginBottom: '20px' }}>
            <label htmlFor="imageInput">Select an Image:</label>
            <input type="file" id="imageInput" accept="image/jpeg, image/png" onChange={updateImage} required />
            <p></p>
            <label htmlFor="textIn">Guitar Name:</label>
            <input type="text" id="textIn" value={name} onChange={(e) => setName(e.target.value)} required />
            <Filter handleChange={HandleFilterChange} />
            <button type="button" onClick={UploadGuitar}>Upload</button>
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

export default Edit;

