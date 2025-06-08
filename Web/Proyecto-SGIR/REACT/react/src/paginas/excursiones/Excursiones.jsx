import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext"; // <-- Esto lo agregué
import './Excursiones.css';

const FormExcursion = () => {
  const { token } = useAuth();  // <-- Esto también
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    destino: "",
    precio: 0,
    duracion: "",
    transporte: "",
    comida: "",
    actividad: ""
  });

  const [excursiones, setExcursiones] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Aquí creamos los headers con el token para usar en axios
  const headers = {
    Authorization: `Bearer ${token}`
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      nombre: "",
      descripcion: "",
      destino: "",
      precio: 0,
      duracion: "",
      transporte: "",
      comida: "",
      actividad: ""
    });
    setEditingId(null);
    setError(null);
    setIsSuccess(false);
  };

  const obtenerExcursiones = async () => {
    if (!token) return; // No hacemos nada si no hay token
    try {
      const response = await axios.get(
        "http://localhost:7700/api/excursiones",
        { headers }   // <-- agregué aquí los headers
      );
      setExcursiones(response.data);
    } catch (err) {
      console.error("Error al obtener las excursiones:", err);
      setError("No se pudieron cargar las excursiones.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setIsSuccess(false);

    // Excluimos campos _id y __v si existen antes de enviar
    const { _id, __v, ...dataToSend } = formData;

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:7700/api/excursiones/${editingId}`,
          dataToSend,
          { headers } // <-- y aquí también
        );
        setIsSuccess(true);
      } else {
        await axios.post(
          "http://localhost:7700/api/excursiones",
          dataToSend,
          { headers: { ...headers, "Content-Type": "application/json" } } // <-- y aquí
        );
        setIsSuccess(true);
      }
      await obtenerExcursiones();
      resetForm();
    } catch (err) {
      console.error("Error al guardar la excursión:", err);
      setError(
        err.response?.data?.message || "Ocurrió un error al guardar la excursión"
      );
    } finally {
      setLoading(false);
    }
  };

  const editExcursion = (excursion) => {
    setFormData({ ...excursion });
    setEditingId(excursion._id);
    setError(null);
    setIsSuccess(false);
  };

  const deleteExcursion = async (id) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar esta excursión?"))
      return;

    try {
      await axios.delete(`http://localhost:7700/api/excursiones/${id}`, {
        headers,  // <-- aquí también agregué headers
      });
      await obtenerExcursiones();
    } catch (err) {
      console.error("Error al eliminar la excursión:", err);
      setError("No se pudo eliminar la excursión.");
    }
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  useEffect(() => {
    if (token) {
      obtenerExcursiones();
    }
  }, [token]);

  return (
    <div className="container3">
      <h1 className="tit">ADMINISTRAR EXCURSIONES</h1>
      <form className="formulario" onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={formData.descripcion}
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="text"
          name="destino"
          placeholder="Destino"
          value={formData.destino}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={formData.precio}
          onChange={handleChange}
          required
          min="0"
        />
        <input
          type="text"
          name="duracion"
          placeholder="Duración"
          value={formData.duracion}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="transporte"
          placeholder="Transporte"
          value={formData.transporte}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="comida"
          placeholder="Comida"
          value={formData.comida}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="actividad"
          placeholder="Actividad"
          value={formData.actividad}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Guardando..." : editingId ? "Actualizar" : "Agregar"}
        </button>
        {isSuccess && <p className="success-message">¡Operación exitosa!</p>}
        {error && <p className="error-message">{error}</p>}
      </form>

      <div className="excursiones-lista">
        <h2>Lista de Excursiones</h2>
        {excursiones.length === 0 && <p>No hay excursiones para mostrar.</p>}
        {excursiones.map((excursion) => (
          <div className="excursion-card" key={excursion._id}>
            <h3>{excursion.nombre}</h3>
            <p>{excursion.descripcion}</p>
            <p>Destino: {excursion.destino}</p>
            <p>Precio: ${formatPrice(excursion.precio)}</p>
            <p>Duración: {excursion.duracion}</p>
            <p>Transporte: {excursion.transporte}</p>
            <p>Comida: {excursion.comida}</p>
            <p>Actividad: {excursion.actividad}</p>
            <button onClick={() => editExcursion(excursion)}>Editar</button>
            <button onClick={() => deleteExcursion(excursion._id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormExcursion;

