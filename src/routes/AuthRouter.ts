import { Router } from "express";
import { body } from 'express-validator'
import { UserController } from "../controllers/UserController";


export const router = Router()


router.post("/create",
    body("name"),
    UserController.createUser
)