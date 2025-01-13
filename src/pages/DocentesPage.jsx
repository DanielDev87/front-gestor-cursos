import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DocentesPage = () => {
  const [docentes, setDocentes] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [nuevoDocente, setNuevoDocente] = useState({
    nombre: '',
    documento: '',
    correo: ''
  });
  const [editarDocente, setEditarDocente] = useState(null);
  const [nuevoCurso, setNuevoCurso] = useState({
    nombre: '',
    descripcion: '',
    duracion: 0,
    precio: 0,
    fechaInicio: ''
  });
  const [filtro, setFiltro] = useState({
    nombre: '',
    duracion: '',
    fechaInicio: ''
  });

  // Obtener los docentes de la API
  useEffect(() => {
    const fetchDocentes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/docentes');
        if (Array.isArray(response.data)) {
          setDocentes(response.data);
        } else if (response.data && Array.isArray(response.data.docentes)) {
          setDocentes(response.data.docentes);
        } else {
          console.error('La respuesta no contiene un arreglo de docentes:', response.data);
        }
      } catch (error) {
        console.error('Error al obtener los docentes:', error);
      }
    };

    fetchDocentes();
  }, []);

  // Obtener los cursos de la API
  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/cursos');
        if (Array.isArray(response.data)) {
          setCursos(response.data);
        }
      } catch (error) {
        console.error('Error al obtener los cursos:', error);
      }
    };

    fetchCursos();
  }, []);

  // Función para manejar cambios en el formulario de nuevo docente
  const handleChange = (e) => {
    setNuevoDocente({
      ...nuevoDocente,
      [e.target.name]: e.target.value
    });
  };

  // Función para agregar un nuevo docente
  const handleSubmitDocente = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/docentes', nuevoDocente);
      if (response.data) {
        setDocentes([...docentes, response.data]);
        setNuevoDocente({
          nombre: '',
          documento: '',
          correo: ''
        });
      }
    } catch (error) {
      console.error('Error al agregar el docente:', error);
    }
  };

  // Función para manejar la edición de un docente
  const handleEditDocente = (docente) => {
    setEditarDocente(docente);
  };

  // Función para actualizar un docente
  const handleUpdateDocente = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/api/docentes/${editarDocente.id}`, editarDocente);
      if (response.data) {
        setDocentes(docentes.map(docente => docente.id === editarDocente.id ? response.data : docente));
        setEditarDocente(null);
      }
    } catch (error) {
      console.error('Error al actualizar el docente:', error);
    }
  };

  // Función para eliminar un docente
  const handleDeleteDocente = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/docentes/${id}`);
      setDocentes(docentes.filter(docente => docente.id !== id));
    } catch (error) {
      console.error('Error al eliminar el docente:', error);
    }
  };

  // Función para manejar cambios en el formulario de nuevo curso
  const handleChangeCurso = (e) => {
    setNuevoCurso({
      ...nuevoCurso,
      [e.target.name]: e.target.value
    });
  };

  // Función para agregar un nuevo curso
  const handleSubmitCurso = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/cursos', nuevoCurso);
      if (response.data) {
        setCursos([...cursos, response.data]);
        setNuevoCurso({
          nombre: '',
          descripcion: '',
          duracion: 0,
          precio: 0,
          fechaInicio: ''
        });
      }
    } catch (error) {
      console.error('Error al agregar el curso:', error);
    }
  };

  // Filtrar cursos
  const handleFilterChange = (e) => {
    setFiltro({
      ...filtro,
      [e.target.name]: e.target.value
    });
  };

  // Filtrar los cursos con los valores ingresados
  const filteredCursos = cursos.filter(curso => {
    return (
      (filtro.nombre === '' || curso.nombre.toLowerCase().includes(filtro.nombre.toLowerCase())) &&
      (filtro.duracion === '' || curso.duracion === parseInt(filtro.duracion)) &&
      (filtro.fechaInicio === '' || curso.fechaInicio.startsWith(filtro.fechaInicio))
    );
  });

  return (
    <div className="container">
      <h1>Gestión de Docentes y Cursos</h1>

      {/* Formulario para agregar un docente */}
      <div>
        <h3>Agregar Docente</h3>
        <form onSubmit={handleSubmitDocente}>
          <input
            type="text"
            name="nombre"
            value={nuevoDocente.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            required
          />
          <input
            type="text"
            name="documento"
            value={nuevoDocente.documento}
            onChange={handleChange}
            placeholder="Documento"
            required
          />
          <input
            type="email"
            name="correo"
            value={nuevoDocente.correo}
            onChange={handleChange}
            placeholder="Correo"
            required
          />
          <button type="submit">Agregar Docente</button>
        </form>
      </div>

      {/* Mostrar lista de docentes */}
      <h3>Lista de Docentes</h3>
      <ul>
        {Array.isArray(docentes) && docentes.length > 0 ? (
          docentes.map((docente) => (
            <li key={docente.id}>
              {docente.nombre} ({docente.documento}) - {docente.correo}
              <button onClick={() => handleEditDocente(docente)}>Editar</button>
              <button onClick={() => handleDeleteDocente(docente.id)}>Eliminar</button>
            </li>
          ))
        ) : (
          <p>No hay docentes disponibles.</p>
        )}
      </ul>

      {/* Formulario para agregar un curso */}
      <div>
        <h3>Agregar Curso</h3>
        <form onSubmit={handleSubmitCurso}>
          <input
            type="text"
            name="nombre"
            value={nuevoCurso.nombre}
            onChange={handleChangeCurso}
            placeholder="Nombre del Curso"
            required
          />
          <input
            type="text"
            name="descripcion"
            value={nuevoCurso.descripcion}
            onChange={handleChangeCurso}
            placeholder="Descripción"
            required
          />
          <input
            type="number"
            name="duracion"
            value={nuevoCurso.duracion}
            onChange={handleChangeCurso}
            placeholder="Duración (en días)"
            required
          />
          <input
            type="number"
            name="precio"
            value={nuevoCurso.precio}
            onChange={handleChangeCurso}
            placeholder="Precio"
            required
          />
          <input
            type="date"
            name="fechaInicio"
            value={nuevoCurso.fechaInicio}
            onChange={handleChangeCurso}
            placeholder="Fecha de Inicio"
            required
          />
          <button type="submit">Agregar Curso</button>
        </form>
      </div>

      {/* Filtros de cursos */}
      <div>
        <h3>Filtrar Cursos</h3>
        <input
          type="text"
          name="nombre"
          value={filtro.nombre}
          onChange={handleFilterChange}
          placeholder="Nombre del curso"
        />
        <input
          type="number"
          name="duracion"
          value={filtro.duracion}
          onChange={handleFilterChange}
          placeholder="Duración"
        />
        <input
          type="month"
          name="fechaInicio"
          value={filtro.fechaInicio}
          onChange={handleFilterChange}
          placeholder="Fecha de inicio"
        />
      </div>

      {/* Mostrar lista de cursos filtrados */}
      <h3>Lista de Cursos</h3>
      <ul>
        {filteredCursos.length > 0 ? (
          filteredCursos.map((curso) => (
            <li key={curso.id}>
              {curso.nombre} - {curso.duracion} días - ${curso.precio} - Inicio: {curso.fechaInicio}
            </li>
          ))
        ) : (
          <p>No hay cursos disponibles.</p>
        )}
      </ul>
    </div>
  );
};

export default DocentesPage;
