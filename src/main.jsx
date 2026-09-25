import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './assets/icons/css/all.css';
import App from './App.jsx';
import { resetScrollOnReload } from './utils/resetScrollOnReload.js';
import './styles/variables.css';
import './styles/globals.css';

resetScrollOnReload();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
