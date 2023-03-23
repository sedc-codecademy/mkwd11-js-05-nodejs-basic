import express from 'express';
import cors from 'cors'
import router from './router.const.js'

const PORT = 3000;
const HOSTNAME = 'localhost';

const app = express();

app.use(cors())
app.use(express.json())

app.use('/api', router)

app.listen(PORT, HOSTNAME, () => {
    console.log(`Server is listening on http://${HOSTNAME}:${PORT}`)
})