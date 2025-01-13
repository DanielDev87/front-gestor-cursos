import React from 'react';

const CursoCard = ({ curso }) => {
  return (
    <div className="card mb-4" style={{ width: '18rem' }}>
      <div className="card-body">
        <h5 className="card-title">{curso.nombre}</h5>
        <p className="card-text">{curso.descripcion}</p>
        <p className="card-text"><strong>Precio:</strong> {curso.precio}</p>
        <p className="card-text"><strong>Docente:</strong> {curso.docente.nombre}</p>
        <p className="card-text"><strong>Fecha de inicio:</strong> {curso.fechaInicio}</p>
      </div>
    </div>
  );
};

export default CursoCard;
