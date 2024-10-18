import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Calculator from './pages/Calculator';
import AboutUnify from './pages/AboutUnify';
import Universities from './pages/Universities';
import Login from './pages/Login';

import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/sobre-unify" element={<AboutUnify />} />
            <Route path="/universidades" element={<Universities />} />
            <Route path="/iniciar-sesion" element={<Login />} />
            <Route path="/contacto" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;