import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './componentes/ProtectedRoute';

// Páginas públicas
import Principal from './paginas/inicio/paginaprincipal';
import Nosotros from './paginas/nosotros/nosotros';
import Servicios from './paginas/servicios/Servicios';
import InicioCon from './paginas/inicio/inicioCon';
import TerminosDeUso from './paginas/politicas/Terminos';
import Ayuda from './paginas/politicas/Ayuda';
import PoliticaDePrivacidad from './paginas/politicas/politica';
import RegisterForm from './componentes/RegisterForm.jsx';
import Login from './paginas/Login.jsx';
import Contacto from './paginas/contacto/InicioContactos';
import Hotel from './paginas/servicios/Hotel.jsx';
import Paquetes from './paginas/servicios/Paquetes.jsx';

import ExcursionDesc from './paginas/descripcion/DescExcursion.jsx';
import PaqueteDesc from './paginas/descripcion/DescPaquete.jsx';
import HotelDesc from './paginas/descripcion/DescHotel.jsx';
import ReservaForm from './paginas/reservas/resevar';

// Ruta protegida cliente
import ReservasGestion from './paginas/gestionreservas/ReservasGestion.jsx';

// Página de acceso denegado
import AccessDenied from './paginas/AccesoDenegado/AccesoDenegado.jsx';

// Rutas protegidas solo para Admin
import AdminPage from './paginas/dashboard/AdminPage.jsx';

import ClientesCRUD from './componentes/clientesCRUD';
import PaquetePage from './paginas/paquete/PaquetePage';
import Excursiones from './paginas/excursiones/Excursiones';
import ComentariosCRUD from './componentes/comentarioCRUD'; 
import ListaDeContactos from './paginas/contacto/ListarContactos';
import CrudHoteles from './paginas/hoteles/CrudHoteles.jsx';
import ReservaCrud from './paginas/reservas/ReservaCrud';
import Transporte from './paginas/transporte/TablaTransporte';
import UserList from "./paginas/admin/UserList.jsx";


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Principal />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/inicio-con" element={<InicioCon />} />
          <Route path="/terminos" element={<TerminosDeUso />} />
          <Route path="/ayuda" element={<Ayuda />} />
          <Route path="/politica" element={<PoliticaDePrivacidad />} />
          <Route path="/registro" element={<RegisterForm />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/hotel" element={<Hotel />} />
          <Route path="/paquetes" element={<Paquetes />} />
          
          <Route path="/excursiondesc" element={<ExcursionDesc />} />
          <Route path="/paquetedesc" element={<PaqueteDesc />} />
          <Route path="/hoteldesc" element={<HotelDesc />} />
          <Route path="/reserva" element={<ReservaForm />} />
         

          {/* Página de acceso denegado */}
          <Route path="/denegado" element={<AccessDenied />} />

          {/* Rutas protegidas solo para admin */}
          
            <Route path="adminPage" element={<AdminPage />} />
            <Route path="clientes" element={<ClientesCRUD />} />
            <Route path="UserList" element={<UserList />} />
            <Route path="PaquetePage" element={<PaquetePage />} />
            <Route path="Excursiones" element={<Excursiones />} />
            <Route path="comentarios" element={<ComentariosCRUD />} />
            <Route path="ListarContactos" element={< ListaDeContactos />} />
            <Route path="CrudHoteles" element={<CrudHoteles />} />
            <Route path="ReservaCrud" element={<ReservaCrud />} />
            <Route path="Transporte" element={<Transporte />} />
          {/* Protegidas cliente */}
          <Route
            path="cliente/ReservasGestion"
            element={
              <ProtectedRoute allowedRoles={['cliente']}>
                <ReservasGestion />
              </ProtectedRoute>
            }
          />
          <Route path="Contacto" element={<Contacto />} />

          {/* Ruta de fallback */}
          <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;


