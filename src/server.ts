import express, { json } from "express"
import { router as ProjectRouter } from "./routes/projectRouter"
import { connectDB } from "./config/db"

import dotenv from "dotenv"
dotenv.config()


connectDB()
export const app = express()
app.use(express.json())

app.use("/api/projects", ProjectRouter)
