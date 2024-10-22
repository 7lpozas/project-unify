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
  const [errors, setErrors] = useState({});

  const [programs, setPrograms] = useState([]);
  const [universidades, setUniversidades] = useState([]);
  const [carreras, setCarreras] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);

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
    const numValue = parseInt(value, 10);
    
    // Solo validar si el campo no está vacío
    if (value !== '' && (numValue < 100 || numValue > 1000)) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: 'El puntaje debe estar entre 100 y 1000 puntos.'
      }));
    } else {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  
    setScores(prevScores => ({
      ...prevScores,
      [name]: value
    }));
  };
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const hasErrors = Object.values(errors).some(error => error !== '');
    if (hasErrors) {
      alert('Por favor, corrige los errores antes de continuar.');
      return;
    }
  
    const filtered = programs.map(pr => {
      // Si historia y ciencias tienen ponderación distinta de 0, tomar el mejor puntaje
      let mejorHistoriaCiencias = 0;
  
      if (pr.ponderacionHistoria > 0 && pr.ponderacionCiencias > 0) {
        mejorHistoriaCiencias = Math.max(scores.historia || 0, scores.ciencias || 0);
      } else if (pr.ponderacionHistoria > 0) {
        mejorHistoriaCiencias = scores.historia || 0;
      } else if (pr.ponderacionCiencias > 0) {
        mejorHistoriaCiencias = scores.ciencias || 0;
      }
  
      const ponderacionUsuario =
        ((scores.matematicas1 * pr.ponderacionM1) +
        (scores.lectura * pr.ponderacionLeguaje) +
        (scores.ranking * pr.ponderacionRanking) +
        (scores.nem * pr.ponderacionNem) +
        (scores.matematicas2 * pr.ponderacionM2) +
        (mejorHistoriaCiencias * Math.max(pr.ponderacionHistoria, pr.ponderacionCiencias))) / 100;
  
      return {
        ...pr,
        ponderacionUsuario: ponderacionUsuario, // Guardamos el resultado del cálculo
        pasaCorte: ponderacionUsuario >= pr.puntajeCorte // Filtramos si pasa el corte
      };
    }).filter(pr => pr.pasaCorte);
  
    setFilteredPrograms(filtered); // Guarda los resultados filtrados
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Encuentra las universidades que mejor se adaptan a ti</h2>
      <p className="text-lg text-gray-600 mb-8 text-center">Ingresa tus puntajes PAES y te ayudaremos a encontrar las mejores opciones para tu futuro académico.</p>
      
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      <div className="mb-8">
  <h3 className="text-xl font-semibold mb-4">Campos obligatorios</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <input
        type="number"
        name="matematicas1"
        value={scores.matematicas1}
        onChange={handleInputChange}
        placeholder="Puntaje Matemáticas 1 (M1)"
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      />
      {errors.matematicas1 && <p className="text-red-500">{errors.matematicas1}</p>}
    </div>

    <div>
      <input
        type="number"
        name="lectura"
        value={scores.lectura}
        onChange={handleInputChange}
        placeholder="Puntaje C. Lectora"
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      />
      {errors.lectura && <p className="text-red-500">{errors.lectura}</p>}
    </div>

    <div>
      <input
        type="number"
        name="ranking"
        value={scores.ranking}
        onChange={handleInputChange}
        placeholder="Puntaje Ranking"
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      />
      {errors.ranking && <p className="text-red-500">{errors.ranking}</p>}
    </div>

    <div>
      <input
        type="number"
        name="nem"
        value={scores.nem}
        onChange={handleInputChange}
        placeholder="Puntaje NEM"
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      />
      {errors.nem && <p className="text-red-500">{errors.nem}</p>}
    </div>
  </div>
</div>

<div className="mb-8">
  <h3 className="text-xl font-semibold mb-4">Campos opcionales</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <input
        type="number"
        name="matematicas2"
        value={scores.matematicas2}
        onChange={handleInputChange}
        placeholder="Puntaje Matemáticas 2 (M2)"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      />
      {errors.matematicas2 && <p className="text-red-500">{errors.matematicas2}</p>}
    </div>
    <div>
      <input
        type="number"
        name="historia"
        value={scores.historia}
        onChange={handleInputChange}
        placeholder="Puntaje Historia"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      />
      {errors.historia && <p className="text-red-500">{errors.historia}</p>}
    </div>
    <div>
      <input
        type="number"
        name="ciencias"
        value={scores.ciencias}
        onChange={handleInputChange}
        placeholder="Puntaje Ciencias"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      />
      {errors.ciencias && <p className="text-red-500">{errors.ciencias}</p>}
    </div>
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
          {pr.ponderacionUsuario.toFixed(2)} {/* Mostramos el valor calculado */}
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
