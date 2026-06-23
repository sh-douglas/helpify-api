import "dotenv/config";

import app from "./src/app.js";

const port = process.env.PORT || 5000;

try {
  app.listen(port, () => {
    console.log(`App running on: http://localhost:${port}`);
  });
} catch (error) {
  console.error(error);
  process.exit(1);
}
