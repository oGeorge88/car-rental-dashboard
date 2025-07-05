import { Navbar, Nav, Container } from "react-bootstrap";
import Logo from "/public/logo.png"; // Adjust the path according to your project structure
import { Link } from "react-router-dom";

const AppNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          style={{ display: "flex", alignItems: "center", fontSize: "24px" }}
        >
          <img
            alt="Brand Logo"
            src={Logo}
            style={{ width: "60px", height: "auto", marginRight: "10px" }}
          />{" "}
          Groot Car Analytics & Sales 
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/highlighted-cars">
              Highlighted Cars
            </Nav.Link>
            <Nav.Link as={Link} to="/statistics">
              Statistics
            </Nav.Link>
            <Nav.Link as={Link} to="/loan-advisor">
              Loan Advisor
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
