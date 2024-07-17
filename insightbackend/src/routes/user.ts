import { Hono } from 'hono'
import { PrismaClient } from "@prisma/client/edge";
import { decode, sign, verify } from "hono/jwt";


export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}>()





userRouter.post("/register", async(c)=>{
    const body = c.req.json();
    try{
        const prisma = new PrismaClient();
        const user = await prisma.user.create({

        })
    }
    catch(e){
        console.log(e);
    }
})