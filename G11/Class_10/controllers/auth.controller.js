import AuthModel from "../models/auth.model.js";

class AuthController {
    constructor(){
        // 2. When a new instance of the controller is made
        // we create a new instance of the model too. Done in the constructor
        this.authModel = new AuthModel()
    }
    
    async register(username, password){
        // 3. Calling registerUser method from the auth model class, with the coresponding arguments
        await this.authModel.registerUser(username, password)
    }
}

export default AuthController;
