import { Container, Row, Col, Card } from "react-bootstrap";

const About = () => {
  return (
    <Container style={{ marginTop: "120px", marginBottom: "80px", padding: "24px" }}>
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="shadow-lg border-0">
            <Card.Body>
              <Card.Title className="text-center" style={{ fontSize: "2.2rem", fontWeight: "bold", color: "#218838" }}>
                About Car Analytics & Sales
              </Card.Title>
              <Card.Text className="mt-4" style={{ fontSize: "1.15rem", lineHeight: "1.7", color: "#444" }}>
                <span style={{ fontWeight: "500" }}>Empowering Your Car Decisions</span>
                <br />
                Car Analytics & Sales is dedicated to providing a seamless, data-driven experience for car buyers, sellers, and enthusiasts. Our mission is to simplify the car selection and purchasing process through smart analytics, intuitive tools, and transparent information.
              </Card.Text>
              <Card.Text className="mt-4" style={{ fontSize: "1.1rem", lineHeight: "1.7", color: "#444" }}>
                <strong style={{ color: "#218838" }}>Key Features:</strong>
                <ul className="mt-3">
                  <li>Comprehensive car data and analytics</li>
                  <li>Smart loan and purchase calculators</li>
                  <li>Advanced search and filtering options</li>
                  <li>Modern, responsive dashboard</li>
                  <li>Easy-to-use booking and contact tools</li>
                </ul>
              </Card.Text>
              <Card.Text className="mt-4" style={{ fontSize: "1.1rem", lineHeight: "1.7", color: "#444" }}>
                <strong style={{ color: "#218838" }}>Technologies Used:</strong>
                <ul className="mt-3">
                  <li>React – Dynamic and responsive user interface</li>
                  <li>Vite – Fast build tool and development server</li>
                  <li>React Bootstrap – Mobile-first, accessible design</li>
                </ul>
              </Card.Text>
              <Card.Text className="mt-4" style={{ fontSize: "1.1rem", lineHeight: "1.7", color: "#444" }}>
                <span style={{ fontWeight: "500", color: "#218838" }}>We Value Your Feedback</span>
                <br />
                This is our first project, and your feedback helps us grow and improve. Thank you for supporting our journey!
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
