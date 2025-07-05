//Code on Car Detail for Car Booking Calculator


/*  import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import carDataJson from '/src/data/cars.json';

const CarDetails = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [totalCost, setTotalCost] = useState(null);
    const [error, setError] = useState('');
    const [confirmationMsg, setConfirmationMsg] = useState('');

    useEffect(() => {
        const data = carDataJson;
        const selectedCar = data.Cars.find((car) => car.Cid === parseInt(id));
        setCar(selectedCar);
    }, [id]);

    const calculateDays = (start, end) => {
        const startD = new Date(start);
        const endD = new Date(end);
        const delta = (endD - startD) / (1000 * 60 * 60 * 24);
        return delta > 0 ? delta : null;
    };

    const handleCalculate = () => {
        if (!startDate || !endDate) {
            setError('Please ensure start and end dates are selected.');
            setTotalCost(null);
            return;
        }

        const days = calculateDays(startDate, endDate);
        if (days === null || days === 0) {
            setError('Start date must be before end date.');
            setTotalCost(null);
            return;
        }

        const price = parseFloat(car.Prc.replace(/,/g, ''));
        const cost = days * price;
        setTotalCost(cost);
        setError('');
        setConfirmationMsg('');
    };

    const handleConfirmBooking = () => {
        if (totalCost === null) {
            setError('Please calculate cost before confirming.');
            return;
        }

        const msg = `✅ Booking Confirmed!\n\nCar: ${car.NameMMT}\nModel: ${car.Model}\nFrom: ${startDate}\nTo: ${endDate}\nTotal Cost: ${totalCost.toLocaleString()} THB`;
        setConfirmationMsg(msg);
        setError('');
    };

    if (!car) return <div className="text-center my-5">Loading...</div>;

    return (
        <Container fluid style={{ margin: "60px auto", maxWidth: "1200px" }}>
            <Row className="justify-content-center">
                <Col lg={8}>
                    <Card className="shadow-lg border-0 rounded" style={{ backgroundColor: '#fff', padding: '20px', position: 'relative' }}>
                        <Card.Body>
                            <Card.Title className="mb-4" style={{ fontSize: '2.5rem', color: '#1e2a38', fontWeight: '700', textAlign: 'center' }}>
                                {car.NameMMT} {car.Model}
                            </Card.Title>
                            <Row>
                                <Col md={6} className="d-flex align-items-center justify-content-center">
                                    {car.Img300 && (
                                        <img
                                            src={car.Img300}
                                            alt={car.Model}
                                            style={{
                                                width: '100%',
                                                maxWidth: '400px',
                                                height: 'auto',
                                                borderRadius: '15px',
                                                border: '5px solid #28a745',
                                                boxShadow: '0 8px 16px rgba(8, 8, 8, 0.2)',
                                                transition: 'transform 0.3s ease-in-out'
                                            }}
                                            className="hover-effect"
                                        />
                                    )}
                                </Col>
                                <Col md={6}>
                                    <Card.Text style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#444', paddingLeft: '20px' }}>
                                        <div className="mb-3"><strong style={{ color: '#28a745' }}>Car ID:</strong> {car.Cid}</div>
                                        <div className="mb-3"><strong style={{ color: '#28a745' }}>Model:</strong> {car.Model}</div>
                                        <div className="mb-3"><strong style={{ color: '#28a745' }}>Year:</strong> {car.Yr}</div>
                                        <div className="mb-3"><strong style={{ color: '#28a745' }}>Price:</strong> {car.Prc} {car.Currency}</div>
                                        <div className="mb-3"><strong style={{ color: '#28a745' }}>Province:</strong> {car.Province}</div>
                                        <div className="mb-3"><strong style={{ color: '#28a745' }}>Update:</strong> {car.Upd}</div>
                                    </Card.Text>     */

                                    {/* Booking Section */}   

                                 /*    <div style={{ paddingLeft: '20px' }}>
                                        <h5 className="mt-4" style={{ color: '#1e2a38' }}>Book this Car</h5>
                                        <Form>
                                            <Form.Group className="mb-2">
                                                <Form.Label>Start Date</Form.Label>
                                                <Form.Control type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="mb-2">
                                                <Form.Label>End Date</Form.Label>
                                                <Form.Control type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                                            </Form.Group>
                                            <Button variant="success" className="me-2" onClick={handleCalculate}>Calculate Cost</Button>
                                            <Button variant="primary" onClick={handleConfirmBooking}>Confirm Booking</Button>
                                        </Form>
                                        {totalCost !== null && (
                                            <Alert variant="success" className="mt-3">
                                                Total Cost: <strong>{totalCost.toLocaleString()} THB</strong>
                                            </Alert>
                                        )}
                                        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                                        {confirmationMsg && (
                                            <Alert variant="info" className="mt-3" style={{ whiteSpace: 'pre-line' }}>
                                                {confirmationMsg}
                                            </Alert>
                                        )}
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CarDetails;  */

// CODE FOR CAR DEAIL FOR CAR PURCHASE CALCULATOR

/*import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';
import carDataJson from '/src/data/cars.json';
import PurchaseCalculator from './PurchaseCalculator'; // make sure this path is correct

const CarDetails = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);

    useEffect(() => {
        const data = carDataJson;
        const selectedCar = data.Cars.find((car) => car.Cid === parseInt(id));
        setCar(selectedCar);
    }, [id]);

    if (!car) return <div className="text-center my-5">Loading...</div>;

    return (
        <Container fluid style={{ margin: "60px auto", maxWidth: "1200px" }}>
            <Row className="justify-content-center">
                <Col lg={8}>
                    <Card className="shadow-lg border-0 rounded" style={{ backgroundColor: '#fff', padding: '20px', position: 'relative' }}>
                        <Card.Body>
                            <Card.Title className="mb-4" style={{ fontSize: '2.5rem', color: '#1e2a38', fontWeight: '700', textAlign: 'center' }}>
                                {car.NameMMT} {car.Model}
                            </Card.Title>
                            <Row>
                                <Col md={6} className="d-flex align-items-center justify-content-center">
                                    {car.Img300 && (
                                        <img
                                            src={car.Img300}
                                            alt={car.Model}
                                            style={{
                                                width: '100%',
                                                maxWidth: '400px',
                                                height: 'auto',
                                                borderRadius: '15px',
                                                border: '5px solid #28a745',
                                                boxShadow: '0 8px 16px rgba(8, 8, 8, 0.2)',
                                                transition: 'transform 0.3s ease-in-out'
                                            }}
                                            className="hover-effect"
                                        />
                                    )}
                                </Col>
                                <Col md={6}>
                                    <Card.Text style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#444', paddingLeft: '20px' }}>
                                        <div className="mb-3"><strong style={{ color: '#28a745' }}>Car ID:</strong> {car.Cid}</div>
                                        <div className="mb-3"><strong style={{ color: '#28a745' }}>Model:</strong> {car.Model}</div>
                                        <div className="mb-3"><strong style={{ color: '#28a745' }}>Year:</strong> {car.Yr}</div>
                                        <div className="mb-3"><strong style={{ color: '#28a745' }}>Price:</strong> {car.Prc} {car.Currency}</div>
                                        <div className="mb-3"><strong style={{ color: '#28a745' }}>Province:</strong> {car.Province}</div>
                                        <div className="mb-3"><strong style={{ color: '#28a745' }}>Update:</strong> {car.Upd}</div>
                                    </Card.Text>  */

                                    {/* Purchase Section */}
                                  /*  <div style={{ paddingLeft: '20px' }}>
                                        <h5 className="mt-4" style={{ color: '#1e2a38' }}>Purchase this Car</h5>
                                        <PurchaseCalculator
                                            carPrice={car.Prc}
                                            carModel={car.Model}
                                            carName={car.NameMMT}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CarDetails;*/

//MAIN CODE FOR CAR DETAIL FOR CAR PURCHASE CALCULATOR

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';
import carDataJson from '/src/data/cars.json';
import PurchaseCalculator from './PurchaseCalculator'; // make sure this path is correct

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    const data = carDataJson;
    const selectedCar = data.Cars.find((car) => car.Cid === parseInt(id));
    setCar(selectedCar);
  }, [id]);

  if (!car) return <div className="text-center my-5">Loading...</div>;

  return (
    <Container fluid style={{ margin: "60px auto", maxWidth: "1200px" }}>
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="shadow-lg border-0 rounded" style={{ backgroundColor: '#fff', padding: '20px', position: 'relative' }}>
            <Card.Body>
              <Card.Title className="mb-4" style={{ fontSize: '2.5rem', color: '#1e2a38', fontWeight: '700', textAlign: 'center' }}>
                {car.NameMMT} {car.Model}
              </Card.Title>
              <Row>
                <Col md={6} className="d-flex align-items-center justify-content-center">
                  {car.Img300 && (
                    <img
                      src={car.Img300}
                      alt={car.Model}
                      style={{
                        width: '100%',
                        maxWidth: '400px',
                        height: 'auto',
                        borderRadius: '15px',
                        border: '5px solid #28a745',
                        boxShadow: '0 8px 16px rgba(8, 8, 8, 0.2)',
                        transition: 'transform 0.3s ease-in-out'
                      }}
                      className="hover-effect"
                    />
                  )}
                </Col>
                <Col md={6}>
                  <Card.Text style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#444', paddingLeft: '20px' }}>
                    <div className="mb-3"><strong style={{ color: '#28a745' }}>Car ID:</strong> {car.Cid}</div>
                    <div className="mb-3"><strong style={{ color: '#28a745' }}>Model:</strong> {car.Model}</div>
                    <div className="mb-3"><strong style={{ color: '#28a745' }}>Year:</strong> {car.Yr}</div>
                    <div className="mb-3"><strong style={{ color: '#28a745' }}>Price:</strong> {car.Prc} {car.Currency}</div>
                    <div className="mb-3"><strong style={{ color: '#28a745' }}>Province:</strong> {car.Province}</div>
                    <div className="mb-3"><strong style={{ color: '#28a745' }}>Update:</strong> {car.Upd}</div>
                  </Card.Text>

                  {/* Purchase Section */}
                  <div style={{ paddingLeft: '20px' }}>
                    <h5 className="mt-4" style={{ color: '#1e2a38' }}>Purchase this Car</h5>
                    <PurchaseCalculator
                      carPrice={car.Prc}
                      carModel={car.Model}
                      carName={car.NameMMT}
                    />
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CarDetails;


