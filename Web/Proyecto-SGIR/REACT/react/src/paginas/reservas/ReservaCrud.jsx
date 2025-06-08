import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../reservas/ReservaCrud.css';

// Función para formatear las fechas
const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('es-CO', options); // Formato de fecha en español
};

const Reservas = () => {
  const [reservas, setReservas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [paquetes, setPaquetes] = useState([]);
  const [hoteles, setHoteles] = useState([]);
  const [excursiones, setExcursiones] = useState([]);
  const [editReserva, setEditReserva] = useState(null); // Para editar la reserva

  // Cargar datos de clientes, paquetes, hoteles y excursiones
  useEffect(() => {
    const fetchData = async () => {
      try {
        const clienteResponse = await axios.get('http://localhost:7700/api/clientes');
        setClientes(clienteResponse.data);

        const paqueteResponse = await axios.get('http://localhost:7700/api/paquete');
        setPaquetes(paqueteResponse.data);

        const hotelResponse = await axios.get('http://localhost:7700/api/hotels');
        setHoteles(hotelResponse.data);

        const excursionResponse = await axios.get('http://localhost:7700/api/excursiones');
        setExcursiones(excursionResponse.data);

        const reservaResponse = await axios.get('http://localhost:7700/api/reservas');
        setReservas(reservaResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Error al cargar los datos. Verifica que los servidores estén activos.');
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7700/api/reservas/${id}`);
      setReservas(reservas.filter(reserva => reserva._id !== id)); // Eliminar reserva del estado
      alert('Reserva eliminada correctamente');
    } catch (error) {
      console.error('Error al eliminar la reserva:', error);
      alert('Error al eliminar la reserva');
    }
  };

  const handleEdit = (reserva) => {
    setEditReserva(reserva); // Establecer la reserva para editar
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
  
    // Crear una copia de editReserva excluyendo los campos no permitidos
    const { _id, __v, ...reservaParaActualizar } = editReserva;
  
    try {
      const updatedReserva = await axios.put(
        `http://localhost:7700/api/reservas/${_id}`,
        reservaParaActualizar
      );
      setReservas(reservas.map(reserva => (reserva._id === _id ? updatedReserva.data : reserva)));
      setEditReserva(null); // Resetear la edición
      alert('Reserva actualizada correctamente');
    } catch (error) {
      console.error('Error al actualizar la reserva:', error);
      alert('Error al actualizar la reserva');
    }
  };

  const handleChange = (e) => {
    setEditReserva({
      ...editReserva,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="reservas-container">
      <h2 className="reservas-title">Lista de Reservas</h2>
      <div className="reservas-table-container">
        <table className="reservas-table">
          <thead>
            <tr>
              <th>Tipo de Documento</th>
              <th>Cliente</th>
              <th>Fecha de Salida</th>
              <th>Fecha de Regreso</th>
              <th>Destino</th>
              <th>Hotel</th>
              <th>Paquete</th>
              <th>Excursión</th>
              <th>Numero de Contacto</th>
              <th>Cantidad de Personas</th>
              <th>Transporte</th>
              <th>Precio Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva) => {
              const cliente = clientes.find(c => c._id === reserva.id_cliente); // Buscar cliente por ID
              return (
                <tr key={reserva._id}>
                  <td>{reserva.tipoDocumento}</td>
                  <td>{reserva.id_cliente ? reserva.id_cliente.nombre : 'No disponible'}</td>
                  <td>{formatDate(reserva.fechaSalida)}</td>
                  <td>{formatDate(reserva.fechaRegreso)}</td>
                  <td>{reserva.destino}</td>
                  <td>{reserva.id_hotel ? reserva.id_hotel.nombre : 'No disponible'}</td>
                  <td>{reserva.id_paquete ? reserva.id_paquete.nombre : 'No disponible'}</td>
                  <td>{reserva.id_excursion ? reserva.id_excursion.nombre : 'No disponible'}</td>
                  <td>{reserva.numeroContacto}</td>
                  <td>{reserva.cantidadPersonas}</td>
                  <td>{reserva.transporte}</td>
                  <td>{reserva.precioTotal}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(reserva)}>Editar</button>
                   <hr />
                    <button className="delete-btn" onClick={() => handleDelete(reserva._id)}>Eliminar</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Formulario de edición */}
     
  <div className="reservas-container">
    <h2 className="reservas-title"></h2>
    <div className="reservas-table-container">
      <table className="reservas-table">
        {/* Contenido de la tabla */}
      </table>
    </div>

    {/* Fondo oscuro y formulario de edición */}
    {editReserva && (
      <div className="edit-overlay">
        <form className="edit-form" onSubmit={handleUpdate}>
          <button className="close-btn" onClick={() => setEditReserva(null)}>
            &times;
          </button>
          <h3>Editar Reserva</h3>

          <div className="form-group">
            <label>Tipo de Documento:</label>
            <input type="text" name="tipoDocumento" value={editReserva.tipoDocumento} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Cliente:</label>
            <select name="id_cliente" value={editReserva.id_cliente} onChange={handleChange} required>
              {clientes.map(cliente => (
                <option key={cliente._id} value={cliente._id}>
                  {cliente.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Añadir más campos aquí */}
          {/* Cada campo toma una de las dos columnas */}
          <div className="form-group">
            <label>Fecha de Salida:</label>
            <input type="date" name="fechaSalida" value={editReserva.fechaSalida} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Fecha de Regreso:</label>
            <input type="date" name="fechaRegreso" value={editReserva.fechaRegreso} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Destino:</label>
            <input type="text" name="destino" value={editReserva.destino} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Hotel:</label>
            <select name="id_hotel" value={editReserva.id_hotel} onChange={handleChange} required>
              {hoteles.map(hotel => (
                <option key={hotel._id} value={hotel._id}>
                  {hotel.nombre}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="submit-btn">Actualizar Reserva</button>
        </form>
      </div>
    )}
  </div>


    </div>
  );
};

export default Reservas;
