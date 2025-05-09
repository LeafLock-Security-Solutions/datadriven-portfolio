import { ThemeProvider } from '@/theme/ThemeProvider';
import { StrictMode } from 'react';

import './index.css';

import { createRoot } from 'react-dom/client';

import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
