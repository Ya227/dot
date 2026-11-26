import cors from "cors";
import express from "express";

import errorHandler from "./middleware/errorHandler";
import logger from "./middleware/logger";
import routes from "./routes";

const app = express();

app.use(
  cors({
    origin: "http://localhost:8099",
    credentials: true,
  }),
);

app.use(express.json({ limit: "8mb" }));
app.use(logger);
app.use("/api", routes);
app.use(errorHandler);

export default app;
