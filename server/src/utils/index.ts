import { CustomRequest } from "./types";
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from "bcryptjs"

class AuthService {


    static async generatePassword(password: string){
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword
    }

    static async generateSignature(payload: { id: any; }){
        const { id } = payload;
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        return token;
    }

    static async validatePassword(enteredPassword: string, existingPassword:string){
        const isMatch = await bcrypt.compare(enteredPassword, existingPassword);
        return isMatch;
    }

    static async validateSignature(req: CustomRequest) {
        try {
          const APP_SECRET = process.env.JWT_SECRET
          const signature = req.get("Authorization");
          console.log(signature);
          const payload = jwt.verify(signature.split(" ")[1], APP_SECRET);
          req.user = payload as JwtPayload;
          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      };
}

export default AuthService;