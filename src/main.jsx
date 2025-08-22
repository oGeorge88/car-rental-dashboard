
// Entry point for the React application
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// Global styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.css';

// Optionally, add error boundaries or suspense for future enhancements
// import { ErrorBoundary } from 'react-error-boundary';
// import { Suspense } from 'react';

const rootElement = document.getElementById('root');
createRoot(rootElement).render(
  <StrictMode>
    {/* <ErrorBoundary FallbackComponent={ErrorFallback}> */}
    {/* <Suspense fallback={<div>Loading...</div>}> */}
      <App />
    {/* </Suspense> */}
    {/* </ErrorBoundary> */}
  </StrictMode>
);
