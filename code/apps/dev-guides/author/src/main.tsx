import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthorToastProvider } from './AuthorToast';
import 'bytemd/dist/index.css';
import './styles.css';
import './library.css';
import './primitives.css';
import './toast.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthorToastProvider><App /></AuthorToastProvider>
  </React.StrictMode>,
);
