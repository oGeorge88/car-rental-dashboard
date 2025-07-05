import { Container, Row, Col, Card } from "react-bootstrap";

const About = () => {
  return (
    <Container
      style={{ marginTop: "130px", marginBottom: "100px", padding: "20px" }}
    >
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-lg">
            <Card.Body>
              <Card.Title
                className="text-center"
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: "#28a745",
                }}
              >
                About Car Analytics
              </Card.Title>
              <Card.Text
                className="mt-4"
                style={{ fontSize: "1.1rem", lineHeight: "1.6", color: "#555" }}
              >
                Welcome to the Car Analytics and Slaes application! Our goal is to offer a
                user-friendly experience for car enthusiasts.
              </Card.Text>
              <Card.Text
                className="mt-4"
                style={{ fontSize: "1.1rem", lineHeight: "1.6", color: "#555" }}
              >
                <strong style={{ color: "#28a745" }}>Technologies Used:</strong>
                <ul className="mt-3">
                  <li>
                    React: For building a dynamic and responsive user interface.
                  </li>
                  <li>
                    Vite: A fast build tool and development server for modern
                    web projects.
                  </li>
                  <li>
                    React Bootstrap: For creating a responsive, mobile-first
                    front-end design.
                  </li>
                </ul>
              </Card.Text>
              <Card.Text
                className="mt-4"
                style={{ fontSize: "1.1rem", lineHeight: "1.6", color: "#555" }}
              >
                This application is our first project and we greatly value your
                feedback and suggestions. Thank you for being part of our
                journey!
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
