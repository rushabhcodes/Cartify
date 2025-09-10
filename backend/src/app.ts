import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { swaggerDocs } from "./swagger";
import authRoutes from "./routes/auth.routes";
import itemsRoutes from "./routes/items.routes";
import cartRoutes from "./routes/cart.routes";
import errorHandler from "./middleware/errorHandler";

const app = express();
app.use(helmet());
// CORS: allow requests from any origin
app.use(
  cors({
    origin: "*",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
// Handle preflight for all routes
app.options("*", cors());
app.use(express.json());
app.use(morgan("dev"));

// API versioning prefix (good for future)
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/items", itemsRoutes);
app.use("/api/v1/cart", cartRoutes);

// swagger docs
swaggerDocs(app);

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "🛒 Cartify API",
    version: "1.0.0",
    documentation: "/docs",
    health: "/health",
    endpoints: {
      auth: "/api/v1/auth",
      items: "/api/v1/items", 
      cart: "/api/v1/cart"
    },
    developer: {
      name: "Rushabh Patil",
      website: "https://rushabh.dev",
      github: "https://github.com/rushabhcodes"
    }
  });
});

// health check
app.get("/health", (req, res) => res.json({ 
  ok: true, 
  timestamp: new Date().toISOString(),
  environment: process.env.NODE_ENV || "development"
}));

// central error handler
app.use(errorHandler);

export default app;
