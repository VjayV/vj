import { NextFunction, Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {

  static async signUp(req: Request, res: Response, next: NextFunction) {

    try {
      const { username, password } = req.body;
      const result = await UserService.signUp({ username, password }, next);
      console.log('after user service call')
      res.json(result);
    } catch (err) {
      next(err)
    }

  }

  static async signIn(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;

    try {
      const token = await UserService.signIn({ username, password }, next);
      console.log('afer 27')
      res.json(token);
    } catch (err) {
      next(err)
    }
  }

}

export default UserController;
