import Usuario from "../models/usuario.js";
import Rol from "../models/rol.js";
import bcrypt from "bcrypt";

export const crearadminPredeterminado = async () => {
    try {
        const adminExistente = await Usuario.findOne({
            $or: [
                { correo: "paola@gmail.com" },
                { numeroDocumento: "12345678" }
            ]
        });

        if (adminExistente) {
            console.log("El usuario administrador ya existe.");
            return;
        }

        const roladministrador = await Rol.findOne({ nombreRol: "administrador" });
        if (!roladministrador) {
            console.log("No se encontró el rol Administrador. Crea primero los roles.");
            return;
        }

        const contrasena = await bcrypt.hash("Maria1998", 10);

        const nuevoadministrador = new Usuario({
            nombreUsuario: "paola",
            apellidoUsuario: "Quiñones",
            numeroDocumento: "12345678",
            correo: "paola@gmail.com",
            contrasena,
            roles: [roladministrador._id], 
            estadoUsuario: true
        });

        await nuevoadministrador.save();
        console.log("Usuario administrador creado correctamente.");
    } catch (error) {
        console.error("Error creando el usuario administrador:", error);
    }
};