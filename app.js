import express from 'express'
import 'dotenv';
import cors from 'cors'
import router from './routes.js'
const app = express()
const port = process.env.PORT || 2310

app.use(cors())
app.use(express.json())
app.use(router)
app.listen(port, () => {
    console.log(`Server on port ${port}`)
})