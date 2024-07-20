import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, verify } from "hono/jwt";

export const chatRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
        AI: Ai;
      };    
}>


const getChatSession = (prisma:PrismaClient, userId:string)=>{
    const existingChatSession = prisma.chatSession.findFirst({
        where: {userId: userId},
        include: {messages:true}
    })    
    return existingChatSession;
}


const createChatSession = (prisma: PrismaClient, userId:string)=>{
    try{
        const newChatSession = prisma.chatSession.create({
            data:{
                userId: userId
            }
        })
        return newChatSession;
    }
    catch(e){
        return e
    }
}

chatRouter.post("/chat",async(c)=>{
    
})