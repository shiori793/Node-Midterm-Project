import express from "express";
import { registerController, loginController, logoutController } from "../controller/authController.js";

const router = express.Router();

router.get("/register", (req, res) => {res.render("register")})
router.get("/login", (req, res) => {res.render("login")})

router.post("/register", registerController);
router.post("/login", loginController);
router.get('/logout', logoutController);

export default router;