import dotenv from "dotenv";

import app from "./app";
import { assertJwtConfiguration } from "./utils/jwt";

dotenv.config();

assertJwtConfiguration();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
  console.log(`Режим: ${process.env.NODE_ENV || "development"}`);
});
