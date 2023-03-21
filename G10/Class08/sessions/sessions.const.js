import session from 'express-session';

export const productsSession = session({
    secret: 'our_secret_123',
    name: 'products_session',
    cookie: {
        maxAge: 5 * 60 * 60 * 1000
    },
    saveUninitialized: true,
    resave: true,
})

export const fruitsSession = session({
    secret: 'other_secret_123',
    name: 'fruits_session',
    cookie: {
        maxAge: 5 * 60 * 60 * 1000
    },
    saveUninitialized: true,
    resave: true,
})