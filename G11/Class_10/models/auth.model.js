import {v4 as uuid} from "uuid";
import bcrypt from "bcryptjs";
import fileService from "../shared-services/file-service.js";

class User {
    constructor(name, pass){
        this.id = uuid();
        this.username = name;
        this.password = pass;
        this.refreshToken = [];
    }
}

class AuthModel {
    async registerUser(username, password){
        const users = await fileService.readFile("./db/users.json");

        const userExists = users.some((user) => user.username === username);

        if(userExists){
            throw new Error(`User with username: ${username} already exists.`);
        }

        const hashedPassword = await bcrypt.hash(password, 8);

        const user = new User(username, hashedPassword);

        users.push(user);

        await fileService.writeFile("./db/users.json", JSON.stringify(users, null, 2))
    }
}

export default AuthModel;