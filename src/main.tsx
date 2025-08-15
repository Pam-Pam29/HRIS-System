import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initializeFirebase } from './config/firebase'

// Initialize Firebase
initializeFirebase().then((firebase) => {
  if (firebase) {
    console.log('Firebase initialized successfully');
    // You can access firebase.db, firebase.auth here
    // and pass them to your services if needed
  } else {
    console.log('Firebase initialization failed, using mock services');
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
