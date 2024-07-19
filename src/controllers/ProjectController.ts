import type { Request, Response } from "express"
import { Project } from "../models/Proyect"

export class ProjectController {

    static createProject = async (req: Request, res: Response) => {

        const proyecto = new Project(req.body)

        try {
            await proyecto.save()
            res.json("Proyecto Creado Correctamente")
        } catch (error) {
            console.log(error)
        }
    }

    static getAllProjects = async (req: Request, res: Response) => {

        try {
            const proyecto = await Project.find({})
            res.json({ "Productos": proyecto })
        } catch (error) {
            console.log(error)

        }
    }

    static getProjectById = async (req: Request, res: Response) => {

        const { id } = req.params
        try {
            const proyecto = await Project.findById(id)

            if (!proyecto) {
                const error = new Error("Producto no encontrado")
                return res.status(404).json({ error: error.message })
            }
            res.json({ "Producto By ID": proyecto })
        } catch (error) {
            console.log(error)

        }
    }

    static updateProject = async (req: Request, res: Response) => {

        const { id } = req.params

        try {
            const proyecto = await Project.findByIdAndUpdate(
                id,
                req.body,
                { new: true }
            )

            if (!proyecto) {
                const error = new Error("Producto no actulizado")
                return res.status(404).json({ error: error.message })
            }
            res.json({ "Producto Actualizado": proyecto })
        } catch (error) {
            console.log(error)

        }
    }
}