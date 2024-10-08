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
            res.status(500).json({ error: "Hubo un error" })
        }
    }

    static getProjectTasks = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const tasks = await Task.find().where("project").equals(req.project.id).populate("project", "-tasks")
            res.json("Tareas")
        } catch (error) {
            res.status(500).json({ error: "Hubo un error" })
        }
    }

    static getTaskById = async (req: Request, res: Response) => {

        try {
            const { taskId } = req.params
            const task = await Task.findById(taskId)

            if (!task) {
                const error = new Error("Tarea no encontrado")
                return res.status(404).json({ error: error.message })
            }


            if (task.project.toString() !== req.project.id) {
                const error = new Error("Accion No Valida")
                return res.status(400).json({ error: error.message })
            }
            res.json(task)
        } catch (error) {
            res.status(500).json({ error: "Hubo un error" })
        }
    }

    static updateTask = async (req: Request, res: Response) => {

        const { taskId } = req.params
        try {
            const task = await Task.findByIdAndUpdate(
                taskId,
                req.body,
                { new: true }
            )

            if (!task) {
                const error = new Error("Tarea no encontrado")
                return res.status(404).json({ error: error.message })
            }



            if (task.project.toString() !== req.project.id) {
                const error = new Error("Accion No Valida")
                return res.status(400).json({ error: error.message })
            }


            res.json("Tarea Actualizada")
        } catch (error) {
            res.status(500).json({ error: "Hubo un error" })

        }
    }

    static deleteTask = async (req: Request, res: Response) => {

        const { taskId } = req.params
        try {
            const task = await Task.findById(taskId, req.body,)

            if (!task) {
                const error = new Error("Tarea no encontrado")
                return res.status(404).json({ error: error.message })
            }

            req.project.tasks = req.project.tasks.filter(task => task.toString() !== taskId)

            await Promise.allSettled([task.deleteOne(), req.project.save()])
            res.json("Tarea Eliminada Correctamente")
        } catch (error) {
            res.status(500).json({ error: "Hubo un error" })

        }
    }

    static updateStatus = async (req: Request, res: Response) => {
        try {
            const { taskId } = req.params

            const task = await Task.findById(taskId)

            if (!task) {
                const error = new Error("Tarea no encontrado")
                return res.status(404).json({ error: error.message })
            }

            const { status } = req.body
            task.status = status
            await task.save()
            res.json("Tarea Actualizada")
        } catch (error) {
            res.status(500).json({ error: "Hubo un error" })
        }
    }
}
