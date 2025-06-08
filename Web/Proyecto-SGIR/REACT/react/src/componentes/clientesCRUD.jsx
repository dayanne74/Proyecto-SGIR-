import { useState, useEffect } from "react";
import axios from "axios";
import "../paginas/css/crud.css";

function ClientesCRUD() {
  const [clientes, setClientes] = useState([]);
  const [nuevoCliente, setNuevoCliente] = useState({
    nombreUsuario: "",
    apellidoUsuario: "",
    numeroDocumento: "",
    correo: "",
    contrasena: ""
  });
  const [clienteEditando, setClienteEditando] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Obtener token de autenticación
  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  };

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7700/api/registro",
          getAuthHeader()
        );
        setClientes(response.data);
      } catch (error) {
        console.error("Error al obtener clientes:", error);
        setError("Error al obtener los clientes. Verifica tu conexión o permisos.");
      }
    };
    fetchClientes();
  }, []);

  const agregarCliente = async () => {
    try {
      setError("");
      setSuccess("");

      // Validación de campos
      if (Object.values(nuevoCliente).some(field => field === "")) {
        setError("Todos los campos son obligatorios.");
        return;
      }

      // Verificar si el correo o documento ya existen
      const existe = clientes.some(
        c => c.correo === nuevoCliente.correo || 
             c.numeroDocumento === nuevoCliente.numeroDocumento
      );
      
      if (existe) {
        setError("El correo o número de documento ya están registrados.");
        return;
      }

      const response = await axios.post(
        "http://localhost:7700/api/registro",
        nuevoCliente,
        getAuthHeader()
      );

      setClientes(prev => [...prev, response.data]);
      setNuevoCliente({
        nombreUsuario: "",
        apellidoUsuario: "",
        numeroDocumento: "",
        correo: "",
        contrasena: ""
      });
      setSuccess("Cliente registrado correctamente");
    } catch (error) {
      console.error("Error al agregar cliente:", error);
      setError(error.response?.data?.message || "Error al registrar cliente");
    }
  };

  const eliminarCliente = async (id) => {
    try {
      setError("");
      await axios.delete(
        `http://localhost:7700/api/registro/${id}`,
        getAuthHeader()
      );
      setClientes(prev => prev.filter(cliente => cliente._id !== id));
      setSuccess("Cliente eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar cliente:", error);
      setError(error.response?.data?.message || "Error al eliminar cliente");
    }
  };

  const guardarEdicion = async () => {
    try {
      setError("");
      setSuccess("");
      
      if (!clienteEditando) return;

      const { _id, ...datosActualizar } = clienteEditando;

      // No actualizar contraseña si está vacía
      if (!datosActualizar.contrasena) {
        delete datosActualizar.contrasena;
      }

      const response = await axios.put(
        `http://localhost:7700/api/registro/${_id}`,
        datosActualizar,
        getAuthHeader()
      );

      setClientes(prev => 
        prev.map(cliente => 
          cliente._id === _id ? response.data : cliente
        )
      );
      setClienteEditando(null);
      setSuccess("Cliente actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar cliente:", error);
      setError(error.response?.data?.message || "Error al actualizar cliente");
    }
  };

  const editarCliente = (cliente) => {
    setClienteEditando({ ...cliente });
    setError("");
    setSuccess("");
  };

  const cancelarEdicion = () => {
    setClienteEditando(null);
    setError("");
    setSuccess("");
  };

  return (
    <div className="clientes-crud-container">
      <h1 className="titulo">Gestión de Clientes</h1>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="crud-content">
        <div className="formulario-container">
          <h3 className="formulario-titulo">
            {clienteEditando ? "Editar Cliente" : "Agregar Cliente"}
          </h3>

          <div className="formulario-campos">
            <div className="formulario-campo">
              <label>Número de Documento:</label>
              <input
                className="input-field"
                value={clienteEditando ? clienteEditando.numeroDocumento : nuevoCliente.numeroDocumento}
                onChange={(e) =>
                  clienteEditando
                    ? setClienteEditando({ ...clienteEditando, numeroDocumento: e.target.value })
                    : setNuevoCliente({ ...nuevoCliente, numeroDocumento: e.target.value })
                }
                disabled={!!clienteEditando}
              />
            </div>

            <div className="formulario-campo">
              <label>Nombre:</label>
              <input
                className="input-field"
                value={clienteEditando ? clienteEditando.nombreUsuario : nuevoCliente.nombreUsuario}
                onChange={(e) =>
                  clienteEditando
                    ? setClienteEditando({ ...clienteEditando, nombreUsuario: e.target.value })
                    : setNuevoCliente({ ...nuevoCliente, nombreUsuario: e.target.value })
                }
              />
            </div>

            <div className="formulario-campo">
              <label>Apellido:</label>
              <input
                className="input-field"
                value={clienteEditando ? clienteEditando.apellidoUsuario : nuevoCliente.apellidoUsuario}
                onChange={(e) =>
                  clienteEditando
                    ? setClienteEditando({ ...clienteEditando, apellidoUsuario: e.target.value })
                    : setNuevoCliente({ ...nuevoCliente, apellidoUsuario: e.target.value })
                }
              />
            </div>

            <div className="formulario-campo">
              <label>Correo:</label>
              <input
                className="input-field"
                type="email"
                value={clienteEditando ? clienteEditando.correo : nuevoCliente.correo}
                onChange={(e) =>
                  clienteEditando
                    ? setClienteEditando({ ...clienteEditando, correo: e.target.value })
                    : setNuevoCliente({ ...nuevoCliente, correo: e.target.value })
                }
              />
            </div>

            <div className="formulario-campo">
              <label>Contraseña:</label>
              <input
                className="input-field"
                type="password"
                placeholder={clienteEditando ? "Dejar vacío para no cambiar" : ""}
                value={clienteEditando ? clienteEditando.contrasena : nuevoCliente.contrasena}
                onChange={(e) =>
                  clienteEditando
                    ? setClienteEditando({ ...clienteEditando, contrasena: e.target.value })
                    : setNuevoCliente({ ...nuevoCliente, contrasena: e.target.value })
                }
              />
            </div>
          </div>

          <div className="formulario-botones">
            {clienteEditando ? (
              <>
                <button className="btn-guardar" onClick={guardarEdicion}>
                  Guardar Cambios
                </button>
                <button className="btn-cancelar" onClick={cancelarEdicion}>
                  Cancelar
                </button>
              </>
            ) : (
              <button className="btn-agregar" onClick={agregarCliente}>
                Agregar Cliente
              </button>
            )}
          </div>
        </div>

        <div className="lista-container">
          <h3 className="lista-titulo">Lista de Clientes</h3>
          {clientes.length === 0 ? (
            <p>No hay clientes registrados</p>
          ) : (
            <div className="clientes-grid">
              {clientes.map((cliente) => (
                <div key={cliente._id} className="cliente-card">
                  <div className="cliente-info">
                    <p><strong>Documento:</strong> {cliente.numeroDocumento}</p>
                    <p><strong>Nombre:</strong> {cliente.nombreUsuario} {cliente.apellidoUsuario}</p>
                    <p><strong>Correo:</strong> {cliente.correo}</p>
                    <p><strong>Roles:</strong> {cliente.roles?.join(", ") || "Cliente"}</p>
                  </div>
                  <div className="cliente-actions">
                    <button 
                      className="btn-editar" 
                      onClick={() => editarCliente(cliente)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-eliminar"
                      onClick={() => eliminarCliente(cliente._id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClientesCRUD;
