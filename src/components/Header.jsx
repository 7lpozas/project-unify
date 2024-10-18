import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold text-primary">Unify</Link>
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="nav-link">Inicio</Link>
          <Link to="/sobre-unify" className="nav-link">Sobre Unify</Link>
          <Link to="/universidades" className="nav-link">Universidades</Link>
          <Link to="/iniciar-sesion" className="btn bg-green-800 text-white hover:bg-green-700 flex items-center">
            <span>Acceso</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 focus:outline-none">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden bg-white py-2 shadow-md">
          <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>Inicio</Link>
          <Link to="/sobre-unify" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>Sobre Unify</Link>
          <Link to="/universidades" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>Universidades</Link>
          <Link to="/iniciar-sesion" className="block px-4 py-2 text-green-800 hover:bg-gray-100 flex items-center" onClick={() => setIsMenuOpen(false)}>
            <span>Acceso</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;