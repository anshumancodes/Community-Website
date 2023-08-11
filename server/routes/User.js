import express from "express";
import { deleteUser, getAllUser, logOut, login, register, updateProfile } from "../controller/User.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.post("/logOut",logOut);

router.get("/allUsers",isAuthenticated, getAllUser)

router.delete("/user/:id",isAuthenticated, deleteUser);
router.put("/user/:id",isAuthenticated, updateProfile);

export default router