import React from 'react';

function AboutUnify() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Sobre Unify</h1>
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <p className="text-lg text-gray-600 mb-6">
            Unify es una plataforma innovadora diseñada para ayudar a los estudiantes a encontrar la universidad y carrera ideal basándose en sus puntajes PAES.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Nuestra Misión</h2>
          <p className="text-gray-600 mb-6">
            Facilitar el proceso de elección universitaria, proporcionando información precisa y personalizada a cada estudiante.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cómo Funciona</h2>
          <ol className="list-decimal list-inside text-gray-600 mb-6 space-y-2">
            <li>Ingresa tus puntajes PAES</li>
            <li>Nuestro algoritmo analiza tus resultados</li>
            <li>Te presentamos las mejores opciones de universidades y carreras</li>
          </ol>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">¿Por qué Unify?</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Información actualizada de todas las universidades privadas de Santiago</li>
            <li>Recomendaciones personalizadas</li>
            <li>Interfaz fácil de usar</li>
            <li>Soporte continuo durante tu proceso de postulación</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AboutUnify;