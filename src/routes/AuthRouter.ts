import { Router } from "express";
import { UserController } from "../controllers/UserController";

export const router = Router()


router.post("/create",
    UserController.createUser
)