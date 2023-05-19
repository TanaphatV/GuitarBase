import React from 'react';
import Card from 'react-bootstrap/Card';
import './App.css';

function GuitarCard({ id, name, imgByte }) {
  const displayImage = () => {
    const blob = new Blob([imgByte], { type: 'image/jpeg' });
    const reader = new FileReader();
    reader.onload = function (e) {
      const dataURL = e.target.result;
      const imgElement = document.getElementById(id);
      imgElement.src = dataURL;
    };
    reader.readAsDataURL(blob);
  };

  React.useEffect(() => {
    displayImage();
  }, [imgByte, id]);

  return (
    <Card className="GuitarCard" style={{ border: "none" }}>
      <div className='GuitarCard-bg'>
        <Card.Img id={id} className="GuitarCardImg" variant="middle" alt="Guitar" />
      </div>
      <Card.Header as="h5">{name}</Card.Header>
      <Card.Body>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default GuitarCard;