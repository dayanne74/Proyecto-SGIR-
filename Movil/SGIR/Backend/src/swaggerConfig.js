import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API proyecto SGIR",
      version: "1.0.0",
      description: "Proyecto  API SGIR :)",
    },
    servers: [
      {
        url: "http://localhost:9700",
        description: "Proyecto SGIR ",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwaggerDocs = (app, port) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  console.log(`Documentación de Swagger disponible en http://localhost:${port}/api-docs`);
}

export default setupSwaggerDocs;
