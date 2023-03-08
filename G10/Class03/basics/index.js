const EventEmitter = require('events')

class MyEmitter extends EventEmitter {}

const emitter = new MyEmitter();

// Adding a listener for event
emitter.on('event', () => {
    console.log('Event emitted.')
})

// Emitting the event
// emitter.emit('event')

// emitter.emit('other-event')
// emitter.emit('EVENT')

emitter.on('data', (name) => {
    console.log(`This is the name you sent: ${name}`)
})

// emitter.emit('data', 'Ivan')

// emitter.emit('data', ['Ivo', 'Ivan'])


// Asynchronous emitting events
// setTimeout(() => {
//     emitter.emit('data', 'Damjan')
// }, 2000)

// Chaining events

emitter
    .on('event-one', () => console.log("Event one emitted"))
    .on('event-two', () => console.log('Event two emitted'))

// emitter.emit('event-one')
// emitter.emit('event-two')

const fullName = (firstName, lastName) => {
    console.log(`${firstName} ${lastName}`)
}

emitter.on('full-name', fullName)

// emitter.emit('full-name', 'Martin', 'Panovski')
// emitter.emit('full-name', 'Martin', 'Panovski')
// emitter.emit('full-name', 'Martin', 'Panovski')
// emitter.emit('full-name', 'Martin', 'Panovski')
// emitter.emit('full-name', 'Martin', 'Panovski')

emitter.on('sum-of-three', (a, b, c) => {
    console.log(a + b + c)
})

// emitter.emit('sum-of-three', 1, 2)

emitter.on('function', function () {
    console.log('Simple function')
    console.log('this', this, globalThis)
})

emitter.on('arrow', () => {
    console.log('Arrow function')
    console.log('this', this)
})

// emitter.emit('function')
// emitter.emit('arrow')

emitter.once('once', () => {
    console.log('Once event fired')
})

// emitter.emit('once');
// emitter.emit('once');

emitter
    .on('message', () => {
        console.log('First message emitted')
    })
    .on('message', () => {
        console.log('second message emitted')
    })
    .on('message', () => {
        console.log('third message emitted')
    })
    .prependListener('message', () => {
        console.log('prepend listener fired')
    })
    .on('message', () => {
        console.log('fourth message emitted')
    })
    .prependOnceListener('message', () => {
        console.log('Prepend once fired')
    })


emitter.prependListener('message', () => {
    console.log('nesto dr')
})

// emitter.emit('message')

emitter.on('inside', () => {
    console.log('From inside the emitter')
})

emitter.on('outside', () => {
    console.log('from outside the emitter')
    emitter.emit('inside')
})

// emitter.emit('inside')
// emitter.emit('outside')