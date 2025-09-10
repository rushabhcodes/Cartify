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
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// API versioning prefix (good for future)
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/items", itemsRoutes);
app.use("/api/v1/cart", cartRoutes);

// swagger docs
swaggerDocs(app);

// health check
app.get("/health", (req, res) => res.json({ ok: true }));

// central error handler
app.use(errorHandler);

export default app;
