import { BrowserRouter } from 'react-router';
import AppProviders from './providers/AppProviders.jsx';
import ProjectRoutes from './Routes.jsx';

export default function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <ProjectRoutes />
      </BrowserRouter>
    </AppProviders>
  );
}
