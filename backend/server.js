import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
dotenv.config();

import ProductRouter from "./routes/product.routes.js";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server is Ready");
});

app.use("/api/products", ProductRouter);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port http://localhost:${PORT}`);
});
