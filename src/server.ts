import express from "express"
import { router as ProjectRouter } from "./routes/projectRouter"
import { connectDB } from "./config/db"
import dotenv from "dotenv"
import cors from 'cors';
import { corsConfig } from "./config/cors";
dotenv.config()

connectDB()
export const app = express()

app.use(cors(corsConfig))

app.use(express.json())

app.use("/api/projects", ProjectRouter)
