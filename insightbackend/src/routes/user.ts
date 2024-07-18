import { Hono } from 'hono'
import { PrismaClient } from "@prisma/client/edge";
import { decode, sign, verify } from "hono/jwt";
import {registerInput} from "../../../common/src/index"



export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}>()





userRouter.post("/register", async(c)=>{
    const body = await c.req.json();
    const {success} = registerInput.safeParse(body);
    if(!success){
      c.status(400)
      return c.json({message:"Invalid input"})
    }
    try{
        const prisma = new PrismaClient();
        const {email,password} = body
        const userExists = await prisma.user.findUnique({
          where:{
            email
          }
        })
        if(userExists){
          return c.json({message:"User already exists"})
        }
        const user = await prisma.user.create({
          data:{
            email:email,
            password: password
          }
        })
        const payload = {
          id: user.id
        }
        const token = await sign(payload,c.env.JWT_SECRET)
        return c.json({message:"User created",token})
    }
    catch(e){
        console.log(e);
        return c.json({message:"Error while creating user"})
      }
})