import { Router } from "express";
import { getAllUsers, createUser } from "../controllers/userController.js";

const router = Router();

router.get("/", getAllUsers);
router.post("/registerr", createUser);

export default router