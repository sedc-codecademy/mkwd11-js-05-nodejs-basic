import express from "express";
import { isLoggedInValidator } from "./middlewares/session.auth.validator.js";
import authRouter from "./routes/auth.routes.js";
import productsRouter from "./routes/products.routes.js";
import { authSession } from "./sessions/auth.session.js";


const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
    res.send("Server is up")
});

app.use(authRouter);
app.use('/products', authSession, isLoggedInValidator, productsRouter);


app.listen(3000, () => {
    console.log("Server is up and running...")
});