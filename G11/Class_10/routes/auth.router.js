import express from "express";
import jwt from "jsonwebtoken";
import fileService from "../shared-services/file-service.js";
import AuthController from "../controllers/auth.controller.js";
import bcrypt from "bcryptjs";

const authController = new AuthController();
const authRouter = express.Router();

// Login route to login the user
authRouter.post("/login", async (req, res) => {
  // 1. Get creadentials from request's body
  const username = req.body.username;
  const password = req.body.password;

  // 2. Get all users from our db (our json file)
  const users = await fileService.readFile("./db/users.json");

  // 3. Check if user with given username exists.
  const userFound = users.find((user) => user.username === username);

  // 4. If it is not existing return error.
  if (!userFound) {
    return res.status(404).send({ message: "User not found" });
  }

  // 5. Because the password is encrypted (non human readable), we compare the encrypted pass with the provided from the req. body;
  const isPasswordValid = await bcrypt.compare(password, userFound.password);

  // 6. If pass is not valid we return error
  if (!isPasswordValid) {
    return res.status(403).send({ message: "Invalid password" });
  }

  // 7. We create access token, so every time user make requests to the server, the user should
  // provide the value of this access token in the authorization headers of the request.
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

  // 8. We create refresh token as-well, so when the access token expires the user must send the value
  // of the refresh token in order to generate a brand new valid access token =).
  const refreshToken = jwt.sign(
    {
      name: userFound.username,
      id: userFound.id,
    },
    "refresh_token_secret"
  );

  // 9. We only save the refresh token in db in the user's object property refreshToken
  userFound.refreshToken = [refreshToken];
  
  // 10. Save the users back
  await fileService.writeFile(
    "./db/users.json",
    JSON.stringify(users, null, 2)
  );

  // 11. Send response to the user containing the access token and the refresh token.
  res.send({ accessToken: accessToken, refreshToken: refreshToken });
});

// Route that generates a brand new valid access token, using the refresh token
authRouter.post("/token", async (req, res) => {
  // 1. Get the token property from the request's body
  const refreshToken = req.body.token;

  // 2. Check if it is not existing/provided.
  if (!refreshToken) {
    return res.status(403).send({ meesage: "No token found." });
  }

  // 3. Verify the validity refresh token
  const tokenVerify = jwt.verify(refreshToken, "refresh_token_secret");

  // 4. Get all users from db
  const users = await fileService.readFile("./db/users.json");

  //5. Get the user from the users list with coresponding id
  const userFound = users.find((user) => user.id === tokenVerify.id);

  // 6. If user does not exist with such id return err status code
  if (!userFound) {
    return res.sendStatus(403);
  }

  // 7. Check if the refresh token does not exist in the user's refreshToken property list
  if (!userFound.refreshToken.some((token) => token === refreshToken)) {
    return res.status(403).send({ message: "Refresh token is not existing" });
  }

  // 8. Create brand new valid access token, so the user will use it when requesting the routes in the authorization headers.
  const newToken = jwt.sign(
    {
      name: userFound.username,
      id: userFound.id,
    },
    "access_token_secret_key",
    { expiresIn: "20s" }
  );

  // 9. Create a brand new refresh token as-well, so we can implement token exchange mechanism which is good for the security of the app.
  const newRefreshToken = jwt.sign(
    {
      name: userFound.username,
      id: userFound.id,
    },
    "refresh_token_secret"
  );
  
  // 10. TOKEN EXCHANGE MECHANISM FOR MORE SECURITY =) /flex
  const usersToSave = users.map((user) => {
    if (user.id === tokenVerify.id) {
      return {
        ...user,
        // 11. We swap the old refresh token with a new
        refreshToken: [newRefreshToken],
      };
    } else {
      return user;
    }
  });

  // 12. Save back the newly data.
  await fileService.writeFile("./db/users.json", JSON.stringify(usersToSave, null, 2));

  // 13. Return to the user the new access and the new refresh tokens.
  // The new access token will be used to be set as a value in the authorization headers of the request
  // so the user is authorized when making request to the app, and the new refresh token is used
  // so the user can generate brand new access token =).
  res.send({ newAcessToken: newToken, newRefreshToken: newRefreshToken });
});

// Logout route
authRouter.post("/logout", async (req, res) => {
  // 1. Get the refresh token
  const refreshToken = req.body.token;

  if (!refreshToken) {
    return res.status(403).send({ meesage: "No token found." });
  }


  // 2. Verify the refresh token
  const tokenVerify = jwt.verify(refreshToken, "refresh_token_secret");

  const users = await fileService.readFile("./db/users.json");

  const usersToSave = users.map((user) => {
    if (user.id === tokenVerify.id) {
      return {
        ...user,
        // 3. Remove the user's refresh token, so it is logout.
        refreshToken: [],
      };
    } else {
      return user;
    }
  });

  // 4. Save back the newly data.
  await fileService.writeFile(
    "./db/users.json",
    JSON.stringify(usersToSave, null, 2)
  );

  res.status(200).send({ meesage: "You have been loged out successfully" });
});

// Register new user
authRouter.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    // 1. Call register method of the controller with the coresponding values
    // the values are consumed from the request body
    await authController.register(username, password);
    res.status(201).send({ message: "Success register." });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

export default authRouter;
