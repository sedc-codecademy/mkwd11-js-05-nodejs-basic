import express from 'express';
import cors from 'cors';
import router from './router.const.js'

const app = express();
const PORT = 3000;
const HOSTNAME = 'localhost'

app.use(cors())
app.use(express.json())

app.use('/api', router)

app.listen(PORT, HOSTNAME, () => {
    console.log(`Server started listening on http://${HOSTNAME}:${PORT}`)
})