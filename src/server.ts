import express from "express"
import { connectDB } from "./config/db"
import { ProjectRouter } from "./routes/projectRouter"

import dotenv from "dotenv"
dotenv.config()
connectDB()


export const app = express()

app.use("/api/projects", ProjectRouter)
