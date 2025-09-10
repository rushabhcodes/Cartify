import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { config } from "./config";

app.listen(config.port, () => {
  console.log(`Server listening on http://localhost:${config.port}`);
  console.log(`API available at http://localhost:${config.port}/api/v1`);
});
