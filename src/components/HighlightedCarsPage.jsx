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
        <Container style={{ marginTop: '130px' }}>
            <h2 className="text-center mb-4">Highlighted Cars</h2>
            <Row className="mt-3 gy-4">
                {highlightedCars.length > 0 ? (
                    highlightedCars.map((car) => (
                        <Col sm={12} md={6} lg={4} key={car.Cid}>
                            <Card className="shadow-lg rounded-3">
                                <Card.Body>
                                    <Card.Title className="text-center">
                                        <Link to={`/car/${car.Cid}`} style={{ color: '#023047', fontWeight: 'bold' }}>
                                            {car.NameMMT}
                                        </Link>
                                    </Card.Title>
                                    <Card.Text style={{ textAlign: 'center' }}>
                                        <strong>Model:</strong> {car.Model} <br />
                                        <strong>Year:</strong> {car.Yr} <br />
                                        <strong>Price:</strong> {car.Prc} {car.Currency} <br />
                                        <strong>Province:</strong> {car.Province} <br />
                                    </Card.Text>
                                    <div className="text-center">
                                        {car.Img300 && <img src={car.Img300} alt={car.Model} style={{ width: '100%', height: 'auto', maxHeight: '250px', objectFit: 'cover', borderRadius: '10px' }} />}
                                    </div>
                                    <div className="d-flex justify-content-center mt-3">
                                        <Button
                                            variant="danger"
                                            onClick={() => removeHighlight(car.Cid)}
                                            className="d-flex align-items-center"
                                        >
                                            Remove Highlight <FaStar className="ms-2" />
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Col>
                        <p className="text-center">No highlighted cars found.</p>
                    </Col>
                )}
            </Row>
        </Container>
    );
};

export default HighlightedCarPage;
