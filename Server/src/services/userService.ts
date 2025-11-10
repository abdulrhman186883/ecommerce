
import "dotenv/config";
import { UserModel } from "../models/userModel.js"; 
import bycrpt from "bcrypt";
import jwt from "jsonwebtoken";

interface RegisterParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// any thing from Database should be await ! 
export const register = async (params: RegisterParams) => {
    const finduser = await UserModel.findOne({email: params.email});
   if(finduser){
    return {statusCode: 409, data: "User already exists"};
   }


   const hashedPassword = await bycrpt.hash(params.password, 10);

   const newUser = new UserModel({
    firstName: params.firstName,
    lastName: params.lastName,
    email: params.email,
    password: hashedPassword,
   });

   await newUser.save();
   return {statusCode: 201, data: generateJWT({email: newUser.email, firstName: newUser.firstName})};
}




interface LoginParams {
  email: string;
  password: string;
}

export const login = async (prams: LoginParams) => {

    const finduser = await UserModel.findOne({email: prams.email});

    if(!finduser){
      return {statusCode: 404, data: "User not found"};
    }

    const passwordMatch = await bycrpt.compare(prams.password, finduser.password);
    if(passwordMatch){

        return {statusCode: 200, data: generateJWT({email: prams.email, firstName: finduser.firstName, lastName: finduser.lastName})};
    }else{
      return {statusCode: 401, data: "Invalid credentials"};
    }
}


const generateJWT = (data: any) => {
  console.log("JWT_SECRET:",process.env.JWT_SECRET); 
  return jwt.sign(data, process.env.JWT_SECRET || '', {expiresIn: "24h"});
}