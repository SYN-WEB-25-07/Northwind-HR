import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';   // ← diese Zeile muss vorhanden sein!

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);