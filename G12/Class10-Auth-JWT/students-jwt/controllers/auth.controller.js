import {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} from "../const/jwt.const.js";
import { AuthModel } from "../models/auth.model.js";

export class AuthController {
  // 1. Register user
  static async registerUser(req, res) {
    try {
      const newUser = await AuthModel.registerUser(req.body);

      return res.status(201).json(newUser);
    } catch (error) {
      console.log(error);
      return res.status(400).send({ msg: error.message });
    }
  }
  //   2. Login user
  static async loginUser(req, res) {
    try {
      const user = await AuthModel.loginUser(req.body);

      // Creating token is done after success with login
      const accessToken = createAccessToken(user.id);

      console.log(accessToken);

      // res.set sets a header in the response with the provided name and value
      res.set("access-token", accessToken);

      // Creating a refresh token after succesfull login
      const refreshToken = createRefreshToken(user.id);

      // Calling the save refresh token method
      await AuthModel.saveRefreshToken(user.id, refreshToken);

      // Sending refresh token to client
      res.set("refresh-token", refreshToken);

      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(401).send({ msg: error.message });
    }
  }
  // 3. Refresh token endpoint
  static async refreshAccessToken(req, res) {
    try {
      const refreshToken = req.headers["refresh-token"];

      // If refresh token doesn't exist
      if (!refreshToken) throw new Error();

      // Try to verify token
      const { userId } = verifyRefreshToken(refreshToken);

      // Searching for user in database
      const foundUser = await AuthModel.getUserById(userId);

      // Seeing if token from databse matches the one from the request
      if (refreshToken !== foundUser.refreshToken) throw new Error();

      // Creating new access token
      const accessToken = createAccessToken(foundUser.id);

      // res.set sets a header in the response with the provided name and value
      res.set("access-token", accessToken);

      return res.sendStatus(204);
    } catch (error) {
      console.log(error);
      return res.sendStatus(403);
    }
  }
  // 4. Logout user
  static async logoutUser(req, res) {
    try {
      const refreshToken = req.headers["refresh-token"];

      const { userId } = verifyRefreshToken(refreshToken);

      await AuthModel.deleteRefreshToken(userId);

      return res.sendStatus(204);
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  }
}
