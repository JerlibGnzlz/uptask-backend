import { Router } from "express";
import { body } from 'express-validator'
import { UserController } from "../controllers/UserController";
import { handleErrors } from "../middleware/validation";


export const router = Router()


router.post("/create",
    body("name")
        .notEmpty()
        .withMessage("El nombre del usuario es obligatorio"),
    body("password")
        .isLength({ min: 8 }).withMessage("El Password es muy corto minimo 8 Caracteres"),
    body("password-confirmation").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Los password no son iguales")
        }
        return true
    }),
    body("email")
        .notEmpty()
        .isEmail()
        .withMessage("Email no valido"),
    handleErrors,
    UserController.createUser
)