import EventEmitter from 'events';
import { appendText } from './text-service.js';

class LoggerEmitter extends EventEmitter {}

const loggerEmitter = new LoggerEmitter()

loggerEmitter.on('log', (message) => {
    const currentTime = new Date().toLocaleString()
    appendText('loggs.txt', 
    `
    ------------------------------------
    ${message}
    Logged at: ${currentTime}
    ------------------------------------
    `)
})

export default loggerEmitter;