import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { config } from "./config";

app.listen(config.port, () => {
  console.log(`Server listening on ${config.baseUrl}`);
  console.log(`API available at ${config.baseUrl}/api/v1`);
});
