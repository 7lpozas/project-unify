import React from 'react';

function Universities() {
  const universities = [
    { name: 'Universidad Adolfo Ibáñez', location: 'Santiago', website: 'https://uai.cl/', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Escude_de_la_Universidad_Adolfo_Iba%C3%B1ez.png' },
    { name: 'Pontificia Universidad Católica de Chile', location: 'Santiago', website: 'https://www.uc.cl/', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Escudo_de_la_Pontificia_Universidad_Cat%C3%B3lica_de_Chile.svg/800px-Escudo_de_la_Pontificia_Universidad_Cat%C3%B3lica_de_Chile.svg.png' },
    { name: 'Universidad Técnica Federico Santa María', location: 'Santiago', website: 'https://www.usm.cl/', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Logo_UTFSM.png' },
    { name: 'Universidad de San Sebastián', location: 'Santiago', website: 'https://www.uss.cl/', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Escudo_de_la_Universidad_San_Sebasti%C3%A1n.png' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Universidades</h1>
        <p className="text-xl text-center text-gray-600 mb-12">Explora algunas de las principales universidades de Chile:</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {universities.map((uni, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
              <img src={uni.logo} alt={`Logo de ${uni.name}`} className="w-full h-48 object-contain bg-gray-100 p-4"/>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{uni.name}</h2>
                <p className="text-gray-600 mb-4">Ubicación: {uni.location}</p>
                <a 
                  href={uni.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-primary text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                >
                  Visitar sitio web
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Universities;