import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { VandorPayload } from '../dto';
import { SECRET_KEY } from '../config';
import { Request } from 'express';
import { AuthPayload } from '../dto/Auth.dto';

export const GenerateSalt = async () => {
    return await bcrypt.genSalt();
}


export const GeneratePassword = async (password: string, salt:string) => {
    return await bcrypt.hash(password, salt);
}

// checking if password is the same 

export const ValidatePassword = async (enteredPassword:string, savedPassword:string, salt:string) => {

    return await GeneratePassword(enteredPassword,salt) === savedPassword;

} 


export const GenerateToken = async (payload: VandorPayload) => {
    const signatureToken = jwt.sign(payload, SECRET_KEY, {expiresIn: '1d'});

    return signatureToken
}


export const ValidateSignatureToken = async (req: Request): Promise<boolean> => {
    const authHeader = req.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return false;
    }

    const token = authHeader.split(" ")[1]; // Extract token after "Bearer"

    try {
        const payload = jwt.verify(token, SECRET_KEY) as AuthPayload;
        req.user = payload; // Attach user data to request
        return true;
    } catch (error) {
        console.error("Token validation error:", error);
        return false;
    }
};