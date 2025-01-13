import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DocentesPage = () => {
  const [docentes, setDocentes] = useState([]);
  const [nuevoDocente, setNuevoDocente] = useState({
    nombre: '',
    documento: '',
    correo: ''
  });
  const [editarDocente, setEditarDocente] = useState(null);

  // Obtener los docentes de la API
  useEffect(() => {
    const fetchDocentes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/docentes');
        console.log(response.data); // Verificar la respuesta
        if (Array.isArray(response.data)) {
          setDocentes(response.data);
        } else if (response.data && Array.isArray(response.data.docentes)) {
          // Si la respuesta tiene un campo docentes, usarlo
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

  // Función para manejar cambios en el formulario de nuevo docente
  const handleChange = (e) => {
    setNuevoDocente({
      ...nuevoDocente,
      [e.target.name]: e.target.value
    });
  };

  // Función para agregar un nuevo docente
  const handleSubmit = async (e) => {
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
  const handleEdit = (docente) => {
    setEditarDocente(docente);
  };

  // Función para actualizar un docente
  const handleUpdate = async (e) => {
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
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/docentes/${id}`);
      setDocentes(docentes.filter(docente => docente.id !== id));
    } catch (error) {
      console.error('Error al eliminar el docente:', error);
    }
  };

  return (
    <div className="container">
      <h1>Gestión de Docentes</h1>

      {/* Formulario para agregar un docente */}
      <div>
        <h3>Agregar Docente</h3>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Agregar</button>
        </form>
      </div>

      {/* Mostrar lista de docentes */}
      <h3>Lista de Docentes</h3>
      <ul>
        {Array.isArray(docentes) && docentes.length > 0 ? (
          docentes.map((docente) => (
            <li key={docente.id}>
              {docente.nombre} ({docente.documento}) - {docente.correo}
              <button onClick={() => handleEdit(docente)}>Editar</button>
              <button onClick={() => handleDelete(docente.id)}>Eliminar</button>
            </li>
          ))
        ) : (
          <p>No hay docentes disponibles.</p>
        )}
      </ul>

      {/* Formulario para editar un docente */}
      {editarDocente && (
        <div>
          <h3>Editar Docente</h3>
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              name="nombre"
              value={editarDocente.nombre}
              onChange={(e) => setEditarDocente({ ...editarDocente, nombre: e.target.value })}
              required
            />
            <input
              type="text"
              name="documento"
              value={editarDocente.documento}
              onChange={(e) => setEditarDocente({ ...editarDocente, documento: e.target.value })}
              required
            />
            <input
              type="email"
              name="correo"
              value={editarDocente.correo}
              onChange={(e) => setEditarDocente({ ...editarDocente, correo: e.target.value })}
              required
            />
            <button type="submit">Actualizar</button>
            <button type="button" onClick={() => setEditarDocente(null)}>Cancelar</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default DocentesPage;
