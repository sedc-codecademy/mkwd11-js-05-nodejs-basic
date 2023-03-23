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
        // 4. We read the users from db
        const users = await fileService.readFile("./db/users.json");

        // 5. Check if user with such username exists
        const userExists = users.some((user) => user.username === username);

        if(userExists){
            throw new Error(`User with username: ${username} already exists.`);
        }

        // 6. Hash the user's password
        const hashedPassword = await bcrypt.hash(password, 8);

        // 7. Create a new user object with the hashed password
        const user = new User(username, hashedPassword);

        // 8. Add the new user.
        users.push(user);

        // 9. Save back the newly data.
        await fileService.writeFile("./db/users.json", JSON.stringify(users, null, 2))
    }
}

export default AuthModel;