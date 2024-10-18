import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Encuentra tu universidad y carrera ideal con Unify
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Unify utiliza tu puntaje PAES para encontrar las universidades y carreras
            que mejor se adaptan a tus necesidades y aspiraciones.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/calculator" className="btn btn-primary text-lg px-8 py-3">
              Probar calculadora
            </Link>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Calculadora PAES</h3>
            <p className="text-gray-600 mb-4">Ingresa tus puntajes y descubre tus opciones universitarias.</p>
            <Link to="/calculator" className="text-primary font-semibold hover:underline">Calcular ahora →</Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Explorar Universidades</h3>
            <p className="text-gray-600 mb-4">Conoce las mejores universidades de Chile y sus programas.</p>
            <Link to="/universidades" className="text-primary font-semibold hover:underline">Ver universidades →</Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Asesoría Personalizada</h3>
            <p className="text-gray-600 mb-4">Recibe orientación experta para tu elección universitaria.</p>
            <Link to="/contacto" className="text-primary font-semibold hover:underline">Contactar ahora →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;