import { BrowserRouter } from 'react-router';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import AppProviders from './providers/AppProviders.jsx';
import ProjectRoutes from './Routes.jsx';

export default function App() {
  return (
    <ErrorBoundary>
      <AppProviders>
        <BrowserRouter>
          <ProjectRoutes />
        </BrowserRouter>
      </AppProviders>
    </ErrorBoundary>
  );
}
