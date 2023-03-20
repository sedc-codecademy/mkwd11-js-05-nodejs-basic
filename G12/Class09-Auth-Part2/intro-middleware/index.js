import express from "express";
import { loggerMiddleware } from "./middlewares/logger.middleware.js";

const app = express();

app.use(express.json());

app.get("/", loggerMiddleware, (req, res) => {
  res.send({ msg: "This is from the root endpoint" });
});

app.listen(3000, () => {
  console.log("Server is up at port 3000");
});
