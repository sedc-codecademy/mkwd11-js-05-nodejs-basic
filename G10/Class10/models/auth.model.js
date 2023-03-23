import bcrypt from 'bcryptjs';
import DataService from '../services/data.service.js'

export default class AuthModel {
    registerUser(userData) {
        const hashedPassword = bcrypt.hashSync(userData.password, 10)

        const user = {
            id: uuidv4(),
            username: userData.username,
            password: hashedPassword
        }

        DataService.writeFile('./data/users.json', [user])

        return user;
    }

    loginUser() {
        const users = DataService.readFile('./data/users.json')
    
        const user = users.find(user => user.username === userData.username)
    
        if (!user) {
            throw new Error('User not found')
        }
    
        const isSamePassword = bcrypt.compareSync(userData.password, user.password)
    
        if (isSamePassword) {
            const token = createAccessToken(user.id)
            console.log(token)
            const { password, ...whatIsLeftOfUser } = user;
            return whatIsLeftOfUser;
        } else {
            throw new Error('Invalid credentials')
        }
    }
}