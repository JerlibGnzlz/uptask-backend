import { app } from "./server"


const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`Rest Api en el puerto ${port}`)
})