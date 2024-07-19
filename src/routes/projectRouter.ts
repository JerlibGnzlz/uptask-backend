import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";
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
    ProjectController.createProject)

router.get("/", ProjectController.getAllProjects)

router.get("/:id",
    param("id")
        .isMongoId()
        .withMessage("Id Invalido")
    ,
    handleErrors,
    ProjectController.getProjectById)


router.put("/:id", ProjectController.updateProject)

