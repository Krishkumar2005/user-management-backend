import { Router } from "express";
import {
  getUsers,
  getUser,
  createUserController,
  updateUserController,
  deleteUserController
} from "../controllers/userController.js";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/create", createUserController);
router.put("/:id", updateUserController);
router.delete("/:id", deleteUserController);

export default router;