import type { Request,Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { UserModel } from "../models/userModel.js";

export interface ExtendRequest extends Request {
    user?: any;
}

const validateJWT = (req: ExtendRequest, res: Response, next: NextFunction) =>{
    const authorizationHeader = req.get('authorization');

    if(!authorizationHeader){
         res.status(403).send("authorization not provided");
         return;
    }

    const token = authorizationHeader.split(" ")[1];

    if(!token){
        res.status(403).send("Token not found");
        return;
    }

    jwt.verify(token,"oK1294959932948Fck812911012i", async (err,payload)  =>{
      if(err){
        res.status(403).send("invalid Token");
        return;
      }

    if(!payload){
        res.status(403).send("invalid Token payload")
    }

    const userPayload = payload as {email: string; firstName: string; lastName: string;}
      const user = await UserModel.findOne({email: userPayload.email})
      req.user = user;
      next();
    })
}



export default validateJWT