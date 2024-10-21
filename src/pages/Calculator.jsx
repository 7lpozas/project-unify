import React, { useState, useEffect } from 'react';

const mockPrograms = [
  {
    "idCarrera": 1,
    "nombreCarrera": "Ingeniería Civil",
    "idUniversidad": 1,
    "nombreUniversidad": "Universidad de Chile",
    "ponderacionM1": 0.3,
    "ponderacionLeguaje": 0.1,
    "ponderacionRanking": 0.1,
    "ponderacionNem": 0.2,
    "ponderacionM2": 0.2,
    "ponderacionHistoria": 0,
    "ponderacionCiencias": 0.1,
    "puntajeCorte": 700
  },
  {
    "idCarrera": 2,
    "nombreCarrera": "Derecho",
    "idUniversidad": 2,
    "nombreUniversidad": "Pontificia Universidad Católica de Chile",
    "ponderacionM1": 0.2,
    "ponderacionLeguaje": 0.4,
    "ponderacionRanking": 0.15,
    "ponderacionNem": 0.15,
    "ponderacionM2": 0,
    "ponderacionHistoria": 0.1,
    "ponderacionCiencias": 0,
    "puntajeCorte": 690
  },
  {
    "idCarrera": 3,
    "nombreCarrera": "Medicina",
    "idUniversidad": 3,
    "nombreUniversidad": "Universidad de Santiago",
    "ponderacionM1": 0.3,
    "ponderacionLeguaje": 0.3,
    "ponderacionRanking": 0.1,
    "ponderacionNem": 0.2,
    "ponderacionM2": 0.05,
    "ponderacionHistoria": 0,
    "ponderacionCiencias": 0.05,
    "puntajeCorte": 720
  },
  {
    "idCarrera": 4,
    "nombreCarrera": "Arquitectura",
    "idUniversidad": 4,
    "nombreUniversidad": "Universidad Técnica Federico Santa María",
    "ponderacionM1": 0.2,
    "ponderacionLeguaje": 0.3,
    "ponderacionRanking": 0.1,
    "ponderacionNem": 0.1,
    "ponderacionM2": 0.1,
    "ponderacionHistoria": 0.2,
    "ponderacionCiencias": 0,
    "puntajeCorte": 670
  }
];

function Calculator() {
  const [scores, setScores] = useState({
    matematicas1: '',
    lectura: '',
    ranking: '',
    nem: '',
    matematicas2: '',
    historia: '',
    ciencias: ''
  });
  const [programs, setPrograms] = useState([]); // Para guardar toda la información del backend
  const [filteredPrograms, setFilteredPrograms] = useState([]); // Para guardar las filtradas

  useEffect(() => {
    // Llamada al endpoint para obtener toda la información
    // fetch('/api/information') // Suponiendo que el endpoint del backend es /api/information
    //   .then(response => response.json())
    //   .then(data => {
    //     setPrograms(data); // Guardamos la información en el estado
    //   })
    //   .catch(error => console.error('Error fetching data:', error));
    setPrograms(mockPrograms);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setScores(prevScores => ({
      ...prevScores,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí realizas el cálculo de ponderación para cada carrera y filtrado
    const filtered = programs.filter(pr => {
      const ponderacionUsuario =
        (scores.matematicas1 * pr.ponderacionM1) +
        (scores.lectura * pr.ponderacionLeguaje) +
        (scores.ranking * pr.ponderacionRanking) +
        (scores.nem * pr.ponderacionNem) +
        (scores.matematicas2 * pr.ponderacionM2) +
        (scores.historia * pr.ponderacionHistoria) +
        (scores.ciencias * pr.ponderacionCiencias);

      // Compara la ponderación calculada con el puntaje de corte
      return ponderacionUsuario >= pr.puntajeCorte;
    });

    setFilteredPrograms(filtered); // Guarda los resultados filtrados
    console.log('Filtered Programs:', filtered);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Encuentra las universidades que mejor se adaptan a ti</h2>
      <p className="text-lg text-gray-600 mb-8 text-center">Ingresa tus puntajes PAES y te ayudaremos a encontrar las mejores opciones para tu futuro académico.</p>
      
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Campos obligatorios</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="number" name="matematicas1" value={scores.matematicas1} onChange={handleInputChange} placeholder="Puntaje Matemáticas 1 (M1)" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
            <input type="number" name="lectura" value={scores.lectura} onChange={handleInputChange} placeholder="Puntaje C. Lectora" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
            <input type="number" name="ranking" value={scores.ranking} onChange={handleInputChange} placeholder="Puntaje Ranking" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
            <input type="number" name="nem" value={scores.nem} onChange={handleInputChange} placeholder="Puntaje NEM" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Campos opcionales</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="number" name="matematicas2" value={scores.matematicas2} onChange={handleInputChange} placeholder="Puntaje Matemáticas 2 (M2)" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
            <input type="number" name="historia" value={scores.historia} onChange={handleInputChange} placeholder="Puntaje Historia" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
            <input type="number" name="ciencias" value={scores.ciencias} onChange={handleInputChange} placeholder="Puntaje Ciencias" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
        </div>

        <button type="submit" className="w-full btn btn-primary">Calcular</button>
      </form>

      <div className="mt-12 overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Carrera</th>
              <th className="px-4 py-2 text-left">Universidad</th>
              <th className="px-4 py-2 text-left">Puntaje corte</th>
              <th className="px-4 py-2 text-left">Puntaje ponderado</th>
            </tr>
          </thead>
          <tbody>
            {filteredPrograms.length > 0 ? (
              filteredPrograms.map((pr) => (
                <tr key={pr.idCarrera}>
                  <td className="px-4 py-2">{pr.idCarrera}</td>
                  <td className="px-4 py-2">{pr.idUniversidad}</td>
                  <td className="px-4 py-2">{pr.puntajeCorte}</td>
                  <td className="px-4 py-2">
                    {/* Muestra la ponderación calculada */}
                    {(scores.matematicas1 * pr.ponderacionM1) +
                    (scores.lectura * pr.ponderacionLeguaje) +
                    (scores.ranking * pr.ponderacionRanking) +
                    (scores.nem * pr.ponderacionNem) +
                    (scores.matematicas2 * pr.ponderacionM2) +
                    (scores.historia * pr.ponderacionHistoria) +
                    (scores.ciencias * pr.ponderacionCiencias)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center px-4 py-2">No hay resultados que superen el puntaje de corte</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Calculator;
