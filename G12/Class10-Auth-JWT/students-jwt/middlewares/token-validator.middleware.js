import { verifyAccessToken } from "../const/jwt.const.js";
import { AuthModel } from "../models/auth.model.js";

export const tokenValidator = async (req, res, next) => {
  try {
    // Checking if the header exists
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) throw new Error();

    // Extracting token from header
    const token = authorizationHeader.split(" ")[1];

    // Trying to verify token and extracting payload
    const { userId } = verifyAccessToken(token);

    console.log(userId);

    // Searching for user in database  ( if it finds it will not throw error but if it doesn't it will throw error)
    await AuthModel.getUserById(userId);

    // If all checks above do not fail then we simply go to the next function in the chain
    return next();
  } catch (error) {
    console.log(error);
    res.sendStatus(403);
  }
};
