import User from '../database/models/UserModel';
import bcrypt from 'bcryptjs';
import AuthService from '../utils/index';
import { NextFunction } from 'express';

class UserService {
    static async signUp(userDetails: { username: any; password: any; }, next: NextFunction) {

        try {

            const { username, password } = userDetails;

            if (!username || !password) {
                throw new Error('Missing Username or Password');
            }

            const existingUser = await User.findOne({ username });
            if (existingUser) {
                throw ({ status: 409, code: 'USER_ALREADY_EXISTS', message: 'This e-mail address is already taken.' });
            }
            const hashedPassword = await AuthService.generatePassword(password)

            const newUser = new User({ username, password: hashedPassword });
            await newUser.save();

            return { message: 'User created successfully' };
        } catch (err) {
            throw(err);
        }
    }

    static async signIn(userDetails: { username: any; password: any; }, next: NextFunction) {
        const { username, password } = userDetails;

        try {
            const user = await User.findOne({ username });
            if (!user) {
                throw ({ status: 401, code: 'LOGIN_INVALID', message: 'Invalid authentication credentials1.' });
            }
            console.log('aftr user')
            const isMatch = await AuthService.validatePassword(password, user.password);
            console.log('after match')
            if (!isMatch){
                throw ({ status: 401, code: 'LOGIN_INVALID', message: 'Invalid authentication credentials2.' });
            } 
            const token = await AuthService.generateSignature({ id: user._id });
            console.log('after token')
            return { token };
        } catch (err) {
            console.log('err', err.message)
            throw(err);
        }
    }

}

export default UserService;
