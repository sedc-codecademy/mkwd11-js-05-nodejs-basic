import express from 'express';
import cors from 'cors';
import reviewRoutes from './reviews.routes.js';

// Creating a server
const app = express();


// Handling middleware
// app.use((req, res, next) => {
//     console.log('middleware executed')
//     next()
// })
app.use(express.json()) // to enable working with JSON in body
app.use(cors()) // Set headers for communication with Client

// Rotes
// app.use('/api', (req, res) => {
//  console.log('req has been sent to /api')

//  res.sendStatus(200)
// })

app.use('/api', reviewRoutes)

// Server listening
app.listen(3000, 'localhost', () => {
    console.log('Server started listening on http://localhost:3000')
})