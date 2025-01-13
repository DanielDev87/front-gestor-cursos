import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CursosPage from './pages/CursosPage';
import AgregarCursoPage from './pages/AgregarCursoPage';
import DocentesPage from './pages/DocentesPage';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<CursosPage />} />
        <Route path="/cursos" element={<CursosPage />} />
        <Route path="/agregar-curso" element={<AgregarCursoPage />} />
        <Route path="/docentes" element={<DocentesPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
