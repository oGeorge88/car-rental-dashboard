import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, Table } from 'react-bootstrap';
import carData from '../data/cars.json';
import './SmartCarLoanAdvisor.css';

const SmartCarLoanAdvisor = () => {
  const [purpose, setPurpose] = useState('family');
  const [creditScore, setCreditScore] = useState('');
  const [salary, setSalary] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [recommendation, setRecommendation] = useState(null);
  const [loanResult, setLoanResult] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [availableCars, setAvailableCars] = useState([]);

  // Car categories based on purpose - using actual model names from the data
  const carCategories = {
    family: ['CRV', 'HRV', 'X1', 'X7', 'ALPHARD', 'FORTUNER', 'COROLLA CROSS', 'MU-X', 'EVEREST', 'STEPWAGON', 'STARIA'],
    commute: ['CIVIC', 'MG 3', 'MG 4', 'MG 5', 'CITY', 'YARIS', 'ALMERA', 'ATTRAGE', 'CIAZ', 'SWIFT', 'MAZDA2', 'ZS'],
    travel: ['CRV', 'X1', 'X7', 'FORTUNER', 'COROLLA CROSS', 'MU-X', 'EVEREST', 'PAJERO', 'RANGER'],
    heavy: ['RANGER', 'TRITON', 'D-MAX', 'NAVARA', 'HILUX', 'CARRY PICKUP']
  };

  // Get cars based on purpose
  const getCarsByPurpose = (purpose) => {
    const categories = carCategories[purpose];
    console.log('Looking for categories:', categories);
    console.log('Total cars in database:', carData.Cars.length);
    
    const filteredCars = carData.Cars.filter(car => {
      const model = car.Model?.toUpperCase() || '';
      const nameMMT = car.NameMMT?.toUpperCase() || '';
      
      // Check if the model or name contains any of the category keywords
      const matches = categories.some(category => 
        model.includes(category) || nameMMT.includes(category)
      );
      
      if (matches) {
        console.log('Found matching car:', car.Model, car.NameMMT, car.Prc);
      }
      
      return matches;
    });
    
    console.log('Filtered cars found:', filteredCars.length);
    
    // If no cars found with specific categories, return some general cars
    if (filteredCars.length === 0) {
      console.log('No specific cars found, returning first 10 cars');
      return carData.Cars.slice(0, 10); // Return first 10 cars as fallback
    }
    
    return filteredCars.slice(0, 15); // Return more cars for variety
  };

  const recommendCar = () => {
    if (!creditScore || !salary) {
      alert('Please fill in all required fields');
      return;
    }

    const cars = getCarsByPurpose(purpose);
    console.log('Found cars:', cars.length);

    if (cars.length === 0) {
      setRecommendation({
        message: 'No cars found for this purpose. Please try a different category.',
        affordable: false
      });
      return;
    }

    // Calculate max affordable price based on credit score and salary
    let maxLoanMultiplier = 0.5;
    if (creditScore >= 750) maxLoanMultiplier = 1.0;
    else if (creditScore >= 650) maxLoanMultiplier = 0.75;

    const maxAffordableCarPrice = parseInt(salary) * maxLoanMultiplier * 12;

    // Categorize cars by affordability
    const affordableCars = [];
    const expensiveCars = [];

    cars.forEach(car => {
      const price = parseInt(car.Prc.replace(/,/g, ''));
      if (price <= maxAffordableCarPrice) {
        affordableCars.push(car);
      } else {
        expensiveCars.push(car);
      }
    });

    // Set available cars for selection
    const allAvailableCars = [...affordableCars, ...expensiveCars].slice(0, 8);
    setAvailableCars(allAvailableCars);

    // Set recommendation message
    if (affordableCars.length > 0) {
      setRecommendation({
        message: `✅ Found ${affordableCars.length} cars within your budget! Choose from the options below.`,
        affordable: true,
        affordableCount: affordableCars.length
      });
    } else {
      setRecommendation({
        message: `⚠️ All cars are above your ideal budget. Consider higher down payment or longer loan term.`,
        affordable: false,
        affordableCount: 0
      });
    }
  };

  const selectCar = (car) => {
    setSelectedCar(car);
  };

  const calculateLoan = () => {
    if (!selectedCar || !downPayment || !interestRate || !loanTerm || !startDate) {
      alert('Please fill in all loan calculation fields');
      return;
    }

    const carPrice = parseInt(selectedCar.Prc.replace(/,/g, ''));
    const downPaymentAmount = parseFloat(downPayment);
    const rate = parseFloat(interestRate) / 100 / 12;
    const term = parseInt(loanTerm);
    const start = new Date(startDate);

    const loanAmount = carPrice - downPaymentAmount;
    const monthlyPayment = (loanAmount * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);

    // Generate payment schedule
    const paymentSchedule = [];
    let paymentDate = new Date(start);
    
    for (let i = 1; i <= term; i++) {
      paymentDate = new Date(paymentDate);
      paymentDate.setMonth(paymentDate.getMonth() + 1);
      paymentSchedule.push({
        month: i,
        date: paymentDate.toISOString().split('T')[0],
        amount: monthlyPayment.toFixed(2)
      });
    }

    const endDate = new Date(start);
    endDate.setMonth(endDate.getMonth() + term);

    setLoanResult({
      loanAmount: loanAmount.toFixed(2),
      monthlyPayment: monthlyPayment.toFixed(2),
      endDate: endDate.toISOString().split('T')[0],
      paymentSchedule
    });
  };

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
                <Col md={6}>
                  <h2 className="text-primary mb-3">1. Choose Your Purpose</h2>
                  <Form.Select 
                    value={purpose} 
                    onChange={(e) => setPurpose(e.target.value)}
                    className="mb-3"
                  >
                    <option value="family">Family</option>
                    <option value="commute">Commute</option>
                    <option value="travel">Travel</option>
                    <option value="heavy">Heavy Load</option>
                  </Form.Select>

                  <h2 className="text-primary mb-3">2. Enter Your Financial Information</h2>
                  <Form.Group className="mb-3">
                    <Form.Label>Credit Score (300 - 850)</Form.Label>
                    <Form.Control
                      type="number"
                      min="300"
                      max="850"
                      value={creditScore}
                      onChange={(e) => setCreditScore(e.target.value)}
                      placeholder="Enter your credit score"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Monthly Salary (THB)</Form.Label>
                    <Form.Control
                      type="number"
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                      placeholder="Enter your monthly salary"
                    />
                  </Form.Group>

                  <Button 
                    variant="primary" 
                    size="lg" 
                    onClick={recommendCar}
                    className="w-100 mb-4"
                  >
                    Get Recommendations
                  </Button>
                </Col>

                <Col md={6}>
                  {recommendation && (
                    <Alert variant={recommendation.affordable ? "success" : "warning"}>
                      <h4>Car Recommendations</h4>
                      <p>{recommendation.message}</p>
                      {recommendation.affordableCount > 0 && (
                        <p><strong>Affordable cars found: {recommendation.affordableCount}</strong></p>
                      )}
                    </Alert>
                  )}

                  {availableCars.length > 0 && (
                    <div className="mt-3">
                      <h4>Available Cars</h4>
                      <Row>
                        {availableCars.map((car, index) => {
                          const price = parseInt(car.Prc.replace(/,/g, ''));
                          const maxAffordablePrice = parseInt(salary) * (creditScore >= 750 ? 1.0 : creditScore >= 650 ? 0.75 : 0.5) * 12;
                          const isAffordable = price <= maxAffordablePrice;
                          
                          return (
                            <Col md={6} key={car.Cid} className="mb-3">
                              <Card 
                                className={`h-100 ${selectedCar?.Cid === car.Cid ? 'border-primary' : ''} ${isAffordable ? 'border-success' : 'border-warning'}`}
                                onClick={() => selectCar(car)}
                                style={{ cursor: 'pointer' }}
                              >
                                <img 
                                  src={car.Img300} 
                                  alt={car.Model}
                                  className="card-img-top"
                                  style={{ height: '120px', objectFit: 'cover' }}
                                />
                                <Card.Body className="p-2">
                                  <h6 className="mb-1">{car.Model}</h6>
                                  <p className="mb-1 small text-muted">{car.NameMMT}</p>
                                  <p className="mb-1"><strong>{car.Prc} THB</strong></p>
                                  <p className="mb-1 small">{car.Yr} • {car.Province}</p>
                                  {isAffordable ? (
                                    <span className="badge bg-success">Affordable</span>
                                  ) : (
                                    <span className="badge bg-warning">Above Budget</span>
                                  )}
                                </Card.Body>
                              </Card>
                            </Col>
                          );
                        })}
                      </Row>
                    </div>
                  )}

                  {selectedCar && (
                    <Card className="mt-3">
                      <Card.Header>
                        <h3 className="mb-0">3. Loan Planning for {selectedCar.Model}</h3>
                      </Card.Header>
                      <Card.Body>
                        <div className="mb-3">
                          <img 
                            src={selectedCar.Img300} 
                            alt={selectedCar.Model}
                            className="img-fluid rounded mb-2"
                            style={{ maxHeight: '150px' }}
                          />
                          <h5>{selectedCar.NameMMT}</h5>
                          <p className="mb-1"><strong>Price:</strong> {selectedCar.Prc} THB</p>
                          <p className="mb-1"><strong>Year:</strong> {selectedCar.Yr}</p>
                          <p className="mb-1"><strong>Location:</strong> {selectedCar.Province}</p>
                        </div>

                        <Form.Group className="mb-3">
                          <Form.Label>Down Payment (THB)</Form.Label>
                          <Form.Control
                            type="number"
                            value={downPayment}
                            onChange={(e) => setDownPayment(e.target.value)}
                            placeholder="Enter down payment amount"
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Annual Interest Rate (%)</Form.Label>
                          <Form.Control
                            type="number"
                            step="0.1"
                            value={interestRate}
                            onChange={(e) => setInterestRate(e.target.value)}
                            placeholder="Enter interest rate"
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Loan Term (months)</Form.Label>
                          <Form.Control
                            type="number"
                            value={loanTerm}
                            onChange={(e) => setLoanTerm(e.target.value)}
                            placeholder="Enter loan term in months"
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

                        <Button 
                          variant="success" 
                          onClick={calculateLoan}
                          className="w-100"
                        >
                          Calculate Loan
                        </Button>
                      </Card.Body>
                    </Card>
                  )}
                </Col>
              </Row>

              {loanResult && (
                <Row className="mt-4">
                  <Col>
                    <Card>
                      <Card.Header>
                        <h3 className="mb-0">Loan Calculation Results</h3>
                      </Card.Header>
                      <Card.Body>
                        <Row>
                          <Col md={4}>
                            <div className="text-center p-3 bg-light rounded">
                              <h5>Loan Amount</h5>
                              <h3 className="text-primary">{loanResult.loanAmount} THB</h3>
                            </div>
                          </Col>
                          <Col md={4}>
                            <div className="text-center p-3 bg-light rounded">
                              <h5>Monthly Payment</h5>
                              <h3 className="text-success">{loanResult.monthlyPayment} THB</h3>
                            </div>
                          </Col>
                          <Col md={4}>
                            <div className="text-center p-3 bg-light rounded">
                              <h5>Loan End Date</h5>
                              <h3 className="text-info">{loanResult.endDate}</h3>
                            </div>
                          </Col>
                        </Row>

                        <div className="mt-4">
                          <h4>Payment Schedule</h4>
                          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            <Table striped bordered hover>
                              <thead>
                                <tr>
                                  <th>Month</th>
                                  <th>Payment Date</th>
                                  <th>Amount (THB)</th>
                                </tr>
                              </thead>
                              <tbody>
                                {loanResult.paymentSchedule.map((payment, index) => (
                                  <tr key={index}>
                                    <td>{payment.month}</td>
                                    <td>{payment.date}</td>
                                    <td>{payment.amount}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          </div>
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