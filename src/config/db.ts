import mongoose from "mongoose"
import colors from "colors"
import { exit } from 'node:process';


export const connectDB = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.DATABASE_URL)
        console.log(colors.bgYellow.green.bold("Base de datos Conectada:"), connection.db.databaseName);

    } catch (error) {
        console.log(colors.bgRed.bold("Error al conectar la Base de Datos"))
        exit(1)
    }
}
