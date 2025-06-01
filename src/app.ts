import express from "express";
import Router from "./config/router.router";
import cors from "cors";
const router = new Router();

const app = express();

app.use(
  cors({
    origin: "*", // or ['https://yourdomain.com']
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());
app.use("/api", router.getRouter());

export default app;
