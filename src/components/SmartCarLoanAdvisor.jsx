import { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Alert,
  Table,
} from 'react-bootstrap';
import './SmartCarLoanAdvisor.css';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const SmartCarLoanAdvisor = () => {
  /* ---------------- State ---------------- */
  const [allCars, setAllCars] = useState([]);          // full data set
  const [availableCars, setAvailableCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);

  const [purpose, setPurpose] = useState('family');
  const [creditScore, setCreditScore] = useState('');
  const [salary, setSalary] = useState('');

  // loan‑input states
  const [downPayment, setDownPayment] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [startDate, setStartDate] = useState('');

  // output states
  const [recommendation, setRecommendation] = useState(null);
  const [loanResult, setLoanResult] = useState(null);

  /* ------------ 1. Load car data ------------ */
  useEffect(() => {
    fetch('/data/cars.json')
      .then((res) => res.json())
      .then((data) => setAllCars(data.Cars || []))
      .catch((err) =>
        console.error('❌ Failed to load /data/cars.json ‑', err)
      );
  }, []);

  /* ------------ 2. Helper tables ------------ */
  const carCategories = {
    family: [
      'CRV',
      'HRV',
      'X1',
      'X7',
      'ALPHARD',
      'FORTUNER',
      'COROLLA CROSS',
      'MU-X',
      'EVEREST',
      'STEPWAGON',
      'STARIA',
    ],
    commute: [
      'CIVIC',
      'MG 3',
      'MG 4',
      'MG 5',
      'CITY',
      'YARIS',
      'ALMERA',
      'ATTRAGE',
      'CIAZ',
      'SWIFT',
      'MAZDA2',
      'ZS',
    ],
    travel: [
      'CRV',
      'X1',
      'X7',
      'FORTUNER',
      'COROLLA CROSS',
      'MU-X',
      'EVEREST',
      'PAJERO',
      'RANGER',
    ],
    heavy: ['RANGER', 'TRITON', 'D-MAX', 'NAVARA', 'HILUX', 'CARRY PICKUP'],
  };

  /* ------------ 3. Recommendation logic ------------ */
  const getCarsByPurpose = (useCase) => {
    const keywords = carCategories[useCase] ?? [];
    const matches = allCars.filter((car) => {
      const model = (car.Model || '').toUpperCase();
      const name = (car.NameMMT || '').toUpperCase();
      return keywords.some((kw) => model.includes(kw) || name.includes(kw));
    });
    return matches.length ? matches.slice(0, 15) : allCars.slice(0, 10);
  };

  const recommendCar = () => {
    if (!creditScore || !salary) {
      alert('Please fill in credit score and salary first.');
      return;
    }
    if (allCars.length === 0) {
      alert('Car data not loaded yet. Please wait a moment and try again.');
      return;
    }

    /* ---- affordability multiplier ---- */
    const score = parseInt(creditScore, 10);
    const monthSalary = parseInt(salary, 10);
    if (isNaN(score) || isNaN(monthSalary)) {
      alert('Invalid credit score or salary.');
      return;
    }
    const multiplier = score >= 750 ? 1 : score >= 650 ? 0.75 : 0.5;
    const maxAffordable = monthSalary * multiplier * 12;

    /* ---- filter cars ---- */
    const cars = getCarsByPurpose(purpose);
    const affordable = [];
    const expensive = [];

    cars.forEach((c) => {
      const price = parseInt(c.Prc.replace(/,/g, ''), 10) || 0;
      (price <= maxAffordable ? affordable : expensive).push(c);
    });

    setAvailableCars([...affordable, ...expensive].slice(0, 8));
    setSelectedCar(null);       // reset any previous pick
    setLoanResult(null);        // clear prior loan calc

    setRecommendation({
      message:
        affordable.length > 0
          ? `✅ Found ${affordable.length} cars within budget.`
          : '⚠️ All suggested cars exceed your ideal budget.',
      affordable: affordable.length > 0,
      affordableCount: affordable.length,
    });
  };

  /* ------------ 4. Loan calculation ------------ */
  const calculateLoan = () => {
    if (
      !selectedCar ||
      !downPayment ||
      !interestRate ||
      !loanTerm ||
      !startDate
    ) {
      alert('Please complete all loan input fields.');
      return;
    }

    const price = parseInt(selectedCar.Prc.replace(/,/g, ''), 10);
    const down = parseFloat(downPayment);
    const rate = parseFloat(interestRate) / 100 / 12;
    const term = parseInt(loanTerm, 10);

    if ([price, down, rate, term].some((x) => isNaN(x) || x <= 0)) {
      alert('Please enter valid numeric values.');
      return;
    }

    const loanAmount = price - down;
    const monthly =
      (loanAmount * rate * Math.pow(1 + rate, term)) /
      (Math.pow(1 + rate, term) - 1);

    /* schedule */
    const schedule = [];
    const start = new Date(startDate);
    const endDate = new Date(start);
    for (let i = 1; i <= term; i++) {
      const payDate = new Date(start);
      payDate.setMonth(start.getMonth() + i);
      schedule.push({
        month: i,
        date: payDate.toISOString().split('T')[0],
        amount: monthly.toFixed(2),
      });
    }
    endDate.setMonth(start.getMonth() + term);

    setLoanResult({
      loanAmount: loanAmount.toFixed(2),
      monthlyPayment: monthly.toFixed(2),
      endDate: endDate.toISOString().split('T')[0],
      paymentSchedule: schedule,
    });
  };

  /* ------------ 5. Render ------------ */
  const maxAffordable =
    creditScore && salary
      ? parseInt(salary, 10) *
        (creditScore >= 750 ? 1 : creditScore >= 650 ? 0.75 : 0.5) *
        12
      : 0;

  return (
    <Container className="mt-5 pt-5">
      <Row>
        <Col>
          <Card className="shadow">
            <Card.Header className="bg-primary text-white text-center">
              <h1 className="mb-0">Smart Car Loan Advisor</h1>
            </Card.Header>

            <Card.Body className="p-4">
              <Row>
                {/* ---------------- LEFT COLUMN ---------------- */}
                <Col md={6}>
                  <h4 className="text-primary mb-3">1. Car Usage Purpose</h4>
                  <Form.Select
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="mb-4"
                  >
                    <option value="family">Family</option>
                    <option value="commute">Commute</option>
                    <option value="travel">Travel</option>
                    <option value="heavy">Heavy Load</option>
                  </Form.Select>

                  <h4 className="text-primary mb-3">2. Your Finances</h4>

                  <Form.Group className="mb-3">
                    <Form.Label>Credit Score (300 – 850)</Form.Label>
                    <Form.Control
                      type="number"
                      min="300"
                      max="850"
                      value={creditScore}
                      onChange={(e) => setCreditScore(e.target.value)}
                      placeholder="e.g. 720"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Monthly Salary (THB)</Form.Label>
                    <Form.Control
                      type="number"
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                      placeholder="e.g. 45,000"
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    size="lg"
                    className="w-100"
                    onClick={recommendCar}
                  >
                    Get Recommendations
                  </Button>
                </Col>

                {/* ---------------- RIGHT COLUMN ---------------- */}
                <Col md={6}>
                  {recommendation && (
                    <Alert
                      variant={recommendation.affordable ? 'success' : 'warning'}
                    >
                      <h5 className="d-flex align-items-center mb-2">
                        {recommendation.affordable ? (
                          <FaCheckCircle className="me-2 text-success" />
                        ) : (
                          <FaExclamationTriangle className="me-2 text-warning" />
                        )}
                        Car Recommendations
                      </h5>
                      <p className="mb-0">{recommendation.message}</p>
                      {recommendation.affordable && (
                        <p className="mb-0 fw-bold">
                          Affordable options: {recommendation.affordableCount}
                        </p>
                      )}
                    </Alert>
                  )}

                  {/* ---- Available cars list ---- */}
                  {availableCars.length > 0 && (
                    <>
                      <h5 className="mt-3">Available Cars</h5>
                      <Row>
                        {availableCars.map((car) => {
                          const price = parseInt(
                            car.Prc.replace(/,/g, ''),
                            10
                          );
                          const isAffordable = price <= maxAffordable;

                          return (
                            <Col md={6} key={car.Cid} className="mb-3">
                              <Card
                                className={`h-100 ${
                                  selectedCar?.Cid === car.Cid
                                    ? 'border-primary'
                                    : ''
                                } ${
                                  isAffordable
                                    ? 'border-success'
                                    : 'border-warning'
                                }`}
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                  setSelectedCar(car);
                                  setLoanResult(null); // clear any old loan calc
                                }}
                              >
                                <img
                                  src={car.Img300}
                                  alt={car.Model}
                                  className="card-img-top"
                                  style={{
                                    height: '120px',
                                    objectFit: 'cover',
                                  }}
                                />
                                <Card.Body className="p-2">
                                  <h6 className="mb-1">{car.Model}</h6>
                                  <p className="mb-1 small text-muted">
                                    {car.NameMMT}
                                  </p>
                                  <p className="mb-1 fw-bold">{car.Prc} THB</p>
                                  <p className="mb-1 small">
                                    {car.Yr} • {car.Province}
                                  </p>
                                  <span
                                    className={`badge ${
                                      isAffordable
                                        ? 'bg-success'
                                        : 'bg-warning'
                                    }`}
                                  >
                                    {isAffordable
                                      ? 'Affordable'
                                      : 'Above Budget'}
                                  </span>
                                </Card.Body>
                              </Card>
                            </Col>
                          );
                        })}
                      </Row>
                    </>
                  )}

                  {/* ---- Loan planner ---- */}
                  {selectedCar && (
                    <Card className="mt-4">
                      <Card.Header>
                        <h5 className="mb-0">
                          3. Loan Planner — {selectedCar.Model}
                        </h5>
                      </Card.Header>
                      <Card.Body>
                        <img
                          src={selectedCar.Img300}
                          alt={selectedCar.Model}
                          className="img-fluid rounded mb-3"
                          style={{ maxHeight: '140px', objectFit: 'cover' }}
                        />
                        <p className="mb-1">
                          <strong>Price:</strong> {selectedCar.Prc} THB
                        </p>
                        <p className="mb-1">
                          <strong>Year:</strong> {selectedCar.Yr}
                        </p>
                        <p className="mb-3">
                          <strong>Location:</strong> {selectedCar.Province}
                        </p>

                        <Form.Group className="mb-2">
                          <Form.Label>Down Payment (THB)</Form.Label>
                          <Form.Control
                            type="number"
                            value={downPayment}
                            onChange={(e) => setDownPayment(e.target.value)}
                          />
                        </Form.Group>

                        <Form.Group className="mb-2">
                          <Form.Label>Annual Interest Rate (%)</Form.Label>
                          <Form.Control
                            type="number"
                            step="0.1"
                            value={interestRate}
                            onChange={(e) => setInterestRate(e.target.value)}
                          />
                        </Form.Group>

                        <Form.Group className="mb-2">
                          <Form.Label>Loan Term (months)</Form.Label>
                          <Form.Control
                            type="number"
                            value={loanTerm}
                            onChange={(e) => setLoanTerm(e.target.value)}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Loan Start Date</Form.Label>
                          <Form.Control
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                          />
                        </Form.Group>

                        <Button className="w-100" onClick={calculateLoan}>
                          Calculate Loan
                        </Button>
                      </Card.Body>
                    </Card>
                  )}
                </Col>
              </Row>

              {/* ---- Loan results ---- */}
              {loanResult && (
                <Row className="mt-4">
                  <Col>
                    <Card>
                      <Card.Header>
                        <h4 className="mb-0">Loan Calculation Results</h4>
                      </Card.Header>
                      <Card.Body>
                        <Row className="text-center">
                          <Col md={4}>
                            <h6>Loan Amount</h6>
                            <h3 className="text-primary">
                              {loanResult.loanAmount} THB
                            </h3>
                          </Col>
                          <Col md={4}>
                            <h6>Monthly Payment</h6>
                            <h3 className="text-success">
                              {loanResult.monthlyPayment} THB
                            </h3>
                          </Col>
                          <Col md={4}>
                            <h6>Loan Ends</h6>
                            <h3 className="text-info">
                              {loanResult.endDate}
                            </h3>
                          </Col>
                        </Row>

                        <h5 className="mt-4">Payment Schedule</h5>
                        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                          <Table striped bordered hover size="sm">
                            <thead>
                              <tr>
                                <th>Month</th>
                                <th>Payment Date</th>
                                <th>Amount (THB)</th>
                              </tr>
                            </thead>
                            <tbody>
                              {loanResult.paymentSchedule.map((row) => (
                                <tr key={row.month}>
                                  <td>{row.month}</td>
                                  <td>{row.date}</td>
                                  <td>{row.amount}</td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SmartCarLoanAdvisor;
