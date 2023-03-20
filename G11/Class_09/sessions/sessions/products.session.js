import expressSession from "express-session";

export const productsSession = expressSession({
    secret: "secret_123",
    name: "products_session",
    cookie: {
        maxAge: 5 * 60 * 60 * 1000 //5 hours in miliseconds
    },
    saveUninitialized: true,
    resave: true
});


