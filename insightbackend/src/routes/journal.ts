import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";


export const journalRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
    AI: Ai;
  };
  Variables:{
    newJournal : string;
  }
}>()

journalRouter.use("/*",async(c,next)=>{
  const journal = await c.req.json();
  //@ts-ignore
  c.set("newJournal",journal);
  await next();
})

journalRouter.post("/", async (c) => {
  const body = await c.req.json();
  return c.json({ message: body});
});

journalRouter.post("/ai", async (c) => {
  const journal = c.get("newJournal");
  const ai = c.env.AI;
  const messages = [
    { role: "system", content: "You are a friendly journalling assistant whose job is to create insights from the user's journal entry, do not ask more questions just use the given entry to create insights and tell the user about the insights" },
    {
      role: "user",
      content: "I had a bad day today because I woke up late and I did my best to catch up on work but my headache from the lack of sleep was a hindrance",
    },
  ];
  //@ts-ignore
  const response =await ai.run("@cf/meta/llama-3-8b-instruct", {messages})
  console.log(response)
  return c.json({ message: response });
});
