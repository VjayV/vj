import AuthService from '../../utils/index.js';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    
    const isAuthorized = await AuthService.validateSignature(req);

    if(isAuthorized){
        return next();
    }
    console.log(isAuthorized, "not auth")
    return res.status(403).json({message: 'Not Authorized'})
}