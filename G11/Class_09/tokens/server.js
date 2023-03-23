import express from "express";
import authRouter from "./routes/auth.router.js";
import productsRouter from "./routes/products.router.js";

const app = express();

app.use(express.json());
app.use(authRouter);
app.use("/products", productsRouter);

app.listen(3000, () => {
    console.log("Server is up and running")
});