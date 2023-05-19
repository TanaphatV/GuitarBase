import React, { useState } from 'react';
import GuitarCard from './GuitarCard';

function Upload() {
  const [imgByte, setImgByte] = useState(null);

  const uploadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const arrayBuffer = e.target.result;
        const byteArray = new Uint8Array(arrayBuffer);
        setImgByte(byteArray);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <h1>HERE YOU CAN UPLOAD YOUR GUITAR</h1>
      <GuitarCard id='imagePreview' name='TEMP' imgByte={imgByte} />
      <input type="file" id="imageInput" accept="image/jpeg, image/png" onChange={uploadImage} />
      <button onClick={uploadImage}>Upload</button>
    </div>
  );
}

export default Upload;