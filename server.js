import "dotenv/config";

import app from "./src/app.js";
import sequelize from "./src/config/database.js";

import "./src/models/index.js";

const port = process.env.PORT || 5000;

try {
  await sequelize.authenticate();
  console.log("Database connected");
  app.listen(port, () => {
    console.log(`App running on: http://localhost:${port}`);
  });
} catch (error) {
  console.error(error);
  process.exit(1);
}
