import bcrypt from 'bcryptjs';
import DataService from '../services/data.service.js'
import { createAccessToken, createRefreshToken } from '../jwt.const.js'
import { v4 as uuidv4 } from 'uuid'
import { verifyRefreshToken } from '../jwt.const.js';

export default class AuthModel {
    async registerUser(userData) {
        const hashedPassword = await bcrypt.hash(userData.password, 10)

        const user = {
            id: uuidv4(),
            username: userData.username,
            password: hashedPassword,
            refreshTokens: []
        }

        await DataService.saveFile('./data/users.json', [user])

        const { password, refreshTokens, ...everythingElse } = user;

        return everythingElse;
    }

    async loginUser(userData) {
        const users = await DataService.readFile('./data/users.json')

        console.log(users)
    
        const user = users.find(user => user.username === userData.username)
    
        console.log('user', user)
        if (!user) {
            throw new Error('User not found')
        }
    
        const isSamePassword = await bcrypt.compare(userData.password, user.password)
    
        console.log('is same pass', isSamePassword)
        if (isSamePassword) {
            // creating access token
            const token = createAccessToken(user.id)
            console.log('token', token)

            // creating refresh token
            const refreshToken = createRefreshToken(user.id)

            // adding refresh token to user
            user.refreshTokens.push(refreshToken)
            const index = users.findIndex(u => u.id === user.id)
            users[index] = user;

            DataService.saveFile('./data/users.json', users)

            const { password, refreshTokens, ...whatIsLeftOfUser } = user;
            return { user: whatIsLeftOfUser, token, refreshToken };
        } else {
            throw new Error('Invalid credentials')
        }
    }

    async refreshToken(token) {
        const { userId } = verifyRefreshToken(token)

        if (!userId) throw new Error(`User doesn't exist`)

        // check if user with such ID exists in app
        const users = await DataService.readFile('./data/users.json');

        const usersIndex = users.findIndex(u => u.id === userId);

        if (usersIndex === -1) throw new Error(`User not valid`)

        // check if refresh token is saved in users property

        const refreshTokenExists = users[usersIndex].refreshTokens.includes(token)

        if (!refreshTokenExists) throw new Error('Something went wrong')

        // delete existing refresh token

        users[usersIndex].refreshTokens = users[usersIndex].refreshTokens.filter(rf => rf !== token)

        const accessToken = createAccessToken(userId)

        const refreshToken = createRefreshToken(userId);

        // add new refresh token to users profile

        await DataService.saveFile('./data/users.json', users)

        return {
            accessToken,
            refreshToken
        }
    }
}