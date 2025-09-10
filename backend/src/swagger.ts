import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import path from "path";

const isDevelopment = process.env.NODE_ENV !== "production";
const serverUrl = process.env.VERCEL_URL 
  ? `https://${process.env.VERCEL_URL}`
  : isDevelopment 
    ? "http://localhost:3000" 
    : "https://your-production-domain.com";

const options = {
  definition: {
    openapi: "3.0.0",
    info: { 
      title: "Cartify API", 
      version: "1.0.0",
      description: "E-commerce API for Cartify application"
    },
    servers: [
      { 
        url: serverUrl,
        description: isDevelopment ? "Development server" : "Production server"
      }
    ],
  },
  apis: [
    path.join(__dirname, "./routes/*.ts"),
    path.join(__dirname, "./routes/*.js"),
    isDevelopment ? "./src/routes/*.ts" : "./dist/routes/*.js"
  ].filter(Boolean),
};

const swaggerSpec = swaggerJSDoc(options);

export function swaggerDocs(app: Express) {
  // Simple JSON endpoint for API specification
  app.get("/docs/swagger.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  // Basic HTML documentation page (more reliable for production)
  app.get("/docs", (req, res) => {
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Cartify API Documentation</title>
      <meta charset="utf-8"/>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
        .container { max-width: 800px; margin: 0 auto; }
        .endpoint { margin: 20px 0; padding: 15px; border: 1px solid #ddd; border-radius: 5px; }
        .method { padding: 5px 10px; border-radius: 3px; color: white; font-weight: bold; }
        .get { background-color: #61affe; }
        .post { background-color: #49cc90; }
        .put { background-color: #fca130; }
        .delete { background-color: #f93e3e; }
        .path { font-family: monospace; font-size: 16px; margin-left: 10px; }
        pre { background-color: #f5f5f5; padding: 10px; border-radius: 3px; overflow-x: auto; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🛒 Cartify API Documentation</h1>
        <p>Welcome to the Cartify API documentation. This API provides endpoints for managing items, cart operations, and user authentication.</p>
        
        <h2>🔗 Quick Links</h2>
        <ul>
          <li><a href="/docs/swagger.json">OpenAPI JSON Specification</a></li>
          <li><a href="${serverUrl}/api/v1/items">Get All Items</a></li>
        </ul>

        <h2>📋 Available Endpoints</h2>
        
        <div class="endpoint">
          <span class="method get">GET</span>
          <span class="path">/api/v1/items</span>
          <p>Retrieve all items with optional filtering</p>
        </div>

        <div class="endpoint">
          <span class="method get">GET</span>
          <span class="path">/api/v1/items/:id</span>
          <p>Retrieve a specific item by ID</p>
        </div>

        <div class="endpoint">
          <span class="method post">POST</span>
          <span class="path">/api/v1/auth/signup</span>
          <p>Create a new user account</p>
        </div>

        <div class="endpoint">
          <span class="method post">POST</span>
          <span class="path">/api/v1/auth/login</span>
          <p>Authenticate user and get access token</p>
        </div>

        <div class="endpoint">
          <span class="method get">GET</span>
          <span class="path">/api/v1/cart</span>
          <p>Get current user's cart (requires authentication)</p>
        </div>

        <div class="endpoint">
          <span class="method post">POST</span>
          <span class="path">/api/v1/cart</span>
          <p>Add item to cart (requires authentication)</p>
        </div>

        <div class="endpoint">
          <span class="method put">PUT</span>
          <span class="path">/api/v1/cart/:itemId</span>
          <p>Update item quantity in cart (requires authentication)</p>
        </div>

        <div class="endpoint">
          <span class="method delete">DELETE</span>
          <span class="path">/api/v1/cart/:itemId</span>
          <p>Remove item from cart (requires authentication)</p>
        </div>

        <h2>🔐 Authentication</h2>
        <p>Protected endpoints require a Bearer token in the Authorization header:</p>
        <pre>Authorization: Bearer &lt;your-jwt-token&gt;</pre>

        <h2>🌐 Base URL</h2>
        <p>API Base URL: <code>${serverUrl}/api/v1</code></p>
        
        <hr style="margin: 40px 0;">
        <p style="text-align: center; color: #666;">
          Built with ❤️ by <a href="https://rushabh.dev" target="_blank">Rushabh Patil</a>
        </p>
      </div>
    </body>
    </html>
    `;
    res.send(html);
  });

  // If in development, also serve Swagger UI
  if (isDevelopment) {
    try {
      app.use("/docs/ui", swaggerUi.serve);
      app.get("/docs/ui", swaggerUi.setup(swaggerSpec, {
        explorer: true,
        customSiteTitle: "Cartify API Documentation"
      }));
      console.log(`📚 Swagger UI available at ${serverUrl}/docs/ui`);
    } catch (error) {
      console.warn("⚠️  Swagger UI not available, using basic docs");
    }
  }
  
  console.log(`📋 API Documentation available at ${serverUrl}/docs`);
}