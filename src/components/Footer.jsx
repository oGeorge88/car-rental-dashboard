import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="bg-dark text-light py-4 mt-5">
            <Container>
                <Row>
                    <Col md={4}>
                        <h5>About Car Sales </h5>
                        <p>Providing the best car analytics and Sales and insights to help you make informed decisions.</p>
                    </Col>
                    <Col md={4}>
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="/car-analytics/" className="text-light">Dashboard</a></li>
                            <li><a href="/car-analytics/highlighted-cars" className="text-light">Highlighted Cars</a></li>
                            <li><a href="/car-analytics/statistics" className="text-light">Statistics</a></li>
                            <li><a href="/car-analytics/about" className="text-light">About</a></li>
                            <li><a href="/car-analytics/contact" className="text-light">Contact Us</a></li>
                        </ul>
                    </Col>
                    <Col md={4}>
                        <h5>Contact Information</h5>
                        <p>Email: u6520283@au.edu</p>
                        <p>Email: u6720051@au.edu</p>
                        <p>Email: u6520159@au.edu</p>
                        <p>Email: u6520177@au.edu</p>
                        <p>Email: u6540235@au.edu</p>
                    </Col>
                </Row>
                <div className="text-center mt-3">
                    <p>&copy; 2024 Car Analytics. All rights reserved.</p>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
