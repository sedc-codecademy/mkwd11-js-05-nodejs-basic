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

      console.log(req.session);

      // After user is logged in , we add a isLoggedIn property to the session object, we use this after to check if the user is logged in
      req.session.isLoggedIn = true;

      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(401).send({ msg: error.message });
    }
  }
  // Logout user
  static async logoutUser(req, res) {
    try {
      // Deletes session and logs out user in the process, won't throw error if there is no session
      req.session.destroy();

      return res.sendStatus(204);
    } catch (error) {
      res.status(400).send({ msg: error.message });
    }
  }
}
