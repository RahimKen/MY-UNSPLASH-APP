import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {AuthContextProvider } from './Context/AuthContext';
import { ImagesContextProvider } from './Context/ImagesContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ImagesContextProvider>
        <App />
      </ImagesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);


