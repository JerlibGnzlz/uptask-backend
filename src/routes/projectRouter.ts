import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";


export const ProjectRouter = Router()


ProjectRouter.get("/", ProjectController.getAllProjects)