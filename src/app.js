import express from "express";
import cors from "cors";
import helmet from "helmet";

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

export default app;
