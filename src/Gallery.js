import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GuitarCard from './GuitarCard';
import globalVars from './globalVar';
import './App.css';
import Filter from './Filter';
import { useState,useEffect } from 'react';
function Gallery(prop) {
  const [GuitarList,setGuitarList] = useState([]);
  const [filterSelection,setFilter] = useState({});
  const HandleFilterChange = (value) => {
    setFilter(value);
  }
  
  useEffect(() => {
    fetch(globalVars.hostUrl + '/Guitars')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setGuitarList([...data]);
      });
  }, []);


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
        {GuitarList.map((item,index) => {
          console.log(item.Image)
          return(<GuitarCard 
            id={'g'+index} 
            key={'g'+index}
            name={item.Name}
            brand={item.Brand}
            body={item.BodyShape}
            pickup={item.Pickup}
            imageUrl={item.ImageUrl}
            />)
        })}
        </Col>
      </Row>
    </Container>

    //image, name, type(acoustic,electric,bass)
    //filter, brand, body shape, left handed?, 

  );
}

export default Gallery;