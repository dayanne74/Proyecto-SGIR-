import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const HotelCrud = () => {
  const [hotelData, setHotelData] = useState({
    _id: "",
    nombre: "",
    ubicacion: "",
    numeroHabitaciones: "",
    numeroPersonas: "",
    comida: "",
    precio: "",
    categoria: "",
    precioPorNoche: "",
    descripcion: "",
    imagenPortada: null,
    galeriaImagenes: [],
    servicios: [{ nombre: "", icono: "" }],
  });

  const [hotels, setHotels] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:7700/api/hotels")
      .then((response) => {
        // Verificar que cada hotel tiene un _id único
        const uniqueHotels = response.data.map((hotel, index) => ({
          ...hotel,
          key: hotel._id || `hotel-${index}`, // Asegura que cada hotel tenga un key único
        }));
        setHotels(uniqueHotels);
      })
      .catch((error) => {
        console.error("Error al obtener los hoteles", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("servicio")) {
      const index = parseInt(name.split("-")[1]);
      const updatedServicios = [...hotelData.servicios];
      updatedServicios[index][e.target.dataset.field] = value;
      setHotelData({ ...hotelData, servicios: updatedServicios });
    } else {
      setHotelData({ ...hotelData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "imagenPortada") {
      setHotelData({ ...hotelData, imagenPortada: files[0] });
    } else if (name === "galeriaImagenes") {
      setHotelData({ ...hotelData, galeriaImagenes: Array.from(files) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(hotelData).forEach(([key, value]) => {
      if (key === "galeriaImagenes") {
        value.forEach((file) => formData.append(key, file));
      } else if (key === "servicios") {
        value.forEach((servicio, index) => {
          formData.append(`servicios[${index}][nombre]`, servicio.nombre);
          formData.append(`servicios[${index}][icono]`, servicio.icono);
        });
      } else {
        formData.append(key, value);
      }
    });

    try {
      const response = isEditing
        ? await axios.put(
            `http://localhost:7700/api/hotels/${hotelData._id}`,
            formData
          )
        : await axios.post("http://localhost:7700/api/hotels", formData);

      alert("Hotel guardado con éxito");
      if (isEditing) {
        setHotels(
          hotels.map((hotel) =>
            hotel._id === response.data._id ? response.data : hotel
          )
        );
      } else {
        setHotels([...hotels, response.data]);
      }
      setHotelData({
        _id: "",
        nombre: "",
        ubicacion: "",
        numeroHabitaciones: "",
        numeroPersonas: "",
        comida: "",
        precio: "",
        categoria: "",
        precioPorNoche: "",
        descripcion: "",
        imagenPortada: null,
        galeriaImagenes: [],
        servicios: [{ nombre: "", icono: "" }],
      });
      setIsEditing(false);
    } catch (error) {
      alert("Error al guardar el hotel");
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7700/api/hotels/${id}`);
      alert("Hotel eliminado");
      setHotels(hotels.filter((hotel) => hotel._id !== id));
    } catch (error) {
      alert("Error al eliminar el hotel");
      console.error(error);
    }
  };

  const handleEdit = (hotel) => {
    setHotelData(hotel);
    setIsEditing(true);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Gestión de Hoteles</h1>

      {/* Hotel Form */}
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Nombre</label>
          <input
            className="form-control"
            type="text"
            name="nombre"
            value={hotelData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Ubicación</label>
          <input
            type="text"
            className="form-control"
            name="ubicacion"
            value={hotelData.ubicacion}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Número de Habitaciones</label>
          <input
            type="number"
            className="form-control"
            name="numeroHabitaciones"
            value={hotelData.numeroHabitaciones}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Capacidad</label>
          <input
            type="number"
            className="form-control"
            name="numeroPersonas"
            value={hotelData.numeroPersonas}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Tipo de Comida</label>
          <select
            className="form-select"
            name="comida"
            value={hotelData.comida}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar</option>
            <option value="incluida">Incluida</option>
            <option value="no_incluida">No incluida</option>
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Precio</label>
          <input
            type="number"
            className="form-control"
            name="precio"
            value={hotelData.precio}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Categoría</label>
          <select
            className="form-select"
            name="categoria"
            value={hotelData.categoria}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar</option>
            <option value="baja">Baja</option>
            <option value="media">Media</option>
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Precio por Noche</label>
          <input
            type="number"
            className="form-control"
            name="precioPorNoche"
            value={hotelData.precioPorNoche}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12">
          <label className="form-label">Descripción</label>
          <textarea
            className="form-control"
            name="descripcion"
            rows="3"
            value={hotelData.descripcion}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="col-12">
          <label className="form-label">Imagen de Portada</label>
          <input
            type="file"
            className="form-control"
            name="imagenPortada"
            onChange={handleFileChange}
            required
          />
        </div>
        <div className="col-12">
          <label className="form-label">Galería de Imágenes</label>
          <input
            type="file"
            className="form-control"
            name="galeriaImagenes"
            multiple
            onChange={handleFileChange}
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary mt-3">
            {isEditing ? "Actualizar Hotel" : "Agregar Hotel"}
          </button>
        </div>
      </form>

      {/* Listado de Hoteles */}
      <div className="row mt-5">
        {hotels.map((hotel) => (
          <div className="col-md-4 mb-4" key={hotel.key}> {/* Usamos el 'key' único */}
            <div className="card">
              <img
                src={`http://localhost:7700/uploads/${hotel.imagenPortada}`}
                className="card-img-top"
                alt={hotel.nombre}
              />
              <div className="card-body">
                <h5 className="card-title">{hotel.nombre}</h5>
                <p className="card-text">{hotel.descripcion}</p>
                <button
                  className="btn btn-warning"
                  onClick={() => handleEdit(hotel)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(hotel._id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelCrud;