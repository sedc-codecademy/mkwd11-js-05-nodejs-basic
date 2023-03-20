import express from "express";
import cookieRouter from "./routes/cookie.routes.js";
import cookieParser from "cookie-parser";
import productsRouter from "./routes/products.routes.js";

const app = express();

app.use(cookieParser()) //used to parse cookie

// app.use(cookieParser(), cookieRouter); // we can use multiple middlewares =)

app.use(express.json())

app.get("/health", (req, res) => {
    res.send("Server is live.")
})

app.use(cookieRouter);
app.use(productsRouter)

app.listen(3000, () => {
    console.log("Server is up and running")
})