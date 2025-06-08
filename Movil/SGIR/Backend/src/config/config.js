// src/config/config.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGODB_URI) {
  console.error("Defina la variable de entorno MONGODB_URI");
  process.exit(1);
}

const port = process.env.PORT || 9700;
const clientOptions = {
  serverApi: {
    version: "1",
    strict: true,
    deprecationErrors: true,
  },
};

// Solo conectar a Mongo cuando NO estemos en tests
if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(process.env.MONGODB_URI, clientOptions)
    .then(() => {
      console.log("Conectado a MongoDB");
    })
    .catch((error) => {
      console.error(`Error al conectarse a MongoDB: ${error.message}`);
    });
}

export default port;
