import { Route, Routes } from 'react-router';
import { jsonRoute } from './utils/routes.js';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';

export default function ProjectRoutes() {
  return (
    <Routes>
      <Route path={jsonRoute.Home.path} element={<Home />} />
      <Route path={jsonRoute.NotFound.path} element={<NotFound />} />
    </Routes>
  );
}
