
import "dotenv/config";
import { UserModel } from "../models/userModel.js"; 
import bycrpt from "bcrypt";
import jwt from "jsonwebtoken";
import { orderModel } from "../models/orderModel.js";

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

export const login = async (params: LoginParams) => {
  const finduser = await UserModel.findOne({ email: params.email });

  if (!finduser) {
    return { 
      statusCode: 404, 
      data: { message: "User not found" }   // ALWAYS object
    };
  }

  const passwordMatch = await bycrpt.compare(params.password, finduser.password);

  if (!passwordMatch) {
    return { 
      statusCode: 401, 
      data: { message: "Invalid credentials" }  // ALWAYS object
    };
  }

  // Generate JWT token
  const token = generateJWT({
    email: params.email,
    firstName: finduser.firstName,
    lastName: finduser.lastName,
  });

  return {
    statusCode: 200,
    data: {
      token,           // ALWAYS object
      role: finduser.role
    }
  };
};



interface GetMyOrdersParams{
  userId: string;
}
export const getMyOrders = async ({ userId }: GetMyOrdersParams) => {
  try {
    const orders = await orderModel.find({ userId }).lean(); // ✅ lean() removes Mongoose wrappers

    return { statusCode: 200, data: orders };
  } catch (err) {
    console.error("getMyOrders failed:", err);
    throw err;
  }
};


const generateJWT = (data: any) => {
  console.log("JWT_SECRET:",process.env.JWT_SECRET); 
  return jwt.sign(data, process.env.JWT_SECRET || '', {expiresIn: "24h"});
}