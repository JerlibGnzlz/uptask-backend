import type { Request, Response } from "express"
import { User } from '../models/User';
import { hashPassword } from "../utils/auth";


export class UserController {
    static createUser = async (req: Request, res: Response) => {

        try {
            const { password, email } = req.body
            /* --------------------------- Prevenir duplicados -------------------------- */
            const userExist = await User.findOne({ email })
            if (userExist) {
                const error = new Error("El Usuario ya esta registrado")
                return res.status(409).json({ error: error.message })
            }

            /* ----------------------------- Crea un Usuario ---------------------------- */
            const user = new User(req.body)

            /* ------------------------------ Hash password ----------------------------- */

            user.password = await hashPassword(password)
            await user.save()
            res.json("Cuenta creada, revisa tu email para confirmarla")
        } catch (error) {
            res.status(500).json({ error: "Hubo un error" })
        }
    }
}