import express from "express";
import cors from "cors";
import helmet from "helmet";
const app = express();

import authRoutes from "./routes/auth.routes.js";
import globalErrorHandler from "./middlewares/global-error.middleware.js";

app.use(express.json());
app.use(cors());
app.use(helmet());

app.get("/health", (req, res) => {
  return res.status(200).json({
    status: "ok",
    message: "App is running",
  });
});

app.use("/auth", authRoutes);

app.use(globalErrorHandler);

export default app;
