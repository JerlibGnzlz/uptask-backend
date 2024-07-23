import type { Request, Response } from "express"
import { Task } from './../models/Task';

export class TaskController {

    static createTask = async (req: Request, res: Response) => {

        try {
            const task = new Task(req.body)
            task.project = req.project.id
            console.log(task.id)
            req.project.tasks.push(task.id)
            await Promise.allSettled([task.save(), req.project.save()])
            res.json("Task Creada Correctamente")
        } catch (error) {
            console.log(error)
        }
    }

    static getProjectTasks = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const tasks = await Task.find().where("project").equals(req.project.id)
            res.json({ "Tareas": tasks })
        } catch (error) {
            console.log(error)

        }
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