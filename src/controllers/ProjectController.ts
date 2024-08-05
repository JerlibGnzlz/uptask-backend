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
            res.json(proyecto)
        } catch (error) {
            console.log(error)

        }
    }

    static getProjectById = async (req: Request, res: Response) => {

        const { id } = req.params
        try {
            const proyecto = await Project.findById(id).populate("tasks")

            if (!proyecto) {
                const error = new Error("Proyecto no encontrado")
                return res.status(404).json({ error: error.message })
            }

            res.json(proyecto)
        } catch (error) {
            console.log(error)

        }
    }

    static updateProject = async (req: Request, res: Response) => {

        const { id } = req.params

        try {
            const proyecto = await Project.findById(
                id,
                { new: true }
            )

            if (!proyecto) {
                const error = new Error("Proyecto no actulizado")
                return res.status(404).json({ error: error.message })
            }

            proyecto.clientName = req.body.clientName
            proyecto.projectName = req.body.projectName
            proyecto.description = req.body.description

            await proyecto.save()

            res.json("Proyecto Actualizado")
        } catch (error) {
            console.log(error)

        }
    }

    static deleteProject = async (req: Request, res: Response) => {

        const { id } = req.params

        try {
            const proyecto = await Project.findByIdAndDelete(id)

            if (!proyecto) {
                const error = new Error("Proyecto no Eliminado")
                return res.status(404).json({ error: error.message })
            }
            res.json("Proyecto Eliminado")
        } catch (error) {
            console.log(error)

        }
    }
}