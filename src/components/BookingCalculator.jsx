import { useState } from 'react';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

const INSURANCE_DAILY_RATE = 300; // THB per day
const LATE_FEE_RATE = 0.2; // 20% of daily rate per late day
const DISCOUNT_DAYS = 7;
const DISCOUNT_RATE = 0.1; // 10%

const BookingCalculator = ({ carPrice, carModel, carName, onConfirm }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [actualReturnDate, setActualReturnDate] = useState('');
  const [insurance, setInsurance] = useState(false);
  const [distance, setDistance] = useState('');
  const [fuelEfficiency, setFuelEfficiency] = useState('');
  const [fuelPrice, setFuelPrice] = useState('');
  const [totalCost, setTotalCost] = useState(null);
  const [breakdown, setBreakdown] = useState(null);
  const [error, setError] = useState('');
  const [confirmationMsg, setConfirmationMsg] = useState('');

  const calculateDays = (start, end) => {
    const startD = new Date(start);
    const endD = new Date(end);
    const delta = (endD - startD) / (1000 * 60 * 60 * 24);
    return delta > 0 ? delta : null;
  };

  const calculateLateDays = (plannedEnd, actualEnd) => {
    if (!actualEnd) return 0;
    const planned = new Date(plannedEnd);
    const actual = new Date(actualEnd);
    const delta = (actual - planned) / (1000 * 60 * 60 * 24);
    return delta > 0 ? Math.ceil(delta) : 0;
  };

  const handleCalculate = () => {
    if (!startDate || !endDate) {
      setError('Please ensure both start and end dates are selected.');
      setTotalCost(null);
      setBreakdown(null);
      return;
    }
    const days = calculateDays(startDate, endDate);
    if (!days) {
      setError('Start date must be before end date.');
      setTotalCost(null);
      setBreakdown(null);
      return;
    }
    const dailyRate = parseFloat(carPrice.replace(/,/g, ''));
    let baseRental = days * dailyRate;
    let discount = 0;
    if (days > DISCOUNT_DAYS) {
      discount = baseRental * DISCOUNT_RATE;
      baseRental -= discount;
    }
    const insuranceCost = insurance ? days * INSURANCE_DAILY_RATE : 0;
    // Fuel cost
    let fuelCost = 0;
    if (distance && fuelEfficiency && fuelPrice) {
      const dist = parseFloat(distance);
      const eff = parseFloat(fuelEfficiency);
      const price = parseFloat(fuelPrice);
      if (!isNaN(dist) && !isNaN(eff) && !isNaN(price) && eff > 0) {
        fuelCost = (dist / eff) * price;
      }
    }
    // Late fee
    const lateDays = calculateLateDays(endDate, actualReturnDate);
    const lateFee = lateDays * dailyRate * LATE_FEE_RATE;
    // Total
    const total = baseRental + insuranceCost + fuelCost + lateFee;
    setTotalCost(total);
    setBreakdown({
      days,
      dailyRate,
      baseRental,
      discount,
      insuranceCost,
      fuelCost,
      lateDays,
      lateFee,
      total
    });
    setError('');
    setConfirmationMsg('');
  };

  const saveTransaction = (tx) => {
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    transactions.push(tx);
    localStorage.setItem('transactions', JSON.stringify(transactions));
  };

  const handleConfirm = () => {
    if (totalCost === null) {
      setError('Please calculate cost before confirming booking.');
      return;
    }
    const message = `\u2705 Booking Confirmed!\n\nCar: ${carName}\nModel: ${carModel}\nFrom: ${startDate}\nTo: ${endDate}\nTotal Cost: ${totalCost.toLocaleString()} THB`;
    setConfirmationMsg(message);
    setError('');
    // Save transaction
    saveTransaction({
      carName,
      carModel,
      amount: totalCost,
      date: new Date().toISOString(),
      type: 'booking'
    });
    onConfirm && onConfirm({ carName, carModel, startDate, endDate, totalCost, breakdown });
  };

  return (
    <div className="mt-4">
      <Form>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-2">
              <Form.Label>Start Date</Form.Label>
              <Form.Control type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-2">
              <Form.Label>End Date</Form.Label>
              <Form.Control type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-2">
          <Form.Check type="checkbox" label={`Add Insurance (${INSURANCE_DAILY_RATE} THB/day)`} checked={insurance} onChange={e => setInsurance(e.target.checked)} />
        </Form.Group>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-2">
              <Form.Label>Distance (km)</Form.Label>
              <Form.Control type="number" value={distance} onChange={e => setDistance(e.target.value)} placeholder="e.g. 100" />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-2">
              <Form.Label>Fuel Efficiency (km/l)</Form.Label>
              <Form.Control type="number" value={fuelEfficiency} onChange={e => setFuelEfficiency(e.target.value)} placeholder="e.g. 12" />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-2">
              <Form.Label>Fuel Price (THB/l)</Form.Label>
              <Form.Control type="number" value={fuelPrice} onChange={e => setFuelPrice(e.target.value)} placeholder="e.g. 38" />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-2">
          <Form.Label>Actual Return Date (for late fee, optional)</Form.Label>
          <Form.Control type="date" value={actualReturnDate} onChange={e => setActualReturnDate(e.target.value)} />
        </Form.Group>
        <Button variant="success" className="me-2" onClick={handleCalculate}>Calculate Cost</Button>
        <Button variant="primary" onClick={handleConfirm}>Confirm Booking</Button>
      </Form>
      {breakdown && (
        <Alert variant="success" className="mt-3">
          <div><strong>Cost Breakdown:</strong></div>
          <ul style={{ marginBottom: 0 }}>
            <li>Rental Days: {breakdown.days}</li>
            <li>Daily Rate: {breakdown.dailyRate.toLocaleString()} THB</li>
            <li>Base Rental: {breakdown.baseRental.toLocaleString()} THB</li>
            {breakdown.discount > 0 && <li>Discount: -{breakdown.discount.toLocaleString()} THB</li>}
            {breakdown.insuranceCost > 0 && <li>Insurance: {breakdown.insuranceCost.toLocaleString()} THB</li>}
            {breakdown.fuelCost > 0 && <li>Fuel Cost: {breakdown.fuelCost.toLocaleString(undefined, { maximumFractionDigits: 0 })} THB</li>}
            {breakdown.lateDays > 0 && <li>Late Fee: {breakdown.lateFee.toLocaleString()} THB ({breakdown.lateDays} days late)</li>}
            <li><strong>Total: {breakdown.total.toLocaleString()} THB</strong></li>
          </ul>
        </Alert>
      )}
      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      {confirmationMsg && (
        <Alert variant="info" className="mt-3" style={{ whiteSpace: 'pre-line' }}>
          {confirmationMsg}
        </Alert>
      )}
    </div>
  );
};

BookingCalculator.propTypes = {
  carPrice: PropTypes.string.isRequired,
  carModel: PropTypes.string.isRequired,
  carName: PropTypes.string.isRequired,
  onConfirm: PropTypes.func
};

export default BookingCalculator;

// Original logic (for reference):
/*
const cost = days * parseFloat(carPrice.replace(/,/g, ''));
setTotalCost(cost);
*/