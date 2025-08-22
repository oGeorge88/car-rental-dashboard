import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-dark text-light py-4 mt-5" aria-label="Site Footer">
            <Container>
                <Row>
                    <Col md={4} className="mb-3 mb-md-0">
                        <h5 style={{ color: '#28a745', fontWeight: '600' }}>About Car Analytics</h5>
                        <p style={{ fontSize: '1.05rem', color: '#ccc' }}>
                            Providing the best car analytics, sales, and insights to help you make informed decisions. Empowering your car journey with data-driven tools.
                        </p>
                    </Col>
                    <Col md={4} className="mb-3 mb-md-0">
                        <h5 style={{ color: '#28a745', fontWeight: '600' }}>Quick Links</h5>
                        <ul className="list-unstyled" style={{ fontSize: '1.05rem' }}>
                            <li><Link to="/" className="text-light text-decoration-none" style={{ transition: 'color 0.2s' }}>Dashboard</Link></li>
                            <li><Link to="/highlighted-cars" className="text-light text-decoration-none" style={{ transition: 'color 0.2s' }}>Highlighted Cars</Link></li>
                            <li><Link to="/statistics" className="text-light text-decoration-none" style={{ transition: 'color 0.2s' }}>Statistics</Link></li>
                            <li><Link to="/about" className="text-light text-decoration-none" style={{ transition: 'color 0.2s' }}>About</Link></li>
                            <li><Link to="/contact" className="text-light text-decoration-none" style={{ transition: 'color 0.2s' }}>Contact Us</Link></li>
                        </ul>
                    </Col>
                    <Col md={4}>
                        <h5 style={{ color: '#28a745', fontWeight: '600' }}>Contact Information</h5>
                        <ul className="list-unstyled" style={{ fontSize: '1.05rem' }}>
                            <li><a href="mailto:u6520283@au.edu" className="text-light text-decoration-none">u6520283@au.edu</a></li>
                            <li><a href="mailto:u6720051@au.edu" className="text-light text-decoration-none">u6720051@au.edu</a></li>
                            <li><a href="mailto:u6520159@au.edu" className="text-light text-decoration-none">u6520159@au.edu</a></li>
                            <li><a href="mailto:u6520177@au.edu" className="text-light text-decoration-none">u6520177@au.edu</a></li>
                            <li><a href="mailto:u6540235@au.edu" className="text-light text-decoration-none">u6540235@au.edu</a></li>
                        </ul>
                    </Col>
                </Row>
                <div className="text-center mt-4">
                    <hr style={{ borderColor: '#28a745', opacity: 0.3 }} />
                    <p style={{ color: '#aaa', fontSize: '1rem', marginBottom: 0 }}>&copy; 2024 Car Analytics. All rights reserved.</p>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
