import express from "express"
import { router as ProjectRouter } from "./routes/projectRouter"
import { router as authRouter } from "./routes/AuthRouter"
import { connectDB } from "./config/db"
import dotenv from "dotenv"
import cors from 'cors';
import morgan from "morgan"
import { corsConfig } from "./config/cors";
dotenv.config()

connectDB()
export const app = express()

app.use(cors(corsConfig))

app.use(morgan("dev"))

app.use(express.json())

app.use("/api/auth", authRouter)
app.use("/api/projects", ProjectRouter)

