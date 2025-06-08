import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App.jsx'
import { LocationProvider } from "./context/LocationContext";

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
     <LocationProvider>
       <App />
     </LocationProvider>
    </BrowserRouter>
  </StrictMode>
);