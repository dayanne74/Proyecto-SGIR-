import express from "express";
import contactosRoutes from "./routes/contactos.js"
import reservasRoutes from "./routes/reservas.js";
import paqueteRoutes from "./routes/paquete.js";
import adminRoutes from "./routes/admins.js";
import hotelsRoutes from "./routes/hotels.js";
import comentarioRoutes from "./routes/comentarios.js";
import excursionesRoutes from "./routes/excursiones.js";
import { crearRolesPredeterminados } from "./config/createRoles.js";
import port from "./config/config.js";
import swaggerJSDOCs from "./swaggerConfig.js";
import cors from "cors";
import autentificacionesRoutes from "./routes/autenticación_routes.js";
import { crearadminPredeterminado } from "./config/crearAdminPredeterminado.js";
import clientesRoutes from "./routes/usuarios.js"
const app = express();
import transporteRoutes from "./routes/transportes.js"
import multer from 'multer';
import path from 'path';

// Configura CORS al inicio y con las opciones correctas
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


// Middlewares
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// Configuración de Multer
const upload = multer({ dest: 'uploads/' });

// Inicialización de roles y admin
crearRolesPredeterminados();
crearadminPredeterminado();

// Rutas para la API
app.use("/api/autentificaciones", autentificacionesRoutes);
app.use("/api", reservasRoutes);
app.use("/api", hotelsRoutes);
app.use("/api", paqueteRoutes);
app.use("/api", adminRoutes);
app.use("/api", comentarioRoutes);
app.use("/api", excursionesRoutes);
app.use("/api", clientesRoutes);
app.use("/api", contactosRoutes);
app.use("/api", transporteRoutes);

// Ruta para subir imágenes de hoteles
app.post('/hotels', upload.single('image'), (req, res) => {
    const { name, description, price } = req.body;
    const image = req.file;
  
    res.json({
      message: 'Hotel added successfully!',
      hotelData: { name, description, price, image },
    });
});

// Ruta de bienvenida
app.get("/", (req, res) => {
    res.send("<h1>Bienvenido a la API de SGIR</h1>");
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
    swaggerJSDOCs(app, 7700);
});