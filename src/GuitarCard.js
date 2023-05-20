import React, { useEffect, useRef } from 'react';
import Card from 'react-bootstrap/Card';

function GuitarCard({ id, name, brand, body, pickup, imageUrl }) {
  const imgRef = useRef(null);

  useEffect(() => {
    if (imageUrl) {
      const imgElement = imgRef.current;
      imgElement.src = imageUrl;
    }
  }, [imageUrl]);

  return (
    <Card className="GuitarCard" style={{ border: "none" }}>
      <div className='GuitarCard-bg'>
        <Card.Img ref={imgRef} id={id} className="GuitarCardImg" variant="middle" alt="Guitar" />
      </div>
      <Card.Header as="h5">{name}</Card.Header>
      <Card.Body>
        <Card.Text>
          <p>{brand} {body}</p>
          <p>{pickup}</p>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default GuitarCard;
