import React, { useState } from 'react';

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setScores(prevScores => ({
      ...prevScores,
      [name]: value
    }));
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Scores submitted:', scores);
    // Aquí es donde enviarías los datos al backend para hacer la consulta
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
            {/* Aquí se mostrarían los resultados */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Calculator;