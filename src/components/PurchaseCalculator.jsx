

/// ✅ UPDATED COMPONENT: PurchaseCalculator.jsx
import { useState } from 'react';
import { Form, Button, Alert, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const INSURANCE_RATE = 0.02; // 2% of car price (one-time)

const PurchaseCalculator = ({ carPrice, carModel, carName }) => {
  // State for inputs
  const [downPayment, setDownPayment] = useState('');
  const [downPaymentIsPercent, setDownPaymentIsPercent] = useState(false);
  const [months, setMonths] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [interestType, setInterestType] = useState('reducing'); // 'flat' or 'reducing'
  const [includeInsurance, setIncludeInsurance] = useState(false);
  
  // Results
  const [schedule, setSchedule] = useState([]);
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [insurancePremium, setInsurancePremium] = useState(0);
  const [totalCost, setTotalCost] = useState(null);
  const [error, setError] = useState('');
  const [confirmationMsg, setConfirmationMsg] = useState('');
  

  const parsePrice = (priceStr) => parseFloat(priceStr.toString().replace(/,/g, ''));

  const calculateSchedule = () => {
    const price = parsePrice(carPrice);
    let down = parseFloat(downPayment);
    const term = parseInt(months);
    const annualRate = parseFloat(interestRate);

    if (
      isNaN(price) || isNaN(down) || isNaN(term) || isNaN(annualRate) ||
      term <= 0 || annualRate < 0 || down < 0
    ) {
      setError('Please fill in all fields correctly with positive numbers.');
      setSchedule([]);
      setMonthlyPayment(null);
      setInsurancePremium(0);
      setTotalCost(null);
      return;
    }

    if (downPaymentIsPercent) {
      if (down > 100) {
        setError('Down payment percentage cannot exceed 100%.');
        return;
      }
      down = (down / 100) * price;
    }

    if (down > price) {
      setError('Down payment cannot exceed car price.');
      return;
    }

    const loanAmount = price - down;
    if (loanAmount <= 0) {
      setError('Loan amount must be greater than zero.');
      return;
    }

    let scheduleArray = [];
    let monthlyPay = 0;

    if (interestType === 'flat') {
      // Flat Interest Calculation
      const totalInterest = loanAmount * (annualRate / 100) * (term / 12);
      const totalPayable = loanAmount + totalInterest;
      monthlyPay = totalPayable / term;

      for (let i = 1; i <= term; i++) {
        scheduleArray.push({
          month: i,
          principal: loanAmount / term,
          interest: totalInterest / term,
          totalPayment: monthlyPay,
          remainingBalance: loanAmount - (loanAmount / term) * i,
        });
      }
    } else {
      // Reducing Balance Calculation (Amortization)
      const monthlyRate = annualRate / 12 / 100;
      monthlyPay = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, term)) /
                   (Math.pow(1 + monthlyRate, term) - 1);

      let remaining = loanAmount;

      for (let i = 1; i <= term; i++) {
        const interest = remaining * monthlyRate;
        const principal = monthlyPay - interest;
        remaining -= principal;
        scheduleArray.push({
          month: i,
          principal,
          interest,
          totalPayment: monthlyPay,
          remainingBalance: remaining > 0 ? remaining : 0,
        });
      }
    }

    // Insurance premium calculation
    let insurance = 0;
    if (includeInsurance) {
      insurance = price * INSURANCE_RATE;
    }
    setInsurancePremium(insurance);

    // Total cost = (monthly payment * months) + insurance
    const total = (monthlyPay * term) + insurance;
    setTotalCost(total);

    setSchedule(scheduleArray);
    setMonthlyPayment(monthlyPay);
    setError('');
    setConfirmationMsg('');
  };

  const saveTransaction = (tx) => {
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    transactions.push(tx);
    localStorage.setItem('transactions', JSON.stringify(transactions));
  };

  const handleConfirm = () => {
    if (monthlyPayment === null) {
      setError('Please calculate payment before confirming purchase.');
      return;
    }
    let message = `\u2705 Purchase Confirmed!\n\nCar: ${carName}\nModel: ${carModel}`;
    message += `\nDown Payment: ${parseFloat(downPayment).toLocaleString()} THB`;
    message += `\nLoan Term: ${months} months`;
    message += `\nInterest Rate: ${interestRate}%`;
    message += `\nMonthly Payment: ${monthlyPayment.toFixed(2).toLocaleString()} THB`;
    if (includeInsurance) {
      message += `\nInsurance Premium: ${insurancePremium.toLocaleString()} THB`;
    }
    message += `\nTotal Cost: ${totalCost.toLocaleString()} THB`;
    setConfirmationMsg(message);
    setError('');
    // Save transaction
    saveTransaction({
      carName,
      carModel,
      amount: totalCost,
      date: new Date().toISOString(),
      type: 'purchase'
    });
    // onConfirm can be extended to include insurance and totalCost if needed
  };

  const exportPDF = () => {
    if (schedule.length === 0) {
      setError('Please calculate the schedule before exporting.');
      return;
    }
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Purchase Summary', 14, 22);

    doc.setFontSize(12);
    const price = parsePrice(carPrice);
    const down = downPaymentIsPercent ? (parseFloat(downPayment) / 100) * price : parseFloat(downPayment);
    const loanAmount = price - down;

    const summary = [
      ['Car', carName],
      ['Model', carModel],
      ['Car Price (THB)', price.toLocaleString()],
      ['Down Payment', downPaymentIsPercent ? downPayment + '%' : down.toLocaleString() + ' THB'],
      ['Loan Term (months)', months],
      ['Interest Type', interestType === 'flat' ? 'Flat' : 'Reducing Balance'],
      ['Interest Rate (%)', interestRate],
      ['Monthly Payment (THB)', monthlyPayment.toFixed(2).toLocaleString()],
      ['Loan Amount (THB)', loanAmount.toLocaleString()],
    ];

    doc.autoTable({
      startY: 30,
      head: [['Field', 'Value']],
      body: summary,
      theme: 'striped',
      styles: { fontSize: 10 }
    });

    // Payment Schedule Table
    const scheduleTableData = schedule.map(row => ([
      row.month,
      row.principal.toFixed(2).toLocaleString(),
      row.interest.toFixed(2).toLocaleString(),
      row.totalPayment.toFixed(2).toLocaleString(),
      row.remainingBalance.toFixed(2).toLocaleString()
    ]));

    doc.autoTable({
      startY: doc.previousAutoTable.finalY + 10,
      head: [['Month', 'Principal (THB)', 'Interest (THB)', 'Total Payment (THB)', 'Remaining Balance (THB)']],
      body: scheduleTableData,
      theme: 'grid',
      styles: { fontSize: 8 }
    });

    doc.save(`Purchase_Summary_${carModel}.pdf`);
  };

  return (
    <div className="mt-4">
      <Form>
        <Form.Group className="mb-2">
          <Form.Label>Down Payment</Form.Label>
          <div className="d-flex align-items-center gap-2">
            <Form.Control
              type="number"
              value={downPayment}
              onChange={e => setDownPayment(e.target.value)}
              placeholder={downPaymentIsPercent ? "Enter % (e.g., 20)" : "Enter amount in THB"}
            />
            <Form.Check
              type="checkbox"
              label="% of car price"
              checked={downPaymentIsPercent}
              onChange={() => setDownPaymentIsPercent(!downPaymentIsPercent)}
            />
          </div>
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Loan Term (months)</Form.Label>
          <Form.Control type="number" value={months} onChange={e => setMonths(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Annual Interest Rate (%)</Form.Label>
          <Form.Control type="number" value={interestRate} onChange={e => setInterestRate(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Interest Type</Form.Label>
          <Form.Select value={interestType} onChange={e => setInterestType(e.target.value)}>
            <option value="reducing">Reducing Balance Interest</option>
            <option value="flat">Flat Interest</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Check type="checkbox" label={`Include Insurance Premium (2% of car price)`} checked={includeInsurance} onChange={e => setIncludeInsurance(e.target.checked)} />
        </Form.Group>

        <Button variant="success" className="me-2" onClick={calculateSchedule}>Calculate</Button>
        <Button variant="primary" onClick={handleConfirm}>Confirm Purchase</Button>
        <Button variant="secondary" className="ms-2" onClick={exportPDF}>Export to PDF</Button>
      </Form>

      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

      {confirmationMsg && (
        <Alert variant="info" className="mt-3" style={{ whiteSpace: 'pre-line' }}>
          {confirmationMsg}
        </Alert>
      )}

      {monthlyPayment !== null && (
        <div className="mt-4">
          <h5>Monthly Payment: <strong>{monthlyPayment.toFixed(2).toLocaleString()} THB</strong></h5>

          <h6 className="mt-3">Payment Schedule</h6>
          <Table striped bordered hover size="sm" responsive>
            <thead>
              <tr>
                <th>Month #</th>
                <th>Principal (THB)</th>
                <th>Interest (THB)</th>
                <th>Total Payment (THB)</th>
                <th>Remaining Balance (THB)</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map(({ month, principal, interest, totalPayment, remainingBalance }) => (
                <tr key={month}>
                  <td>{month}</td>
                  <td>{principal.toFixed(2).toLocaleString()}</td>
                  <td>{interest.toFixed(2).toLocaleString()}</td>
                  <td>{totalPayment.toFixed(2).toLocaleString()}</td>
                  <td>{remainingBalance.toFixed(2).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

PurchaseCalculator.propTypes = {
  carPrice: PropTypes.string.isRequired,
  carModel: PropTypes.string.isRequired,
  carName: PropTypes.string.isRequired,
};

export default PurchaseCalculator;

