import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import './style.css';
import FloraBrasil from './pages/FloraBrasil';
import Catalogo from './pages/Catalogo';
import Metodologia from './pages/Metodologia';
import Contato from './pages/Contato';
import Sobre from './pages/Sobre';
import AdminLogin from './pages/AdminLogin';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flora_brasil" element={<FloraBrasil />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/metodologia" element={<Metodologia />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/admin_login" element={<AdminLogin />} />
          {/* Outras rotas serão adicionadas aqui */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
