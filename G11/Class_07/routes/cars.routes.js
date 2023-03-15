import express from "express";

const carsRouter = express.Router();


carsRouter.get("/", (req, res) => {
    res.send("cars route")
});

export default carsRouter;