import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GuitarCard from './GuitarCard';
import globalVars from './globalVar';
import OverlayEdit from './OverlayEdit';
import './App.css';
import Filter from './Filter';
import { useState, useEffect } from 'react';
function Gallery({Admin=false}) {

  const [showOverlay, setShowOverlay] = useState(false);
  const [isAdmin,setAdmin] = useState(false);

  const [editData, setData] = useState({});


  const handleOpenOverlay = (initialData) => {
    setData(initialData);
    setShowOverlay(true);
  };



  const handleCloseOverlay = () => {
    setShowOverlay(false);
  };

  const [GuitarList, setGuitarList] = useState([]);
  const [filterSelection, setFilter] = useState({
    brand: "none",
    body: "none",
    pickup: "none"

  });
  const HandleFilterChange = (value) => {
    setFilter(value);
  }

  function applyFilter() {
    const params = new URLSearchParams();

    params.append('brand', filterSelection.brand);
    params.append('body', filterSelection.body);
    params.append('pickup', filterSelection.pickup);
    const url = globalVars.hostUrl + `/Guitars?${params.toString()}`;
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setGuitarList([...data]);
      });
  }

  useEffect(() => {
    applyFilter();
  }, []);

  return (
    //big div here
    <div>
      {showOverlay && <OverlayEdit onCloseOverlay={handleCloseOverlay} initialData={editData} />}
      <Container className="w-100 mw-100">

        <Row className="justify-content-center pt-2">
          <Col className="text-center"> <h2> Explore the wonderful guitars of the world! </h2></Col>
        </Row>
        <Row className="justify-content-center pt-2">
          <Col className="text-center"> <p> We upload different guitars on our website, look around and maybe you'll find what you're looking for. Enjoy!</p></Col>
        </Row>



        <Row className="justify-content-center pt-2">

          <Col className="filter" xs={2} md={2} style={{ border: "1px solid #ccc", boxSizing: "border-box", height: "300px"  }}>
            <h5>Filter</h5>
            <Filter handleChange={HandleFilterChange} />
            <button type="button" onClick={applyFilter}>Apply</button>
            <p>result {filterSelection.brand}</p>
          </Col>

          <Col className="text-center" xs={6} md={6}>
            <div className="guitar-card-container">
              {GuitarList.map((item) => (
                <div key={item.id} className="guitar-card">
                  <GuitarCard
                    id={item.id}
                    name={item.Name}
                    brand={item.Brand}
                    body={item.BodyShape}
                    pickup={item.Pickup}
                    imageUrl={item.ImageUrl}
                    isAdmin={Admin}
                    handleEdit={handleOpenOverlay}
                  />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>

    </div>
    //image, name, type(acoustic,electric,bass)
    //filter, brand, body shape, left handed?, 

  );
}

export default Gallery;