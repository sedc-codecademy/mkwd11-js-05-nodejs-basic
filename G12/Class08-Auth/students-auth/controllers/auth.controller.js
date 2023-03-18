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

      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(401).send({ msg: error.message });
    }
  }
}
