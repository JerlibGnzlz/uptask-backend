import type { Request, Response } from "express"
import { User } from '../models/User';


export class UserController {
    static createUser = async (req: Request, res: Response) => {

        const user = new User(req.body)
        try {
            await user.save()
            res.json("Cuenta creada, revisa tu email para confirmarla")
        } catch (error) {
            res.status(500).json({ error: "Hubo un error" })
        }
    }
}