import express from "express";
import router from "./consts/routes.const.js";

const app = express();

app.use(express.json());
app.use(router);

app.listen(3000, () => {
    console.log("Server is up and running")
});