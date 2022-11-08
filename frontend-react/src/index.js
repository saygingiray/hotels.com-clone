import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/index.css'
import SearchTop from './components/searchtop';
import HotelPage from './components/hotels';
import {BrowserRouter,Routes,Route} from "react-router-dom";


function App() {
    return (
        <>
            {/* This is the alias of BrowserRouter i.e. Router */}
         
                <Routes>
                    <Route exact path="/" element={<SearchTop />} />
                    <Route path="/hotel" element={<SearchTop />} />
                    <Route path="/hotel/:id" element={<HotelPage/>} key={document.location.href} />
                </Routes>
           
        </>
    );
}




ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );