import { Router } from "express";
import { getAllUsers, createUser } from "../controllers/userController.js";

const router = Router();

router.get("/", getAllUsers);
router.post("/register", createUser);

export default router