import React, { useState } from "react";
import "./gestionreservas.css"; 
import excursion1 from "../../assets/reservas/Medellin-caja.jpg";
import excursion2 from "../../assets/reservas/cali-caja.jpg";
import excursion3 from "../../assets/reservas/cali-caja.jpg";
import excursion4 from "../../assets/reservas/Medellin-caja.jpg";
import excursion5 from "../../assets/reservas/cali-caja.jpg";
import excursion6 from "../../assets/reservas/cali-caja.jpg";
import excursion7 from "../../assets/reservas/Medellin-caja.jpg";
import excursion8 from "../../assets/reservas/cali-caja.jpg";
import excursion9 from "../../assets/reservas/cali-caja.jpg";
import paquete1 from "../../assets/destinos/pack1.jpg";
import paquete2 from "../../assets/destinos/pack2.webp";
import paquete3 from "../../assets/destinos/pack3.jpeg";
import paquete4 from "../../assets/destinos/pack1.jpg";
import paquete5 from "../../assets/destinos/pack2.webp";
import paquete6 from "../../assets/destinos/pack3.jpeg";
import paquete7 from "../../assets/destinos/pack1.jpg";
import paquete8 from "../../assets/destinos/pack2.webp";
import paquete9 from "../../assets/destinos/pack3.jpeg";
import hotel1 from "../../assets/hoteles/hotel_casablanca.jpg";
import hotel2 from "../../assets/hoteles/hotel_montañaverde.jpg";
import hotel3 from "../../assets/hoteles/hotelcaribe.jpg";
import hotel4 from "../../assets/hoteles/hotel_casablanca.jpg";
import hotel5 from "../../assets/hoteles/hotel_montañaverde.jpg";
import hotel6 from "../../assets/hoteles/hotelcaribe.jpg";
import hotel7 from "../../assets/hoteles/hotel_casablanca.jpg";
import hotel8 from "../../assets/hoteles/hotel_montañaverde.jpg";
import hotel9 from "../../assets/hoteles/hotelcaribe.jpg";

const servicios = {
  Excursiones: [
    { id: 1, nombre: "Aventura en la montaña de Medellín", imagen: excursion1 },
    { id: 2, nombre: "Exploración en la selva de Amazonía", imagen: excursion2 },
    { id: 3, nombre: "Ruta del volcán del Nevado del Ruiz", imagen: excursion3 },
    { id: 4, nombre: "Paseo en lancha en el Lago de Guatavita", imagen: excursion4 },
    { id: 5, nombre: "Safari fotográfico en La Guajira", imagen: excursion5 },
    { id: 6, nombre: "Tour en bicicleta por el Eje Cafetero", imagen: excursion6 },
    { id: 7, nombre: "Descubre cuevas en Boyacá", imagen: excursion7 },
    { id: 8, nombre: "Senderismo extremo en el Parque de los Nevados", imagen: excursion8 },
    { id: 9, nombre: "Buceo en arrecifes de San Andrés", imagen: excursion9 },
  ],
  "Paquetes Turísticos": [
    { id: 10, nombre: "Viaje todo incluido a Cartagena", imagen: paquete1 },
    { id: 11, nombre: "Crucero por el Caribe colombiano", imagen: paquete2 },
    { id: 12, nombre: "Tour por la Ciudad Perdida en la Sierra Nevada", imagen: paquete3 },
    { id: 13, nombre: "Ruta por la zona cafetera", imagen: paquete4 },
    { id: 14, nombre: "Aventura en el Parque Nacional Natural de La Macarena", imagen: paquete5 },
    { id: 15, nombre: "Tour por la región del Amazonas", imagen: paquete6 },
    { id: 16, nombre: "Vacaciones en la playa de Santa Marta", imagen: paquete7 },
    { id: 17, nombre: "Escapada romántica a Villa de Leyva", imagen: paquete8 },
    { id: 18, nombre: "Exploración cultural en Bogotá", imagen: paquete9 },
  ],
  Hoteles: [
    { id: 19, nombre: "Resort 5 estrellas en San Andrés", imagen: hotel1 },
    { id: 20, nombre: "Hotel boutique en Medellín", imagen: hotel2 },
    { id: 21, nombre: "Eco-lodge en la zona cafetera", imagen: hotel3 },
    { id: 22, nombre: "Hostal económico en Cartagena", imagen: hotel4 },
    { id: 23, nombre: "Cabañas en la montaña de Nariño", imagen: hotel5 },
    { id: 24, nombre: "Hotel en la playa de San Andrés", imagen: hotel6 },
    { id: 25, nombre: "Resort con spa en Santa Marta", imagen: hotel7 },
    { id: 26, nombre: "Lujo en la ciudad de Bogotá", imagen: hotel8 },
    { id: 27, nombre: "Hotel con piscina en el Eje Cafetero", imagen: hotel9 },
  ],
};

const ReservasGestion = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Excursiones");
  const [busqueda, setBusqueda] = useState("");

  // Filtra los servicios según la búsqueda
  const serviciosFiltrados = servicios[categoriaSeleccionada].filter((servicio) =>
    servicio.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="reservas-container">
      <h1 className="titulo">Reserva tu experiencia en Colombia</h1>

      {/* Barra de búsqueda */}
      <div className="barra-busqueda">
        <input
          type="text"
          placeholder="Busca tu aventura..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <i className="fas fa-search"></i>
      </div>

      {/* Categorías */}
      <div className="categorias">
        {Object.keys(servicios).map((categoria) => (
          <button
            key={categoria}
            className={`categoria-boton ${categoriaSeleccionada === categoria ? "activo" : ""}`}
            onClick={() => setCategoriaSeleccionada(categoria)}
          >
            {categoria}
          </button>
        ))}
      </div>

      {/* Grid de los servicios */}
      <div className="servicios-grid">
        {serviciosFiltrados.length === 0 ? (
          <p>No se encontraron servicios para tu búsqueda.</p>
        ) : (
          serviciosFiltrados.map((servicio) => (
            <div key={servicio.id} className="servicio-card">
              <img src={servicio.imagen} alt={servicio.nombre} className="servicio-imagen" />
              <div className="servicio-info">
                <h3 className="servicio-nombre">{servicio.nombre}</h3>
                <p className="servicio-descripcion">
                  Explora los mejores destinos de Colombia y vive una experiencia única e inolvidable.
                </p>
                <a className="boton-reservar">Reserva ahora</a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReservasGestion;
