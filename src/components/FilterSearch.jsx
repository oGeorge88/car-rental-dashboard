import { Form, Button, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import PropTypes from 'prop-types';

const FilterSearch = ({ onFilter }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onFilter(query);
  };

  return (
    <Form onSubmit={handleSearch} className="w-100" role="search" aria-label="Car search form">
      <Row className="g-2 align-items-center justify-content-center">
        <Col xs={8} md={9} lg={10}>
          <Form.Group controlId="searchQuery" className="mb-0">
            <Form.Control
              type="text"
              placeholder="Search by brand, model, year, price, or province..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search cars"
              autoComplete="off"
              style={{ fontSize: '1.1rem', padding: '10px 14px', borderRadius: '8px' }}
            />
          </Form.Group>
        </Col>
        <Col xs={4} md={3} lg={2} className="d-flex justify-content-end">
          <Button
            variant="success"
            type="submit"
            style={{ fontWeight: '500', padding: '10px 24px', borderRadius: '8px', fontSize: '1.1rem' }}
            aria-label="Search"
          >
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
FilterSearch.propTypes = {
  onFilter: PropTypes.func.isRequired,
};

export default FilterSearch;
