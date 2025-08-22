import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import georgeImage from '/src/assets/George.png';
import placeholderImage from '/src/assets/placeholder.png'; // Use a generic team member image

const owners = [
    {
        name: 'Oguejiofor George Obinna',
        id: '6520283',
        email: 'u6520283@au.edu',
        image: georgeImage,
        phone: '0632100659',
    },
    {
        name: 'Marazal Bahrainee Islam',
        id: '6720051',
        email: 'u6720051@au.edu',
        image: placeholderImage,
        phone: '',
    },
    {
        name: 'Chhialy Klo',
        id: '6520159',
        email: 'u6520159@au.edu',
        image: placeholderImage,
        phone: '',
    },
    {
        name: 'Meassavrin Savuth',
        id: '6520177',
        email: 'u6520177@au.edu',
        image: placeholderImage,
        phone: '',
    },
    {
        name: 'Vireak La',
        id: '6540235',
        email: 'u6540235@au.edu',
        image: placeholderImage,
        phone: '',
    },
];

const ContactPage = () => {
    const [reviewName, setReviewName] = useState('');
    const [reviewRating, setReviewRating] = useState('');
    const [reviewMessage, setReviewMessage] = useState('');
    const [contactName, setContactName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactMessage, setContactMessage] = useState('');

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        const reviewData = {
            name: reviewName,
            rating: reviewRating,
            message: reviewMessage,
        };
        const savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
        savedReviews.push(reviewData);
        localStorage.setItem('reviews', JSON.stringify(savedReviews));
        setReviewName('');
        setReviewRating('');
        setReviewMessage('');
        alert('Review submitted successfully!');
    };

    const handleContactSubmit = (e) => {
        e.preventDefault();
        const contactData = {
            name: contactName,
            email: contactEmail,
            message: contactMessage,
        };
        const savedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
        savedContacts.push(contactData);
        localStorage.setItem('contacts', JSON.stringify(savedContacts));
        setContactName('');
        setContactEmail('');
        setContactMessage('');
        alert('Message sent successfully!');
    };

    return (
        <Container style={{ marginTop: '120px', marginBottom: '60px' }}>
            <h2 className="text-center mb-5" style={{ color: '#218838', fontWeight: '700', letterSpacing: '1px' }}>Contact & Team</h2>
            <Row className="mb-4 justify-content-center">
                {owners.map((owner, index) => (
                    <Col md={5} lg={4} key={index} className="mb-4">
                        <Card className="text-center h-100 shadow-sm border-0 rounded-4">
                            <Card.Img
                                variant="top"
                                src={owner.image}
                                alt={`Photo of ${owner.name}`}
                                style={{ height: '180px', objectFit: 'cover', borderRadius: '16px 16px 0 0', background: '#f8f9fa' }}
                            />
                            <Card.Body>
                                <Card.Title style={{ fontWeight: '600', color: '#218838' }}>{owner.name}</Card.Title>
                                <Card.Text style={{ fontSize: '1.05rem', color: '#444' }}>
                                    <strong>ID:</strong> {owner.id} <br />
                                    <strong>Email:</strong>{' '}
                                    <a href={`mailto:${owner.email}`} style={{ color: '#0d6efd' }}>{owner.email}</a> <br />
                                    {owner.phone && (
                                        <span><strong>Phone:</strong> {owner.phone} <br /></span>
                                    )}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Card className="mt-5 mb-4 shadow-sm border-0 rounded-4">
                <Card.Body>
                    <h3 className="mb-4" style={{ color: '#218838', fontWeight: '600' }}>Leave a Review</h3>
                    <Form onSubmit={handleReviewSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="reviewName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your name"
                                        value={reviewName}
                                        onChange={(e) => setReviewName(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="reviewRating">
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Select
                                        value={reviewRating}
                                        onChange={(e) => setReviewRating(e.target.value)}
                                        required
                                    >
                                        <option value="">Choose...</option>
                                        <option value="5">5 - Excellent</option>
                                        <option value="4">4 - Good</option>
                                        <option value="3">3 - Average</option>
                                        <option value="2">2 - Poor</option>
                                        <option value="1">1 - Terrible</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group controlId="reviewMessage" className="mt-3">
                            <Form.Label>Review</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                placeholder="Write your review here..."
                                value={reviewMessage}
                                onChange={(e) => setReviewMessage(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <div className="d-flex justify-content-end">
                            <Button variant="success" type="submit" className="mt-3 px-4" style={{ fontWeight: '500' }}>
                                Submit Review
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>

            <Card className="mb-5 shadow-sm border-0 rounded-4">
                <Card.Body>
                    <h3 className="mb-4" style={{ color: '#218838', fontWeight: '600' }}>Contact Us</h3>
                    <Form onSubmit={handleContactSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="contactName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your name"
                                        value={contactName}
                                        onChange={(e) => setContactName(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="contactEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter your email"
                                        value={contactEmail}
                                        onChange={(e) => setContactEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group controlId="contactMessage" className="mt-3">
                            <Form.Label>Message</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                placeholder="Write your message here..."
                                value={contactMessage}
                                onChange={(e) => setContactMessage(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <div className="d-flex justify-content-end">
                            <Button variant="success" type="submit" className="mt-3 px-4" style={{ fontWeight: '500' }}>
                                Send Message
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ContactPage;
