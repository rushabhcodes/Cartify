import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "Ecommerce API", version: "1.0.0" },
    servers: [{ url: "http://localhost:3000" }],
  },
  apis: ["./src/routes/*.ts"], // JSDoc in route files
};

const swaggerSpec = swaggerJSDoc(options);
export function swaggerDocs(app: Express) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("Swagger docs at /docs");
}