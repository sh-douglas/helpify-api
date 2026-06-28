import express from "express";
import cors from "cors";
import helmet from "helmet";

import authRoutes from "./routes/auth.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import ticketRoutes from "./routes/ticket.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import userRoutes from "./routes/user.routes.js";
import globalErrorHandler from "./middlewares/global-error.middleware.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.get("/health", (req, res) => {
  return res.status(200).json({
    status: "ok",
    message: "App is running",
  });
});

app.use("/dashboard", dashboardRoutes);
app.use("/categories", categoryRoutes);
app.use("/tickets", ticketRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.use(globalErrorHandler);

export default app;
