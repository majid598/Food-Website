import express from "express";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbConnect from "./utils/db.js";
const app = express();

dotenv.config({
  path: "./.env",
});

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:4173",
      process.env.CLIENT_URL,
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

const PORT = process.env.PORT;

import userRoute from "./routes/user.js";
import orderRoute from "./routes/order.js";

dbConnect(process.env.MONGO_URI);

app.use("/api/v1/user", userRoute);
app.use("/api/v1/order", orderRoute);

app.get("/", (req, res) => {
  res.send("Server Is Working Perfectly");
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running at port number: ${PORT}`);
});
