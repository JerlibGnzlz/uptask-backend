import { TaskController } from './../controllers/TaskController';
import { Router } from "express";
import { body, param } from "express-validator";
import { handleErrors } from "../middleware/validation";


export const router = Router()

router.post("/create",
    body("projectName")
        .notEmpty()
        .withMessage("El nombre del proyecto es obligatorio"),
    body("clientName")
        .notEmpty()
        .withMessage("El nombre del Cliente es obligatorio"),
    body("description")
        .notEmpty()
        .withMessage("El nombre de la Descripcion es obligatorio"),
    handleErrors,
    TaskController.createTask)

router.get("/", TaskController.getAllTasks)

router.get("/:id",
    param("id")
        .isMongoId()
        .withMessage("Id Invalido")
    ,
    handleErrors,
    TaskController.getTaskById)


router.put("/:id",
    param("id")
        .isMongoId()
        .withMessage("Id Invalido"),
    body("projectName")
        .notEmpty()
        .withMessage("El nombre del proyecto es obligatorio"),
    body("clientName")
        .notEmpty()
        .withMessage("El nombre del Cliente es obligatorio"),
    body("description")
        .notEmpty()
        .withMessage("El nombre de la Descripcion es obligatorio"),
    handleErrors,
    TaskController.updateTask)


router.delete("/:id",
    param("id")
        .isMongoId()
        .withMessage("Id Invalido"),
    handleErrors,
    TaskController.deleteTask)


