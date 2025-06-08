import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserTie, FaMapMarkerAlt, FaRocket, FaFlag } from "react-icons/fa"; // Importamos iconos
import './nosotros.css';

const SobreNosotros = () => {
  return (
    <>
      {/* Header (no se modifica) */}
      <header className="custom-header">
        <div className="custom-logo">
          <img src="../src/assets/logo.png" alt="Logo" />
        </div>
        <nav className="custom-nav">
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/nosotros">Nosotros</Link></li>
            <li><Link to="/servicios">Servicios</Link></li>
            <li><Link to="/inicio-con">Ingresar</Link></li>
            <li><Link to="/registro">Registrarse</Link></li>
          </ul>
        </nav>
      </header>

      {/* Contenedor general */}
      <div className="nosotros-wrapper">
        <div className="nosotros-container">
          
          {/* Tarjeta del gerente */}
          <div className="gerente-card">
            <div className="gerente-img">
              <img src="../src/assets/nosotros/leon.jpg" alt="Jose Leon" />
            </div>
            <div className="gerente-info">
              <h1><FaUserTie className="icono" /> Jose Leon</h1>
              <p className="gerente-cargo">Gerente General</p>
              <p className="gerente-descripcion">
                Experto en turismo y planificación de viajes, comprometido con ofrecer experiencias inolvidables.
              </p>
            </div>
          </div>

          {/* Sección de Misión y Visión */}
          <div className="mision-vision">
            <div className="mision">
              <h3><FaRocket className="icono" /> Nuestra Misión</h3>
              <p>Brindar experiencias de viaje seguras y emocionantes, conectando a nuestros clientes con la naturaleza.</p>
            </div>
            <div className="vision">
              <h3><FaFlag className="icono" /> Nuestra Visión</h3>
              <p>Ser líderes en turismo de aventura en Colombia, destacándonos por nuestro servicio y calidad.</p>
            </div>
          </div>

          {/* Sección del mapa */}
          <div className="mapa-container">
            <h3><FaMapMarkerAlt className="icono" /> Encuéntranos Aquí</h3>
            <div className="mapa">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.5487193937456!2d-74.1216984857422!3d4.609710593708278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f99a90fb31579%3A0x575a8760cb69774d!2sBosa%2C%20Bogot%C3%A1!5e0!3m2!1ses!2sco!4v1609261977060!5m2!1ses!2sco"
                width="100%"
                height="300"
                frameBorder="0"
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
              ></iframe>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default SobreNosotros;
