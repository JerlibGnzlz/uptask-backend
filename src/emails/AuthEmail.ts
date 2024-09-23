import { transport } from "../config/nodemailer"
import type { Request } from "express"


interface IEmail {
    email: string,
    name: string,
    token: string
}

export class AuthEmail {

    static sendEmail = async (usuario: IEmail) => {
        const info = await transport.sendMail({
            from: "Uptask <admin@uptask.com>",
            to: usuario.email,
            subject: "Uptask Confirma tu cuenta",
            text: "Uptask - Confirma tu cuenta",
            html: `<p>Hola: ${usuario.name} has creado tu cuenta en Uptask, ya casi esta todo listo, solo debes confirmar tu cuenta</p>
            <p>
            Visita el siguiente enlace:
            </p>
            <a href=${process.env.FRONTEND_URL}/auth/confirmar>Confirmar Cuenta</a>
            <p>Ingresa el codigo:<b> ${usuario.token}</b></p>
            <p>Este token expira en 10 minutos</p>
            `
        })

    }


    static sendPasswordResetToken = async (usuario: IEmail) => {
        const info = await transport.sendMail({
            from: "Uptask <admin@uptask.com>",
            to: usuario.email,
            subject: "Uptask Confirma tu Restablece tu Password ",
            text: "Uptask - Confirma tu Restablece tu Password ",
            html: `<p>Hola: ${usuario.name} has solicitado restablecer tu password.</p>
            <p>
            Visita el siguiente enlace:
            </p>
            <a href=${process.env.FRONTEND_URL}/auth/newPassword>Restablecer Password</a>
            <p>Ingresa el codigo:<b> ${usuario.token}</b></p>
            <p>Este token expira en 10 minutos</p>
            `
        })
    }
}