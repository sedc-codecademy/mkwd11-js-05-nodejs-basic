//WHEN EXPORT IS NOT DEFAULT

// import * as main from './main.js'

// main.emitter.emit('event', 'Hello from the other side')

// import { emitter } from './main.js'


//WHEN EXPORT IS DEFAULT

import emitter from "./main.js";
import Events from './events.js';

emitter.emit('event', 'Hello from the other side')

emitter.emit(Events.event_one)
emitter.emit(Events.event_two)
emitter.emit(Events.event_three)