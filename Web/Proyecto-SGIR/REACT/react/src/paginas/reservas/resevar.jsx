import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReservaForm.css';

const ReservaForm = () => {
  const [clientes, setClientes] = useState([]);
  const [paquetes, setPaquetes] = useState([]);
  const [hoteles, setHoteles] = useState([]);
  const [excursiones, setExcursiones] = useState([]);
  const [filteredHoteles, setFilteredHoteles] = useState([]);  // Estado para los hoteles filtrados
  const [formData, setFormData] = useState({
    tipoDocumento: '',
    id_cliente: '',
    numeroDocumento: '',
    fechaSalida: '',
    fechaRegreso: '',
    destino: '',
    id_hotel: '',
    id_paquete: '',
    id_excursion: '',
    numeroContacto: '',
    cantidadPersonas: 1,
    transporte: '',
    precioTotal: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clienteResponse = await axios.get('http://localhost:7700/api/clientes');
        setClientes(clienteResponse.data);

        const paqueteResponse = await axios.get('http://localhost:7700/api/paquete');
        setPaquetes(paqueteResponse.data);

        const hotelResponse = await axios.get('http://localhost:7700/api/hotels');
        setHoteles(hotelResponse.data);
        setFilteredHoteles(hotelResponse.data); // Inicialmente, mostrar todos los hoteles

        const excursionResponse = await axios.get('http://localhost:7700/api/excursiones');
        setExcursiones(excursionResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Cuando se selecciona un cliente, actualizamos el numeroDocumento
  const handleClienteChange = (e) => {
    const clienteId = e.target.value;
    const selectedCliente = clientes.find(cliente => cliente._id === clienteId);
    
    setFormData(prevState => ({
      ...prevState,
      id_cliente: clienteId,
      numeroDocumento: selectedCliente ? selectedCliente.numeroDocumento : '',
    }));
  };

  const calculatePrice = () => {
    const hotel = hoteles.find(h => h._id === formData.id_hotel);
    const paquete = paquetes.find(p => p._id === formData.id_paquete);
    const excursion = excursiones.find(e => e._id === formData.id_excursion);

    let totalPrice = 0;

    if (hotel) totalPrice += hotel.precio;
    if (paquete) totalPrice += paquete.precio;
    if (excursion) totalPrice += excursion.precio;

    totalPrice *= formData.cantidadPersonas;

    setFormData(prevState => ({
      ...prevState,
      precioTotal: totalPrice,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => {
      const newFormData = { ...prevState, [name]: value };
      if (['id_hotel', 'id_paquete', 'id_excursion', 'cantidadPersonas'].includes(name)) {
        calculatePrice();
      }
      return newFormData;
    });
  };

  // Filtrar los hoteles cuando se cambia el destino
  const handleDestinoChange = (e) => {
    const destino = e.target.value;
    setFormData(prevState => ({
      ...prevState,
      destino: destino,
    }));

    // Filtrar hoteles que coincidan con el destino
    if (destino) {
      const filtered = hoteles.filter(hotel =>
        hotel.ubicacion.toLowerCase().includes(destino.toLowerCase())
      );
      setFilteredHoteles(filtered);  // Actualizar los hoteles filtrados
    } else {
      setFilteredHoteles(hoteles);  // Si no hay destino, mostrar todos los hoteles
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Creamos una copia de los datos del formulario sin incluir 'numeroDocumento'
    const { numeroDocumento, ...dataToSend } = formData;

    try {
      // Enviar los datos al backend sin el numeroDocumento
      await axios.post('http://localhost:7700/api/reservas', dataToSend, {
        headers: { 'Content-Type': 'application/json' }
      });

      // Mostrar mensaje de éxito
      alert('Reserva creada exitosamente');
    } catch (error) {
      console.error('Error al crear la reserva:', error);
      alert('Error al crear la reserva. Por favor, verifica los datos.');
    }
  };

  return (
    <div className="reserva-container">
      <form className="reserva-form" onSubmit={handleSubmit}>
        <h1>Reserva Ya</h1>
        <div className="form-grid">
          {/* Tipo de Documento */}
          <div>
            <label>Tipo de Documento:</label>
            <select name="tipoDocumento" value={formData.tipoDocumento} onChange={handleChange} required>
              <option value="">Seleccione</option>
              <option value="Cédula">Cédula</option>
              <option value="Pasaporte">Pasaporte</option>
              <option value="Tarjeta de Identidad">Tarjeta de Identidad</option>
            </select>
          </div>

          {/* Cliente */}
          <div>
            <label>Cliente:</label>
            <select name="id_cliente" value={formData.id_cliente} onChange={handleClienteChange} required>
              <option value="">Seleccione un cliente</option>
              {clientes.map(cliente => (
                <option key={cliente._id} value={cliente._id}>
                  {cliente.nombre} {cliente.apellido}
                </option>
              ))}
            </select>
          </div>

          {/* Número de Documento (Tomado del cliente seleccionado) */}
          <div>
            <label>Número de Documento:</label>
            <input
              type="text"
              name="numeroDocumento"
              value={formData.numeroDocumento}
              readOnly
            />
          </div>

          {/* Fecha de Salida */}
          <div>
            <label>Fecha de Salida:</label>
            <input type="date" name="fechaSalida" value={formData.fechaSalida} onChange={handleChange} required />
          </div>

          {/* Fecha de Regreso */}
          <div>
            <label>Fecha de Regreso:</label>
            <input type="date" name="fechaRegreso" value={formData.fechaRegreso} onChange={handleChange} required />
          </div>

          {/* Destino */}
          <div>
            <label>Destino:</label>
            <input
              type="text"
              name="destino"
              value={formData.destino}
              onChange={handleDestinoChange}
              required
            />
          </div>

          {/* Hotel (Filtrado según el destino) */}
          <div>
            <label>Hotel:</label>
            <select name="id_hotel" value={formData.id_hotel} onChange={handleChange} required>
              <option value="">Seleccione un hotel</option>
              {filteredHoteles.map(hotel => (
                <option key={hotel._id} value={hotel._id}>
                  {hotel.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Paquete */}
          <div>
            <label>Paquete:</label>
            <select name="id_paquete" value={formData.id_paquete} onChange={handleChange} required>
              <option value="">Seleccione un paquete</option>
              {paquetes.map(paquete => (
                <option key={paquete._id} value={paquete._id}>
                  {paquete.nombre} - ${paquete.precio}
                </option>
              ))}
            </select>
          </div>

          {/* Excursión */}
          <div>
            <label>Excursión:</label>
            <select name="id_excursion" value={formData.id_excursion} onChange={handleChange} required>
              <option value="">Seleccione una excursión</option>
              {excursiones.map(excursion => (
                <option key={excursion._id} value={excursion._id}>
                  {excursion.nombre} -  ${excursion.precio}
                </option>
              ))}
            </select>
          </div>

          {/* Número de Contacto */}
          <div>
            <label>Número de Contacto:</label>
            <input
              type="text"
              name="numeroContacto"
              value={formData.numeroContacto}
              onChange={handleChange}
              required
            />
          </div>

          {/* Cantidad de Personas */}
          <div>
            <label>Cantidad de Personas:</label>
            <input
              type="number"
              name="cantidadPersonas"
              value={formData.cantidadPersonas}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          {/* Transporte */}
          <div>
            <label>Transporte:</label>
            <select name="transporte" value={formData.transporte} onChange={handleChange} required>
              <option value="">Seleccione transporte</option>
              <option value="Bus">Bus</option>
              <option value="Avión">Avión</option>
              <option value="Automóvil">Automóvil</option>
            </select>
          </div>

          {/* Precio Total */}
          <div>
            <label>Precio Total:</label>
            <input type="text" name="precioTotal" value={`$${formData.precioTotal}`} readOnly />
          </div>
        </div>

        <button type="submit" className='reservas-button1'>Crear Reserva</button>
      </form>
    </div>
  );
};

export default ReservaForm;
