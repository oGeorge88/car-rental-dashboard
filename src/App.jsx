import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import Dashboard from './components/Dashboard';
import CarDetails from './components/CarDetails';
import About from './components/About';
import ContactPage from './components/ContactPage';
import Footer from './components/Footer';
import HighlightedCars from './components/HighlightedCarsPage'; // Import the component
import StatisticsPage from './components/StatisticsPage'
import SmartCarLoanAdvisor from './components/SmartCarLoanAdvisor';

function App() {
  return (
    <Router basename='/car-analytics/'>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/car/:id" element={<CarDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/highlighted-cars" element={<HighlightedCars />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/loan-advisor" element={<SmartCarLoanAdvisor />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
