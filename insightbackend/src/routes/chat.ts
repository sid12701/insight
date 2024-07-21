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
      Variables: {
        userId : string;
      }
}>

chatRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header("Authorization");
    const token = authHeader?.split(" ")[1];
    if (!token) {
      c.status(401);
      return c.json({ message: "Unauthorized" });
    }
    try {
      const user = await verify(token, c.env.JWT_SECRET);
      const userId = user.id;
      c.set("userId", userId as string);
      await next();
    } catch (e) {
      c.status(401);
      return c.json({ message: "Unauthorized" });
    }
  });
  


const getAllChatSessions = (prisma:PrismaClient, userId:string)=>{
    const existingChatSessions = prisma.chatSession.findMany({
        where: {userId: userId},
        include: {messages:true}
    })    
    return existingChatSessions;
}

const getActiveChatSession = (prisma:PrismaClient, userId: string)=>{
    const activeChatSession = prisma.chatSession.findFirst({
        where: {status:true}
    })
    return activeChatSession;
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

const disableChatSession = async (prisma: PrismaClient, userId:string) =>{
    const activeSession =await getActiveChatSession(prisma, userId);
    const id = activeSession?.id
    if(activeSession){
    await prisma.chatSession.update({
        where:{id:id},
        data:{status:false}
    })
}
}

const getOrCreateChatSession = async(prisma:PrismaClient, userId:string)=>{
    let activeSession = await getActiveChatSession(prisma,userId)
    if(!activeSession){
        //@ts-ignore
        activeSession = await createChatSession(prisma,userId);
    }
    return activeSession;
}

chatRouter.post("/",async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
      const userId = c.get('userId')
      //@ts-ignore
    const activeSession = await getOrCreateChatSession(prisma,userId)
    const sessionId = activeSession?.id
      
})  