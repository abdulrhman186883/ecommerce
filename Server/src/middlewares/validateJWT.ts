import type { Request,Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { UserModel } from "../models/userModel.js";
import type {ExtendRequest} from "../types/extendedRequests.js";
 

const validateJWT = (req: ExtendRequest, res: Response, next: NextFunction) =>{
    const authorizationHeader = req.get('authorization');

    if(!authorizationHeader){
         return res.status(403).send("authorization not provided");
    }

    const token = authorizationHeader.split(" ")[1];

    if(!token){
        return res.status(403).send("Token not found");
        
    }

    jwt.verify(token,"oK1294959932948Fck812911012i", async (err,payload)  =>{
      if(err){
        return res.status(403).send("invalid Token");
        
      }

    if(!payload){
        res.status(403).send("invalid Token payload")
    }

    
    const userPayload = payload as {email: string; firstName: string; lastName: string;}
      const user = await UserModel.findOne({email: userPayload.email})
      // ✅ safely await your DB call
    
    if (!user) {
      return res.status(403).send("User not found");
    }

      req.user = user;
      next();
      
    }
  )
}



export default validateJWT