import express from "express";
import passport from "passport";
import {
  Loguot,
  myProfile,
  getAdminUsers,
  getAdminStats,
} from "../Controllers/User.js";
import { authorizeAdmin, isAuthenticated } from "../Middlewares/auth.js";

const router = express.Router();

router.get(
  "/googlelogin",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

router.get(
  "/login",
  passport.authenticate("google", {
    successRedirect: process.env.FRONTEND_URL,
  })
);
router.get("/me", isAuthenticated, myProfile);

router.get("/logout", Loguot);

// admin Routes

router.get("/admin/users", isAuthenticated, authorizeAdmin, getAdminUsers);

router.get("/admin/stats", isAuthenticated, authorizeAdmin, getAdminStats);

export default router;
