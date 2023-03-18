import express from "express";
import expressSession from "express-session";

const productsRouter = express.Router()

/**
 * Better way of handling cookies
 * When we create session, a cookie is created for us =)
 */

/**
 * 1. When we create a session:
 *    - It generated a unique session id for us.
 *    - Stores the session id in the cookie.
 *    - Creates an empty session object for us.
 */

const productSession = expressSession({
    secret: "secret_123",
    name: "products_session_id",
    cookie: {
        maxAge: 5 * 60 * 60 * 1000 // 5hrs into milliseconds
    },
    saveUninitialized: true,
    resave: true
});


productsRouter.get("/", productSession, (req, res) => {
    /**
     * we add new greetings prop
     * to the session object
     */
    req.session.greetings = "George says hi"

    res.send("<h1>Default route</h1>")
})

productsRouter.get('/products', productSession, (req, res) => {
    const products = [
        {name: "Orange"}
    ];
    /**
     * we read the session object values
     * 
     */
    console.log(req.session)

    res.send(products)
})
export default productsRouter;