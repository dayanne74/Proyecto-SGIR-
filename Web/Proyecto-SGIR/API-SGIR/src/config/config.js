import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGODB_URI) {
  console.error("Defina la variable de entorno");
  process.exit(1); 
}

const port = process.env.PORT || 7700;

const clientOptions={
    serverApi:{
      version:"1",
      strict: true,
      deprecationErrors: true,
    },
};

mongoose
.connect(process.env.MONGODB_URI, clientOptions)
.then(() => {
    console.log("Conectado a MongoDB");
    
})
.catch((error) => {
    console.error(`Ocurrió el siguiente error al conectarse: ${error.message}`);
  });

  export default port;