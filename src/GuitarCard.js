import React, { useEffect, useRef } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function GuitarCard({ id, name, brand, body, pickup, imageUrl, isAdmin = false, handleEdit, handleEditClose }) {
  const imgRef = useRef(null);

  //const [imageUrl, setImageUrl] = useState(initialData.imageUrl || '');
  //const [filterSelection, setFilter] = useState(initialData.filterSelection || {});
  //const [name, setName] = useState(initialData.name || '');

  function openEditor(){
    handleEdit(
      {
        id:id,
        imageUrl:imageUrl,
        filterSelection:{
          brand:brand,
          body:body,
          pickup:pickup
        },
        name:name
      }
    )
  }

  useEffect(() => {
    if (imageUrl) {
      const imgElement = imgRef.current;
      imgElement.src = imageUrl;
    }
  }, [imageUrl]);

  return (
    <Card className="GuitarCard" style={{ border: "1px solid #ccc", position: "relative" }}>
      <div className='GuitarCard-bg'>
        <Card.Img ref={imgRef} id={id} className="GuitarCardImg" variant="middle" alt="Guitar" />
      </div>
      <Card.Header as="h5" style={{ fontSize: "17px", wordWrap: "break-word", whiteSpace: "normal" }}>{name}</Card.Header>
      <Card.Body style={{ minHeight: "100px" }}>
        <Card.Text style={{ maxHeight: "80px", overflow: "auto" }}>
          <p>{brand} {body}</p>
          <p>{pickup}</p>
        </Card.Text>
      </Card.Body>
      {isAdmin && (
        <Button
          variant="secondary"
          size="sm"
          className="edit-button"
          onClick={openEditor}
          style={{
            position: "absolute",
            bottom: "1%",
            right: "1%",
            width: "auto",
            padding: "5px 10px",
          }}
        >
          Edit
        </Button>
      )}
    </Card>
  );
}

export default GuitarCard;
