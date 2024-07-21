import type { Request, Response } from "express"
import { Task } from './../models/Task';
import { Project } from '../models/Proyect';

export class TaskController {

    static createTask = async (req: Request, res: Response) => {

        const { projectId } = req.params
        const project = await Project.findById(projectId)

        if (!project) {
            const error = new Error("Proyecto no encontrado")
            return res.status(404).json({ error: error.message })
        }

        try {
            const task = new Task(req.body)
            task.project = project.id
            await task.save()

            res.json("Task Creada Correctamente")
        } catch (error) {
            console.log(error)
        }
    }

    static getAllTasks = async (req: Request, res: Response) => {

        // try {
        //     const proyecto = await Project.find({})
        //     res.json({ "Proyectos": proyecto })
        // } catch (error) {
        //     console.log(error)

        // }
    }

    static getTaskById = async (req: Request, res: Response) => {

        // const { id } = req.params
        // try {
        //     const proyecto = await Project.findById(id)

        //     if (!proyecto) {
        //         const error = new Error("Proyecto no encontrado")
        //         return res.status(404).json({ error: error.message })
        //     }
        //     res.json({ "Proyecto By ID": proyecto })
        // } catch (error) {
        //     console.log(error)

        // }
    }

    static updateTask = async (req: Request, res: Response) => {

        // const { id } = req.params

        // try {
        //     const proyecto = await Project.findByIdAndUpdate(
        //         id,
        //         req.body,
        //         { new: true }
        //     )

        //     if (!proyecto) {
        //         const error = new Error("Proyecto no actulizado")
        //         return res.status(404).json({ error: error.message })
        //     }
        //     res.json({ "Proyecto Actualizado": proyecto })
        // } catch (error) {
        //     console.log(error)

        // }
    }

    static deleteTask = async (req: Request, res: Response) => {

        // const { id } = req.params

        // try {
        //     const proyecto = await Project.findByIdAndDelete(id)

        //     if (!proyecto) {
        //         const error = new Error("Proyecto no Eliminado")
        //         return res.status(404).json({ error: error.message })
        //     }
        //     res.json({ "Proyecto Eliminado": proyecto })
        // } catch (error) {
        //     console.log(error)

        // }
    }
}