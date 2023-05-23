import { useState } from 'react';
import { Route, Routes,Link  } from "react-router-dom"

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import HomePage from './HomePage';
import Gallery from './Gallery';
import Upload from './Upload';

import icon from './image/guitar.png';

function App(){
  const [content, setContent] = useState(-1);
  const [isAdmin,setAdmin] = useState(true);
  function handleClick(contentId){
    setContent(contentId);
  }
  return (
    <>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="">
            <img
              alt=""
              src={icon}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
           <Link className="myNavLink" to="/">GuitarBase </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav activeKey={content}>
            <Nav.Link as={Link} eventKey={0} to="/gallery"onClick={()=>handleClick(0)}>
              Gallery
            </Nav.Link>
            </Nav>
            <Nav activeKey={content}>
            <Nav.Link as={Link} eventKey={0} to="/upload"onClick={()=>handleClick(0)}>
              Upload
            </Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
    
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gallery" element={<Gallery Admin={isAdmin}/>} />
        <Route path="/upload" element={<Upload />} />
       
    </Routes>

    </>
  );//maybe make a route with custom string path using guitarname, then generate that page using javascript class with given arguement

}

export default App;