import express from "express";
import jwt from "jsonwebtoken";
import fileService from "../shared-services/file-service.js";
const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const users = await fileService.readFile("./db/users.json");

  const userFound = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!userFound) {
    return res.status(404).send({ message: "User not found" });
  }

  const accessToken =  jwt.sign(
    {
      name: userFound.username,
      id: userFound.id,
    },
    "access_token_secret_key"
  );

  res.send({ accessToken: accessToken });
});

export default authRouter;
