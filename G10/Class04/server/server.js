import http from 'http';
import { v4 as uuidv4 } from 'uuid'
import { writeData, readData } from './text-service.js'
import loggerEmitter from './logger-service.js';

const server = http.createServer((request, response) => {
    const url = request.url;
    const method = request.method;

    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH, OPTIONS')
    response.setHeader('Access-Control-Max-Age', 2592000)

    console.log('URL', url)
    console.log('method', method)

    if (url.startsWith('/reviews')) {
        
        if (method === 'GET') {
            const reviews = readData('db.json');
            console.log(reviews)

            response.setHeader('Content-Type', 'text/json')
            response.write(reviews)
            response.end();
            loggerEmitter.emit('log', `Requested all reviews`)
        }

        if (method === 'POST') {
            let body = [];
            request.on('data', (chunk) => {
                body.push(chunk)
            })

            request.on('end', () => {
                const stringifiedBody = Buffer.concat(body).toString();
                const parsedBody = JSON.parse(stringifiedBody);

                const review = {
                    ...parsedBody,
                    id: uuidv4()
                }

                loggerEmitter.emit('log', `Created new review with title: ${review.title}`)

                const dbData = readData('db.json');
                const reviews = JSON.parse(dbData)
                reviews.push(review)
                const stringifiedReviews = JSON.stringify(reviews, null, 2)
                writeData('db.json', stringifiedReviews)
            })

            response.setHeader('Content-Type', 'text/html')
            response.write('review added')
            response.end()
        }

        if (method === 'PUT') {
            const urlArray = url.split('/');
            const id = urlArray[urlArray.length - 1]

            let body = [];
            request.on('data', (chunk) => {
                body.push(chunk)
            })

            request.on('end', () => {
                const stringifiedBody = Buffer.concat(body).toString();
                const parsedBody = JSON.parse(stringifiedBody);

                const dbData = readData('db.json');
                const reviews = JSON.parse(dbData);
                const index = reviews.findIndex(r => r.id === id)
                reviews[index] = {
                    ...parsedBody,
                    id,
                };

                loggerEmitter.emit('log', `Updated review with title: ${reviews[index].title}`)

                const stringifiedReviews = JSON.stringify(reviews, null, 2);
                writeData('db.json', stringifiedReviews)
            })

            response.setHeader('Content-Type', 'text/html')
            response.write('review updated')
            response.end()
        }

        if (method === 'DELETE') {
            const urlArray = url.split('/');
            const id = urlArray[urlArray.length - 1]

            loggerEmitter.emit('log', `Deleted review with id: ${id}`)

            const dbData = readData('db.json');
            const allReviews = JSON.parse(dbData);

            const reviews = allReviews.filter(r => r.id !== id)
            const stringifiedReviews = JSON.stringify(reviews, null, 2)
            writeData('db.json', stringifiedReviews)

            response.setHeader('Content-Type', 'text/html')
            response.write('review deleted')
            response.end()
        }
    }

    // response.setHeader('Content-Type', 'text/html')
    // response.write('<h1>Hello from the server side</h1>')
    response.end()
})

server.listen(3000, () => {
    console.log('Server started listening at http://localhost:3000')
})

//http://localhost same as 127.0.0.1