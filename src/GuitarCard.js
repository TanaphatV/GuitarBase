import React, { useEffect, useRef } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import globalVars from './globalVar';

function GuitarCard({ id, name, brand, body, pickup, imageUrl, isAdmin = false, handleEdit, handleEditClose }) {
  const imgRef = useRef(null);

  const DeleteGuitar = async () => {

      const body = {
        id:id,
      };

      const response = await fetch(globalVars.hostUrl + '/deleteGuitar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      //window.location.reload();
      window.location.href = window.location.href;
  };

  function handleDelete() {
    // Display confirmation prompt before deleting the guitar
    const confirmDelete = window.confirm('Are you sure you want to delete this guitar?');

    if (confirmDelete) {
      DeleteGuitar()
      
    }
  }

  function openEditor() {
    handleEdit(
      {
        id: id,
        imageUrl: imageUrl,
        filterSelection: {
          brand: brand,
          body: body,
          pickup: pickup
        },
        name: name
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

      {isAdmin && (<Button
        variant="danger"
        size="sm"
        className="delete-button"
        onClick={handleDelete}
        style={{
          position: "absolute",
          bottom: "1%",
          left: "1%",
          width: "auto",
          padding: "5px 10px",
        }}
      >
        Delete
      </Button>)}
    </Card>
  );
}

export default GuitarCard;
