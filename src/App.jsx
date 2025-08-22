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


// Main App component with professional layout and accessibility
function App() {
  return (
    <Router basename="/">
      <>
        {/* Navigation Bar */}
        <AppNavbar />

        {/* Main Content Area */}
        <main role="main" aria-label="Main content" style={{ minHeight: '80vh', background: 'transparent' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/car/:id" element={<CarDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/highlighted-cars" element={<HighlightedCars />} />
            <Route path="/statistics" element={<StatisticsPage />} />
            <Route path="/loan-advisor" element={<SmartCarLoanAdvisor />} />
          </Routes>
        </main>

        {/* Scroll to Top Button (if available) */}
        {/* <ScrollToTop /> */}

        {/* Footer */}
        <footer role="contentinfo">
          <Footer />
        </footer>
      </>
    </Router>
  );
}

export default App;
