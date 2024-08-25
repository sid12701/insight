import { Context, Hono } from "hono";
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
    userId: string;
  };
}>();

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

const getMonthlyJournals = async (
  prisma: PrismaClient,
  userId: string,
  year: number,
  month: number
) => {
  if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
    throw new Error("Invalid year or month");
  }
  // console.log(year,month)
  const firstDayOfMonth = new Date(year, month - 1, 1);
  const firstDayOfNextMonth = new Date(year, month, 1);

  const journals = await prisma.journal.findMany({
    where: {
      date: {
        gte: firstDayOfMonth,
        lt: firstDayOfNextMonth,
      },
      authorId: userId,
    },
    orderBy: {
      date: "desc",
    },
  });
  return journals;
};

// const getActiveChatSession = (prisma:PrismaClient, userId: string)=>{
//   const activeChatSession = prisma.chatSession.findFirst({
//       where: {status:true}
//   })
//   return activeChatSession;
// }

const getMonthChatSession =async (prisma:PrismaClient, userId:string,month:number,year:number)=>{
  const monthChatSession = await prisma.chatSession.findFirst({
    where: {
        year: year,
        month: month
    }
  })
  return monthChatSession
}


const getOrCreateChatSession = async(prisma:PrismaClient, userId:string,month:number,year:number)=>{
  let monthChatSession = await getMonthChatSession(prisma, userId,month,year)
  if(!monthChatSession){
    monthChatSession = await prisma.chatSession.create({
      data:{
        userId: userId,
        month:month,
        year:year
      }
    })
  }
  return monthChatSession
}

chatRouter.post("/", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const userId = c.get("userId");
    const ai = c.env.AI;
    const body = await c.req.json();
    const { messages , month, year } = body;
    const chatSession = await prisma.chatSession.create({
      data:{
        year: year,
        month: month,
        userId: userId
      }
    })
    console.log(chatSession)
    return c.json({chatSession})
    // const chatSession = await prisma.chatSession.findFirst({
    //   where: {
    //       year: year,
    //       month: month,
    //       userId: userId
    //   },
    //   include: {
    //     messages: true
    //   }
    // })
    // console.log(chatSession)
    // console.log(journals)
    // const summary = getSummaryForMonth(c, journals);
    // const messages = [
    //   {role: "insightful journal assistant", content: `You are a journalling assistant chatbot where you have the journals for the entire month for a user ${journals} as context if the user asks anything about their month and you have access to all the messages that user and you have been talking about as well:  `},
    //   {role:"user", content:user}
    // ]
  } catch (e) {
    console.log(e);
  }
});


chatRouter.post('/message/:year/:month', async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const year = parseInt(c.req.param('year'))  
  const month = parseInt(c.req.param('month'))
  const userId = c.get('userId')
  const chatSession =await prisma.chatSession.findFirst({
    where:{
      year:year,
      month:month,
      userId:userId
    }
  })
  const sessionId = chatSession?.id
  const body = await c.req.json();
  const {userMessage} = body;
  const message = await prisma.chatMessages.create({
    data: {
      role: 'user',
      message: userMessage,
      session:{
        connect:{id:sessionId}
      }
    }
  });
  console.log(message.message)
  return c.json({message})
})


chatRouter.post('/message/ai/:year/:month', async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const year = parseInt(c.req.param('year'))  
  const month = parseInt(c.req.param('month'))
  const userId = c.get('userId')
  const chatSession = await prisma.chatSession.findFirst({
    where:{
      year:year,
      month:month,
      userId:userId
    },
    include:{
      messages:true
    }
  })
  const sessionId = chatSession?.id
  // const messages = chatSession?.messages
  // const messageArray = []
  // //@ts-ignore
  // for(let i=0;i<messages.length;i++){
  //   //@ts-ignore
  //   const role = messages[i].role
  //   //@ts-ignore
  //   const message = messages[i].message
  //   const messageObject = {
  //     role,
  //     message
  //   }
  //   messageArray.push(messageObject)
  // }
  const body = await c.req.json()
  const {messageArray} = body
  const ai = c.env.AI;
  //@ts-ignore
  const journals = await getMonthlyJournals(prisma, userId, year,month)
  const prompt = `An array of objects will be given to you containing journal posts and their insights ( and other information like title and date). Summarize this in a way that can be used as context in a chat functionality. Provide a response based on the previous messages and the month journals that are provided. Here are previous messages from the same session: ${JSON.stringify(messageArray)}, Here are the journals from the user's month: ${JSON.stringify(journals)}`;
  const aiResponse = await ai.run("@cf/meta/llama-3-8b-instruct", {prompt, temperature:0})
  //@ts-ignore
  const aiMessage = aiResponse.response
  // const message = await prisma.chatMessages.create({
  //   data: {
  //     role: 'Insight Assistant',
  //     message:aiMessage ,
  //     session:{
  //       connect:{id:sessionId}
  //     }
  //   }
  // });
  
  return c.json(aiResponse)
})


chatRouter.get('/messages/:year/:month', async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const userId = c.get('userId');
  const year = parseInt(c.req.param('year'))  
  const month = parseInt(c.req.param('month'))
  const chatSession = await prisma.chatSession.findFirst({
    where:{
      year:year,
      month:month,
      userId:userId
    },
    include:{
      messages:true
    }
  })
  // const sessionId = chatSession?.id
  const messages = chatSession?.messages
  const messageArray = []
  //@ts-ignore
  for(let i=0;i<messages.length;i++){
    //@ts-ignore
    const role = messages[i].role
    //@ts-ignore
    const message = messages[i].message
    const messageObject = {
      role,
      message
    }
    messageArray.push(messageObject)
  }
  return c.json(messageArray)
})


