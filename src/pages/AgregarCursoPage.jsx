import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../services/api';

const AgregarCursoPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [docentes, setDocentes] = useState([]);
  const [message, setMessage] = useState('');

  // Obtener los docentes
  useEffect(() => {
    api.get('/docentes')
      .then(response => setDocentes(response.data))
      .catch(error => console.error(error));
  }, []);

  const onSubmit = data => {
    api.post('/cursos', data)
      .then(response => setMessage('Curso agregado correctamente'))
      .catch(error => setMessage('Error al agregar el curso'));
  };

  return (
    <div className="container mt-5">
      <h2>Agregar Curso</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            {...register('nombre', { required: true })}
          />
          {errors.nombre && <small className="text-danger">Este campo es obligatorio</small>}
        </div>

        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">Descripción</label>
          <textarea
            className="form-control"
            id="descripcion"
            {...register('descripcion', { required: true })}
          />
          {errors.descripcion && <small className="text-danger">Este campo es obligatorio</small>}
        </div>

        <div className="mb-3">
          <label htmlFor="docente" className="form-label">Docente</label>
          <select
            className="form-control"
            id="docente"
            {...register('docente_id', { required: true })}
          >
            <option value="">Seleccione un docente</option>
            {docentes.map(docente => (
              <option key={docente.id} value={docente.id}>{docente.nombre}</option>
            ))}
          </select>
          {errors.docente_id && <small className="text-danger">Este campo es obligatorio</small>}
        </div>

        <button type="submit" className="btn btn-primary">Agregar</button>
      </form>
      {message && <div className="mt-3">{message}</div>}
    </div>
  );
};

export default AgregarCursoPage;
