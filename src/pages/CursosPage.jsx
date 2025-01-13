import React, { useEffect, useState } from 'react';
import api from '../services/api';
import CursoCard from '../components/CursoCard';

const CursosPage = () => {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    api.get('/cursos')
      .then(response => setCursos(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="container mt-5">
      <h2>Lista de Cursos CESDE</h2>
      <div className="row">
        {cursos.map(curso => (
          <div key={curso.id_curso} className="col-md-4">
            <CursoCard curso={curso} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CursosPage;
