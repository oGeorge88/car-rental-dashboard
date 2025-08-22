import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';
import PurchaseCalculator from './PurchaseCalculator';

const CarDetails = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);

    useEffect(() => {
        fetch('/data/cars.json')
            .then((res) => res.json())
            .then((data) => {
                const selectedCar = data.Cars.find((car) => car.Cid === parseInt(id));
                setCar(selectedCar);
            })
            .catch((err) => {
                console.error('Failed to fetch car data:', err);
            });
    }, [id]);

    if (!car) return <div className="text-center my-5">Loading...</div>;

    return (
        <Container fluid style={{ margin: "60px auto", maxWidth: "1200px" }}>
            <Row className="justify-content-center">
                <Col lg={8}>
                    <Card className="shadow-lg border-0 rounded-4" style={{ backgroundColor: '#fff', padding: '28px', position: 'relative' }}>
                        <Card.Body>
                            <Card.Title className="mb-4 text-center" style={{ fontSize: '2.5rem', color: '#218838', fontWeight: '700', letterSpacing: '1px' }}>
                                {car.NameMMT} <span style={{ color: '#444', fontWeight: '500' }}>{car.Model}</span>
                            </Card.Title>
                            <Row>
                                <Col md={6} className="d-flex align-items-center justify-content-center">
                                    {car.Img300 ? (
                                        <img
                                            src={car.Img300}
                                            alt={`Image of ${car.NameMMT}`}
                                            style={{
                                                width: '100%',
                                                maxWidth: '380px',
                                                height: 'auto',
                                                borderRadius: '16px',
                                                border: '4px solid #28a745',
                                                boxShadow: '0 8px 24px rgba(40,167,69,0.10)',
                                                objectFit: 'cover',
                                                background: '#f8f9fa'
                                            }}
                                        />
                                    ) : (
                                        <div style={{ width: '100%', height: '220px', background: '#e9ecef', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa' }}>
                                            No Image Available
                                        </div>
                                    )}
                                </Col>
                                <Col md={6}>
                                    <Card.Text style={{ lineHeight: '1.8', fontSize: '1.13rem', color: '#444', paddingLeft: '12px' }}>
                                        <div className="mb-2"><strong style={{ color: '#28a745' }}>Car ID:</strong> {car.Cid}</div>
                                        <div className="mb-2"><strong style={{ color: '#28a745' }}>Model:</strong> {car.Model}</div>
                                        <div className="mb-2"><strong style={{ color: '#28a745' }}>Year:</strong> {car.Yr}</div>
                                        <div className="mb-2"><strong style={{ color: '#28a745' }}>Price:</strong> {car.Prc} {car.Currency}</div>
                                        <div className="mb-2"><strong style={{ color: '#28a745' }}>Province:</strong> {car.Province}</div>
                                        <div className="mb-2"><strong style={{ color: '#28a745' }}>Update:</strong> {car.Upd}</div>
                                    </Card.Text>
                                    <div className="mt-4 p-3 rounded-4 shadow-sm" style={{ background: '#f8f9fa' }}>
                                        <h5 className="mb-3" style={{ color: '#218838', fontWeight: '600' }}>Purchase this Car</h5>
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


