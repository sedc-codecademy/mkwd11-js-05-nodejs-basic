import express from "express";
import jwt from "jsonwebtoken";
import fileService from "../shared-services/file-service.js";
import AuthController from "../controllers/auth.controller.js";
import bcrypt from "bcryptjs";

const authController = new AuthController();
const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const users = await fileService.readFile("./db/users.json");

  const userFound = users.find((user) => user.username === username);

  if (!userFound) {
    return res.status(404).send({ message: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(password, userFound.password);

  if (!isPasswordValid) {
    return res.status(403).send({ message: "Invalid password" });
  }

  const accessToken = jwt.sign(
    {
      name: userFound.username,
      id: userFound.id,
    },
    "access_token_secret_key",
    {
      expiresIn: "20s",
    }
  );

  const refreshToken = jwt.sign(
    {
      name: userFound.username,
      id: userFound.id,
    },
    "refresh_token_secret"
  );

  userFound.refreshToken = [refreshToken];

  await fileService.writeFile(
    "./db/users.json",
    JSON.stringify(users, null, 2)
  );

  res.send({ accessToken: accessToken, refreshToken: refreshToken });
});

authRouter.post("/token", async (req, res) => {
  const refreshToken = req.body.token;

  if (!refreshToken) {
    return res.status(403).send({ meesage: "No token found." });
  }

  const tokenVerify = jwt.verify(refreshToken, "refresh_token_secret");

  const users = await fileService.readFile("./db/users.json");

  const userFound = users.find((user) => user.id === tokenVerify.id);

  if (!userFound) {
    return res.sendStatus(403);
  }

  if (!userFound.refreshToken.some((token) => token === refreshToken)) {
    return res.status(403).send({ message: "Refresh token is not existing" });
  }

  const newToken = jwt.sign(
    {
      name: userFound.username,
      id: userFound.id,
    },
    "access_token_secret_key",
    { expiresIn: "20s" }
  );

  const newRefreshToken = jwt.sign(
    {
      name: userFound.username,
      id: userFound.id,
    },
    "refresh_token_secret"
  );
  
  // TOKEN EXCHANGE MECHANISM FOR MORE SECURITY =) /flex
  const usersToSave = users.map((user) => {
    if (user.id === tokenVerify.id) {
      return {
        ...user,
        refreshToken: [newRefreshToken],
      };
    } else {
      return user;
    }
  });

  await fileService.writeFile("./db/users.json", JSON.stringify(usersToSave, null, 2));
  
  res.send({ newAcessToken: newToken, newRefreshToken: newRefreshToken });
});

authRouter.post("/logout", async (req, res) => {
  const refreshToken = req.body.token;

  if (!refreshToken) {
    return res.status(403).send({ meesage: "No token found." });
  }

  const tokenVerify = jwt.verify(refreshToken, "refresh_token_secret");

  const users = await fileService.readFile("./db/users.json");

  const usersToSave = users.map((user) => {
    if (user.id === tokenVerify.id) {
      return {
        ...user,
        refreshToken: [],
      };
    } else {
      return user;
    }
  });

  await fileService.writeFile(
    "./db/users.json",
    JSON.stringify(usersToSave, null, 2)
  );

  res.status(200).send({ meesage: "You have been loged out successfully" });
});

authRouter.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    await authController.register(username, password);
    res.status(201).send({ message: "Success register." });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

export default authRouter;
