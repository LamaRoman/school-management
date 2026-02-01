import jwt from 'jsonwebtoken';
import { config } from '../config/env.config.js';

export const generateToken = (payload,expiresIn = config.jwt.expiresIn)=>{
    if(!payload || typeof payload !== 'object'){
        throw new Error('Payload is required and must be an object');
    }
    return jwt.sign(payload,config.jwt.secret,{expiresIn})

}
export const verifyToken = (token) =>{
    if(!token){
        throw new Error('Token is required')
    }
    try{
        return jwt.verify(token,config.jwt.secret)
    }catch(error){
        throw new Error(`Invalid token: ${error.message}`)
    }
}

export const generateRefreshToken = (payload)=>{
    if(!payload || typeof payload !== 'object'){
        throw new Error('Payload is required and must be an object');
    }

    return jwt.sign(payload,config.jwt.refreshSecret,{expiresIn:config.jwt.refreshExpiresIn})
}
