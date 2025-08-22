import { Navbar, Nav, Container } from "react-bootstrap";
import Logo from "/public/logo.png"; // Adjust the path according to your project structure
import { Link } from "react-router-dom";

const AppNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.12)", padding: "0.5rem 0" }}>
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          style={{ display: "flex", alignItems: "center", fontSize: "1.7rem", fontWeight: "600", letterSpacing: "1px" }}
        >
          <img
            alt="Groot Car Analytics Logo"
            src={Logo}
            style={{ width: "48px", height: "48px", objectFit: "contain", marginRight: "14px", borderRadius: "8px", boxShadow: "0 1px 6px rgba(40,167,69,0.15)" }}
          />
          <span style={{ color: "#28a745" }}>Groot Car Analytics</span>
          <span style={{ color: "#fff", fontSize: "1rem", marginLeft: "8px", fontWeight: "400" }}>& Sales</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar-nav" aria-label="Toggle navigation" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="ms-auto" style={{ gap: "0.5rem" }}>
            <Nav.Link as={Link} to="/" style={{ color: "#fff", fontWeight: "500", fontSize: "1.05rem" }} activeClassName="active">
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/highlighted-cars" style={{ color: "#fff", fontWeight: "500", fontSize: "1.05rem" }} activeClassName="active">
              Highlighted Cars
            </Nav.Link>
            <Nav.Link as={Link} to="/statistics" style={{ color: "#fff", fontWeight: "500", fontSize: "1.05rem" }} activeClassName="active">
              Statistics
            </Nav.Link>
            <Nav.Link as={Link} to="/loan-advisor" style={{ color: "#fff", fontWeight: "500", fontSize: "1.05rem" }} activeClassName="active">
              Loan Advisor
            </Nav.Link>
            <Nav.Link as={Link} to="/about" style={{ color: "#fff", fontWeight: "500", fontSize: "1.05rem" }} activeClassName="active">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" style={{ color: "#fff", fontWeight: "500", fontSize: "1.05rem" }} activeClassName="active">
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
