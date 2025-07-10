const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Backend 3",
      version: "1.0.0",
      description: "Documentación de la API del proyecto Backend 3",
    },
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "64c2a9c964a53a2c4e1d2d20"
            },
            first_name: {
              type: "string",
              example: "Juan"
            },
            last_name: {
              type: "string",
              example: "Perez"
            },
            email: {
              type: "string",
              example: "juan@example.com"
            },
            password: {
              type: "string",
              example: "hashedpassword"
            },
            role: {
              type: "string",
              example: "user"
            },
            pets: {
              type: "array",
              items: {
                type: "string"
              }
            }
          }
        }
      }
    }
  },
  apis: ["./src/routers/*.js"],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
