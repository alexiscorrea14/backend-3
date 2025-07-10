import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Backend 3",
      version: "1.0.0",
      description: "Documentación de la API del proyecto Backend 3",
    },
  },
  apis: ["./src/routers/*.js"],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
