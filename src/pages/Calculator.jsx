import React, { useState, useEffect } from 'react';

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
  const [universidades, setUniversidades] = useState([]); // Para guardar las universidades
  const [carreras, setCarreras] = useState([]); // Para guardar las carreras
  const [filteredPrograms, setFilteredPrograms] = useState([]); // Para guardar las filtradas

  useEffect(() => {
    // Llamadas a los endpoints para obtener toda la información
    const fetchInformation = async () => {
      try {
        const [universidadesResponse, carrerasResponse, informationsResponse] = await Promise.all([
          fetch('http://localhost:3000/universidades'),
          fetch('http://localhost:3000/carreras'),
          fetch('http://localhost:3000/informations')
        ]);

        const universidadesData = await universidadesResponse.json();
        const carrerasData = await carrerasResponse.json();
        const informationsData = await informationsResponse.json();

        setUniversidades(universidadesData);
        setCarreras(carrerasData);
        setPrograms(informationsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchInformation();
  }, []);

  const getNombreUniversidad = (idUniversidad) => {
    const universidad = universidades.find(u => u.idUniversidad === idUniversidad);
    return universidad ? universidad.nombre : 'Desconocida';
  };

  const getNombreCarrera = (idCarrera) => {
    const carrera = carreras.find(c => c.idCarrera === idCarrera);
    return carrera ? carrera.nombre : 'Desconocida';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setScores(prevScores => ({
      ...prevScores,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const filtered = programs.filter(pr => {
      const ponderacionUsuario =
        ((scores.matematicas1 * pr.ponderacionM1) +
        (scores.lectura * pr.ponderacionLeguaje) +
        (scores.ranking * pr.ponderacionRanking) +
        (scores.nem * pr.ponderacionNem) +
        (scores.matematicas2 * pr.ponderacionM2) +
        (scores.historia * pr.ponderacionHistoria) +
        (scores.ciencias * pr.ponderacionCiencias)) / 100;

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
                <tr key={`${pr.idCarrera}-${pr.idUniversidad}`}>
                  <td className="px-4 py-2">{getNombreCarrera(pr.idCarrera)}</td>
                  <td className="px-4 py-2">{getNombreUniversidad(pr.idUniversidad)}</td>
                  <td className="px-4 py-2">{pr.puntajeCorte}</td>
                  <td className="px-4 py-2">
                    {/* Muestra la ponderación calculada */}
                    {((scores.matematicas1 * pr.ponderacionM1) +
                    (scores.lectura * pr.ponderacionLeguaje) +
                    (scores.ranking * pr.ponderacionRanking) +
                    (scores.nem * pr.ponderacionNem) +
                    (scores.matematicas2 * pr.ponderacionM2) +
                    (scores.historia * pr.ponderacionHistoria) +
                    (scores.ciencias * pr.ponderacionCiencias)) / 100}
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
