import { Router } from "express";
import { body } from 'express-validator'
import { UserController } from '../controllers/UserController';
import { handleErrors } from "../middleware/validation";


export const router = Router()


router.post("/create",
    body("name")
        .notEmpty()
        .withMessage("El nombre del usuario es obligatorio"),
    body("password")
        .isLength({ min: 8 }).withMessage("El Password es muy corto minimo 8 Caracteres"),
    body("password_confirmation").custom((value, { req }) => {
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


router.post("/confirmarCuenta",
    body("token")
        .notEmpty()
        .withMessage("El token no puede ir vacio"),
    handleErrors,
    UserController.confirmatedAccount
)

router.post("/login",
    body("email")
        .notEmpty()
        .isEmail()
        .withMessage("Email no valido"),
    body("password")
        .notEmpty().withMessage("El Password no puede ir vacio"),
    handleErrors,
    UserController.login
)

router.post("/request-code",
    body("email")
        .notEmpty()
        .isEmail()
        .withMessage("Email no valido"),
    handleErrors,
    UserController.requestConfirmationCode
)

router.post("/forgotPassword",
    body("email")
        .notEmpty()
        .isEmail()
        .withMessage("Email no valido"),
    handleErrors,
    UserController.forgotPassword
)

router.post('/validateToken',
    body("token")
        .notEmpty()
        .withMessage("El token no puede ir vacio"),
    handleErrors,
    UserController.validatedToken

)