import type { Request, Response } from "express"
import { User } from '../models/User';


export class UserController {
    static createUser = async (req: Request, res: Response) => {

        const user = new User(req.body)
        try {
            await user.save()
            res.json("Usuario Creado Correctamente")
        } catch (error) {
            res.status(500).json({ error: "Hubo un error" })
        }
    }

}