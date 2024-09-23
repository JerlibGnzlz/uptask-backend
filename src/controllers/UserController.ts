import type { Request, Response } from "express"
import { User } from '../models/User';
import { checkPassword, hashPassword } from "../utils/auth";
import { Token } from "../models/Token";
import { generateToken } from "../utils/token";
import { AuthEmail } from "../emails/AuthEmail";


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

            /* ------------------------------ Generar Token ----------------------------- */
            const token = new Token
            token.token = generateToken()
            token.user = user.id


            /* ----------------------------- Enviar el Email ---------------------------- */
            AuthEmail.sendEmail({
                email: user.email,
                name: user.name,
                token: token.token
            })

            await Promise.allSettled([user.save(), token.save()])

            res.json("Cuenta creada, revisa tu email para confirmarla")
        } catch (error) {
            res.status(500).json({ error: "Hubo un error" })
        }
    }


    static confirmatedAccount = async (req: Request, res: Response) => {
        try {
            const { token } = req.body

            const tokenExist = await Token.findOne({ token })
            if (!tokenExist) {
                const error = new Error("El Token no valido")
                return res.status(404).json({ error: error.message })
            }

            const user = await User.findById(tokenExist.user)
            user.confirmed = true

            await Promise.allSettled([user.save(), tokenExist.deleteOne()])
            res.json("Cuenta Confirmada correctamente")
        } catch (error) {
            res.status(500).json({ error: "Hubo un error" })
        }
    }

    static login = async (req: Request, res: Response) => {
        try {
            const { password, email } = req.body

            /* --------------------------- Prevenir duplicados -------------------------- */
            const user = await User.findOne({ email })

            if (!user) {
                const error = new Error("No existe el Usuario")
                return res.status(404).json({ error: error.message })
            }

            if (!user.confirmed) {
                const token = new Token
                token.token = generateToken()
                token.user = user.id
                await token.save()

                /* ----------------------------- Enviar el Email ---------------------------- */
                AuthEmail.sendEmail({
                    email: user.email,
                    name: user.name,
                    token: token.token
                })

                const error = new Error("La cuenta no ha sido confirmada, hemos enviado un email de condfirmacion")
                return res.status(401).json({ error: error.message })
            }


            /* ---------------------------- Revisar Password ---------------------------- */

            const isPasswordCorrect = await checkPassword(password, user.password)
            if (!isPasswordCorrect) {
                const error = new Error("El Password no es correcto")
                return res.status(401).json({ error: error.message })
            }

            res.json("Autenticado...")
        } catch (error) {
            res.status(500).json({ error: "Hubo un error" })
        }
    }


    static requestConfirmationCode = async (req: Request, res: Response) => {

        try {
            const { email } = req.body

            /* --------------------------- Usuario Existe -------------------------- */
            const user = await User.findOne({ email })
            if (!user) {
                const error = new Error("El Usuario no esta registrado")
                return res.status(404).json({ error: error.message })
            }


            if (user.confirmed) {
                const error = new Error("El Usuario ya esta confirmado")
                return res.status(403).json({ error: error.message })
            }


            /* ------------------------------ Generar Token ----------------------------- */
            const token = new Token
            token.token = generateToken()
            token.user = user.id


            /* ----------------------------- Enviar el Email ---------------------------- */
            AuthEmail.sendEmail({
                email: user.email,
                name: user.name,
                token: token.token
            })

            await Promise.allSettled([user.save(), token.save()])

            res.json("Se Envio un nuevo Token a tu E-mail")
        } catch (error) {
            res.status(500).json({ error: "Hubo un error" })
        }
    }

    static forgotPassword = async (req: Request, res: Response) => {

        try {
            const { email } = req.body

            /* --------------------------- Usuario Existe -------------------------- */
            const user = await User.findOne({ email })
            if (!user) {
                const error = new Error("El Usuario no esta registrado")
                return res.status(404).json({ error: error.message })
            }



            /* ------------------------------ Generar Token ----------------------------- */
            const token = new Token
            token.token = generateToken()
            token.user = user.id
            await token.save()


            /* ----------------------------- Enviar el Email ---------------------------- */
            AuthEmail.sendPasswordResetToken({
                email: user.email,
                name: user.name,
                token: token.token
            })


            res.json("Revisa tu E-mail para instrucciones")
        } catch (error) {
            res.status(500).json({ error: "Hubo un error" })
        }
    }

}

