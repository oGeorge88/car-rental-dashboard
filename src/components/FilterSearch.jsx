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
    <Form onSubmit={handleSearch}>
      <Row>
        <Col>
          <Form.Control
            type="text"
            placeholder="Search by ..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Col>
        <Col>
          <Button variant="success" type="submit">
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
