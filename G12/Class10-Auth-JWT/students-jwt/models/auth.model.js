import { DataService } from "../services/data.service.js";
import { pathBuilder } from "../utils/utils.js";
import { v4 as uuid } from "uuid";
import Joi from "joi";
import bcrypt from "bcryptjs";

// With joi schema we define rules that the object must follow using function calls
const userSchema = Joi.object({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(30).required(),
});

class User {
  constructor(firstName, lastName, email, password) {
    this.id = uuid();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    // Adding a refresh token on first creation
    this.refreshToken = null;
  }
}

const usersPath = pathBuilder(["..", "data", "users.json"]);

export class AuthModel {
  static async getAllUsers() {
    return DataService.readJSONFile(usersPath);
  }
  static async saveUsers(users) {
    await DataService.saveJSONFile(usersPath, users);
  }

  static async getUserById(userId) {
    const users = await this.getAllUsers();

    const foundUser = users.find(user => user.id === userId);

    if (!foundUser) throw new Error("User not found");

    return foundUser;
  }
  //   1. Register user
  static async registerUser(userData) {
    const users = await this.getAllUsers();

    const userExists = users.some(user => user.email === userData.email);

    if (userExists) throw new Error("Email already exists");

    // Joi validation , validate method checks if the provided object follows the schema defined above
    const validation = userSchema.validate(userData);

    // To check if there is an error in Joi we need to read the .error property, if it exists something went wrong if it doesn't the validation is successfull
    if (validation?.error) throw new Error(validation.error.details[0].message);

    const { firstName, lastName, email, password } = userData;

    // Here we call bcrypt to hash the password before saving to database
    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser = new User(firstName, lastName, email, hashedPassword);

    const updatedUsers = [...users, newUser];

    // The statement below takes out the password and then combines the rest of the properties in the object name userWithoutPassword (this is rest operator instead of spread)
    await this.saveUsers(updatedUsers);

    // Usually we don't return user data when registering a new user, this was only done to show you that registering is working in postman, see below in login about proper returning of user data
    const { password: userPassword, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }
  //   2. Login user
  static async loginUser(credentials) {
    const { email, password } = credentials;

    const users = await this.getAllUsers();
    // First we check if the user exists in the database
    const foundUser = users.find(user => user.email === email);

    if (!foundUser) throw new Error("Invalid Credentials");

    // Second we check if the already found user has a valid password
    // We need to hash the credentials password and compare it with the one stored in the database
    const isPasswordValid = await bcrypt.compare(password, foundUser.password);

    if (!isPasswordValid) throw new Error("Invalid Credentials");

    const { password: userPassword, ...userWithoutPassword } = foundUser;
    return userWithoutPassword;
  }
  // 3. Save refresh token
  static async saveRefreshToken(userId, refreshToken) {
    const users = await this.getAllUsers();

    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        user.refreshToken = refreshToken;
        return user;
      }
      return user;
    });

    await this.saveUsers(updatedUsers);
  }
  // 4. Delete refresh token
  static async deleteRefreshToken(userId) {
    const users = await this.getAllUsers();

    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        user.refreshToken = null;
        return user;
      }
      return user;
    });

    await this.saveUsers(updatedUsers);
  }
}
