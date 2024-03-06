import express, { urlencoded } from "express";
import { errorMiddleware } from "./Middlewares/errorMiddleware.js";
import dotenv from "dotenv";
import { connectPassport } from "./Utils/Provider.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import cors from "cors";

const app = express();

dotenv.config({
  path: "./config/config.env",
});

app.use(
  session({
    secret: "laskjdflskd",
    resave: false,
    saveUninitialized: false,

    cookie: {
      secure: process.env.NODE_ENV === "development" ? false : true,
      httpOnly: process.env.NODE_ENV === "development" ? false : true,
      sameSite: process.env.NODE_ENV === "development" ? false : "none",
    },
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(
  urlencoded({
    extended: true,
  })
);

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());
app.enable("trust proxy");

connectPassport();

import userRoute from "./Routes/User.js";
import orderRoute from "./Routes/Order.js";

app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoute);

app.use(errorMiddleware);

export default app;
