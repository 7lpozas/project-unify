import React from 'react';

function Universities() {
  const universities = [
    { 
      name: 'Universidad Central de Chile', 
      location: 'Santiago', 
      website: 'https://www.ucentral.cl/', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Logo_nuevo_ucen.png/180px-Logo_nuevo_ucen.png' 
  },
    { 
        name: 'Universidad Diego Portales', 
        location: 'Santiago', 
        website: 'https://www.udp.cl/', 
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Escudo_de_la_Universidad_Diego_Portales.svg/540px-Escudo_de_la_Universidad_Diego_Portales.svg.png' 
    },
    { 
        name: 'Universidad Adolfo Ibañez', 
        location: 'Santiago', 
        website: 'https://www.uai.cl/', 
        logo: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Escude_de_la_Universidad_Adolfo_Iba%C3%B1ez.png' 
    },
    { 
        name: 'Universidad de los Andes', 
        location: 'Santiago', 
        website: 'https://www.uandes.cl/', 
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Logo_Universidad_de_los_Andes.png/360px-Logo_Universidad_de_los_Andes.png' 
    },
    { 
        name: 'Universidad Alberto Hurtado', 
        location: 'Santiago', 
        website: 'https://www.uahurtado.cl/', 
        logo: 'https://upload.wikimedia.org/wikipedia/commons/3/39/UAH-Insignia.jpg' 
    },
    { 
      name: 'Universidad del Desarrollo', 
      location: 'Santiago', 
      website: 'https://www.udd.cl/', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Logo_final_udd_tz.jpg' 
  },
    { 
        name: 'Universidad Academia de Humanismo Cristiano', 
        location: 'Santiago', 
        website: 'https://www.academia.cl/', 
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Academialogo.png/400px-Academialogo.png' 
    },
    { 
        name: 'Universidad de Las Américas', 
        location: 'Santiago', 
        website: 'https://www.udla.cl/', 
        logo: 'https://upload.wikimedia.org/wikipedia/commons/1/19/UDLA-logo-oficial.jpg' 
    },
    { 
        name: 'Universidad Católica Silva Henríquez', 
        location: 'Santiago', 
        website: 'https://www.ucsh.cl/', 
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Logo_Nuevo_UCSH.jpg/480px-Logo_Nuevo_UCSH.jpg' 
    },
    { 
      name: 'Universidad Santo Tomás', 
      location: 'Santiago', 
      website: 'https://www.santotomas.cl/', 
      logo: 'https://www.ust.cl/web/wp-content/uploads/sites/6/2019/08/logo-ust.svg' 
  },
    { 
        name: 'Universidad Bernardo O\'Higgins', 
        location: 'Santiago', 
        website: 'https://www.ubo.cl/', 
        logo: 'https://upload.wikimedia.org/wikipedia/commons/4/46/1_logo_ubo.png' 
    }
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