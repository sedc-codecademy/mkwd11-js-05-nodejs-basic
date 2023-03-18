import express from "express";
import MotorsController from "../controllers/motors.controller.js";

const motorBikesRouter = express.Router();

const motorsController = new MotorsController();

//GET ALL => localhost:3000/motors
motorBikesRouter.get("/", async (req, res) => {
  const motors = await motorsController.getMotors();

  res.status(200).send(motors);
});

// GET BY ID => localhost:3000/motors/:id
motorBikesRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const motor = await motorsController.getById(id);
    res.send(motor);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

// POST => localhost:3000/motors
motorBikesRouter.post("/", async (req, res) => {
  const body = req.body;

  await motorsController.addMotor(
    body.model,
    body.make,
    body.year,
    body.engineSize,
    body.color,
    body.price
  );

  res.status(201).send({ message: "New motor was added" });
});
export default motorBikesRouter;
