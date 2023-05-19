

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import './App.css';
import Filter from './Filter';
import { useState } from 'react';
function Gallery(prop) {

  const [filterSelection,setFilter] = useState({});
  const HandleFilterChange = (value) => {
    setFilter(value);
  }
  


  return (
    <Container className="w-100 mw-100">
      <Row className="justify-content-center pt-2">
        <Col className="text-center"> <h2> Explore the wonderful guitars of the world! </h2></Col>
      </Row>
      <Row className="justify-content-center pt-2">
        <Col className="text-center"> <p> We allow everyone to upload their guitar on our website, and show it off to the world. Unique custom made guitars are more than welcome here.</p></Col>
      </Row>



      <Row className="justify-content-center pt-2">

        <Col className="filter">
        <h5>Filter</h5>
        <Filter handleChange = {HandleFilterChange}/>
        <p>result {filterSelection.brand}</p>
        </Col>


        <Col className="text-center" xs={12} md={4}>
          <Card className="GuitarCard" style={{ border: "none" }}>
            <div className='GuitarCard-bg'>
              <Card.Img className="GuitarCardImg" variant="middle" src={require('./image/IMG_2162.jpg')} />
            </div>
            <Card.Header as="h5">SSR630</Card.Header>
            <Card.Body>
              <Card.Text>
                With supporting text below as a natural lead-in to additional content.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>

    //image, name, type(acoustic,electric,bass)
    //filter, brand, body shape, left handed?, 

  );
}

export default Gallery;