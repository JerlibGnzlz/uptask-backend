import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";
import { body, param } from "express-validator";
import { handleErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";

export const router = Router()


/* -------------------------------------------------------------------------- */
// RUTAS DE PROJECTOS
/* -------------------------------------------------------------------------- */

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
    ProjectController.updateProject)


router.delete("/:id",
    param("id")
        .isMongoId()
        .withMessage("Id Invalido"),
    handleErrors,
    ProjectController.deleteProject)

/* -------------------------------------------------------------------------- */
// RUTAS DE TASKS
/* -------------------------------------------------------------------------- */

router.post("/:projectId/tasks",
    body("name")
        .notEmpty()
        .withMessage("El nombre de la task es obligatorio"),
    body("description")
        .notEmpty()
        .withMessage("El nombre de la Descripcion es obligatorio"),
    handleErrors,
    TaskController.createTask
)
