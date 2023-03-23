import expressSession from "express-session";


export const authSession = expressSession({
    secret: "auth_session_secret",
    name: "user_me_session",
    cookie: {
        maxAge: 5 * 60 * 60 * 1000
    },
    saveUninitialized: true,
    resave: true
})