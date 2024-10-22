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
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedCarrera, setSelectedCarrera] = useState('');
  const [selectedUniversidad, setSelectedUniversidad] = useState('');

  useEffect(() => {
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

    const filtered = programs.filter(pr => {
      const cienciasHistoriaPonderacion = Math.max(
        scores.ciencias * pr.ponderacionCiencias || 0,
        scores.historia * pr.ponderacionHistoria || 0
      );

      const ponderacionUsuario =
        ((scores.matematicas1 * pr.ponderacionM1) +
        (scores.lectura * pr.ponderacionLeguaje) +
        (scores.ranking * pr.ponderacionRanking) +
        (scores.nem * pr.ponderacionNem) +
        (scores.matematicas2 * pr.ponderacionM2) +
        cienciasHistoriaPonderacion) / 100;

      return ponderacionUsuario >= pr.puntajeCorte;
    });

    setFilteredPrograms(filtered);
  };

  const handleSort = () => {
    const sortedPrograms = [...filteredPrograms].sort((a, b) => {
      return sortOrder === 'asc'
        ? a.puntajeCorte - b.puntajeCorte
        : b.puntajeCorte - a.puntajeCorte;
    });
    setFilteredPrograms(sortedPrograms);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleFilter = () => {
    let filtered = programs;

    if (selectedCarrera) {
      filtered = filtered.filter(pr => pr.idCarrera === parseInt(selectedCarrera));
    }

    if (selectedUniversidad) {
      filtered = filtered.filter(pr => pr.idUniversidad === parseInt(selectedUniversidad));
    }

    setFilteredPrograms(filtered);
  };

  const calculateDifference = (ponderacionUsuario, puntajeCorte) => {
    const difference = ponderacionUsuario - puntajeCorte;
    return {
      difference,
      color: difference >= 0 ? 'text-green-500' : 'text-red-500',
    };
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Encuentra las universidades que mejor se adaptan a ti</h2>
      <p className="text-lg text-gray-600 mb-8 text-center">Ingresa tus puntajes PAES y te ayudaremos a encontrar las mejores opciones para tu futuro académico.</p>
      
      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Campos obligatorios</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Puntaje Matemáticas 1 (M1)</label>
              <input
                type="number"
                name="matematicas1"
                value={scores.matematicas1}
                onChange={handleInputChange}
                placeholder="Ingresa puntaje"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.matematicas1 && <p className="text-red-500">{errors.matematicas1}</p>}
            </div>

            <div>
              <label className="block mb-2">Puntaje C. Lectora</label>
              <input
                type="number"
                name="lectura"
                value={scores.lectura}
                onChange={handleInputChange}
                placeholder="Ingresa puntaje"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.lectura && <p className="text-red-500">{errors.lectura}</p>}
            </div>

            <div>
              <label className="block mb-2">Puntaje Ranking</label>
              <input
                type="number"
                name="ranking"
                value={scores.ranking}
                onChange={handleInputChange}
                placeholder="Ingresa puntaje"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.ranking && <p className="text-red-500">{errors.ranking}</p>}
            </div>

            <div>
              <label className="block mb-2">Puntaje NEM</label>
              <input
                type="number"
                name="nem"
                value={scores.nem}
                onChange={handleInputChange}
                placeholder="Ingresa puntaje"
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
              <label className="block mb-2">Puntaje Matemáticas 2 (M2)</label>
              <input
                type="number"
                name="matematicas2"
                value={scores.matematicas2}
                onChange={handleInputChange}
                placeholder="Ingresa puntaje"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.matematicas2 && <p className="text-red-500">{errors.matematicas2}</p>}
            </div>
            <div>
              <label className="block mb-2">Puntaje Historia</label>
              <input
                type="number"
                name="historia"
                value={scores.historia}
                onChange={handleInputChange}
                placeholder="Ingresa puntaje"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.historia && <p className="text-red-500">{errors.historia}</p>}
            </div>
            <div>
              <label className="block mb-2">Puntaje Ciencias</label>
              <input
                type="number"
                name="ciencias"
                value={scores.ciencias}
                onChange={handleInputChange}
                placeholder="Ingresa puntaje"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.ciencias && <p className="text-red-500">{errors.ciencias}</p>}
            </div>
          </div>
        </div>

        <button type="submit" className="w-full btn btn-primary mb-4">Calcular</button>

        {/* Filtro por universidad y carrera */}
        <div className="flex mb-4">
          <select
            value={selectedCarrera}
            onChange={(e) => setSelectedCarrera(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md mr-4"
          >
            <option value="">Todas las carreras</option>
            {carreras.map(carrera => (
              <option key={carrera.idCarrera} value={carrera.idCarrera}>
                {carrera.nombre}
              </option>
            ))}
          </select>

          <select
            value={selectedUniversidad}
            onChange={(e) => setSelectedUniversidad(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Todas las universidades</option>
            {universidades.map(universidad => (
              <option key={universidad.idUniversidad} value={universidad.idUniversidad}>
                {universidad.nombre}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={handleFilter}
            className="ml-4 btn btn-secondary"
          >
            Filtrar
          </button>
        </div>

        {/* Tabla de resultados */}
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Carrera</th>
                <th className="px-4 py-2 text-left">Universidad</th>
                <th className="px-4 py-2 text-left cursor-pointer" onClick={handleSort}>
                  Puntaje corte {sortOrder === 'asc' ? '▲' : '▼'}
                </th>
                <th className="px-4 py-2 text-left">Puntaje ponderado</th>
                <th className="px-4 py-2 text-left">Diferencia</th>
              </tr>
            </thead>
            <tbody>
              {filteredPrograms.length > 0 ? (
                filteredPrograms.map((pr) => {
                  const ponderacionUsuario = (
                    ((scores.matematicas1 * pr.ponderacionM1) +
                    (scores.lectura * pr.ponderacionLeguaje) +
                    (scores.ranking * pr.ponderacionRanking) +
                    (scores.nem * pr.ponderacionNem) +
                    (scores.matematicas2 * pr.ponderacionM2) +
                    Math.max(
                      scores.ciencias * pr.ponderacionCiencias || 0,
                      scores.historia * pr.ponderacionHistoria || 0
                    )) / 100
                  ).toFixed(2);

                  const { difference, color } = calculateDifference(ponderacionUsuario, pr.puntajeCorte);

                  return (
                    <tr key={`${pr.idCarrera}-${pr.idUniversidad}`}>
                      <td className="px-4 py-2">{getNombreCarrera(pr.idCarrera)}</td>
                      <td className="px-4 py-2">{getNombreUniversidad(pr.idUniversidad)}</td>
                      <td className="px-4 py-2">{pr.puntajeCorte}</td>
                      <td className="px-4 py-2">{ponderacionUsuario}</td>
                      <td className={`px-4 py-2 ${color}`}>{difference.toFixed(2)}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="text-center px-4 py-2">No hay resultados que superen el puntaje de corte</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
}

export default Calculator;
