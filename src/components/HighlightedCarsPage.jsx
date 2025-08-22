import { useState, useEffect } from 'react';
import { Card, Row, Col, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const HighlightedCarPage = () => {
    const [highlightedCars, setHighlightedCars] = useState([]);

    useEffect(() => {
        // Fetch car data from the public folder
        fetch('/data/cars.json')
            .then((response) => response.json())
            .then((data) => {
                const highlighted = data.Cars.filter(car =>
                    localStorage.getItem(`highlighted_${car.Cid}`) === 'true'
                );
                setHighlightedCars(highlighted);
            })
            .catch((err) => {
                console.error("Failed to load car data:", err);
            });
    }, []);

    const removeHighlight = (Cid) => {
        // Remove the highlight from localStorage
        localStorage.removeItem(`highlighted_${Cid}`);

        // Update the state to remove the car from the highlighted list
        setHighlightedCars(prevCars => prevCars.filter(car => car.Cid !== Cid));
    };

    return (
        <Container style={{ marginTop: '120px', marginBottom: '60px' }}>
            <h2 className="text-center mb-4" style={{ fontWeight: '700', color: '#218838', letterSpacing: '1px' }}>Highlighted Cars</h2>
            <Row className="mt-3 gy-4">
                {highlightedCars.length > 0 ? (
                    highlightedCars.map((car) => (
                        <Col sm={12} md={6} lg={4} key={car.Cid}>
                            <Card className="shadow-lg rounded-4 border-0 h-100" style={{ transition: 'transform 0.2s', background: '#f8f9fa' }}>
                                <Card.Body>
                                    <Card.Title className="text-center mb-2">
                                        <Link to={`/car/${car.Cid}`} style={{ color: '#218838', fontWeight: 'bold', fontSize: '1.25rem', textDecoration: 'none' }}>
                                            {car.NameMMT}
                                        </Link>
                                    </Card.Title>
                                    <Card.Text style={{ textAlign: 'center', fontSize: '1.05rem', color: '#444' }}>
                                        <strong>Model:</strong> {car.Model} <br />
                                        <strong>Year:</strong> {car.Yr} <br />
                                        <strong>Price:</strong> {car.Prc} {car.Currency} <br />
                                        <strong>Province:</strong> {car.Province} <br />
                                    </Card.Text>
                                    <div className="text-center mb-2">
                                        {car.Img300 ? (
                                            <img
                                                src={car.Img300}
                                                alt={`Image of ${car.NameMMT}`}
                                                style={{ width: '100%', height: 'auto', maxHeight: '220px', objectFit: 'cover', borderRadius: '12px', boxShadow: '0 2px 8px rgba(40,167,69,0.10)' }}
                                            />
                                        ) : (
                                            <div style={{ width: '100%', height: '220px', background: '#e9ecef', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa' }}>
                                                No Image Available
                                            </div>
                                        )}
                                    </div>
                                    <div className="d-flex justify-content-center mt-3">
                                        <Button
                                            variant="outline-danger"
                                            onClick={() => removeHighlight(car.Cid)}
                                            className="d-flex align-items-center px-3"
                                            aria-label={`Remove highlight from ${car.NameMMT}`}
                                            style={{ fontWeight: '500', fontSize: '1rem', transition: 'background 0.2s' }}
                                        >
                                            Remove Highlight <FaStar className="ms-2" style={{ color: '#ffc107' }} />
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Col>
                        <div className="text-center p-5" style={{ color: '#888', fontSize: '1.15rem', background: '#f8f9fa', borderRadius: '12px', boxShadow: '0 1px 6px rgba(40,167,69,0.07)' }}>
                            <FaStar style={{ color: '#ffc107', fontSize: '2rem', marginBottom: '8px' }} />
                            <div>No highlighted cars found.<br />Start exploring and highlight your favorite cars!</div>
                        </div>
                    </Col>
                )}
            </Row>
        </Container>
    );
};

export default HighlightedCarPage;
