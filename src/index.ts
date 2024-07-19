import colors from "colors"
import { app } from "./server"
import { ProjectRouter } from "./routes/projectRouter"


const port = process.env.PORT || 4000

app.use("/api/projects", ProjectRouter)

app.listen(port, () => {
    console.log(colors.america(`API en el Puerto: ${port}`))
})