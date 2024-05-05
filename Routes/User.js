import express from "express";
import {
  allUsers,
  login,
  logout,
  myProfile,
  newUser,
} from "../Controllers/User.js";
import { isAuthenticated } from "../Middlewares/auth.js";
const router = express.Router();

router.post("/new", newUser);

router.post("/login", login);

router.get("/logout", isAuthenticated, logout);

router.get("/all", isAuthenticated, allUsers);

router.get("/me", isAuthenticated, myProfile);

export default router;
