import React, {useState,useEffect} from 'react';

import book from './image/book1.jpg';
import work from './image/work.jpg';
import classroom from './image/classroom.jpg';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import globalVars from './globalVar'

import './App.css';
import { Link } from 'react-router-dom';

function HomePage(prop) {


  const [top3,setTop3] = useState([]);
  
  useEffect(() => {
    fetch(globalVars.hostUrl +'/top3')
      .then( response => {return response.json()})
      .then(data => {
       setTop3([...data]);
       console.log(data);
       console.log(top3);
      });
      }, []);

  return (
    <Container className="w-100 mw-100">
      <Row className="justify-content-center">
        <Col className="text-center">
          <Carousel >
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={book}
                alt="Unlock your potential with our courses"
              />
              <Carousel.Caption>
                <h5>GuitarBase is an ever growing database for guitars, fueled by the community itself!</h5>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={classroom}
                alt="Transform your future with education"
              />
              <Carousel.Caption>
                <h5>Transform your future with education</h5>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={work}
                alt="Upgrade your skills"
              />
              <Carousel.Caption>
                <h5>Upgrade your skills</h5>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
   
    </Container>
  );
}

export default HomePage;